import * as THREE from 'three';
import { GameComponentBase } from '../GameComponentBase';
import { MODEL } from '../../library/game/assets';

/**
 * Class to represent the stars model and its animations.
 */
export class StarsComponent extends GameComponentBase {
    private _particleSystem: THREE.Points;
    private _total: number;

    constructor(total: number = 5000) {
        super();
        this._total = total;
        this._particleSystem = new THREE.Points();
    }

    public async load(scene: THREE.Scene): Promise<void> {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < this._total; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // x
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // y
            vertices.push(THREE.MathUtils.randFloat(-30, -100)); // z
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = await textureLoader.loadAsync(MODEL.stars.path);
        const material = new THREE.PointsMaterial({ map: particleTexture, transparent: true });
        this._particleSystem = new THREE.Points(geometry, material);
        scene.add(this._particleSystem);
    }

    public update(): void {
        const positions = this._particleSystem.geometry.attributes.position
            .array as THREE.TypedArray;
        for (var i = 0; i < positions.length; i += 3) {
            positions[i] += Math.random() * 0.005 - 0.005; // x
            positions[i + 1] += 0; // y
            positions[i + 2] += 0; // z
        }
        this._particleSystem.geometry.attributes.position.needsUpdate = true;
    }
}
