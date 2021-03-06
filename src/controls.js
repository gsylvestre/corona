import api from "./api";
import graph from "./graph";

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

        let chartTypeRadios = document.querySelectorAll('#chart-type-container input[name="chart-type"]');
        chartTypeRadios.forEach(chartTypeRadio => {
            chartTypeRadio.addEventListener('change', controls.onChartTypeChange);
        });

        let relativeToPopulationRadios = document.querySelectorAll('#population-container input[name="population"]');
        relativeToPopulationRadios.forEach(relativeToPopulationRadio => {
            relativeToPopulationRadio.addEventListener('change', controls.onRelativeToPopulationChange);
        });

        let startDateInput = document.getElementById('start-date');
        startDateInput.addEventListener("blur", controls.onStartDateBlur);
        startDateInput.addEventListener("keydown", controls.onStartDateKeydown);

    },

    onChartTypeChange: function(){
        let selectedChartType = document.querySelector('#chart-type-container input[name="chart-type"]:checked').value;
        localStorage.setItem('chartType', selectedChartType);
        controls.graph.changeToType(selectedChartType);
    },

    onDataTypeChange: function(){
        let selectedDataType = document.querySelector('#controls input[name="data-type"]:checked').value;
        localStorage.setItem('dataType', selectedDataType);
        api.loadData(selectedDataType, controls.graph.update);
    },

    onRelativeToPopulationChange: function(){
        controls.api.relativeToPopulation = document.querySelector('#controls input[name="population"]:checked').value;
        localStorage.setItem('relativeToPopulation', controls.api.relativeToPopulation);
        controls.api.prepareData(controls.graph.update);
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
        localStorage.setItem('startsAtDate', controls.api.startsAtDate.format("YYYY-MM-DD"));
        controls.api.prepareData(controls.graph.update);
    },

}

export default controls;