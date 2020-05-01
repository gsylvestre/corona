import Chart from 'chart.js';

const graph = {
    chart: null,

    update: function(newData){
        graph.chart.data = newData;
        graph.chart.update();
    },

    createInitial: function(data){
        Chart.defaults.global.elements.point.radius = 2;
        Chart.defaults.global.elements.line.borderBiwdth = 1;
        Chart.defaults.global.elements.line.fill = false;
        Chart.defaults.global.defaultFontFamily = "Manrope";
        Chart.defaults.global.defaultFontColor = "#FFF";

        const ctx = document.getElementById('myChart').getContext('2d');

        graph.chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    defaultFontFamily: 'Manrope',
                    maintainAspectRatio: false, 
                    animation: {
                        duration: 0
                    },
                    legend: {
                        position: 'bottom',
                        onHover: function(evt, info){
                            for(let i = 0; i < graph.chart.data.datasets.length; i++){
                                if (i !== info.datasetIndex){
                                    graph.chart.data.datasets[i].borderColor = "black";
                                }
                                else {
                                    //app.chart.data.datasets[i].borderColor = "#F0F";
                                }
                            }
                            graph.chart.update();
                        },
                        onLeave: function(evt, info){
                            for(let i = 0; i < graph.chart.data.datasets.length; i++){
                                graph.chart.data.datasets[i].borderColor = graph.chart.data.datasets[i].prevBorderColor;
                            }
                            graph.chart.update();
                        }
                    }, 
                    scales: {
                        yAxes: [{
                            ticks: {
                                //format number
                                callback: function(value, index, values) {
                                    return value.toLocaleString();
                                }
                            }
                        }]
                    }
                },
            }
        );
    }
}

export default graph;