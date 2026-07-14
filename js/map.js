// =============================
// Initialize Map
// =============================

const map = L.map("map").setView([26.8467, 80.9462], 15);

// OpenStreetMap Tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// CanSat Marker
const canSatMarker = L.marker([26.8467, 80.9462]).addTo(map);

canSatMarker.bindPopup("🚀 CanSat");

// Flight Path
const flightPath = L.polyline([], {
    color: "red",
    weight: 4,
    opacity: 0.8
}).addTo(map);

function updateMap(latitude, longitude) {

    const position = [latitude, longitude];

    canSatMarker.setLatLng(position);

    flightPath.addLatLng(position);

    map.panTo(position);

}