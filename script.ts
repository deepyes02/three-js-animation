import { Scene, Sphere, Camera, Renderer, PerspectiveCamera, WebGLRenderer, SphereGeometry, TextureLoader, MeshStandardMaterial, Mesh, CircleGeometry, MeshBasicMaterial, PointLight, AmbientLight, PointLightHelper } from 'three';

class ThreeJsInit {
	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
	window: Window = window;
	// first we will define a few static variables, that are beyond constant
	static debug: HTMLElement | null = document.querySelector('#debug');
	static animatorDiv: HTMLDivElement | null = document.body.querySelector("#animatorDiv");

	public constructor() {

		this.scene = new Scene();
		this.camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		this.renderer = new WebGLRenderer({ alpha: true });
		this.initializeThreeJS();
	}
	private initializeThreeJS() {
		if (ThreeJsInit.animatorDiv) {
			// Set renderer size and append to document
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			ThreeJsInit.animatorDiv.appendChild(this.renderer.domElement);
			this.restOfTheCodeWeShouldRefactorLater();
		}
		else {
			console.error("Sorry the animator div is not found")
		}
	}


	private restOfTheCodeWeShouldRefactorLater() {
		// Create a simple cube geometry and material
		// (() => {
			const segments = 12;
			const geometry = new SphereGeometry(20, segments, segments);
			geometry.computeVertexNormals();
			const textureLoader = new TextureLoader();
			let sphere : any;
			const texture = textureLoader.load('./earth-nasa.jpg', (texture) => {
			console.log(texture)
			});
			const material = new MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.2 });
			sphere = new Mesh(geometry, material);
			this.scene.add(sphere);


		(() => {
			const circleGeometry = new CircleGeometry(20, 32);
			const circleMaterial = new MeshBasicMaterial({ color: 'green' });
			const circleMesh = new Mesh(circleGeometry, circleMaterial);
			this.scene.add(circleMesh)
		})();

		// Add Point Light
		(() => {
			// Create a PointLight
			const light = new PointLight(0xff00ff, 100, 2, 2);

			// Set the position of the light
			light.position.set(10, 30, 1000); // Moved away from the origin

			// Optionally, add a light helper to visualize the light position
			const lightHelper = new PointLightHelper(light, 1);
			this.scene.add(lightHelper);

			// Add the light to the scene
			this.scene.add(light);
		})();

		(() => {
			// Add an ambient light
			const ambientLight = new AmbientLight(0xffffff, 3); // Soft white light
			this.scene.add(ambientLight);
		})()

		// Set the camera position
		this.camera.position.z = 250;

		// Animation parameters
		let scrollY = 0;
		let maxScale = 100;
		let scrollMax = window.innerHeight * 1 // Adjust as needed for your scroll height

		const animate = () => {
			requestAnimationFrame(animate)
			this.renderer.render(this.scene, this.camera)

			scrollY = window.scrollY;
			const progress = Math.min(scrollY / scrollMax, 1);
			const scale = progress * (maxScale + 2) / 10
			// sphere.scale.set(scale, scale, scale)
			sphere.rotation.set(0.2, scale, 0.2);
			// this.camera.position.z+= progress;
			if (ThreeJsInit.debug) {
				ThreeJsInit.debug.innerHTML = `scrollY => ${scrollY}, progress => ${(progress * 100)}, scale => ${scale}`
			};



		}
		animate();
	}


}
new ThreeJsInit();