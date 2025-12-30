import * as THREE from 'three';
import { Bounds } from '../types/Bounds';

export class Screen {
    /**
     * Determines whether a pointer event occurred on the left half of an element,
     * with an optional exclusion zone around a central target.
     *
     * @param {PointerEvent} event - The pointer event to evaluate.
     * @param {HTMLElement} element - The element used as reference for relative coordinates.
     * @param {number} targetCenterX - X coordinate (in px, relative to the element) of the exclusion area's center.
     * @param {number} targetWidth - Width (in px) of the exclusion area.
     * @returns {boolean | null} Returns `true` if the event is on the left half, `false` if on the right half,
     * or `null` if the event falls within the exclusion zone.
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
     * Projects a 3D object's bounding box to screen space and returns its horizontal bounds in pixels.
     *
     * Note: This projection only considers the object's X-Z extents (Y set to 0) for horizontal bounds.
     *
     * @param {THREE.Object3D} object - The 3D object whose bounding box will be projected.
     * @param {THREE.Camera} camera - The camera used for projection.
     * @param {HTMLElement} element - The DOM element representing the render area (used for width in pixels).
     * @returns {Bounds} An object containing `centerX` (center in pixels) and `width` (width in pixels).
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

    /**
     * Recalculates horizontal spawn limits for enemies based on the camera and predefined Z depths.
     *
     * @param {THREE.PerspectiveCamera} camera - The perspective camera used to compute screen bounds at depth.
     * @returns {THREE.Vector3[]} An array with two `THREE.Vector3` entries: [leftSpawnPosition, rightSpawnPosition].
     */
    public static recalculateEnemyLimits(camera: THREE.PerspectiveCamera): THREE.Vector3[] {
        const spawnZMax = -35;
        const spawnZMin = -45;
        const bounds = this.getScreenBoundsAtDepth(camera, spawnZMax);
        return [
            new THREE.Vector3(bounds.centerX - bounds.width / 2, 0, spawnZMin),
            new THREE.Vector3(bounds.centerX + bounds.width / 2, 0, spawnZMax),
        ];
    }

    /**
     * Calculate the world-space horizontal bounds (X) of the camera's view at a specific Z depth.
     *
     * This method unprojects normalized device coordinates (NDC) corners to world space,
     * intersects the camera ray with the plane at the given Z, and returns the center X and width.
     *
     * @private
     * @param {THREE.PerspectiveCamera} camera - The camera used to unproject screen corners.
     * @param {number} z - The world Z coordinate where bounds should be computed.
     * @returns {Bounds} An object with `centerX` (center X in world units) and `width` (width in world units).
     */
    private static getScreenBoundsAtDepth(camera: THREE.PerspectiveCamera, z: number): Bounds {
        const ndcCorners = [new THREE.Vector2(-1, -1), new THREE.Vector2(1, 1)];
        const xs: number[] = [];

        ndcCorners.forEach((corner) => {
            const clipPosition = new THREE.Vector3(corner.x, corner.y, 1).unproject(camera);
            const direction = clipPosition.sub(camera.position);
            const t = (z - camera.position.z) / direction.z;
            const intersection = camera.position.clone().add(direction.multiplyScalar(t));
            xs.push(intersection.x);
        });

        const left = Math.min(...xs);
        const right = Math.max(...xs);
        return {
            centerX: (left + right) / 2,
            width: Math.abs(right - left),
        };
    }
}
