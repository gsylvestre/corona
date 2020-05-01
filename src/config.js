const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            display: true,
        },
        {
            name: "France",
            color: "red",
            display: true,
        },
        {
            name: "US",
            color: "pink",
            display: false,
        },
        {
            name: "Italy",
            color: "green",
            display: true,
        },
        {
            name: "Spain",
            color: "yellow",
            display: true,
        },
        {
            name: "Belgium",
            color: "lightblue",
            display: false,
        },
        {
            name: "Germany",
            color: "lightpink",
            display: false,
        },
        {
            name: "United Kingdom",
            color: "turquoise",
            display: true,
        },
        {
            name: "Brazil",
            color: "#F0F",
            display: true,
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