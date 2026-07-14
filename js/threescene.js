// ==============================
// Three.js Scene
// ==============================

// Scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111827);

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    1,
    0.1,
    1000
);

camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(350,350);

document
.getElementById("three-container")
.appendChild(renderer.domElement);

// Cube (temporary CanSat)
const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshStandardMaterial({
    color:0x00ffff
});

const cube = new THREE.Mesh(
    geometry,
    material
);

scene.add(cube);

// Light
const light = new THREE.DirectionalLight(
    0xffffff,
    2
);

light.position.set(5,5,5);

scene.add(light);

// Animation
function animate(){

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;

    cube.rotation.y += 0.01;

    renderer.render(scene,camera);

}

animate();