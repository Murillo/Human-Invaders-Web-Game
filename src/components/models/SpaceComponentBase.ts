import { Group, Object3DEventMap } from "three";
import { GameComponentBase } from "../GameComponentBase";
import { IPosition } from "../interfaces/IPosition";

export abstract class SpaceComponentBase extends GameComponentBase {
    private _positions: IPosition[] = [{ X: 0, Y: 0, Z: 0 }];
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

    public get positions(): IPosition[] {
        return this._positions;
    }

    public set positions(positions: IPosition[]) {
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