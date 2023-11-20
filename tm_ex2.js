import * as THREE from "three";
import * as MINDAR from "mindar";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"


const loadVideo = (path) => {
	return new Promise((resolve, reject) => {
		const video = document.createElement("video");
			video.addEventListener("loadeddata", () => {
				video.setAttribute("playsinline", "");
				resolve(video);
			});
			video.src = path;
	});
}

document.addEventListener("DOMContentLoaded", () => {

	const start = async() => {
		const mindarThree = new MINDAR.MindARThree({
			container: document.body,
			imageTargetSrc: "assets/students.mind",
			uiLoading: "no", uiScanning: "no", uiError: "no",
			maxTrack: 2
		      });

		const model = await tmImage.load("assets/model_gsp/model.json", "assets/model_gsp/metadata.json");
		let text = document.getElementById("text");		

		const {renderer, scene, camera} = mindarThree;

		const anchor_s1 = mindarThree.addAnchor(0);

		//const video = await loadVideo("assets/kahovka.mp4");
	        const video = document.getElementById("myvideo");
		var texture = new THREE.VideoTexture(video);

		video.setAttribute("loop", "");
		video.setAttribute("muted", "");

		//const texture = loader.load('assets/student1.png' ); 

		/*
			width1 - 720
			height1 - 1280
			width2 - 1
			height - ?
		*/

		var planegeometry=new THREE.PlaneGeometry(1, 1280/720.0);
		var planematerial=new THREE.MeshBasicMaterial( { map:texture } );
		var planemesh=new THREE.Mesh(planegeometry, planematerial);

		anchor_s1.group.add(planemesh);

		anchor_s1.onTargetFound = () => {
			video.play();
		}

		anchor_s1.onTargetLost = () => {
			video.pause();
		}

		video.addEventListener("play", () => {
			video.currentTime = 0;
		});

		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);

		const anchor_s2 = mindarThree.addAnchor(1);

		const loader = new GLTFLoader();

		var mixer = false, model1  = false, model2  = false, model3  = false;

		loader.load("assets/notebook_microsoft_surface_laptop_3.glb",
			(model) => { 
				console.log("Успішна завантажена модель 1", model); 
				model.scene.scale.set(0.1, 0.1, 0.1);
				model.scene.position.set(-1, 0, 0);
				model1 = model;
				anchor_s2.group.add(model.scene);
			},		
			(xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + "% моделі 1 завантажено"); },		
			(error) => { console.log("Помилка завантаження моделі 1"); },		
		);

		loader.load("assets/notebook.glb",
			(model) => { 
				console.log("Успішна завантажена модель 2", model); 
				model.scene.scale.set(0.1, 0.1, 0.1);
				model.scene.position.set(+1, 0, 0);
				model2 = model;
				anchor_s2.group.add(model.scene);
			},		
			(xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + "% моделі 2 завантажено"); },		
			(error) => { console.log("Помилка завантаження моделі 2"); },		
		);

		loader.load("https://raw.githubusercontent.com/aframevr/assets/master/test-models/models/glTF-2.0/brainstem/BrainStem.gltf",
			(model) => { 
				console.log("Успішна завантажена модель 3", model); 
				model.scene.scale.set(0.5, 0.5, 0.5);
				model.scene.position.set(0, -0.2, 0);
				model3 = model;
				mixer = new THREE.AnimationMixer(model.scene);
				if(model.animations.length != 0) {
					for(var i=0; i< model.animations.length; i++)
						mixer.clipAction(model.animations[i]).play();
				}
				anchor_s2.group.add(model.scene);
			},		
			(xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + "% моделі 3 завантажено"); },		
			(error) => { console.log("Помилка завантаження моделі 3"); },		
		);

		//console.log("Обидві моделі завантажені");

		const clock = new THREE.Clock();

		await mindarThree.start();

		let skip = 1;

		renderer.setAnimationLoop(async() => {
			skip++;
			if(skip%10==0)
			{
				// predict can take in an image, video or canvas html element
				const prediction = await model.predict(mindarThree.video);
				let str="";
				let maxp = prediction[0].probability;
				let who = prediction[0].className;
				for (let i = 0; i < prediction.length; i++) 
				{
				    	str += prediction[i].className + ": " + prediction[i].probability.toFixed(2)*100 + "%<br>";
					if(prediction[i].probability > maxp)
					{
						maxp = prediction[i].probability;
						who = prediction[i].className
					}	
				}
				text.innerHTML = str + "<br>Визначено " + who + " з ймовірністю "+maxp ;
				console.log(str);
			}

			const delta = clock.getDelta();
			const totaltime = clock.getElapsedTime();
			if(mixer)
				mixer.update(delta);
			if(model1)
				model1.scene.rotation.y += delta;
			if(model2)
				model2.scene.scale.set(0.1*Math.sin(totaltime/10), 0.1*Math.sin(totaltime/10), 0.1*Math.sin(totaltime/10));
	  		renderer.render(scene, camera);
		});

	}

	start();
});

