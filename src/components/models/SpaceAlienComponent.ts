import { AnimationBase } from "../animations/AnimationBase";
import { models } from "../../library/game/models"
import { SpaceComponentBase } from "./SpaceComponentBase";
import { SpaceCraftDownRotationAnimation } from "../animations/SpaceCraftDownRotationAnimation";
import { SpaceCraftLeftRotationAnimation } from "../animations/SpaceCraftLeftRotationAnimation";
import { SpaceCraftRightRotationAnimation } from "../animations/SpaceCraftRightRotationAnimation";
import { SpaceCraftTopRotationAnimation } from "../animations/SpaceCraftTopRotationAnimation";
import { Euler, Group, Object3DEventMap, Scene, Vector3, Box3 } from "three";
import { ICollision } from "../interfaces/ICollision";

/**
 * Class to represent the space craft model and its animations, such as position, rotation, etc.
 */
export class SpaceAlienComponent extends SpaceComponentBase implements ICollision{
    private _position: Vector3 = new Vector3(0, 0, 0);
    private _rotation: Vector3 = new Vector3(0, 0, 0);
    private _speedMovement: number = 0.2;
    private _rotationMovement: number = 0.05;
    private _enableOriginalRotationMovement: boolean = true;
    private _animationModel: AnimationBase[] = [];

    public async load(scene: Scene) : Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceCraft'].path);
        this.object = gltf.scene;
        this.object.position.set(this._position.x, this._position.y, this._position.z);
        scene.add(this.object);

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
        this.object.position.set(this._position.x, this._position.y, this._position.z);
        this.object.rotation.set(this._rotation.x, this._rotation.y, this._rotation.z);

        if (this._enableOriginalRotationMovement) {
            this._animationModel.forEach(animation => {
                const newRotationAngle = animation.update<Euler>(this.object);
                this._rotation.x = newRotationAngle.x;
                this._rotation.y = newRotationAngle.y;
                this._rotation.z = newRotationAngle.z;
            });
        }
    }

    public collision(modelGroup: Group): boolean {
        this.object.children.forEach(spaceAlien3D => {
            modelGroup.children.forEach(model3D => {
                const alienBox = new Box3().setFromObject(spaceAlien3D);
                const targetBox = new Box3().setFromObject(model3D);
                const isCollision = alienBox.intersectsBox(targetBox);
                if (isCollision && this.isAlive) {
                    this.life -= 0.005; //life decrease due to collision
                    console.log('Space Alien Life: ', Math.abs(this.life * 100));

                    // Update the life progress bar
                    const lifeScreenElement = document.getElementById('life') as HTMLProgressElement;
                    lifeScreenElement.value = Math.abs(this.life * 100);
                }
                return isCollision;
            });
        });
        return false;
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