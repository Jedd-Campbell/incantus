import { GameObj, SpriteComp } from "kaplay";
import SpellEffect from "./spell-effect";
import Character from "../characters/character";
import k from "../kaplay";
import { SpellType } from "./spell-type";
import VFX from "../vfx/vfx";

export default class Spell {

    name: string = "fizzle";
    description: string = "fizzle";
    type: SpellType = SpellType.None;
    spellObject: GameObj = null;
    inverse: Spell;
    level: number = 0;
    castTime: number = 2;

    constructor(name: string, description: string, type: SpellType, level: number, inverse: Spell, castTime: number = 2) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.level = level;
        this.inverse = inverse;
        this.castTime = castTime;
    }

    modifySpellEffect(effect: SpellEffect, chain: (Spell | Character)[]) {
        if (this.type === SpellType.Root) {
            effect.root = this;
        }
        if (this.type === SpellType.Intent) {
            effect.intent = this;
        }
    }

    invokeSpellEffect(effect: SpellEffect) {
        VFX.fizzle(effect.caster.gameObject.castPoint);
    }
}
