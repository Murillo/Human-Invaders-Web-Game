import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var container, camera, controls, meshSpaceCraft, enemies;
var spinLeft, spinRight;
var group, scene, renderer;
var width = screen.width;
var height = screen.height;

init();
//render();

function init() {
	spinLeft = false;
	spinRight = false;
	enemies = [];
	container = document.getElementById('container');
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	renderer.setClearColor(THREE.Color.NAMES.azure, 1);
	renderer.shadowMapEnabled = true;
	container.appendChild(renderer.domElement);

	/* ********* Camera ***********  */
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
	camera.position.set(10, 5, 25);

	scene = new THREE.Scene();
	scene.add(camera);

	// /* ********* Objects ***********  */
	// var spaceCraft = new THREE.JSONLoader();
	// spaceCraft.load("./library/elements/SpaceCraft.json", function (geometry, materials) {
	// 	meshSpaceCraft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	// 	meshSpaceCraft.castShadow = true;
	// 	meshSpaceCraft.position.set(0, 0, 0);
	// 	scene.add(meshSpaceCraft);
	// });
	
	// /* ********* Objects Enemies ********* */
	// createEnemy(new THREE.Vector3(-10, 0, -25));
	// /* ***************************** */

	// /* ********* Objects *********** */
	// var axes = new THREE.AxisHelper(10);
	// scene.add(axes);
	// /* ***************************** */
	
	// /* ********* Particles *********** */
    // var particleCount = 3000;
    // var particles = new THREE.Geometry();
    // var material = new THREE.ParticleBasicMaterial({ 
    //     color: 0xFFFFFF, 
    //     size: 3,
    //     map: THREE.ImageUtils.loadTexture("./library/images/particle.png"),
    //     blending: THREE.AdditiveBlending,
    //     transparent: true 
    // });
    
    // for (var p = 0; p < particleCount; p++) {
    //     var pX = Math.random() * 500 - 250,
    //         pY = Math.random() * 500 - 250,
    //         pZ = Math.random() * 500 - 250,
    //         particle = new THREE.Vertex(
    //             new THREE.Vector3(pX, pY, pZ)
    //         );
    //     particles.vertices.push(particle);
    // }
    // var particleSystem = new THREE.ParticleSystem(particles, material);
    // particleSystem.sortParticles = true;
    // scene.add(particleSystem);
	

	// /* ************* Spot Light *********  */
	// var spotLight = new THREE.SpotLight(0xffffff);
	// spotLight.position.set(-50, 0, 200);
	// spotLight.castShadow = true;
	// scene.add(spotLight)
	// /* ***************************** */

	// /* ********* OrbitControls ***********  */
	// controls = new OrbitControls(camera, renderer.domElement);
	/* **************** Event that moves the spaceCraft ************ */
    //document.addEventListener("keydown", getKey);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	controls.update();
	
	if (enemies.length > 0){
		for	(var i = 0; i < enemies.length; i++){
			enemies[i].position.z += 0.05;
			if (enemies[i].position.z >= 10){
				enemies[i].position = new THREE.Vector3(enemies[i].position.x, enemies[i].position.y, -15);
				if (enemies.length < 6){
					createEnemy(new THREE.Vector3(
						Math.floor((Math.random() * 30) + 1), 
						Math.floor((Math.random() * 30) + 1), 
						Math.floor((Math.random() * 50) + 1) * -1));
				}
			}
		}
	}
	
	if (spinLeft) 	{
		if (meshSpaceCraft.rotation.z >= 6) {
			meshSpaceCraft.rotation.z = 0
			spinLeft = false;	
		}
		else{
			meshSpaceCraft.rotation.z += 0.05;
			meshSpaceCraft.position.x -= 0.1;
		}
	}
	
	if (spinRight) 	{
		if (meshSpaceCraft.rotation.z <= -6) {
			meshSpaceCraft.rotation.z = 0
			spinRight = false;	
		}
		else{
			meshSpaceCraft.rotation.z -= 0.05;
			meshSpaceCraft.position.x += 0.1;
		}	
	}
}

function createEnemy(position){
	var loaderSpace1 = new THREE.JSONLoader();
	loaderSpace1.load("./library/elements/space.json", function (geometry, materials) {
		var meshNasa = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		meshNasa.castShadow = true;
		meshNasa.position = position;
		enemies.push(meshNasa);
		scene.add(meshNasa);
	});	
} 

function getKey(event) {

    //  Left Arrow
    if (event.keyCode == 65) {
        meshSpaceCraft.position.x -= 0.2;

    // Up arrow 
    } else if (event.keyCode == 87) {
        meshSpaceCraft.position.y += 0.2;

    // Right Arrow 
    } else if (event.keyCode == 68) {
        meshSpaceCraft.position.x += 0.2;

    // Down Arrow
    } else if (event.keyCode == 83) {
        meshSpaceCraft.position.y -= 0.2;
    	
	// Letter Q
    } else if (event.keyCode == 81) {
        spinLeft = true;
	
	// Letter E
    } else if (event.keyCode == 69) {
        spinRight = true;
	} 
}

