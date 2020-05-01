import moment from 'moment';

import './style.css';

import config from './config';
import api from './api';
import graph from './graph';

const dataHandler = {
    rawData: null,
    data: {
        labels: [],
        datasets: []
    },

    prepareData: function(callback){
        //reset the labels
        dataHandler.data.labels = [];
        let datasets = [];
        app.countriesToInclude.forEach(countryName => {
            let countryData = dataHandler.findRegionData(countryName);
            datasets.push( dataHandler.prepareLineData(countryData) );
        });

        dataHandler.data.datasets = datasets;
        callback();
    },

    prepareLineData: function(data){
        let preparedData  = {};
        preparedData.label = data["Province/State"] ? data["Province/State"] : data["Country/Region"];
        preparedData.borderColor = dataHandler.getCountryColorByName(preparedData.label);
        preparedData.prevBorderColor = preparedData.borderColor;
        preparedData.data = [];
        //for first country, we will add labels
        let labelsAreEmptyBeforeLoop = dataHandler.data.labels.length <= 0;
        let i = 0;
        for(let key in data){
            i++;
            //skip country name, lat lng, etc.
            if (i <= 4){ continue; }
            
            let date = moment(key, "M-D-YY");
            
            if (date.isBefore(app.startsAtDate)){
                continue;
            }

            if (labelsAreEmptyBeforeLoop){
                let formattedDate = date.format("DD/MM");
                dataHandler.data.labels.push(formattedDate);
            }
            preparedData.data.push(data[key]);
        };

        return preparedData;
    },

    findRegionData: function(regionName){
        for(let i = 0; i < dataHandler.rawData.length; i++){
            let line = dataHandler.rawData[i];

            if (line["Province/State"] === regionName){
                return line;
            }

            if (line["Country/Region"] === regionName && line["Province/State"] === ""){
                return line;
            }
        }
    }, 

    getCountryColorByName: function(countryName) {
        for(let i = 0; i < config.countries.length; i++){
            if (countryName === config.countries[i].name){
                return config.countries[i].color;
            }
        }
    }
};

const app = {
    
    countriesToInclude: [],
    startsAtDate: moment("2020-03-06"),

    init: function(){
        config.sortCountries();
        app.addControls();
        api.loadData(app.onDataLoaded);
    },

    onDataLoaded: function(data){
        dataHandler.rawData = data;
        dataHandler.prepareData(() => graph.createInitial(dataHandler.data));
    },

    addControls: function(){
        let container = document.getElementById('controls');
        config.countries.forEach(country => {
            let label = document.createElement('label');
            label.textContent = country.name;
            //label.style.color = country.color;
            label.className = "country-label";
            let checkbox = document.createElement('input');
            checkbox.name = "include-country-checkbox"
            checkbox.type = "checkbox";
            checkbox.value = country.name;
            checkbox.checked = country.checked;
            checkbox.addEventListener('change', app.onCountryChange);
            label.prepend(checkbox);
            container.appendChild(label);
        });

        let startDateInputContainer = document.createElement('div');
        startDateInputContainer.className = "start-date-container";
        startDateInputContainer.textContent = "Start from:";
        let startDateInput = document.createElement('input');
        startDateInput.name = "start-date";
        startDateInput.id = "start-date";
        startDateInput.value = "06/03";
        startDateInput.addEventListener("blur", app.onStartDateChange);
        startDateInputContainer.appendChild(startDateInput);
        container.appendChild(startDateInputContainer);

        app.updateCountriesToInclude();
    },

    onStartDateChange: function(){
        let newStartDate = document.getElementById("start-date").value + "/20";
        app.startsAtDate = moment(newStartDate, "DD/MM/YY");
        dataHandler.prepareData(graph.update);
    },

    onCountryChange: function(){
        app.updateCountriesToInclude();
        dataHandler.prepareData(graph.update);
    },

    updateCountriesToInclude: function(){
        app.countriesToInclude = [];
        let checkedCheckboxes = document.querySelectorAll('#controls input[name="include-country-checkbox"]:checked');
        checkedCheckboxes.forEach(cb => {
            app.countriesToInclude.push(cb.value);
        });
    },

};


app.init();