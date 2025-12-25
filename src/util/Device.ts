export class Device {
    public static isMobileDevice(): boolean {
        const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|Tablet/i;
        return mobileRegex.test(navigator.userAgent) || window.innerWidth <= 900;
    }
}
