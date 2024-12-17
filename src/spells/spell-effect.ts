import k from "../kaplay";
import { GameObj } from "kaplay";
import Character from "../characters/character";
import Spell from "./spell";

export default class SpellEffect {

    spellObject: GameObj;

    caster: Character;
    target: Character;

    root: Spell;
    intent: Spell;

    damage: number;
    healing: number;
    ticks: number = 6;

    constructor(caster: Character) {
        this.caster = caster;
    }

    applySpellEffect() {
        if (this.ticks > 0) {
            // todo
            this.createSpellVisual();

            this.ticks--;
            this.destroySpell();
        }
    }

    private createSpellVisual() {
        if (!this.spellObject) {
            this.createProjectile("attack");
        }
    }

    private createProjectile(sprite: string) {
        const d = this.target.gameObject.pos.sub(this.caster.gameObject.pos).unit();
        const a = this.target.gameObject.pos.angle(this.target.gameObject.pos);

        let projectile = k.add([
            k.pos(this.caster.gameObject.pos.x + 100, this.caster.gameObject.pos.y - 100),
            k.rotate(a),
            k.sprite(sprite),
            k.anchor("center"),
            k.body(),
            k.area(),
            "projectile",
            { dir: d, hit: false },
        ]);
        k.wait(5, () => {
            if (projectile) {
                projectile.destroy();
            }
        });
    }

    private destroySpell() {
        if (this.ticks === 0) {
            const casterIndex = this.caster.effects.indexOf(this);
            if (casterIndex > -1) {
                this.caster.effects.splice(casterIndex, 1);
            }

            const targetIndex = this.target.effects.indexOf(this);
            if (targetIndex > -1) {
                this.target.effects.splice(targetIndex, 1);
            }

            if (this.spellObject) {
                this.spellObject.destroy();
            }
        }
    }
}