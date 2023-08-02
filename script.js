import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131.2/build/three.module.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create moon mesh
const moonTexture = new THREE.TextureLoader().load('nasa-sourced.jpg'); // Replace with the actual path
const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);

// Set up mesh wraparound effect
const wrapAround = new THREE.MeshBasicMaterial({
  map: moonTexture,
  side: THREE.BackSide // Renders the material on the back side of the moon
});
const wrapAroundMesh = new THREE.Mesh(moonGeometry, wrapAround);
scene.add(wrapAroundMesh);

// Set camera position
camera.position.z = 15;

// Animate moon
const animate = () => {
  requestAnimationFrame(animate);

  moonMesh.rotation.y += 0.005; // Rotate the front-side moon mesh

  renderer.render(scene, camera);
};

animate();
