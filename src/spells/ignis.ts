import Spell from "./spell";
import SpellEffect from "./spell-effect";
import k from "../kaplay";
import { SpellType } from "./spell-type";
import Aquae from "./aquae";

export default class Ignis extends Spell {

    constructor(hasInverse: boolean = true) {
        const aquae = hasInverse ? new Aquae(false) : null;
        super("ignis", "fire", SpellType.Root, 2, aquae);
    }

    invokeSpellEffect(effect: SpellEffect) {
        // todo: fizzle
        // does nothing
    }

    sprite() {
        return k.sprite("ignis");
    }
}
