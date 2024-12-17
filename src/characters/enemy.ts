import k from "../kaboom";
import Character from "./character";
import Stats from "./stats";

export default class Enemy extends Character {
    
    constructor(name: string, stats: Stats, base: Stats) {
        super(name, stats, base, "enemy", "red", k.width() - 200, 200);
    }
}