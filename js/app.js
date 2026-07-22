// ========================================
// MISSION TIMER
// ========================================

let missionSeconds = 0;
let missionTimerInterval = null;

function updateMissionTimer() {

    missionSeconds++;

    const hours = Math.floor(missionSeconds / 3600);
    const minutes = Math.floor((missionSeconds % 3600) / 60);
    const seconds = missionSeconds % 60;

    const formattedTime =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    const timerElement = document.getElementById("mission-time");

    if (timerElement) {
        timerElement.textContent = formattedTime;
    }
}


function startMissionTimer() {

    if (!missionTimerInterval) {

        missionTimerInterval =
            setInterval(updateMissionTimer, 1000);

        logMessage("MISSION TIMER STARTED");
    }
}


function stopMissionTimer() {

    if (missionTimerInterval) {

        clearInterval(missionTimerInterval);

        missionTimerInterval = null;

        logMessage("MISSION TIMER STOPPED");
    }
}
// ======================================
// Connection Status
// ======================================

const connectionStatus =
    document.getElementById("connection-status");

setTimeout(() => {

    connectionStatus.textContent = "🟡 Connecting...";
    connectionStatus.className = "status connecting";

}, 2000);

setTimeout(() => {

    connectionStatus.textContent = "🟢 Connected";
    connectionStatus.className = "status connected";

}, 5000);

// ======================================
// Mission Console
// ======================================

const consoleOutput =
    document.getElementById("console-output");

function logMessage(message, type = "info") {
    const log = document.createElement("div");

    log.className = `log ${type}`;

    const time = new Date().toLocaleTimeString();

    log.textContent = `[${time}] ${message}`;

    consoleOutput.appendChild(log);

    consoleOutput.scrollTop =
        consoleOutput.scrollHeight;

}

logMessage("Ground Control Station Started");
logMessage("Telemetry Engine Ready");

setTimeout(() => {

    logMessage("Waiting for Connection...");

}, 1000);

setTimeout(() => {

    logMessage("Telemetry Link Established", "success");

}, 5000);

// ======================================
// Dashboard Update
// ======================================

function updateTelemetryDisplay() {

    document.getElementById("altitude-value").textContent =
        telemetry.altitude.toFixed(1) + " m";

    document.getElementById("temperature-value").textContent =
        telemetry.temperature.toFixed(1) + " °C";

    document.getElementById("pressure-value").textContent =
        telemetry.pressure.toFixed(0) + " hPa";

    document.getElementById("humidity-value").textContent =
        telemetry.humidity.toFixed(0) + " %";

    document.getElementById("voltage-value").textContent =
        telemetry.voltage.toFixed(2) + " V";

    document.getElementById("gps-value").textContent =
        telemetry.latitude.toFixed(5) +
        ", " +
        telemetry.longitude.toFixed(5);

    document.getElementById("yaw").textContent =
        telemetry.yaw.toFixed(0) + "°";

    document.getElementById("pitch").textContent =
        telemetry.pitch.toFixed(0) + "°";

    document.getElementById("roll").textContent =
        telemetry.roll.toFixed(0) + "°";

    document.getElementById("latitude").textContent =
        telemetry.latitude.toFixed(6);

    document.getElementById("longitude").textContent =
        telemetry.longitude.toFixed(6);

    document.getElementById("satellites").textContent =
        telemetry.satellites;
        updateMap(
    telemetry.latitude,
    telemetry.longitude
);

}