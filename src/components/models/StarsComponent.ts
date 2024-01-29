import * as THREE from 'three';
import { GameComponentBase } from "../GameComponentBase";
import { models } from "../../library/game/models";

export class StarsComponent extends GameComponentBase {
    private _total: number;

    constructor(total: number = 5000) {
        super();
        this._total = total;
    }

    public async load(scene: THREE.Scene): Promise<void> {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < this._total; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // x
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // y
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // z
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = await textureLoader.loadAsync(models['Stars'].path);
        const material = new THREE.PointsMaterial({ map: particleTexture, transparent: true });
        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
    }

    public update(): void { 
        
    }
}