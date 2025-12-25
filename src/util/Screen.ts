export class Screen {
    /**
     * Checks if a pointer event happened on the left half of a given element.
     * @param {PointerEvent} event
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    public static isLeftHalf(event: PointerEvent, element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        return relativeX < rect.width / 2;
    }
}
