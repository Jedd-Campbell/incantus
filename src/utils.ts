export default class Utils {

    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    static randomInteger(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}