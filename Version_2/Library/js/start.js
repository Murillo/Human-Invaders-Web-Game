var container, camera, controls, meshSpaceCraft, enemies;
var group, scene, renderer;
var width = screen.width;
var height = screen.height;

init();
render();

function init() {
	
	enemies = [];
	container = document.getElementById('container');
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	renderer.setClearColorHex(0x06153f, 1);
	renderer.shadowMapEnabled = true;
	container.appendChild(renderer.domElement);

	/* ********* Camera ***********  */
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
	camera.position.set(2, 2, 10);

	scene = new THREE.Scene();
	scene.add(camera);

	/* ********* Objects ***********  */
	var spaceCraft = new THREE.JSONLoader();
	spaceCraft.load("./Library/elements/SpaceCraft.json", function (geometry, materials) {
		meshSpaceCraft = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		meshSpaceCraft.castShadow = true;
		meshSpaceCraft.position.set(0, 0, 0);
		scene.add(meshSpaceCraft);
	});
	
	/* ********* Objects Enemies ********* */
	createEnemy(new THREE.Vector3(0, 0, -15));
	/* *****************************  */

	/* ********* Objects ***********  */
	var axes = new THREE.AxisHelper(10);
	scene.add(axes);
	/* *****************************  */

	/* ************* Spot Light *********  */
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-50, 0, 200);
	spotLight.castShadow = true;
	scene.add(spotLight)
	/* *****************************  */

	/* ********* OrbitControls ***********  */
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	/* **************** Event that moves the spaceCraft ************ */
    document.addEventListener("keydown", getKey);
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
				if (enemies.length < 2){
					createEnemy(new THREE.Vector3(
						Math.floor((Math.random() * 10) + 1), 
						Math.floor((Math.random() * 10) + 1), 
						Math.floor((Math.random() * 15) + 1) * -1));
				}
			}
		}
	}
}

function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){  } 
}

function createEnemy(position)
{
	var loaderSpace1 = new THREE.JSONLoader();
	loaderSpace1.load("./Library/elements/Nasa.json", function (geometry, materials) {
		var meshNasa = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		meshNasa.castShadow = true;
		meshNasa.position = position;
		enemies.push(meshNasa);
		scene.add(meshNasa);
	});	
} 

function getKey(event) {
    //  Left Arrow
    if (event.keyCode == 37) {
        meshSpaceCraft.position.x -= 0.1;

    // Up arrow 
    } else if (event.keyCode == 38) {
        meshSpaceCraft.position.y += 0.1;

    // Right Arrow 
    } else if (event.keyCode == 39) {
        meshSpaceCraft.position.x += 0.1;

    // Down Arrow
    } else if (event.keyCode == 40) {
        meshSpaceCraft.position.y -= 0.1;
    }
}
