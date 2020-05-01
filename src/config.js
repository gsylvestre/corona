const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            display: true,
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
            display: true,
            population: 60461826
        },
        {
            name: "Spain",
            color: "yellow",
            display: true,
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
            display: true,
            population: 67886011
        },
        {
            name: "Brazil",
            color: "#F0F",
            display: true,
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