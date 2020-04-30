import parse from 'csv-parse';
import moment from 'moment';
import Chart from 'chart.js';

import './style.css';

const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            checked: true,
        },
        {
            name: "France",
            color: "red",
            checked: true,
        },
        {
            name: "US",
            color: "pink",
            checked: false,
        },
        {
            name: "Italy",
            color: "green",
            checked: true,
        },
        {
            name: "Spain",
            color: "yellow",
            checked: true,
        },
        {
            name: "Belgium",
            color: "lightblue",
            checked: true,
        },
        {
            name: "Germany",
            color: "lightpink",
            checked: true,
        },
        {
            name: "United Kingdom",
            color: "turquoise",
            checked: true,
        },
        {
            name: "Brazil",
            color: "#F0F",
            checked: true,
        },
        
    ],

    sortCountries: function(){
        config.countries.sort((a, b) => {
            if (a.checked){
                return -1;
            }
            if (b.checked){
                return 1;
            }
        })
    }
}

const dataHandler = {
    rawData: null,
    data: {
        labels: [],
        datasets: []
    },

    loadData: function(){
        const url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
        fetch(url)
            .then(function(response){
                return response.text();
            })
            .then(function(data){
                parse(data, {
                    columns: true
                }, function(err, output){
                    dataHandler.rawData = output;
                    dataHandler.prepareData(app.createInitialGraph);
                });
            });
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
    
    chart: null,
    countriesToInclude: [],
    startsAtDate: moment("2020-03-06"),

    init: function(){
        config.sortCountries();
        app.addControls();
        dataHandler.loadData();
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
        dataHandler.prepareData(app.updateGraph);
    },

    onCountryChange: function(){
        app.updateCountriesToInclude();
        dataHandler.prepareData(app.updateGraph);
    },

    updateCountriesToInclude: function(){
        app.countriesToInclude = [];
        let checkedCheckboxes = document.querySelectorAll('#controls input[name="include-country-checkbox"]:checked');
        checkedCheckboxes.forEach(cb => {
            app.countriesToInclude.push(cb.value);
        });

    },

    updateGraph: function(){
        app.chart.update();
    },

    createInitialGraph: function(){
        Chart.defaults.global.elements.point.radius = 2;
        Chart.defaults.global.elements.line.borderBiwdth = 1;
        Chart.defaults.global.elements.line.fill = false;
        Chart.defaults.global.defaultFontFamily = "Manrope";
        Chart.defaults.global.defaultFontColor = "#FFF";

        const ctx = document.getElementById('myChart').getContext('2d');

        app.chart = new Chart(ctx, {
                type: 'line',
                data: dataHandler.data,
                options: {
                    defaultFontFamily: 'Manrope',
                    maintainAspectRatio: false, 
                    animation: {
                        duration: 0
                    },
                    legend: {
                        position: 'bottom',
                        onHover: function(evt, info){
                            for(let i = 0; i < app.chart.data.datasets.length; i++){
                                if (i !== info.datasetIndex){
                                    app.chart.data.datasets[i].borderColor = "black";
                                }
                                else {
                                    //app.chart.data.datasets[i].borderColor = "#F0F";
                                }
                            }
                            app.chart.update();
                        },
                        onLeave: function(evt, info){
                            for(let i = 0; i < app.chart.data.datasets.length; i++){
                                app.chart.data.datasets[i].borderColor = app.chart.data.datasets[i].prevBorderColor;
                            }
                            app.chart.update();
                        }
                    }
                },
            }
        );
    }
};


app.init();