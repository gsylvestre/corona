const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            population: 8480000
        },
        {
            name: "France",
            color: "red",
            population: 65273511
        },
        {
            name: "US",
            color: "pink",
            population: 331002651
        },
        {
            name: "Italy",
            color: "green",
            population: 60461826
        },
        {
            name: "Spain",
            color: "yellow",
            population: 46754778
        },
        {
            name: "Belgium",
            color: "lightblue",
            population: 11589623	
        },
        {
            name: "Germany",
            color: "lightpink",
            population: 83783942
        },
        {
            name: "United Kingdom",
            color: "turquoise",
            population: 67886011
        },
        {
            name: "Brazil",
            color: "#F0F",
            population: 212559417	
        }
        
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