import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SpaceAlienComponent } from './components/models/SpaceAlienComponent';
import { SpaceComponentBase } from './components/models/SpaceComponentBase';
import { SpaceShuttleComponent } from './components/models/SpaceShuttleComponent';
import { StarsComponent } from './components/models/StarsComponent';
import { TextComponent } from './components/models/TextComponent';
import { Random } from './util/Random';
import { ShootComponent } from './components/models/ShootComponent';

export class Game {

    private container : HTMLElement;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private width = window.innerWidth;
    private height = window.innerHeight;
    private spaceCraft: SpaceAlienComponent;
    private stars: StarsComponent
    private components: SpaceComponentBase[] = [];
    private gameOverText: TextComponent;
    private shootComponents: ShootComponent[] = [];
    private limitsPositionEnemy = [
        new THREE.Vector3(-15, -10, -100),
        new THREE.Vector3(15, 15, -50),
    ];

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);

        this.spaceCraft = new SpaceAlienComponent();
        this.stars = new StarsComponent();
        this.gameOverText = new TextComponent('GAME\nOVER', new THREE.Vector3(0, 0, -30));
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
        await this.spaceCraft.load(this.scene);
        await this.stars.load(this.scene);
        await this.gameOverText.load(this.scene);
        for (let i = 0; i < 2; i++) {
            const spaceShuttle = await SpaceShuttleComponent.create(
                this.scene, 
                this.limitsPositionEnemy);
            this.components.push(spaceShuttle);
        }
        /* ***************************** */
    
        /* ********* Object Axes *********** */
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('axes')) {
            const axesHelper = new THREE.AxesHelper(15);
            this.scene.add(axesHelper);
        }
        /* ***************************** */
        
        /* ************ Light ************** */
        const light = new THREE.DirectionalLight('white', 5);
        light.position.set(10, 10, 10);
        this.scene.add(light);
        /* ***************************** */
    }

    private async update() {
        this.stars.update();
        this.gameOverText.update();
        this.spaceCraft.update();

        // Check if the space craft is shooting
        if (this.spaceCraft.isShootTriggered()) {
            const shoot = new ShootComponent(this.spaceCraft.positions.clone());
            await shoot.load(this.scene);
            this.shootComponents.push(shoot);
        }

        this.shootComponents.forEach(item => item.update());
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update();

            // Check if the enemy hit the space craft
            this.spaceCraft.collision(this.components[i].model);
            if (!this.spaceCraft.isAlive) {
                this.gameOverText.enable = true;
            }

            // Check if the shoot hit the enemy
            for (let j = this.shootComponents.length - 1; j > 0; j--) {
                if (this.shootComponents[j].collision(this.components[i].model)) {
                    this.shootComponents[j].dispose();
                    this.shootComponents.splice(j, 1);
                    this.components[i].dispose();
                    this.components.splice(i, 1);
                    this.spaceCraft.addScore(10);

                    const newSpaceShuttle = await SpaceShuttleComponent.create(
                        this.scene, 
                        this.limitsPositionEnemy);
                    this.components.push(newSpaceShuttle);

                    break;
                }
            }
        }
    }

    public start() :void {
        const render = () => {
            this.renderer.render(this.scene, this.camera);
            this.update();  // Update game components such as spaceCraft, stars, etc.
            TWEEN.update(); // Update the tweening library
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    } 
}