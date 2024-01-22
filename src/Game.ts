import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpaceCraftComponet } from './components/models/SpaceCraftComponent';
import { ModelComponentBase } from './components/models/ModelComponentBase';
import { SpaceShuttleComponent } from './components/models/SpaceShuttleComponent';

export class Game {

    private container : HTMLElement;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private width = screen.width;
    private height = screen.height;

    private components: ModelComponentBase[] = [];

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);

        const spaceCraftModel = new SpaceCraftComponet();
        this.components.push(spaceCraftModel);

        const spaceShuttle = new SpaceShuttleComponent();
        this.components.push(spaceShuttle);
    }

    public async load() : Promise<void> {
        /* ********* Initial Setup ***********  */
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(THREE.Color.NAMES.darkblue, 1);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.set(5, 2, 30);
        this.scene.add(this.camera);
    
        /* ********* Models ***********  */
        for (let i = 0; i < this.components.length; i++) {
            await this.components[i].load(this.scene);
        }
        /* ***************************** */
    
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
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update();
        }
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