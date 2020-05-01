const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            display: false,
            population: 8480000
        },
        {
            name: "France",
            color: "red",
            display: true,
            population: 65273511
        },
        {
            name: "US",
            color: "pink",
            display: false,
            population: 331002651
        },
        {
            name: "Italy",
            color: "green",
            display: false,
            population: 60461826
        },
        {
            name: "Spain",
            color: "yellow",
            display: false,
            population: 46754778
        },
        {
            name: "Belgium",
            color: "lightblue",
            display: false,
            population: 11589623	
        },
        {
            name: "Germany",
            color: "lightpink",
            display: false,
            population: 83783942
        },
        {
            name: "United Kingdom",
            color: "turquoise",
            display: false,
            population: 67886011
        },
        {
            name: "Brazil",
            color: "#F0F",
            display: false,
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