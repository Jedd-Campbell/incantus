export default class Utils {

    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
}