import './style.css';

import config from './config';
import api from './api';
import graph from './graph';
import controls from './controls';

const app = {
    init: function(){
        config.sortCountries();
        api.setConfig(config);
        api.loadData(app.onDataLoaded);
        controls.init(graph, api, config);
    },

    onDataLoaded: function(){
        graph.createInitial(api.data);
    },


};


app.init();