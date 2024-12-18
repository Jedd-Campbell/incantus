import Spell from "./spell";
import SpellEffect from "./spell-effect";
import k from "../kaplay";

export default class Ignis implements Spell {

    constructor() {
        this.name = "ignis";
    }

    name: string;

    modifySpellEffect(effect: SpellEffect) {
        effect.root = this;
    }

    shader() {
        return k.shader(this.name, () => ({
            u_time: k.time(),
        }));
    }

    sprite() {
        return k.sprite("default");
    }
}
