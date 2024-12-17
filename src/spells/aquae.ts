import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Aquae implements Spell {

    constructor() {
        this.name = "aquae";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;
    
    modifySpellEffect(effect: SpellEffect) {
        throw new Error("Method not implemented.");
    }

}
