import { models } from "./../../library/game/models.js"
import { SpaceComponentBase } from "./SpaceComponentBase.js";
import { Scene } from "three";

export class SpaceShuttleComponent extends SpaceComponentBase{
    private spaceShuttle: any;

    public async load(scene: Scene): Promise<void> {
        const gltf = await this.loader.loadAsync(models['SpaceShuttle'].path);
        this.spaceShuttle = gltf.scene;
        this.spaceShuttle.position.set(0, 5, -15);
        scene.add(this.spaceShuttle);
    }
    
    public update(): void {
        this.spaceShuttle.rotation.z += 0.02;
    }
}