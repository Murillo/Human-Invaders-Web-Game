import * as THREE from 'three';
import { Bounds } from '../types/Bounds';

export class Screen {
    /**
     * Checks if a pointer event happened on the left half of a given element.
     * @param {PointerEvent} event
     * @param {HTMLElement} element
     * @param {number} targetCenterX center position (in px, relative to the element) of the target to exclude
     * @param {number} targetWidth width (in px) of the target to exclude
     * @returns {boolean | null} true if left side, false if right side, null if inside the exclusion zone
     */
    public static isLeftHalf(
        event: PointerEvent,
        element: HTMLElement,
        targetCenterX: number,
        targetWidth: number
    ): boolean | null {
        const rect = element.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const center = targetCenterX;
        const halfWidth = targetWidth / 2;
        const leftLimit = center - halfWidth;
        const rightLimit = center + halfWidth;

        if (relativeX >= leftLimit && relativeX <= rightLimit) {
            return null;
        }

        return relativeX < leftLimit;
    }

    /**
     * Projects a 3D object's bounding box to screen space and returns its horizontal bounds.
     */
    public static getProjectedBoundsX(
        object: THREE.Object3D,
        camera: THREE.Camera,
        element: HTMLElement
    ): Bounds {
        const box = new THREE.Box3().setFromObject(object);
        const min = box.min.clone();
        const max = box.max.clone();
        const points = [new THREE.Vector3(min.x, 0, min.z), new THREE.Vector3(max.x, 0, max.z)];

        const projected = points.map((p) => {
            const proj = p.clone().project(camera);
            return {
                x: ((proj.x + 1) / 2) * element.clientWidth,
            };
        });

        const left = Math.min(projected[0].x, projected[1].x);
        const right = Math.max(projected[0].x, projected[1].x);
        const width = Math.abs(right - left) || element.clientWidth * 0.1;
        return {
            centerX: (left + right) / 2,
            width: width,
        };
    }
}
