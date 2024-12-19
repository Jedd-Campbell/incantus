import Character from "../characters/character";
import Spell from "./spell";

export default class SpellSequence {
    
    level: number = 0;
    spells: (Spell | Character)[] = [];

    constructor(level: number, spells: (Spell | Character)[]) {
        this.level = level;
        this.spells = spells;
    }
}