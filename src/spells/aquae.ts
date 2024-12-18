import k from "../kaplay";
import Spell from "./spell";
import SpellEffect from "./spell-effect";

export default class Aquae implements Spell {

    constructor() {
        this.name = "aquae";
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
