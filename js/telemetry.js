// =========================================
// TELEMETRY ENGINE
// =========================================

const telemetry = {

    altitude: 0,
    previousAltitude: 0,

    temperature: 25,
    pressure: 1013,
    humidity: 45,
    voltage: 5.00,

    latitude: 26.449923,
    longitude: 80.331873,
    satellites: 8,

    yaw: 0,
    pitch: 0,
    roll: 0,

    descentRate: 0,

    payloadSeparated: true,
    emergencyParachute: false,
    redundantActivated: false,

    status: "CONNECTED"

};

// =========================================
// TELEMETRY LOG STORAGE
// =========================================

window.telemetryLog = [];


// =========================================
// SIMULATE TELEMETRY
// =========================================

function simulateTelemetry() {

    telemetry.previousAltitude = telemetry.altitude;

    telemetry.altitude += Math.random() * 2;

    telemetry.descentRate =
        Math.abs(telemetry.altitude - telemetry.previousAltitude);

    telemetry.temperature +=
        (Math.random() - 0.5) * 0.3;

    telemetry.pressure +=
        (Math.random() - 0.5);

    telemetry.humidity +=
        (Math.random() - 0.5);

    telemetry.voltage -= 0.001;

    telemetry.latitude += 0.0005;

    telemetry.longitude += 0.0005;

    telemetry.yaw =
        (telemetry.yaw + 5) % 360;

    telemetry.pitch =
        20 * Math.sin(Date.now() / 1000);

    telemetry.roll =
        25 * Math.cos(Date.now() / 1000);

    // Store telemetry packet
    telemetryLog.push({

        timestamp: new Date().toISOString(),

        altitude: telemetry.altitude,
        temperature: telemetry.temperature,
        pressure: telemetry.pressure,
        humidity: telemetry.humidity,
        voltage: telemetry.voltage,

        descentRate: telemetry.descentRate,

        latitude: telemetry.latitude,
        longitude: telemetry.longitude,
        satellites: telemetry.satellites,

        yaw: telemetry.yaw,
        pitch: telemetry.pitch,
        roll: telemetry.roll

    });

    updateErrorCode();

}


// =========================================
// TELEMETRY LOOP
// =========================================

let telemetryInterval = null;

function startTelemetry() {

    if (telemetryInterval !== null) {
        return;
    }

    telemetryInterval = setInterval(() => {

        simulateTelemetry();

        updateTelemetryDisplay();

        updateCharts();

        logMessage(
            `Altitude: ${telemetry.altitude.toFixed(1)} m | ` +
            `Battery: ${telemetry.voltage.toFixed(2)} V`
        );

    }, 1000);

    logMessage("TELEMETRY STREAM STARTED");

}


function stopTelemetry() {

    if (telemetryInterval !== null) {

        clearInterval(telemetryInterval);

        telemetryInterval = null;

        logMessage("TELEMETRY STREAM STOPPED");

    }

}


// =========================================
// ERROR CODE SYSTEM
// =========================================

function updateErrorCode() {

    let descentError = 0;
    let gpsError = 0;
    let separationError = 0;
    let parachuteError = 0;

    // 1st digit: Descent Rate
    if (
        telemetry.descentRate < 1 ||
        telemetry.descentRate > 10
    ) {
        descentError = 1;
    }

    // 2nd digit: GPS
    if (telemetry.satellites <= 0) {
        gpsError = 1;
    }

    // 3rd digit: Payload Separation
    if (!telemetry.payloadSeparated) {
        separationError = 1;
    }

    // 4th digit: Emergency Parachute
    if (telemetry.emergencyParachute) {
        parachuteError = 1;
    }

    const errorCode =
        `${descentError}${gpsError}${separationError}${parachuteError}`;

    const errorElement =
        document.getElementById("error-code");

    if (errorElement) {

        errorElement.textContent =
            errorCode;

        if (errorCode === "0000") {

            errorElement.className =
                "error-code normal";

        } else {

            errorElement.className =
                "error-code fault";

        }

    }

}