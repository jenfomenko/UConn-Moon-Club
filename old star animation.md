

// Load the transparent PNG image as the particle texture
const particleTexture = new THREE.TextureLoader().load('./star.png'); // Replace with the actual path

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
  console.log('Touch interaction detected');
});

document.addEventListener('click', () => {
  interactionDetected = true;
  stars.visible = true;
  console.log('Touch interaction detected');
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
