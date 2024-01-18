import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import { IComponentConfig } from './IComponentConfig';

export class Game {

    private container : HTMLElement;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private width = screen.width;
    private height = screen.height;
    private spaceCraft: any;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);
    }

    public async load(spaceCraftModel: IComponentConfig[]) : Promise<void> {
        /* ********* Initial Setup ***********  */
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(THREE.Color.NAMES.darkblue, 1);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.set(5, 2, 30);
        this.scene.add(this.camera);
    
        // /* ********* Objects ***********  */
        const loader = new GLTFLoader();
        for (let i = 0; i < spaceCraftModel.length; i++) {
            let gltf = await loader.loadAsync(spaceCraftModel[0].path);
            this.spaceCraft = gltf.scene;
            this.spaceCraft.position.set(0, 0, 0);
            this.scene.add(this.spaceCraft);
            console.log(this.spaceCraft);
        }
    
        /* ********* Object Axes *********** */
        const axesHelper = new THREE.AxesHelper(15);
        this.scene.add(axesHelper);
        /* ***************************** */
        
        /* ************ Light ************** */
        const light = new THREE.DirectionalLight('white', 5);
        light.position.set(10, 10, 10);
        this.scene.add(light);
        /* ***************************** */
    }

    private update() {
        this.spaceCraft.rotation.y += 0.01;
    }

    public start() :void {
        const render = () => {
            this.renderer.render(this.scene, this.camera);
            this.update();
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    } 
}