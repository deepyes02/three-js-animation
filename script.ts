import * as THREE from 'three';


class ThreeJsInit{


	// first we will define a few static variables, that are beyond constant
	static debug : HTMLElement | null = document.querySelector('#debug');
	static animatorDiv : HTMLDivElement | null = document.body.querySelector("#animatorDiv");

	public constructor () {
		window.alert('yo man what\'s up ?');
	}

	

}
new ThreeJsInit();




// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });

// Set renderer size and append to document
renderer.setSize(window.innerWidth, window.innerHeight);
ThreeJsInit.animatorDiv?.appendChild(renderer.domElement);

// Create a simple cube geometry and material
const segments = 64;
const geometry = new THREE.SphereGeometry(1, segments, segments);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./earth-nasa.jpg');

const material = new THREE.MeshStandardMaterial({map: texture});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Let's add a circle
(()=>{
	const circleGeometry = new THREE.CircleGeometry(20, 64);
	const circleMaterial = new THREE.MeshBasicMaterial({color: 'red'});
	const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
	scene.add(circleMesh)
})();


const light = new THREE.PointLight(0xffffff, 1);
light.position.set(100,100,0);

// Add an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(ambientLight);

// Set the camera position
camera.position.z = 150;

// Animation parameters
let scrollY = 0;
let maxScale = 200;
let scrollMax = window.innerHeight * 1 // Adjust as needed for your scroll height

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const progress = Math.min(scrollY / scrollMax, 1);
  const scale = progress * (maxScale+2)
  sphere.scale.set(scale, scale, scale)
	sphere.rotation.set(0, scale * 2, 0);
  if (debug) debug.innerHTML = `scrollY => ${scrollY}, progress => ${(progress * 100)}, scale => ${scale}`;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
