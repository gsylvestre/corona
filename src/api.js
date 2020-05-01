import parse from 'csv-parse';

const api = {
    loadData: function(callback){
        const url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
        fetch(url)
            .then(function(response){
                return response.text();
            })
            .then(function(data){
                parse(data, {
                    columns: true
                }, function(err, output){
                    callback(output);
                });
            });
    },
}

export default api;