import * as THREE from "three";
//import * as THREE from "./three/three101.module.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xCBEFFF);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

cube.position.set(-5, 0, -6);

scene.add(cube);

camera.position.z = 5;
//camera.rotation.y = 23*Math.PI/180;


//1) скористаємось конструктором класу CylinderGeometry:
const pyramidgeometry=new THREE.CylinderGeometry(0, 0.8, 2, 4);
//2) визначимо матеріал, що відбиває промені:
const pyramidmaterial=new THREE.MeshLambertMaterial({color: 0xF3FFE2, transparent: true, opacity: 1});
//3) комбінуємо геометрію та матеріал:
const pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);

pyramidmesh.position.set(0, 2, -10);
//Останній крок – розміщення об’єкту на сцені:
scene.add(pyramidmesh);

var lightOne=new THREE.AmbientLight(0x00ffff, 0.5);
scene.add(lightOne);

var lightTwo=new THREE.PointLight(0xffff, 0.5);
scene.add(lightTwo);

lightTwo.position.set(-0.7, 2, -9.5);


var spheregeometry=new THREE.SphereGeometry(0.5);
var spherematerial=new THREE.MeshBasicMaterial({wireframe: true, color: 0x0000000});
var spheremesh=new THREE.Mesh(spheregeometry, spherematerial);
spheremesh.position.set(0.9, 0, -6);
scene.add(spheremesh);


var circlegeometry=new THREE.CircleGeometry(0.5);
var circlematerial=new THREE.MeshBasicMaterial({color: 0x0000000});
var circlemesh=new THREE.Mesh(circlegeometry, circlematerial);
circlemesh.position.set(2, 0, -6);
circlemesh.rotation.set(0, 0.5, 0);
scene.add(circlemesh);

var planegeometry=new THREE.PlaneGeometry(10, 10);
var planematerial=new THREE.MeshBasicMaterial({transparent: true, opacity: 0.75});
var planemesh=new THREE.Mesh(planegeometry, planematerial);
planemesh.position.set(0, -2, -15);
scene.add(planemesh);

console.log(planemesh);

function animate() {
	cube.rotation.x += Math.PI/180;
	cube.rotation.y += 1.5*Math.PI/180;
//	lightTwo.position.z +=0.001;

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();

