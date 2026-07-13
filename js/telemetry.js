// =========================================
// TELEMETRY ENGINE
// =========================================

const telemetry = {

    altitude: 0,

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

    status: "CONNECTED"

};
// =========================================
// Generate Simulated Telemetry
// =========================================

function simulateTelemetry(){

    telemetry.altitude += Math.random()*2;

    telemetry.temperature += (Math.random()-0.5)*0.3;

    telemetry.pressure += (Math.random()-0.5);

    telemetry.humidity += (Math.random()-0.5);

    telemetry.voltage -= 0.001;

    telemetry.latitude += 0.00001;

    telemetry.longitude += 0.00002;

    telemetry.yaw = (telemetry.yaw+5)%360;

    telemetry.pitch = 20*Math.sin(Date.now()/1000);

    telemetry.roll = 25*Math.cos(Date.now()/1000);

}
function startTelemetry(){
setInterval(() => {

    simulateTelemetry();

    updateTelemetryDisplay();
    updateCharts();

    logMessage(
        `Altitude: ${telemetry.altitude.toFixed(1)} m | Battery: ${telemetry.voltage.toFixed(2)} V`
    );

},1000);

}