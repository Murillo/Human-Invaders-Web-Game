import { Scene, Group, Object3DEventMap, Mesh, Vector3 } from 'three';
import { GameComponentBase } from '../GameComponentBase';
import { IDispose } from '../interfaces/IDispose';

export abstract class SpaceComponentBase extends GameComponentBase implements IDispose {
    private _life: number = 1;
    protected _rotation: Vector3 = new Vector3(0, 0, 0);
    protected _positions: Vector3 = new Vector3(0, 0, 0);
    protected _scene: Scene | null | undefined = undefined;
    protected _speed: number = 0;
    protected object: Group<Object3DEventMap> = new Group();
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

    public get speed(): number {
        return this._speed;
    }

    public set speed(speed: number) {
        this._speed = speed;
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

    public dispose(): void {
        this._scene?.remove(this.object);
        this.object.traverse((child) => {
            if (child instanceof Mesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
    }
}
