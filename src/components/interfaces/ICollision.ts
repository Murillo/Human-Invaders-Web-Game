import { Group } from "three";

export interface ICollision {
    /**
     * Method to check the collision between the model component and another object.
     * @param {Group} modelGroup the model group to check the collision.
     * @returns {boolean} true if the text component is colliding with the model group, false otherwise.
     */
    collision(modelGroup: Group): boolean;
}