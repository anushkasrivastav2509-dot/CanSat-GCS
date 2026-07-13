// ======================================
// CanSat Live Charts
// ======================================

// Altitude Chart
const altitudeCtx = document
    .getElementById("altitudeChart")
    .getContext("2d");

const altitudeChart = new Chart(altitudeCtx, {

    type: "line",

    data: {

        labels: [],

        datasets: [{

            label: "Altitude (m)",

            data: [],

            borderColor: "#00E5FF",

            borderWidth: 2,

            tension: 0.3,

            pointRadius: 0

        }]
    },

    options: {

        responsive: true,

        animation: false,

        scales: {

            x: {

                display: false

            }

        }

    }

});
function updateCharts(){

    altitudeChart.data.labels.push("");

    altitudeChart.data.datasets[0].data.push(
        telemetry.altitude
    );

    if(altitudeChart.data.labels.length>20){

        altitudeChart.data.labels.shift();

        altitudeChart.data.datasets[0].data.shift();

    }

    altitudeChart.update();

}