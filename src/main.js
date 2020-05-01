import './style.css';

import config from './config';
import api from './api';
import graph from './graph';
import controls from './controls';

const app = {
    init: function(){
        config.sortCountries();
        api.setConfig(config);
        
        if (!graph.getShowingCountries()){
            config.countries.forEach(country => {
                graph.showingCountries.push(country.name);
            });
            graph.saveShowingCountries();
        }

        graph.chartType = localStorage.getItem('chartType') ? localStorage.getItem('chartType') : "line";
        document.querySelector('input[value="'+graph.chartType+'"]').checked = true;

        let dataType = localStorage.getItem('dataType') ? localStorage.getItem('dataType') : "deaths";
        document.querySelector('input[value="'+dataType+'"]').checked = true;
        
        api.startsAtDate = localStorage.getItem('startsAtDate') ? moment(localStorage.getItem('startsAtDate')) : moment("2020-03-06");
        document.getElementById("start-date").value = api.startsAtDate.format("DD/MM");

        api.loadData(dataType, app.onDataLoaded);
        controls.init(graph, api, config, app);
    },

    onDataLoaded: function(){
        graph.createInitial(api.data);
    },


};


app.init();