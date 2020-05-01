const config = {
    countries: [
        {
            name: "Quebec",
            color: "blue",
            checked: true,
        },
        {
            name: "France",
            color: "red",
            checked: true,
        },
        {
            name: "US",
            color: "pink",
            checked: false,
        },
        {
            name: "Italy",
            color: "green",
            checked: true,
        },
        {
            name: "Spain",
            color: "yellow",
            checked: true,
        },
        {
            name: "Belgium",
            color: "lightblue",
            checked: true,
        },
        {
            name: "Germany",
            color: "lightpink",
            checked: true,
        },
        {
            name: "United Kingdom",
            color: "turquoise",
            checked: true,
        },
        {
            name: "Brazil",
            color: "#F0F",
            checked: true,
        },
        
    ],

    sortCountries: function(){
        config.countries.sort((a, b) => {
            if (a.checked){
                return -1;
            }
            if (b.checked){
                return 1;
            }
        })
    }
}

export default config;