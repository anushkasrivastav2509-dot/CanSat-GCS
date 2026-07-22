// =========================
// Three.js CanSat 3D Viewer
// =========================

const container = document.getElementById("three-container");

// =========================
// Scene
// =========================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);

// =========================
// Camera
// =========================

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 5;

// =========================
// Renderer
// =========================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);

// =========================
// Lighting
// =========================

const ambient = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(5, 5, 5);

scene.add(directionalLight);

// =========================
// CanSat Group
// =========================

const cansat = new THREE.Group();

scene.add(cansat);

// =========================
// Main CanSat Body
// =========================

const bodyGeometry = new THREE.CylinderGeometry(
    0.8,
    0.8,
    2.2,
    32
);

const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x00bcd4,
    metalness: 0.5,
    roughness: 0.4
});

const body = new THREE.Mesh(
    bodyGeometry,
    bodyMaterial
);

cansat.add(body);
// =========================
// Front Direction Marker
// =========================

const markerGeometry = new THREE.BoxGeometry(
    0.25,
    0.25,
    0.25
);

const markerMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000
});

const marker = new THREE.Mesh(
    markerGeometry,
    markerMaterial
);

marker.position.z = 0.8;

cansat.add(marker);
// =========================
// Top and Bottom Caps
// =========================

const capGeometry = new THREE.CylinderGeometry(
    0.82,
    0.82,
    0.15,
    32
);

const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    metalness: 0.7,
    roughness: 0.3
});

const topCap = new THREE.Mesh(
    capGeometry,
    capMaterial
);

topCap.position.y = 1.15;

cansat.add(topCap);

const bottomCap = new THREE.Mesh(
    capGeometry,
    capMaterial
);

bottomCap.position.y = -1.15;

cansat.add(bottomCap);

// =========================
// Antenna
// =========================

const antennaGeometry = new THREE.CylinderGeometry(
    0.04,
    0.04,
    1.2,
    16
);

const antennaMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3333
});

const antenna = new THREE.Mesh(
    antennaGeometry,
    antennaMaterial
);

antenna.position.y = 1.8;

cansat.add(antenna);

// =========================
// Antenna Tip
// =========================

const tipGeometry = new THREE.SphereGeometry(
    0.1,
    16,
    16
);

const tip = new THREE.Mesh(
    tipGeometry,
    antennaMaterial
);

tip.position.y = 2.4;

cansat.add(tip);

// =========================
// Update CanSat Orientation
// =========================

function updateCanSatOrientation() {

    cansat.rotation.x =
        THREE.MathUtils.degToRad(telemetry.pitch);

    cansat.rotation.y =
        THREE.MathUtils.degToRad(telemetry.yaw);

    cansat.rotation.z =
        THREE.MathUtils.degToRad(telemetry.roll);

}

// =========================
// Animation Loop
// =========================

function animate() {

    requestAnimationFrame(animate);

    updateCanSatOrientation();

    renderer.render(
        scene,
        camera
    );

}

animate();
// =========================
// Responsive 3D Viewer
// =========================

window.addEventListener("resize", () => {

    camera.aspect =
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});