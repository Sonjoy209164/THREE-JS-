import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

//step1
// Create the scene
const scene = new THREE.Scene(); // "Scene" should be capitalized
//step2
// Create the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,//near
    1000//far
);


//step 3
// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threeContainer").appendChild(renderer.domElement);
//document.getElementById("canvasWrapper").appendChild(renderer.domElement);
//document.body.appendChild(renderer.domElement);
//glw material
const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 1.9
});


// Create a red cube
const geometry = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2); // Cube geometry
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red material
const cube = new THREE.Mesh(geometry, glowMaterial);
cube.position.x=3

// Add cube to the scene
scene.add(cube);

//another object
// Create a red cube
const geometry1 = new THREE.BoxGeometry(); // Cube geometry
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red material
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x=2;
cube1.position.y=2;
cube1.position.z=1;

// Add cube to the scene
scene.add(cube1);


const geo=new THREE.BoxGeometry();
const mat = new THREE.MeshBasicMaterial({color :  0xff0000});
const cube2 =new THREE.Mesh(geo,mat);
cube2.position.x=2;


scene.add(cube2);


//0.45, 0.2, 2, 32, 1, true
// Cup outer wall
const outerGeometry = new THREE.CylinderGeometry(0.45, 0.2, 2, 32, 1, true); // open-ended
const outerMaterial = new THREE.MeshBasicMaterial({ color: "#556b2f", side: THREE.DoubleSide });
const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
scene.add(outerMesh);

const outerGeometry1 = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32, 1, true); // open-ended
const outerMaterial1 = new THREE.MeshBasicMaterial({ color:"#ff4500" , side: THREE.DoubleSide });
const outerMesh1 = new THREE.Mesh(outerGeometry1, glowMaterial);
scene.add(outerMesh1);
outerMesh1.position.y=1.1;

const outerGeometry2 = new THREE.CylinderGeometry(0.2, 0.2, 0.58, 32, 1, true); // open-ended
const outerMaterial2 = new THREE.MeshBasicMaterial({ color:"#a9a9a9", side: THREE.DoubleSide });
const outerMesh2 = new THREE.Mesh(outerGeometry2, outerMaterial2);
scene.add(outerMesh2);
outerMesh2.position.y=-1.2;


//adding sun 
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // golden yellow
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(-5, 5, -10);
scene.add(sun);

const sunlight = new THREE.DirectionalLight(0xfff3b3, 1.5);
sunlight.position.set(-5, 5, -10);
scene.add(sunlight);
// // Glowing object (sphere)
// const geometry3 = new THREE.SphereGeometry(1, 32, 32);
// const material3 = new THREE.MeshBasicMaterial({ color: 0xff4500 }); // fiery red
// const sphere = new THREE.Mesh(geometry3, material3);
// scene.add(sphere);


// // Cup bottom
// const bottomGeometry = new THREE.CircleGeometry(1, 32);
// const bottomMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
// const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
// bottom.rotation.x = -Math.PI / 2;
// bottom.position.y = -1;
// scene.add(bottom);

// // Optional: handle
// const handleGeometry = new THREE.TorusGeometry(0.35, 0.1, 16, 100, Math.PI);
// const handleMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
// const handle = new THREE.Mesh(handleGeometry, handleMaterial);
// handle.position.set(-1.0, 0, 0);
// handle.rotation.z = Math.PI / 2;
// scene.add(handle);

const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//glow objects
const glowObjects = [outerMesh1];

let isGlowing = false;
// Button click event
document.getElementById("burnBtn").addEventListener("click", () => {
  isGlowing = !isGlowing;

  glowObjects.forEach(obj => {
    obj.material = isGlowing ? glowMaterial : defaultMaterial;
  });

  // Optional: change button text
  document.getElementById("burnBtn").textContent = isGlowing ? "🔥 Burning..." : "🔥 Burn";
});







// Postprocessing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  2.0,   // strength: increase to make it brighter
  1.0,   // radius: controls spread
  0.4    // threshold: lower this to include more objects
);
composer.addPass(bloomPass);

// Position the camera so we can see the cube
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Optional: rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube1.rotation.x +=0.01;
    cube1.rotation.y +=0.01;

     
    cube2.rotation.x +=0.01;
    cube2.rotation.y +=0.01; 

    composer.render();

    //renderer.render(scene, camera);
}

animate();
