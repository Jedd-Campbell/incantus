import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Ignis implements Spell {

    constructor() {
        this.name = "ignis";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;

    modifySpellEffect(effect: SpellEffect) {
        effect.root = this;
    }

}
