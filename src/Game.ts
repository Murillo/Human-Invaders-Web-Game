import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpaceCraftComponent } from './components/models/SpaceCraftComponent';
import { SpaceComponentBase } from './components/models/SpaceComponentBase';
import { SpaceShuttleComponent } from './components/models/SpaceShuttleComponent';
import { StarsComponent } from './components/models/StarsComponent';
import { Random } from './util/Random';

export class Game {

    private container : HTMLElement;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private width = screen.width;
    private height = screen.height;
    private spaceCraft: SpaceCraftComponent;
    private stars: StarsComponent
    private components: SpaceComponentBase[] = [];

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);

        this.spaceCraft = new SpaceCraftComponent();
        this.stars = new StarsComponent();

        const spaceShuttle = new SpaceShuttleComponent(new THREE.Vector3(0, 5, -15));
        this.components.push(spaceShuttle);
    }

    public async load() : Promise<void> {
        /* ********* Initial Setup ***********  */
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor("#191644");
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.set(5, 2, 30);
        this.scene.add(this.camera);
    
        /* ********* Models ***********  */
        const limitsPositionEnemy = [
            new THREE.Vector3(-10, -10, -40),
            new THREE.Vector3(10, 15, -20),
        ];
        await this.spaceCraft.load(this.scene);
        await this.stars.load(this.scene);
        for (let i = 0; i < 5; i++) {
            const position = new THREE.Vector3(
                Random.getNumber(limitsPositionEnemy[0].x, limitsPositionEnemy[1].x),
                Random.getNumber(limitsPositionEnemy[0].y, limitsPositionEnemy[1].y),
                Random.getNumber(limitsPositionEnemy[0].z, limitsPositionEnemy[1].z));
            const spaceShuttle = new SpaceShuttleComponent(position);
            await spaceShuttle.load(this.scene);
            this.components.push(spaceShuttle);
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
        this.spaceCraft.update();
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