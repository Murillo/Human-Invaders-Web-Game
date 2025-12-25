import { AnimationBase } from './AnimationBase';
import { Group, Object3DEventMap } from 'three';

export class SpaceCraftDownRotationAnimation extends AnimationBase {
    private _angleReference: number = 0;
    private _angleRotation: number = 0.025;

    public update<T>(model: Group<Object3DEventMap>): T {
        if (model.rotation.x > this._angleReference) {
            model.rotation.x -= this._angleRotation;
        }
        return model.rotation as T;
    }
}
