import k from "../kaplay";
import VFX from "../vfx/vfx";
import Ignis from "./ignis";
import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Aquae extends Spell {

    constructor(hasInverse: boolean = true) {
        const inverse = hasInverse ? new Ignis(false) : null;
        super("aquae", "water", SpellType.Root, 2, inverse);
    }

    invokeSpellEffect(effect: SpellEffect) {
        if (!effect.target) {
            super.invokeSpellEffect(effect);
            return;
        }

        effect.damage += 3;
        // todo: fizzle
        // does nothing
    }
}
