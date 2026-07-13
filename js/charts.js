// ======================================
// Reusable Chart Factory
// ======================================

function createTelemetryChart(canvasId, label, color) {

    const ctx = document
        .getElementById(canvasId)
        .getContext("2d");

    return new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: label,

                data: [],

                borderColor: color,

                borderWidth: 2,

                tension: 0.35,

                pointRadius: 0,

                fill: false

            }]
        },

        options: {

            responsive: true,

            animation: false,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "#ffffff"

                    }
                }

            },

            scales: {

                x: {

                    display: false

                },

                y: {

                    ticks: {

                        color: "#ffffff"

                    },

                    grid: {

                        color: "#333"

                    }

                }

            }

        }

    });

}

// ======================================
// Create Charts
// ======================================

const altitudeChart = createTelemetryChart(
    "altitudeChart",
    "Altitude (m)",
    "#00E5FF"
);

const temperatureChart = createTelemetryChart(
    "temperatureChart",
    "Temperature (°C)",
    "#00FF9C"
);

const pressureChart = createTelemetryChart(
    "pressureChart",
    "Pressure (hPa)",
    "#FFD54F"
);

// ======================================
// Update Charts
// ======================================

function updateCharts() {

    updateSingleChart(
        altitudeChart,
        telemetry.altitude
    );

    updateSingleChart(
        temperatureChart,
        telemetry.temperature
    );

    updateSingleChart(
        pressureChart,
        telemetry.pressure
    );

}

// ======================================
// Reusable Update Function
// ======================================

function updateSingleChart(chart, value) {

    chart.data.labels.push("");

    chart.data.datasets[0].data.push(value);

    if (chart.data.labels.length > 20) {

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }

    chart.update();

}