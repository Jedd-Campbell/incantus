import k from "../kaboom";
import Character from "./character";
import Stats from "./stats";

export default class Player extends Character {
    
    constructor(name: string, stats: Stats) {
        super(name, stats, "player", "blue", 200, k.height() - 200);
    }
}