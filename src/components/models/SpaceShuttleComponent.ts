import { SpaceComponentBase } from "./SpaceComponentBase.js";
import { Group, Object3DEventMap, Scene, Vector3, Mesh } from "three";
import { MODEL } from "../../library/game/assets.js"
import { IDispose } from "../interfaces/IDispose.js";

/**
 * Class to represent the earth space shuttle model and its animations, such as position, rotation, etc.
 */
export class SpaceShuttleComponent extends SpaceComponentBase implements IDispose{
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
        this._scene = scene;
        const gltf = await this.loader.loadAsync(MODEL.spaceShuttle.path);
        this.object = gltf.scene;
        this.object.position.set(this._position.x, this._position.y, this._position.z);
        this._scene.add(this.object);
    }
    
    public update(): void {
        this.object.position.z += 0.05;
    }
}