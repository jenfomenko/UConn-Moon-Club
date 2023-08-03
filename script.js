import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131.2/build/three.module.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('moon-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Load the moon texture
const moonTexture = new THREE.TextureLoader().load('nasa-sourced.jpg');
const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);

// Animate moon
const animateMoon = () => {
  moonMesh.rotation.y += 0.005;
};

// Camera position
camera.position.z = 15;

// Animate the scene
const animate = () => {
  requestAnimationFrame(animate);

  animateMoon(); // Call the moon rotation animation

  renderer.render(scene, camera);
};

animate();
