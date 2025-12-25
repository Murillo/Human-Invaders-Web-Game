import * as THREE from 'three';
import { GameComponentBase } from '../GameComponentBase';

export enum CameraMode {
    Default = 'default',
    Top = 'top',
}
enum CameraScene {
    Default = '1',
    Top = '2',
}

export class CameraComponent extends GameComponentBase {
    private readonly camera: THREE.PerspectiveCamera;
    private readonly defaultPosition: THREE.Vector3 = new THREE.Vector3(5, 2, 30);
    private readonly topViewOffset: THREE.Vector3 = new THREE.Vector3(0, 35, 20);
    private readonly topViewLookOffset: THREE.Vector3 = new THREE.Vector3(0, 0, -15);
    private mode: CameraMode = CameraMode.Default;
    private targetProvider: () => THREE.Vector3;

    constructor(targetProvider: () => THREE.Vector3) {
        super();
        this.targetProvider = targetProvider;
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
    }

    public get instance(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public async load(
        scene: THREE.Scene,
        initialMode: CameraMode = CameraMode.Default
    ): Promise<void> {
        this.mode = initialMode;
        if (this.mode === CameraMode.Top) {
            this.updateCameraTracking(true);
        } else {
            this.camera.position.copy(this.defaultPosition);
        }
        scene.add(this.camera);
        window.addEventListener('keydown', this.handleCameraChange);
    }

    public update(): void {
        this.updateCameraTracking();
    }

    private handleCameraChange = (event: KeyboardEvent): void => {
        if (event.key === CameraScene.Top) {
            this.mode = CameraMode.Top;
            this.updateCameraTracking(true);
        }
        if (event.key === CameraScene.Default) {
            this.mode = CameraMode.Default;
            this.camera.position.copy(this.defaultPosition);
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
    };

    private updateCameraTracking(force: boolean = false): void {
        if (this.mode !== CameraMode.Top && !force) {
            return;
        }

        if (this.mode === CameraMode.Top) {
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
