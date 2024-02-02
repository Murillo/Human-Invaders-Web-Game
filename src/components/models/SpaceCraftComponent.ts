import { AnimationBase } from "../animations/AnimationBase";
import { models } from "./../../library/game/models"
import { SpaceComponentBase } from "./SpaceComponentBase";
import { SpaceCraftDownRotationAnimation } from "../animations/SpaceCraftDownRotationAnimation";
import { SpaceCraftLeftRotationAnimation } from "../animations/SpaceCraftLeftRotationAnimation";
import { SpaceCraftRightRotationAnimation } from "../animations/SpaceCraftRightRotationAnimation";
import { SpaceCraftTopRotationAnimation } from "../animations/SpaceCraftTopRotationAnimation";
import { Euler, Group, Object3DEventMap, Scene, Vector3 } from "three";

/**
 * Class to represent the space craft model and its animations, such as position, rotation, etc.
 */
export class SpaceCraftComponent extends SpaceComponentBase {
    private _spaceCraft: Group<Object3DEventMap> = new Group();
    private _position: Vector3 = new Vector3(0, 0, 0);
    private _rotation: Vector3 = new Vector3(0, 0, 0);
    private _speedMovement: number = 0.2;
    private _rotationMovement: number = 0.05;
    private _enableOriginalRotationMovement: boolean = true;
    private _animationModel: AnimationBase[] = [];

    public async load(scene: Scene) : Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceCraft'].path);
        this._spaceCraft = gltf.scene;
        this._spaceCraft.position.set(this._position.x, this._position.y, this._position.z);
        scene.add(this._spaceCraft);

        this._animationModel = [
            new SpaceCraftLeftRotationAnimation(),
            new SpaceCraftRightRotationAnimation(),
            new SpaceCraftTopRotationAnimation(),
            new SpaceCraftDownRotationAnimation()
        ];

        window.addEventListener('keydown', this.handleKeyDownCommand.bind(this));
        window.addEventListener('keyup', this.handleKeyUpCommand.bind(this));
    }

    public update(): void {
        this._spaceCraft.position.set(this._position.x, this._position.y, this._position.z);
        this._spaceCraft.rotation.set(this._rotation.x, this._rotation.y, this._rotation.z);

        if (this._enableOriginalRotationMovement) {
            this._animationModel.forEach(animation => {
                const newRotationAngle = animation.update<Euler>(this._spaceCraft);
                this._rotation.x = newRotationAngle.x;
                this._rotation.y = newRotationAngle.y;
                this._rotation.z = newRotationAngle.z;
            });
        }
    }

    /**
     * Method to handle the space craft movement via keyboard commands when the key is pressed.
     * @param {KeyboardEvent} event
     * @returns {void}
     */
    private handleKeyDownCommand(event: KeyboardEvent): void {
        const _maxRotationAngleNegative: number = -0.4;
        const _maxRotationAnglePositive: number = 0.4;
        this._enableOriginalRotationMovement = false;
        
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this._position.y += this._speedMovement;
                if (this._rotation.x > _maxRotationAngleNegative) {
                    this._rotation.x -= this._rotationMovement;
                }
                break;
            case 's':
            case 'arrowdown':
                this._position.y -= this._speedMovement;
                if (this._rotation.x < _maxRotationAnglePositive) {
                    this._rotation.x += this._rotationMovement;
                }
                break;
            case 'a':
            case 'arrowleft':
                this._position.x -= this._speedMovement;
                if (this._rotation.z < _maxRotationAnglePositive) {
                    this._rotation.z += this._rotationMovement;
                }
                break;
            case 'd':
            case 'arrowright':
                this._position.x += this._speedMovement;
                if (this._rotation.z > _maxRotationAngleNegative) {
                    this._rotation.z -= this._rotationMovement;
                }
                break;
        }
    }

    /**
     * Method to handle the space craft movement via keyboard commands when the key is released.
     * @param {KeyboardEvent} event
     * @returns {void}
     */
    private handleKeyUpCommand(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
            case 's':
            case 'arrowdown':
            case 'a':
            case 'arrowleft':
            case 'd':
            case 'arrowright':
                this._enableOriginalRotationMovement = true;
                break;
        }
    }
}