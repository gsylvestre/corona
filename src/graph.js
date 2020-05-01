import Chart from 'chart.js';

const graph = {
    chart: null,
    chartType: "line",

    update: function(newData){
        graph.chart.data = newData;
        graph.chart.update();
    },

    changeToType: function(type){
        graph.chartType = type;
        let prevData = graph.chart.data;
        graph.chart.destroy();
        graph.createInitial(prevData);
    },

    createInitial: function(data){
        Chart.defaults.global.elements.point.radius = 2;
        Chart.defaults.global.elements.line.borderBiwdth = 1;
        Chart.defaults.global.elements.line.fill = false;
        Chart.defaults.global.defaultFontFamily = "Manrope";
        Chart.defaults.global.defaultFontColor = "#FFF";

        const ctx = document.getElementById('myChart').getContext('2d');

        graph.chart = new Chart(ctx, {
            type: graph.chartType,
            data: data,
            options: {
                defaultFontFamily: 'Manrope',
                maintainAspectRatio: false, 
                animation: {
                    duration: 0
                },
                legend: {
                    position: 'bottom',
                    onClick: function(e, legendItem) {
                        let index = legendItem.datasetIndex;
                        let meta = graph.chart.getDatasetMeta(index);

                        // See controller.isDatasetVisible comment
                        meta.hidden = meta.hidden === null ? !graph.chart.data.datasets[index].hidden : null;
                    
                        // We hid a dataset ... rerender the chart
                        graph.chart.update();
                    },
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
            
        });
    }
}

export default graph;