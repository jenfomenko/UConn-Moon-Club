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
const animateMoon = () => {
  moonMesh.rotation.y += 0.005; // Rotate the front-side moon mesh
};

// Load the transparent PNG image as the particle texture
const particleTexture = new THREE.TextureLoader().load('star.png'); // Replace with the actual path

// Create particle system for stars
const starsGeometry = new THREE.BufferGeometry();
const starsVertices = [];
for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  starsVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

const starsMaterial = new THREE.PointsMaterial({
  size: 0.1, // Adjust the size of the stars
  map: particleTexture, // Use the transparent PNG image as the particle texture
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  depthWrite: false
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
stars.visible = false;
scene.add(stars);

// Detect touch or click interaction
let interactionDetected = false;

document.addEventListener('touchstart', () => {
  interactionDetected = true;
  stars.visible = true;
});

document.addEventListener('click', () => {
  interactionDetected = true;
  stars.visible = true;
});

// Animate the scene
const animate = () => {
  requestAnimationFrame(animate);

  if (interactionDetected) {
    stars.rotation.y += 0.01; // Rotate stars
  }

  animateMoon(); // Call the moon rotation animation
  renderer.render(scene, camera);
};

animate();
