import Stats from "three/addons/libs/stats.module.js";
import * as dat from "three/addons/libs/lil-gui.module.min.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Your existing code for Three.js functionalities
// ...

// Model loading and rendering code
const container = document.getElementById('model-container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x99999999); 
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('../../images/');
loader.load('scene.glb', (gltf) => {
  const mesh = gltf.scene;
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  mesh.position.set(0, 3.3, -1);
  mesh.scale.set(0.125, 0.125, 0.125);
  scene.add(mesh);

  mesh.material.color.set(0xff0000); // Change mesh color to red
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();



















