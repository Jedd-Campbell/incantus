import k from "../kaplay";
import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Impetus implements Spell {

    constructor() {
        this.name = "impetus";
        this.type = SpellType.Intent;
    }

    name: string;
    type: SpellType;

    modifySpellEffect(effect: SpellEffect) {
        effect.intent = this;
    }

    shader() {
        return null;
    }

    sprite() {
        return k.sprite(this.name);
    }
}
