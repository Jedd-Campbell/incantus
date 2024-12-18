import k from "../kaplay";
import { GameObj } from "kaplay";
import Character from "../characters/character";
import Spell from "./spell";
import Impetus from "./impetus";
import Impedio from "./impedio";
import VFX from "../vfx/vfx";

export default class SpellEffect {

    spellObject: GameObj;

    caster: Character;
    target: Character;

    root: Spell;
    intent: Spell;

    damage: number;
    healing: number;
    ticks: number = 10;

    constructor(caster: Character) {
        this.caster = caster;
    }

    parseUtterances(utterances: (Character | Spell)[]) {
        utterances.forEach(utterance => {
            if (utterance instanceof Character) {
                this.target = utterance;
            } else if (utterance.modifySpellEffect) {
                utterance.modifySpellEffect(this);
            }
        });
        this.applySpellEffect();
    }

    applySpellEffect() {
        if (this.fizzle()) {
            return;
        }

        // todo
        this.createSpellVisual();

    }

    private fizzle() {
        if (!this.target || !this.intent || !this.root) {
            // todo: create fizzle effect
            return true;
        }
        return false;
    }

    private createSpellVisual() {
        if (this.spellObject) return;

        if (this.intent instanceof Impetus) {
            const leftSide = this.caster.gameObject.pos.x < k.width() / 2;
            const offSet = leftSide ? 100 : -100;
            VFX.createProjectile(
                k.vec2(this.caster.gameObject.pos.x + offSet, this.caster.gameObject.pos.y - 100),
                this.target.gameObject.pos,
                this.intent.sprite(),
                this.root.shader(),
                10 // max projectile lifetime
            );
        }

        if (this.intent instanceof Impedio) {
            VFX.createShield(
                this.target.gameObject.pos,
                this.intent.sprite(),
                this.root.shader(),
                this.ticks
            );
        }

    }

    // private destroySpell() {
    //     if (this.ticks === 0) {
    //         const casterIndex = this.caster.effects.indexOf(this);
    //         if (casterIndex > -1) {
    //             this.caster.effects.splice(casterIndex, 1);
    //         }

    //         const targetIndex = this.target.effects.indexOf(this);
    //         if (targetIndex > -1) {
    //             this.target.effects.splice(targetIndex, 1);
    //         }

    //         if (this.spellObject) {
    //             this.spellObject.destroy();
    //         }
    //     }
    // }
}