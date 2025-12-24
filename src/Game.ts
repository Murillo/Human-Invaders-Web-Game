import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { SpaceAlienComponent } from './components/models/SpaceAlienComponent';
import { SpaceComponentBase } from './components/models/SpaceComponentBase';
import { SpaceShuttleComponent } from './components/models/SpaceShuttleComponent';
import { StarsComponent } from './components/models/StarsComponent';
import { TextComponent } from './components/models/TextComponent';
import { ShootComponent } from './components/models/ShootComponent';
import { CameraComponent } from './components/models/CameraComponent';

export class Game {

    private container : HTMLElement;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private cameraComponent: CameraComponent;
    private width = window.innerWidth;
    private height = window.innerHeight;
    private spaceCraft: SpaceAlienComponent;
    private stars: StarsComponent
    private components: SpaceComponentBase[] = [];
    private gameOverText: TextComponent;
    private shootComponents: ShootComponent[] = [];
    private initialNumberEnemies: number = 1;
    private speedIncreaseRate: number = 1.25;
    private sceneLimit: THREE.Vector3 = new THREE.Vector3(0, 0, 10);
    private limitsPositionEnemy = [
        new THREE.Vector3(-15, -10, -100),
        new THREE.Vector3(15, 15, -50),
    ];

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.spaceCraft = new SpaceAlienComponent();
        this.stars = new StarsComponent();
        this.gameOverText = new TextComponent('GAME\nOVER', new THREE.Vector3(0, 0, -30));
        this.cameraComponent = new CameraComponent(() => this.spaceCraft.positions);
    }

    public async load() : Promise<void> {
        /* ********* Initial Setup ***********  */
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor("#191644");
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        await this.cameraComponent.load(this.scene);
    
        /* ********* Models ***********  */
        await this.spaceCraft.load(this.scene);
        await this.stars.load(this.scene);
        await this.gameOverText.load(this.scene);
        for (let i = 0; i < this.initialNumberEnemies; i++) {
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
        this.cameraComponent.update();

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

                    const nextSpaceSpeed = this.components[i].speed * this.speedIncreaseRate;
                    this.components[i].dispose();
                    this.components.splice(i, 1);
                    this.spaceCraft.addScore(10);

                    const newSpaceShuttle = await SpaceShuttleComponent.create(
                        this.scene, 
                        this.limitsPositionEnemy,
                        nextSpaceSpeed);
                    this.components.push(newSpaceShuttle);

                    break;
                }
            }

            // Check if enemy passed by player
            if (this.components[i].positions.z >= this.sceneLimit.z) {
                this.gameOverText.enable = true;
            }
        }
    }

    public start() :void {
        const render = () => {
            this.renderer.render(this.scene, this.cameraComponent.instance);
            this.update();  // Update game components such as spaceCraft, stars, etc.
            TWEEN.update(); // Update the tweening library
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    } 
}
