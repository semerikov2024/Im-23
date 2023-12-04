import * as THREE from "three";
import {ARButton} from "three/addons/webxr/ARButton.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"


document.addEventListener("DOMContentLoaded", async() => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera();
	const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);

/*
	const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
	const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	const mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, -0.3);
	scene.add(mesh);
*/

	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	scene.add(light);

	renderer.xr.enabled = true;

	new GLTFLoader().load("assets/rocket_orbiting_moon.glb",
		(model) => { 
			console.log("Успішна завантажена модель", model); 
			model.scene.scale.set(0.01, 0.01, 0.01);
			model.scene.position.set(-3, 0, -0.5);
			//model1 = model;
			scene.add(model.scene);
		},		
		(xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + "% моделі завантажено"); },		
		(error) => { console.log("Помилка завантаження моделі"); },		
	);


	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
	});

	const arButton = ARButton.createButton(renderer,
	{
		optionalFeatures: ["dom-overlay"],
		domOverlay: {root: document.body}
	});

	document.body.appendChild(arButton);
});

