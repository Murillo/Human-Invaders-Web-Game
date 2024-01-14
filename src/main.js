import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
 import SpaceCraftModel from './library/game/SpaceCraft.glb';

let container, camera, controls, meshSpaceCraft, spaceCraft, enemies;
let spinLeft, spinRight;
let group, scene, renderer;
const width = screen.width;
const height = screen.height;

init();
render();

function init() {
	spinLeft = false;
	spinRight = false;
	enemies = [];
	container = document.getElementById('container');
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	renderer.setClearColor(THREE.Color.NAMES.darkblue, 1);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);

	/* ********* Camera ***********  */
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
	camera.position.set(5, 2, 30);

	scene = new THREE.Scene();
	scene.add(camera);

	// /* ********* Objects ***********  */
	const loader = new GLTFLoader();
	loader.load(SpaceCraftModel, (gltf) => {
		spaceCraft = gltf.scene;
		spaceCraft.position.set(0, 0, 0);
		// spaceCraft.rotation.y += -1;
		scene.add(spaceCraft);
	});

	/* ********* Objects *********** */
	const axesHelper = new THREE.AxesHelper(15);
	scene.add(axesHelper);
	/* ***************************** */
	
	const light = new THREE.DirectionalLight('white', 5);
	light.position.set(10, 10, 10);
	scene.add(light);

	/* **************** Event that moves the spaceCraft ************ */
    document.addEventListener("keydown", getKey);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function getKey(event) {

    //  Left Arrow
    if (event.keyCode == 65) {
        spaceCraft.position.x -= 0.45;

    // Up arrow 
    } else if (event.keyCode == 87) {
        spaceCraft.position.y += 0.45;

    // Right Arrow 
    } else if (event.keyCode == 68) {
        spaceCraft.position.x += 0.45;

    // Down Arrow
    } else if (event.keyCode == 83) {
        spaceCraft.position.y -= 0.45;
    } 
}

