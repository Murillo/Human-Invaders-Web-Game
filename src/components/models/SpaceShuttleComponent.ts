import { models } from "./../../library/game/models.js"
import { SpaceComponentBase } from "./SpaceComponentBase.js";
import { Group, Object3DEventMap, Scene, Vector3 } from "three";

/**
 * Class to represent the earth space shuttle model and its animations, such as position, rotation, etc.
 */
export class SpaceShuttleComponent extends SpaceComponentBase{
    private _spaceShuttle: Group<Object3DEventMap> = new Group();
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
        this._spaceShuttle = gltf.scene;
        this._spaceShuttle.position.set(this._position.x, this._position.y, this._position.z);
        scene.add(this._spaceShuttle);
    }
    
    public update(): void {
        this._spaceShuttle.position.z += 0.05;
    }
}