import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GameComponentBase } from "../GameComponentBase";
import { IPosition } from "../interfaces/IPosition";

export abstract class ModelComponentBase extends GameComponentBase {
    private _position: IPosition[] =  [{ X: 0, Y:0, Z: 0}];
    protected loader = new GLTFLoader();

    public get position(): IPosition[] {
        return this._position;
    }

    public set position(position: IPosition[]){
        this._position = position;
    }

    public colision(objectPosition: IPosition[]): boolean{
        //TODO: implement colision function
        return false;
    }

}