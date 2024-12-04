import k from "../kaboom";
import { GameObj } from "kaboom";
import Character from "../characters/character";
import { SpellType } from "./spell-type";
import { SpellBehavior } from "./spell-behaviour";

export default class SpellEffect {

    damage: number;
    healing: number;

    spellType: SpellType;
    spellBehavior: SpellBehavior;

    ticks: number = 6;

    caster: Character;
    target: Character;

    gameObject: GameObj;

    constructor() {

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
        if (!this.gameObject) {
            this.createProjectile("fire");
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
        k.wait(3, () => {
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

            if (this.gameObject) {
                this.gameObject.destroy();
            }
        }
    }
}