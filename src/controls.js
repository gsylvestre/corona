import api from "./api";

const controls = {

    api: null, 
    graph: null,
    app: null,

    init: function(graph, api, config, app){
        controls.api = api;
        controls.graph = graph;
        controls.app = app;
        
        let countryContainer = document.getElementById('country-checkboxes-container');
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
            checkbox.addEventListener('change', controls.onCountryChange);
            label.prepend(checkbox);
            countryContainer.appendChild(label);
        });

        let dataTypeRadios = document.querySelectorAll('input[name="data-type"]');
        dataTypeRadios.forEach(dataTypeRadio => {
            dataTypeRadio.addEventListener('change', controls.onDataTypeChange);
        });

        let startDateInput = document.getElementById('start-date');
        startDateInput.addEventListener("blur", controls.onStartDateBlur);
        startDateInput.addEventListener("keydown", controls.onStartDateKeydown);

        controls.updateCountriesToInclude();
    },

    onDataTypeChange: function(){
        let selectedDataType = document.querySelector('#controls input[name="data-type"]:checked').value;
        api.loadData(selectedDataType, controls.app.onDataLoaded);
    },

    onStartDateBlur: function(){
        controls.onStartDateChange();
    },

    onStartDateKeydown: function(evt){
        if (evt.key === "Enter") {
            evt.preventDefault();
            document.getElementById("start-date").blur();
        }
    },

    onStartDateChange: function(){
        let newStartDate = document.getElementById("start-date").value + "/20";
        controls.api.startsAtDate = moment(newStartDate, "DD/MM/YY");
        controls.api.prepareData(controls.graph.update);
    },

    onCountryChange: function(){
        controls.updateCountriesToInclude();
        controls.api.prepareData(controls.graph.update);
    },

    updateCountriesToInclude: function(){
        controls.api.countriesToInclude = [];
        let checkedCheckboxes = document.querySelectorAll('#controls input[name="include-country-checkbox"]:checked');
        checkedCheckboxes.forEach(cb => {
            controls.api.countriesToInclude.push(cb.value);
        });
    },
}

export default controls;