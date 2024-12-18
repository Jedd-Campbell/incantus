import k from "../kaplay";
import Spell from "./spell";
import SpellEffect from "./spell-effect";

export default class Impedio implements Spell {

    constructor() {
        this.name = "impedio";
    }

    name: string;

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
