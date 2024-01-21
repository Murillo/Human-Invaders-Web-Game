import { Scene } from "three";

export abstract class GameComponentBase {
    protected state: boolean;

    constructor(state: boolean = false) {
        this.state = state;
     }

    public abstract load(scene: Scene): Promise<void>;
    public abstract update(): void;
}