import { models } from "./../../library/game/models.js"
import { ModelComponentBase } from "./ModelComponentBase";
import { Scene } from "three";

export class SpaceCraftComponet extends ModelComponentBase {
    private spaceCraft: any;

    public async load(scene: Scene) : Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceCraft'].path);
        this.spaceCraft = gltf.scene;
        this.spaceCraft.position.set(0, 0, 0);
        scene.add(this.spaceCraft);
    }

    public update(): void {
        this.spaceCraft.rotation.z -= 0.01;
    }
    
}