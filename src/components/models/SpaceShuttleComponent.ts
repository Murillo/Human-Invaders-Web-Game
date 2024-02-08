import { models } from "./../../library/game/models.js"
import { SpaceComponentBase } from "./SpaceComponentBase.js";
import { Group, Object3DEventMap, Scene, Vector3 } from "three";

/**
 * Class to represent the earth space shuttle model and its animations, such as position, rotation, etc.
 */
export class SpaceShuttleComponent extends SpaceComponentBase{
    private _position: Vector3;
    
    /**
     * Constructor to create the space shuttle model.
     * @param {Vector3} position initial position of the space shuttle.
     */
    constructor(position: Vector3 = new Vector3(0, 0, 0)) {
        super();
        this._position = position;
    }

    public async load(scene: Scene): Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceShuttle'].path);
        this.object = gltf.scene;
        this.object.position.set(this._position.x, this._position.y, this._position.z);
        scene.add(this.object);
    }
    
    public update(): void {
        this.object.position.z += 0.05;
    }
}