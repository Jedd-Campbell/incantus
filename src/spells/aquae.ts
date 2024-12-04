import Character from "../characters/character";
import Spell from "./spell";
import { SpellType } from "./spell-type";

export default class Aquae implements Spell {

    constructor() {
        this.name = "aquae";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;
    
    effect(player: Character, target: Character) {
        throw new Error("Method not implemented.");
    }

}
