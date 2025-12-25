import { Group, Object3DEventMap } from 'three';

/**
 * Abstract class to handle the animations of the models.
 */
export abstract class AnimationBase {
    /**
     * Method to update the model.
     * @param {Group<Object3DEventMap>} model
     * @returns {T}
     */
    public abstract update<T>(model: Group<Object3DEventMap>): T;
}
