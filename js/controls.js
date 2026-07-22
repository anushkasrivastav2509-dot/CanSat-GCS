// ========================================
// MISSION CONTROLS
// ========================================

const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");


// ========================================
// START MISSION
// ========================================

if (startButton) {
    startButton.addEventListener("click", () => {

        // Start telemetry simulation
        if (typeof startTelemetry === "function") {
            startTelemetry();
        }

        // Start mission timer
        if (typeof startMissionTimer === "function") {
            startMissionTimer();
        }

        logMessage("MISSION STARTED");
    });
}


// ========================================
// STOP MISSION
// ========================================

if (stopButton) {
    stopButton.addEventListener("click", () => {

        // Stop telemetry simulation
        if (typeof stopTelemetry === "function") {
            stopTelemetry();
        }

        // Stop mission timer
        if (typeof stopMissionTimer === "function") {
            stopMissionTimer();
        }

        logMessage("MISSION STOPPED");
    });
}
// ========================================
// RESET MISSION
// ========================================

const resetButton = document.getElementById("reset-btn");

if (resetButton) {

    resetButton.addEventListener("click", () => {

        // Stop telemetry
        if (typeof stopTelemetry === "function") {
            stopTelemetry();
        }

        // Stop timer
        if (typeof stopMissionTimer === "function") {
            stopMissionTimer();
        }

        // Reset timer value
        missionSeconds = 0;

        const timerElement =
            document.getElementById("mission-time");

        if (timerElement) {
            timerElement.textContent = "00:00:00";
        }

        // Reset telemetry values
        telemetry.altitude = 0;
        telemetry.temperature = 25;
        telemetry.pressure = 1013;
        telemetry.humidity = 45;
        telemetry.voltage = 5.00;
        telemetry.yaw = 0;
        telemetry.pitch = 0;
        telemetry.roll = 0;

        // Update dashboard
        if (typeof updateTelemetryDisplay === "function") {
            updateTelemetryDisplay();
        }

        logMessage("MISSION RESET");
    });
}
// ========================================
// CONNECT
// ========================================

const connectButton = document.getElementById("connect-btn");

if (connectButton) {

    connectButton.addEventListener("click", () => {

        const statusElement =
            document.getElementById("connection-status");

        if (statusElement) {
            statusElement.textContent = "CONNECTED";
            statusElement.className = "connected";
        }

        logMessage("TELEMETRY LINK ESTABLISHED");
    });
}
// ========================================
// CALIBRATE SENSORS
// ========================================

const calibrateButton =
    document.getElementById("calibrate-btn");

if (calibrateButton) {

    calibrateButton.addEventListener("click", () => {

        telemetry.altitude = 0;
        telemetry.yaw = 0;
        telemetry.pitch = 0;
        telemetry.roll = 0;

        updateTelemetryDisplay();

        logMessage("SENSORS CALIBRATED");
    });
}
// ========================================
// EXPORT TELEMETRY DATA
// ========================================

const exportButton =
    document.getElementById("export-btn");

if (exportButton) {

    exportButton.addEventListener("click", () => {

        const data = JSON.stringify(telemetry, null, 2);

        const blob =
            new Blob([data], { type: "application/json" });

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download = "cansat-telemetry.json";

        link.click();

        URL.revokeObjectURL(url);

        logMessage("TELEMETRY DATA EXPORTED");
    });
}
// ========================================
// MANUAL SEPARATION
// ========================================

const separationButton =
    document.getElementById("separation-btn");

if (separationButton) {

    separationButton.addEventListener("click", () => {

        telemetry.payloadSeparated = false;

        updateErrorCode();

        logMessage(
            "WARNING: MANUAL PAYLOAD SEPARATION COMMAND EXECUTED",
            "warning"
        );

    });

}


// ========================================
// EMERGENCY PARACHUTE
// ========================================

const parachuteButton =
    document.getElementById("parachute-btn");

if (parachuteButton) {

    parachuteButton.addEventListener("click", () => {

        telemetry.emergencyParachute = true;

        updateErrorCode();

        logMessage(
            "EMERGENCY PARACHUTE DEPLOYMENT ACTIVATED",
            "warning"
        );

    });

}


// ========================================
// REDUNDANT ACTIVATION
// ========================================

