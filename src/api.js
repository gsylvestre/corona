import parse from 'csv-parse';
import graph from './graph';

const api = {
    countriesToInclude: [],
    rawData: null,
    data: {
        labels: [],
        datasets: []
    },
    startsAtDate: null,
    relativeToPopulation: null,
    config: null,

    setConfig: function(config){
        api.config = config;
        config.countries.forEach(country => {
            api.countriesToInclude.push(country.name);
        });
    },

    loadData: function(type, callback){
        let url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

        if(type === "confirmed"){
            url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
        }

        fetch(url)
            .then(function(response){
                return response.text();
            })
            .then(function(data){
                parse(data, {
                    columns: true
                }, function(err, output){
                    api.rawData = output;
                    api.prepareData(callback);
                });
            });
    },


    prepareData: function(callback){
        //reset the labels
        api.data.labels = [];
        let datasets = [];
        api.countriesToInclude.forEach(countryName => {
            let countryData = api.findRegionData(countryName);
            datasets.push( api.prepareLineData(countryData) );
        });

        api.data.datasets = datasets;
        callback(api.data);
    },

    prepareLineData: function(data){
        let preparedData  = {};
        preparedData.label = data["Province/State"] ? data["Province/State"] : data["Country/Region"];
        preparedData.backgroundColor = api.getCountryColorByName(preparedData.label);
        preparedData.borderColor = api.getCountryColorByName(preparedData.label);
        preparedData.hidden = !graph.isCountryShowing(preparedData.label);
        preparedData.prevBorderColor = preparedData.borderColor;
        preparedData.data = [];
        //for first country, we will add labels
        let labelsAreEmptyBeforeLoop = api.data.labels.length <= 0;
        let i = 0;
        for(let key in data){
            i++;
            //skip country name, lat lng, etc.
            if (i <= 4){ continue; }
            
            let date = moment(key, "M-D-YY");
            
            if (date.isBefore(api.startsAtDate)){
                continue;
            }

            if (labelsAreEmptyBeforeLoop){
                let formattedDate = date.format("DD/MM");
                api.data.labels.push(formattedDate);
            }

            
            let val = data[key];
            //in %
            if (api.relativeToPopulation === "relative"){
                val = data[key] / api.getCountryPopulationByName(preparedData.label) * 100;
            }

            preparedData.data.push(val);
        };

        return preparedData;
    },

    findRegionData: function(regionName){
        for(let i = 0; i < api.rawData.length; i++){
            let line = api.rawData[i];

            if (line["Province/State"] === regionName){
                return line;
            }

            if (line["Country/Region"] === regionName && line["Province/State"] === ""){
                return line;
            }
        }
    }, 

    getCountryColorByName: function(countryName) {
        for(let i = 0; i < api.config.countries.length; i++){
            if (countryName === api.config.countries[i].name){
                return api.config.countries[i].color;
            }
        }
    },

    getCountryPopulationByName: function(countryName) {
        for(let i = 0; i < api.config.countries.length; i++){
            if (countryName === api.config.countries[i].name){
                return api.config.countries[i].population;
            }
        }
    },

    getCountryDisplayByName: function(countryName) {
        for(let i = 0; i < api.config.countries.length; i++){
            if (countryName === api.config.countries[i].name){
                return api.config.countries[i].display;
            }
        }
    }
}

export default api;