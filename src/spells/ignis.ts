import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";
import k from "../kaplay";

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

    shader() {
        return k.shader(this.name, () => ({
            u_time: k.time(),
        }));
    }

    sprite() {
        return k.sprite("default");
    }
}
