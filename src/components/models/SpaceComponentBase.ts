import { Group, Object3DEventMap, Vector3 } from "three";
import { GameComponentBase } from "../GameComponentBase";

export abstract class SpaceComponentBase extends GameComponentBase {
    private _life: number = 1;
    protected _rotation: Vector3 = new Vector3(0, 0, 0);
    protected _positions: Vector3 = new Vector3(0, 0, 0);
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
}