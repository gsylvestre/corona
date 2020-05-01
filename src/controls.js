import api from "./api";

const controls = {

    api: null, 
    graph: null,
    app: null,

    init: function(graph, api, config, app){
        controls.api = api;
        controls.graph = graph;
        controls.app = app;
        
        let dataTypeRadios = document.querySelectorAll('input[name="data-type"]');
        dataTypeRadios.forEach(dataTypeRadio => {
            dataTypeRadio.addEventListener('change', controls.onDataTypeChange);
        });

        let startDateInput = document.getElementById('start-date');
        startDateInput.addEventListener("blur", controls.onStartDateBlur);
        startDateInput.addEventListener("keydown", controls.onStartDateKeydown);

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

}

export default controls;