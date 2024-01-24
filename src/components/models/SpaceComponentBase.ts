import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GameComponentBase } from "../GameComponentBase";
import { IPosition } from "../interfaces/IPosition";

export abstract class SpaceComponentBase extends GameComponentBase {
    private _positions: IPosition[] = [{ X: 0, Y: 0, Z: 0 }];
    protected loader = new GLTFLoader();
    protected life: number = 1;
    protected speed: number = 1;
    protected isColision: boolean = false;

    constructor(state: boolean = false) {
        super(state);
    }

    public get positions(): IPosition[] {
        return this._positions;
    }

    public set positions(positions: IPosition[]) {
        this._positions = positions;
    }

    public colision(objectPosition: IPosition[]): boolean {
        //TODO: implement colision function
        return false;
    }

}