var container, camera, controls, meshSpaceCraft, meshNasa;
var group, scene, renderer;
var width = screen.width;
var height = screen.height;

init();
render();

function init() {

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
	
	
	var loaderSpace1 = new THREE.JSONLoader();
	loaderSpace1.load("./Library/elements/Nasa.json", function (geometry, materials) {
		meshNasa = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		meshNasa.castShadow = true;
		meshNasa.position = new THREE.Vector3(0, 0, -10);
		scene.add(meshNasa);
	});
	

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
}

function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){  } 
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
