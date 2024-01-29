import { GameComponentBase } from "../GameComponentBase";
import { IPosition } from "../interfaces/IPosition";

export abstract class SpaceComponentBase extends GameComponentBase {
    private _positions: IPosition[] = [{ X: 0, Y: 0, Z: 0 }];
    private _life: number = 1;
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

    public colision(objectPosition: IPosition[]): boolean {
        //TODO: implement colision
        return false;
    }

}