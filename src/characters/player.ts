import k from "../kaplay";
import Spell from "../spells/spell";
import Character from "./character";
import Stats from "./stats";

export default class Player extends Character {

    constructor(name: string, stats: Stats, spells: Spell[]) {
        const offset = 150;
        const startPosition = k.vec2(offset, k.height() - offset);
        const castPoint = k.vec2(startPosition.x + 100, startPosition.y - 100);
        super(name, stats, "player", "wizard", startPosition, castPoint);
        
        this.spells = spells;
    }
}