const redundantButton =
    document.getElementById("redundant-btn");

if (redundantButton) {

    redundantButton.addEventListener("click", () => {

        telemetry.redundantActivated = true;

        logMessage(
            "REDUNDANT SYSTEM ACTIVATED",
            "success"
        );

    });

}


// ========================================
// SYNC PC TIME
// ========================================

const syncTimeButton =
    document.getElementById("sync-time-btn");

if (syncTimeButton) {

    syncTimeButton.addEventListener("click", () => {

        const time =
            new Date().toLocaleTimeString();

        logMessage(
            `PC TIME SYNCHRONIZED: ${time}`,
            "success"
        );

    });

}


// ========================================
// RESET PACKET
// ========================================

const resetPacketButton =
    document.getElementById("reset-packet-btn");

if (resetPacketButton) {

    resetPacketButton.addEventListener("click", () => {

        telemetryLog = [];

        telemetry.payloadSeparated = true;

        telemetry.emergencyParachute = false;

        telemetry.redundantActivated = false;

        updateErrorCode();

        logMessage(
            "TELEMETRY PACKET BUFFER RESET",
            "success"
        );

    });

}
// ========================================
// EXPORT TELEMETRY CSV
// ========================================

const exportCSVButton =
    document.getElementById("export-csv-btn");

if (exportCSVButton) {

    exportCSVButton.addEventListener("click", () => {

        const log = window.telemetryLog;

        if (!Array.isArray(log) || log.length === 0) {

            logMessage(
                "NO TELEMETRY DATA AVAILABLE FOR EXPORT",
                "warning"
            );

            return;
        }

        const headers = Object.keys(log[0]);

        const csvRows = [];

        csvRows.push(headers.join(","));

        log.forEach(packet => {

            const row = headers.map(header => {

                let value = packet[header];

                if (value === null || value === undefined) {
                    value = "";
                }

                value = String(value);

                if (
                    value.includes(",") ||
                    value.includes('"') ||
                    value.includes("\n")
                ) {
                    value = `"${value.replace(/"/g, '""')}"`;
                }

                return value;

            });

            csvRows.push(row.join(","));

        });

        const csvContent =
            csvRows.join("\n");

        const blob =
            new Blob(
                [csvContent],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `cansat_telemetry_${Date.now()}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        logMessage(
            "TELEMETRY CSV EXPORTED SUCCESSFULLY",
            "success"
        );

    });

}

/// ========================================
// CLEAR TELEMETRY DATA
// ========================================

const clearDataButton =
    document.getElementById("clear-data-btn");

if (clearDataButton) {

    clearDataButton.addEventListener("click", () => {

        const confirmClear =
            confirm(
                "Are you sure you want to clear all telemetry data?"
            );

        if (!confirmClear) {
            return;
        }

        // Stop new telemetry packets
        if (typeof stopTelemetry === "function") {
            stopTelemetry();
        }

        // Clear telemetry log
        window.telemetryLog = [];

        // Clear charts
        if (typeof resetCharts === "function") {
            resetCharts();
        }

        logMessage(
            "TELEMETRY DATA CLEARED",
            "warning"
        );

    });

}
// ========================================
// EXPORT GRAPH
// ========================================

const exportGraphButton =
    document.getElementById("export-graph-btn");

if (exportGraphButton) {

    exportGraphButton.addEventListener("click", () => {

        if (!altitudeChart) {

            logMessage(
                "GRAPH EXPORT FAILED: CHART NOT READY",
                "warning"
            );

            return;

        }

        const charts = [

            {
                chart: altitudeChart,
                name: "altitude"
            },

            {
                chart: temperatureChart,
                name: "temperature"
            },

            {
                chart: pressureChart,
                name: "pressure"
            },

            {
                chart: descentRateChart,
                name: "descent-rate"
            },

            {
                chart: voltageChart,
                name: "battery-voltage"
            }

        ];

        charts.forEach(item => {

            const link =
                document.createElement("a");

            link.href =
                item.chart.toBase64Image();

            link.download =
                `cansat-${item.name}-graph.png`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        });

        logMessage(
            "ALL TELEMETRY GRAPHS EXPORTED SUCCESSFULLY",
            "success"
        );

    });

}