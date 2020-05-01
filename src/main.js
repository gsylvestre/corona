import './style.css';

import config from './config';
import api from './api';
import graph from './graph';
import controls from './controls';

const app = {
    init: function(){
        config.sortCountries();
        api.setConfig(config);
        api.loadData("deaths", app.onDataLoaded);
        controls.init(graph, api, config, app);
    },

    onDataLoaded: function(){
        graph.createInitial(api.data);
    },


};


app.init();