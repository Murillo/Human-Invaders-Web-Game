import { GameComponentBase } from "../GameComponentBase";
import { ModelComponentBase } from "./ModelComponentBase";
import { Scene } from "three";

export class SpaceShuttleComponent extends ModelComponentBase{
    public async load(scene: Scene): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public update(): void {
        throw new Error("Method not implemented.");
    }
    
}