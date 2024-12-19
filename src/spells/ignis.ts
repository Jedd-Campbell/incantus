import Spell from "./spell";
import SpellEffect from "./spell-effect";
import k from "../kaplay";
import { SpellType } from "./spell-type";
import Aquae from "./aquae";

export default class Ignis extends Spell {

    constructor(hasInverse: boolean = true) {
        const aquae = hasInverse ? new Aquae(false) : null;
        super("ignis", "fire", SpellType.Root, 3, aquae);
    }

    invokeSpellEffect(effect: SpellEffect) {
        if (!effect.target) {
            super.invokeSpellEffect(effect);
            return;
        }

        effect.damage += 8;

        // todo: fizzle
        // does nothing
    }
}
