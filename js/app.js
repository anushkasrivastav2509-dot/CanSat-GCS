// ===============================
// Mission Timer
// ===============================

let seconds = 0;

function updateMissionTimer() {

    seconds++;

    let hrs = Math.floor(seconds / 3600);

    let mins = Math.floor((seconds % 3600) / 60);

    let secs = seconds % 60;

    hrs = String(hrs).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    secs = String(secs).padStart(2, "0");

    document.getElementById("mission-time").textContent =
        `${hrs}:${mins}:${secs}`;
}

// Update every second
setInterval(updateMissionTimer, 1000);
// ===============================
// Connection Status Demo
// ===============================

const connectionStatus = document.getElementById("connection-status");

setTimeout(() => {

    connectionStatus.textContent = "🟡 Connecting...";
    connectionStatus.className = "status connecting";

}, 3000);

setTimeout(() => {

    connectionStatus.textContent = "🟢 Connected";
    connectionStatus.className = "status connected";

}, 6000);
// ===============================
// Mission Console
// ===============================

const consoleOutput = document.getElementById("console-output");

function addLog(message, type = "info") {

    const log = document.createElement("div");

    log.className = `log ${type}`;

    const time = new Date().toLocaleTimeString();

    log.textContent = `[${time}] ${message}`;

    consoleOutput.appendChild(log);

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Demo Logs

addLog("[INFO] Ground Control Station Started");

setTimeout(() => {
    addLog("[INFO] Waiting for Connection...");
}, 1000);

setTimeout(() => {
    addLog("[SUCCESS] Telemetry Link Established", "success");
}, 6000);

setTimeout(() => {
    addLog("[INFO] Mission Timer Running");
}, 7000);
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
}
setInterval(() => {

    telemetry.altitude += Math.random() * 2;

    telemetry.temperature += (Math.random() - 0.5) * 0.3;

    telemetry.pressure += (Math.random() - 0.5);

    telemetry.humidity += (Math.random() - 0.5);

    telemetry.voltage -= 0.001;

    telemetry.yaw = (telemetry.yaw + 5) % 360;

    telemetry.pitch = 15 * Math.sin(Date.now() / 1000);

    telemetry.roll = 20 * Math.cos(Date.now() / 1000);

    telemetry.latitude += 0.00001;

    telemetry.longitude += 0.00002;

    updateTelemetryDisplay();

}, 1000);

updateTelemetryDisplay();