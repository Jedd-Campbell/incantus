import Utils from "../utils";

export default class Stats {

    // health points
    health: number;
    healthMax: number;

    // Cast times

    constructor(health: number = 30) {
        this.health = health;
        this.healthMax = health;
    }

}