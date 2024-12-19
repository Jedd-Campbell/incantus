import { SpriteComp } from "kaplay";
import Character from "../characters/character";
import Spell from "./spell";
import k from "../kaplay";

export default class SpellEffect {

    // units involved
    caster: Character;
    target: Character;

    // spells being used
    root: Spell;
    intent: Spell;

    // spell numbers
    damage: number = 0;
    healing: number = 0;
    blockAmount: number = 0;
    maxBlockAmount: number = 0;
    missChance: number = 0;
    reductionPercentage: number = 0;
    ticks: number = 0;

    constructor(caster: Character) {
        this.caster = caster;
    }

    parseSpellChain(chain: (Character | Spell)[]) {
        chain.forEach(spellOrTarget => {
            spellOrTarget.modifySpellEffect(this, chain);
        });
        this.invokeSpellEffect();
    }

    sprite(): SpriteComp {
        let sprite = "fizzle";
        if (this.intent && this.root) {
            sprite = this.intent.name + "_" + this.root.name;
        } else if (this.intent || this.root) {
            sprite = this.intent?.name ?? this.root.name;
        }

        return k.sprite(sprite);
    }

    invokeSpellEffect() {
        if (this.intent) {
            this.intent.invokeSpellEffect(this);
        }
        if (this.root) {
            this.root.invokeSpellEffect(this);
        }
    }
}