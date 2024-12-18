import k from "../kaplay";
import Character from "./character";
import Stats from "./stats";

export default class Player extends Character {

    constructor(name: string, stats: Stats, base: Stats) {
        const startPosition = k.vec2(250, k.height() - 250);
        const castPoint = k.vec2(startPosition.x + 100, startPosition.y - 100);
        super(name, stats, base, "player", "blue", startPosition, castPoint);
    }
}