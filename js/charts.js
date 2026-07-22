// ========================================
// REAL-TIME TELEMETRY CHARTS
// ========================================

const chartHistory = {

    labels: [],

    altitude: [],
    temperature: [],
    pressure: [],
    descentRate: [],
    voltage: []

};

const MAX_DATA_POINTS = 30;


// ========================================
// CREATE CHART
// ========================================

function createTelemetryChart(canvasId, label, color, yAxisLabel) {

    const canvas = document.getElementById(canvasId);

    if (!canvas) {
        console.warn(`Canvas not found: ${canvasId}`);
        return null;
    }

    return new Chart(canvas, {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: label,

                data: [],

                borderColor: color,

                borderWidth: 2,

                tension: 0.3,

                fill: false,

                pointRadius: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: false,

            scales: {

                x: {

                    display: true,

                    ticks: {

                        maxTicksLimit: 6

                    }

                },

                y: {

                    title: {

                        display: true,

                        text: yAxisLabel

                    }

                }

            },

            plugins: {

                legend: {

                    display: true

                }

            }

        }

    });

}


// ========================================
// CREATE ALL CHARTS
// ========================================

let altitudeChart;
let temperatureChart;
let pressureChart;
let descentRateChart;
let voltageChart;


function initializeCharts() {

    altitudeChart = createTelemetryChart(

        "altitudeChart",

        "Altitude",

        "#00ffcc",

        "Altitude (m)"

    );


    temperatureChart = createTelemetryChart(

        "temperatureChart",

        "Temperature",

        "#ff9900",

        "Temperature (°C)"

    );


    pressureChart = createTelemetryChart(

        "pressureChart",

        "Pressure",

        "#00aaff",

        "Pressure (hPa)"

    );


    descentRateChart = createTelemetryChart(

        "descentRateChart",

        "Descent Rate",

        "#ff4444",

        "Descent Rate (m/s)"

    );


    voltageChart = createTelemetryChart(

        "voltageChart",

        "Battery Voltage",

        "#ffff00",

        "Voltage (V)"

    );

}


// ========================================
// UPDATE CHARTS
// ========================================

function updateCharts() {

    if (!telemetry) {
        return;
    }


    const currentTime =
        new Date().toLocaleTimeString();


    chartHistory.labels.push(currentTime);


    chartHistory.altitude.push(
        telemetry.altitude
    );


    chartHistory.temperature.push(
        telemetry.temperature
    );


    chartHistory.pressure.push(
        telemetry.pressure
    );


    chartHistory.descentRate.push(
        telemetry.descentRate
    );


    chartHistory.voltage.push(
        telemetry.voltage
    );


    // Keep only last 30 points

    if (
        chartHistory.labels.length >
        MAX_DATA_POINTS
    ) {

        chartHistory.labels.shift();

        chartHistory.altitude.shift();

        chartHistory.temperature.shift();

        chartHistory.pressure.shift();

        chartHistory.descentRate.shift();

        chartHistory.voltage.shift();

    }


    updateSingleChart(

        altitudeChart,

        chartHistory.labels,

        chartHistory.altitude

    );


    updateSingleChart(

        temperatureChart,

        chartHistory.labels,

        chartHistory.temperature

    );


    updateSingleChart(

        pressureChart,

        chartHistory.labels,

        chartHistory.pressure

    );


    updateSingleChart(

        descentRateChart,

        chartHistory.labels,

        chartHistory.descentRate

    );


    updateSingleChart(

        voltageChart,

        chartHistory.labels,

        chartHistory.voltage

    );

}


// ========================================
// UPDATE INDIVIDUAL CHART
// ========================================

function updateSingleChart(

    chart,

    labels,

    data

) {

    if (!chart) {
        return;
    }


    chart.data.labels = labels;

    chart.data.datasets[0].data = data;


    chart.update("none");

}


// ========================================
// RESET CHARTS
// ========================================

function resetCharts() {

    chartHistory.labels = [];

    chartHistory.altitude = [];

    chartHistory.temperature = [];

    chartHistory.pressure = [];

    chartHistory.descentRate = [];

    chartHistory.voltage = [];


    const charts = [

        altitudeChart,

        temperatureChart,

        pressureChart,

        descentRateChart,

        voltageChart

    ];


    charts.forEach(chart => {

        if (chart) {

            chart.data.labels = [];

            chart.data.datasets[0].data = [];

            chart.update("none");

        }

    });

}


// ========================================
// INITIALIZE
// ========================================

document.addEventListener(

    "DOMContentLoaded",

    initializeCharts

);