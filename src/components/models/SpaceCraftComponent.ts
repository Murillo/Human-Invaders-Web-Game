import { AnimationBase } from "../animations/AnimationBase";
import { SpaceCraftDownRotationAnimation } from "../animations/SpaceCraftDownRotationAnimation";
import { SpaceCraftLeftRotationAnimation } from "../animations/SpaceCraftLeftRotationAnimation";
import { SpaceCraftRightRotationAnimation } from "../animations/SpaceCraftRightRotationAnimation";
import { SpaceCraftTopRotationAnimation } from "../animations/SpaceCraftTopRotationAnimation";
import { IPosition } from "../interfaces/IPosition";
import { models } from "./../../library/game/models"
import { SpaceComponentBase } from "./SpaceComponentBase";
import { Euler, Group, Object3DEventMap, Scene } from "three";

/**
 * Class to represent the space craft model and its animations, such as position, rotation, etc.
 */
export class SpaceCraftComponent extends SpaceComponentBase {
    private _spaceCraft: Group<Object3DEventMap> | undefined;
    private _position: IPosition = { X: 0, Y: 0, Z: 0 };
    private _rotation: IPosition = { X: 0, Y: 0, Z: 0 };
    private _speedMovement: number = 0.2;
    private _rotationMovement: number = 0.05;
    private _enableOriginalRotationMovement: boolean = true;
    private _animationModel: AnimationBase[] = [];

    public async load(scene: Scene) : Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceCraft'].path);
        this._spaceCraft = gltf.scene;
        this._spaceCraft.position.set(this._position.X, this._position.Y, this._position.Z);
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
        this._spaceCraft?.position.set(this._position.X, this._position.Y, this._position.Z);
        this._spaceCraft?.rotation.set(this._rotation.X, this._rotation.Y, this._rotation.Z);

        if (this._enableOriginalRotationMovement) {
            this._animationModel.forEach(animation => {
                const newRotationAngle = animation.update<Euler>(this._spaceCraft as Group<Object3DEventMap>);
                this._rotation.X = newRotationAngle.x;
                this._rotation.Y = newRotationAngle.y;
                this._rotation.Z = newRotationAngle.z;
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
                this._position.Y += this._speedMovement;
                if (this._rotation.X > _maxRotationAngleNegative) {
                    this._rotation.X -= this._rotationMovement;
                }
                break;
            case 's':
            case 'arrowdown':
                this._position.Y -= this._speedMovement;
                if (this._rotation.X < _maxRotationAnglePositive) {
                    this._rotation.X += this._rotationMovement;
                }
                break;
            case 'a':
            case 'arrowleft':
                this._position.X -= this._speedMovement;
                if (this._rotation.Z < _maxRotationAnglePositive) {
                    this._rotation.Z += this._rotationMovement;
                }
                break;
            case 'd':
            case 'arrowright':
                this._position.X += this._speedMovement;
                if (this._rotation.Z > _maxRotationAngleNegative) {
                    this._rotation.Z -= this._rotationMovement;
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