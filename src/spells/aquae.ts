import k from "../kaplay";
import Ignis from "./ignis";
import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Aquae extends Spell {

    constructor(hasInverse: boolean = true) {
        const inverse = hasInverse ? new Ignis(false) : null;
        super("aquae", "water", SpellType.Root, 0, inverse);
    }

    invokeSpellEffect(effect: SpellEffect) {
        // todo: fizzle
        // does nothing
    }

    sprite() {
        return k.sprite("default");
    }
}
