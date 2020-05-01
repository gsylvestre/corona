const config = {
    countries: [
        {
            name: "Quebec",
            color: "#268bd2",

            population: 8480000
        },
        {
            name: "France",
            color: "#dc322f",
            population: 65273511
        },
        {
            name: "US",
            color: "#cb4b16",
            population: 331002651
        },
        {
            name: "Italy",
            color: "#d33682",
            population: 60461826
        },
        {
            name: "Spain",
            color: "#6c71c4",
            population: 46754778
        },
        {
            name: "Belgium",
            color: "#b58900",
            population: 11589623	
        },
        {
            name: "Germany",
            color: "#2aa198",
            population: 83783942
        },
        {
            name: "United Kingdom",
            color: "#859900",
            population: 67886011
        },
        {
            name: "Brazil",
            color: "#657b83",
            population: 212559417	
        },
    ],

    sortCountries: function(){
        config.countries.sort((a, b) => {
            if (a.display){
                return -1;
            }
            if (b.display){
                return 1;
            }
        })
    }
}

export default config;