import { GameObj } from "kaplay";
import Character from "../characters/character";
import k from "../kaplay";
import VFX from "../vfx/vfx";
import Spell from "./spell";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";
import Protectio from "./protectio";

export default class Impetus extends Spell {

    constructor(hasInverse: boolean = true) {
        const inverse = hasInverse ? new Protectio(false) : null;
        super("impetus", "attack", SpellType.Intent, 0, inverse);
    }

    modifySpellEffect(effect: SpellEffect, chain: (Spell | Character)[]) {
        super.modifySpellEffect(effect, chain);
        effect.damage += 10;
    }

    invokeSpellEffect(effect: SpellEffect) {

        // Fizzle
        if (!effect.target) {
            super.invokeSpellEffect(effect);
            return;
        }

        this.spellObject = VFX.createProjectile(
            effect.caster.gameObject.castPoint,
            effect.target.gameObject.pos,
            effect.intent?.sprite() ?? this.sprite(),
            10, // max projectile lifetime
            800, // projectile speed
        );
        this.spellObject.onCollide("character", (target: GameObj) => {
            this.spellObject.destroy();
            effect.target.applyDamage(effect);
        });
    }

    sprite() {
        return k.sprite(this.name);
    }
}
