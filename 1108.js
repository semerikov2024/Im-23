import * as THREE from "three";
import * as MINDAR from "mindar";


document.addEventListener("DOMContentLoaded", () => {

	const start = async() => {
		const mindarThree = new MINDAR.MindARThree({
			container: document.body,
			imageTargetSrc: "assets/kvadeface.mind",
			uiLoading: "no", uiScanning: "no", uiError: "no",
			maxTrack: 2
		      });

		const {renderer, scene, camera} = mindarThree;

		const anchor_kvade = mindarThree.addAnchor(0);
		const anchor_face = mindarThree.addAnchor(1);

		const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
		const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
		const cube = new THREE.Mesh( geometry, material );
		cube.position.set(-1, 0, 0);

		anchor_kvade.group.add(cube);

		//camera.position.z = 5;
		//camera.rotation.y = 23*Math.PI/180;


		//1) скористаємось конструктором класу CylinderGeometry:
		const pyramidgeometry=new THREE.CylinderGeometry(0, 0.8, 2, 4);
		//2) визначимо матеріал, що відбиває промені:
		const pyramidmaterial=new THREE.MeshLambertMaterial({color: 0xF3FFE2, transparent: true, opacity: 1});
		//3) комбінуємо геометрію та матеріал:
		const pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);

		pyramidmesh.position.set(0, 1, 0);
		//Останній крок – розміщення об’єкту на сцені:
		anchor_kvade.group.add(pyramidmesh);

		var lightOne=new THREE.AmbientLight(0x00ffff, 0.5);
		scene.add(lightOne);

		var lightTwo=new THREE.PointLight(0xffff, 0.5);
		scene.add(lightTwo);

		lightTwo.position.set(-0.7, 1, 0);


		var spheregeometry=new THREE.SphereGeometry(0.5);
		var spherematerial=new THREE.MeshBasicMaterial({wireframe: true, color: 0x0000000});
		var spheremesh=new THREE.Mesh(spheregeometry, spherematerial);
		spheremesh.position.set(0.9, 0, 0);
		anchor_face.group.add(spheremesh);


		var circlegeometry=new THREE.CircleGeometry(0.5);
		var circlematerial=new THREE.MeshBasicMaterial({color: 0x0000000});
		var circlemesh=new THREE.Mesh(circlegeometry, circlematerial);
		circlemesh.position.set(2, 0, 0);
		circlemesh.rotation.set(0, 0.5, 0);
		anchor_face.group.add(circlemesh);

		var planegeometry=new THREE.PlaneGeometry(10, 10);
		var planematerial=new THREE.MeshBasicMaterial({transparent: true, opacity: 0.75});
		var planemesh=new THREE.Mesh(planegeometry, planematerial);
		planemesh.position.set(0, -2, -15);
		anchor_face.group.add(planemesh);

		//console.log(planemesh);

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			cube.rotation.x += Math.PI/180;
			cube.rotation.y += 1.5*Math.PI/180;
		//	lightTwo.position.z +=0.001;
	  		renderer.render(scene, camera);
		});

	}

	start();
});

/*


function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
*/
