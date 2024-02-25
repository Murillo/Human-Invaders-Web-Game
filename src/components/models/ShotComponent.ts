import { Mesh, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from "three";
import { Tween } from "@tweenjs/tween.js";
import { GameComponentBase } from "../GameComponentBase";

/**
 * Class to represent the shot model and its animations triggered by some space comoponent.
 */
export class ShotComponent extends GameComponentBase {
    private _position: Vector3;
    private _scene: Scene | undefined = undefined;
    private _sphere: Mesh = new Mesh();
    private _radius: number;
    private _widthSegments: number = 32;
    private _heightSegments: number = 16;
    private _color: number = 0xffff00; // yellow
    private _removeFromScene: boolean = false;
    private _limitDistance: number = -50;    
    private _fadeTime: number = 500; // 0.5 seconds

    /**
     * Constructor to create the space shuttle model.
     * @param {Vector3} position initial position of the space shuttle.
     */
    constructor(position: Vector3 = new Vector3(0, 0, 0), radius: number = 0.1) {
        super();
        this._position = position;
        this._radius = radius;
    }

    public async load(scene: Scene): Promise<void> {
        this._scene = scene;
        const geometry = new SphereGeometry(this._radius, this._widthSegments, this._heightSegments); 
        const material = new MeshBasicMaterial( { 
            color: this._color,
            transparent: true
        }); 
        this._sphere = new Mesh(geometry, material); 
        this._sphere.position.set(this._position.x, this._position.y, this._position.z);
        this._scene.add(this._sphere);
        Promise.resolve();
    }

    public update(): void {
        this._sphere.position.z -= 1;
        if (!this._removeFromScene && this._sphere.position.z < this._limitDistance) {
            new Tween(this._sphere.material)
                .to({opacity: 0}, this._fadeTime) // 2 seconds
                .onComplete(() => this._scene?.remove(this._sphere))
                .start();
            this._removeFromScene = true;
        }
    }
}