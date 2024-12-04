import Character from "../characters/character";
import Spell, { SpellType } from "./spell";

export default class Aquae implements Spell {

    constructor() {
        this.name = "aquae";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;
    fizzle: boolean;
    
    effect(player: Character, target: Character) {
        throw new Error("Method not implemented.");
    }

}
