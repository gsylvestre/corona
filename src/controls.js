import moment from 'moment';

const controls = {

    api: null, 
    graph: null,

    init: function(graph, api, config){
        controls.api = api;
        controls.graph = graph;
        let container = document.getElementById('controls');
        config.countries.forEach(country => {
            let label = document.createElement('label');
            label.textContent = country.name;
            //label.style.color = country.color;
            label.className = "country-label";
            let checkbox = document.createElement('input');
            checkbox.name = "include-country-checkbox"
            checkbox.type = "checkbox";
            checkbox.value = country.name;
            checkbox.checked = country.checked;
            checkbox.addEventListener('change', controls.onCountryChange);
            label.prepend(checkbox);
            container.appendChild(label);
        });

        let startDateInputContainer = document.createElement('div');
        startDateInputContainer.className = "start-date-container";
        startDateInputContainer.textContent = "Start from:";
        let startDateInput = document.createElement('input');
        startDateInput.name = "start-date";
        startDateInput.id = "start-date";
        startDateInput.value = "06/03";
        startDateInput.addEventListener("blur", controls.onStartDateChange);
        startDateInputContainer.appendChild(startDateInput);
        container.appendChild(startDateInputContainer);

        controls.updateCountriesToInclude();
    },

    onStartDateChange: function(){
        let newStartDate = document.getElementById("start-date").value + "/20";
        controls.api.startsAtDate = moment(newStartDate, "DD/MM/YY");
        controls.api.prepareData(controls.graph.update);
    },

    onCountryChange: function(){
        controls.updateCountriesToInclude();
        controls.api.prepareData(controls.graph.update);
    },

    updateCountriesToInclude: function(){
        controls.api.countriesToInclude = [];
        let checkedCheckboxes = document.querySelectorAll('#controls input[name="include-country-checkbox"]:checked');
        checkedCheckboxes.forEach(cb => {
            controls.api.countriesToInclude.push(cb.value);
        });
    },
}

export default controls;