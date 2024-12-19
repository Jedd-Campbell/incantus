import Character from "../characters/character";
import k from "../kaplay";
import VFX from "../vfx/vfx";
import Impetus from "./impetus";
import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default class Protectio extends Spell {

    constructor(hasInverse: boolean = true) {
        const inverse = hasInverse ? new Impetus(false) : null;
        super("protectio", "shield", SpellType.Intent, 1, inverse);
    }

    modifySpellEffect(effect: SpellEffect, chain: (Spell | Character)[]) {
        super.modifySpellEffect(effect, chain);
        effect.ticks += 20;
        effect.blockAmount += 10;
        effect.maxBlockAmount += 10;
    }

    invokeSpellEffect(effect: SpellEffect) {
        // Fizzle
        if (!effect.target) {
            super.invokeSpellEffect(effect);
            return;
        }

        this.spellObject = VFX.createShield(
            effect.target.gameObject.pos,
            effect.sprite(),
            effect.ticks
        );

        effect.target.addSpellEffect(effect);
    }

    sprite() {
        return k.sprite(this.name);
    }
}
