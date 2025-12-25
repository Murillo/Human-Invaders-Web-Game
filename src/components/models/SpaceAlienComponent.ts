import { AnimationBase } from '../animations/AnimationBase';
import { SpaceComponentBase } from './SpaceComponentBase';
import { SpaceCraftDownRotationAnimation } from '../animations/SpaceCraftDownRotationAnimation';
import { SpaceCraftLeftRotationAnimation } from '../animations/SpaceCraftLeftRotationAnimation';
import { SpaceCraftRightRotationAnimation } from '../animations/SpaceCraftRightRotationAnimation';
import { SpaceCraftTopRotationAnimation } from '../animations/SpaceCraftTopRotationAnimation';
import { Euler, Group, Scene, Box3 } from 'three';
import { ICollision } from '../interfaces/ICollision';
import { MODEL } from '../../library/game/assets';

/**
 * Class to represent the space craft model and its animations, such as position, rotation, etc.
 */
export class SpaceAlienComponent extends SpaceComponentBase implements ICollision {
    private _speedMovement: number = 0.25;
    private _rotationMovement: number = 0.05;
    private _enableOriginalRotationMovement: boolean = true;
    private _animationModel: AnimationBase[] = [];
    private _shotsAvailable: number = 50;
    private _shotTriggered: boolean = false;
    private _score: number = 0;

    public async load(scene: Scene): Promise<void> {
        const gltf = await this.loader.loadAsync(MODEL.spaceCraft.path);
        this.object = gltf.scene;
        this.object.position.set(this._positions.x, this._positions.y, this._positions.z);
        scene.add(this.object);

        this._animationModel = [
            new SpaceCraftLeftRotationAnimation(),
            new SpaceCraftRightRotationAnimation(),
            new SpaceCraftTopRotationAnimation(),
            new SpaceCraftDownRotationAnimation(),
        ];

        const shotsNumber = document.getElementById('shots') as HTMLDivElement;
        shotsNumber.innerHTML = this._shotsAvailable.toString();
    }

    public update(): void {
        this.object.position.set(this._positions.x, this._positions.y, this._positions.z);
        this.object.rotation.set(this._rotation.x, this._rotation.y, this._rotation.z);

        if (this._enableOriginalRotationMovement) {
            this._animationModel.forEach((animation) => {
                const newRotationAngle = animation.update<Euler>(this.object);
                this._rotation.x = newRotationAngle.x;
                this._rotation.y = newRotationAngle.y;
                this._rotation.z = newRotationAngle.z;
            });
        }
    }

    public collision(modelGroup: Group): boolean {
        this.object.children.forEach((spaceAlien3D) => {
            modelGroup.children.forEach((model3D) => {
                const alienBox = new Box3().setFromObject(spaceAlien3D);
                const targetBox = new Box3().setFromObject(model3D);
                const isCollision = alienBox.intersectsBox(targetBox);
                if (isCollision && this.isAlive) {
                    this.life -= 0.005; //life decrease due to collision
                    console.log('Space Alien Life: ', Math.abs(this.life * 100));

                    // Update the life progress bar
                    const lifeScreenElement = document.getElementById(
                        'life'
                    ) as HTMLProgressElement;
                    lifeScreenElement.value = Math.abs(this.life * 100);
                }
                return isCollision;
            });
        });
        return false;
    }

    /**
     * Method to add score to the player.
     * @param {number} value
     * @returns {void}
     */
    public addScore(value: number): void {
        this._score += value;
        const scoreNumber = document.getElementById('score') as HTMLDivElement;
        scoreNumber.innerHTML = this._score.toString();
    }

    /**
     * Method to check if the shot was triggered, and change the value to false.
     * @returns {boolean}
     */
    public isShootTriggered(): boolean {
        const wasShotTriggered = this._shotTriggered;
        this._shotTriggered = false;
        return wasShotTriggered;
    }

    public moveLeft(): void {
        const _maxRotationAnglePositive: number = 0.4;
        this._enableOriginalRotationMovement = false;
        this._positions.x -= this._speedMovement;
        if (this._rotation.z < _maxRotationAnglePositive) {
            this._rotation.z += this._rotationMovement;
        }
    }

    public moveRight(): void {
        const _maxRotationAngleNegative: number = -0.4;
        this._enableOriginalRotationMovement = false;
        this._positions.x += this._speedMovement;
        if (this._rotation.z > _maxRotationAngleNegative) {
            this._rotation.z -= this._rotationMovement;
        }
    }

    public moveUp(): void {
        const _maxRotationAngleNegative: number = -0.4;
        this._enableOriginalRotationMovement = false;
        this._positions.y += this._speedMovement;
        if (this._rotation.x > _maxRotationAngleNegative) {
            this._rotation.x -= this._rotationMovement;
        }
    }

    public moveDown(): void {
        const _maxRotationAnglePositive: number = 0.4;
        this._enableOriginalRotationMovement = false;
        this._positions.y -= this._speedMovement;
        if (this._rotation.x < _maxRotationAnglePositive) {
            this._rotation.x += this._rotationMovement;
        }
    }

    public stopMovement(): void {
        this._enableOriginalRotationMovement = true;
    }

    public triggerShot(): void {
        if (this._shotsAvailable <= 0) {
            return;
        }
        const shotsNumber = document.getElementById('shots') as HTMLDivElement;
        this._shotsAvailable -= 1;
        shotsNumber.innerHTML = this._shotsAvailable.toString();
        this._shotTriggered = true;
    }
}
