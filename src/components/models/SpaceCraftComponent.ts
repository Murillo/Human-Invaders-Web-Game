import { IPosition } from "../interfaces/IPosition.js";
import { models } from "./../../library/game/models.js"
import { SpaceComponentBase } from "./SpaceComponentBase.js";
import { Scene } from "three";

export class SpaceCraftComponent extends SpaceComponentBase {
    private spaceCraft: any;
    private position: IPosition = { X: 0, Y: 0, Z: 0 };
    private speedMovement: number = 0.15;

    public async load(scene: Scene) : Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceCraft'].path);
        this.spaceCraft = gltf.scene;
        this.spaceCraft.position.set(this.position.X, this.position.Y, this.position.Z);
        scene.add(this.spaceCraft);

        window.addEventListener('keydown', this.handleKeyDownCommand.bind(this));
    }

    public update(): void {
        this.spaceCraft.position.set(this.position.X, this.position.Y, this.position.Z);
    }

    /// <summary>
    /// Handle the space craft movement via keyboard commands
    /// </summary>
    private handleKeyDownCommand(event: KeyboardEvent): void {
        switch (event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.position.Y += this.speedMovement;
                break;
            case 's':
            case 'arrowdown':
                this.position.Y -= this.speedMovement;
                break;
            case 'a':
            case 'arrowleft':
                this.position.X -= this.speedMovement;
                break;
            case 'd':
            case 'arrowright':
                this.position.X += this.speedMovement;
                break;
        }
    }
    
}