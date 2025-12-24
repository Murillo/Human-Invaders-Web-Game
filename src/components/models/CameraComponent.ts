import * as THREE from 'three';
import { GameComponentBase } from '../GameComponentBase';

type CameraMode = 'default' | 'top';

enum CameraScene {
    Default = '1',
    Top = '2',
}

export class CameraComponent extends GameComponentBase {
    private readonly camera: THREE.PerspectiveCamera;
    private readonly defaultPosition: THREE.Vector3 = new THREE.Vector3(5, 2, 30);
    private readonly topViewOffset: THREE.Vector3 = new THREE.Vector3(0, 35, 20);
    private readonly topViewLookOffset: THREE.Vector3 = new THREE.Vector3(0, 0, -15);
    private mode: CameraMode = 'default';
    private targetProvider: () => THREE.Vector3;

    constructor(targetProvider: () => THREE.Vector3) {
        super();
        this.targetProvider = targetProvider;
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    public get instance(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public async load(scene: THREE.Scene): Promise<void> {
        this.camera.position.copy(this.defaultPosition);
        scene.add(this.camera);
        window.addEventListener('keydown', this.handleCameraChange);
    }

    public update(): void {
        this.updateCameraTracking();
    }

    private handleCameraChange = (event: KeyboardEvent): void => {
        if (event.key === CameraScene.Top) {
            this.mode = 'top';
            this.updateCameraTracking(true);
        }
        if (event.key === CameraScene.Default) {
            this.mode = 'default';
            this.camera.position.copy(this.defaultPosition);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
    }

    private updateCameraTracking(force: boolean = false): void {
        if (this.mode !== 'top' && !force) {
            return;
        }

        if (this.mode === 'top') {
            const targetPosition = this.targetProvider();
            this.camera.position.set(
                targetPosition.x + this.topViewOffset.x,
                targetPosition.y + this.topViewOffset.y,
                targetPosition.z + this.topViewOffset.z
            );
            const lookTarget = targetPosition.clone().add(this.topViewLookOffset);
            this.camera.lookAt(lookTarget);
        }
    }
}
