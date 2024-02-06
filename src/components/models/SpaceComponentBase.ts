import { Group, Object3DEventMap, Vector3 } from "three";
import { GameComponentBase } from "../GameComponentBase";

export abstract class SpaceComponentBase extends GameComponentBase {
    private _positions: Vector3 = new Vector3(0, 0, 0);
    private _life: number = 1;
    protected object: Group<Object3DEventMap> = new Group();
    protected speed: number = 1;
    protected isColision: boolean = false;

    constructor(state: boolean = false) {
        super(state);
    }

    public get life(): number {
        return this._life;
    }

    public set life(life: number) {
        this._life = life;
    }

    public get isAlive(): boolean {
        return this._life > 0;
    }

    public get positions(): Vector3 {
        return this._positions;
    }

    public set positions(positions: Vector3) {
        this._positions = positions;
    }

    public get model(): Group<Object3DEventMap> {
        return this.object;
    }

    /**
     * Method to detect the colision between the model component and another object.
     * @param {THREE.Group} modelGroup the model to detect the colision.
     * @returns {Promise<boolean>} true if the colision is detected, false otherwise.
     */
    public abstract collision(modelGroup: THREE.Group): boolean;

}