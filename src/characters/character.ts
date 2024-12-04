import { GameObj } from "kaboom";
import k from "../kaboom";
import Stats from "./stats";
import SpellEffect from "../spells/spell-effect";

export default class Character {

    name: string;
    stats: Stats;
    base: Stats;
    gameObject: GameObj;

    effects: SpellEffect[] = [];

    constructor(name: string, stats: Stats, tag: string, sprite: string, x: number, y: number) {
        this.name = name;
        this.stats = stats;
        this.base = stats;
        this.gameObject = this.createGameObject(tag, sprite, x, y);
    }

    applySpellEffects() {
        this.effects?.forEach(e => e.applySpellEffect());
    }

    createGameObject(tag: string, sprite: string, x: number, y: number) {
        const character = k.add([
            k.sprite(sprite),
            k.z(100),
            k.pos(x, y),
            k.area(),
            k.body(),
            k.anchor("center"),
            tag,
            this.name,
            {
                stats: this.stats,
                base: this.base
            }
        ]);

        // Health Bar
        let health = character.add([
            k.text(this.stats.health + "/" + this.base.health, { size: 24 }),
            k.color(255, 255, 255),
            k.pos(character.width / 2, character.height / 2 - 10),
            k.anchor("center"),
        ]);
        health.onUpdate(() => {
            health.text = this.stats.health + "/" + this.base.health
        });

        // Todo: Death
        // Todo: Animations (Cast, Hit, Death, Spawn?, Victory?)

        return character;
    }

    getObjectCenter() {
        const x = this.gameObject.pos.x + 32;
        const y = this.gameObject.pos.y + 32;
        return { x, y };
    }

    isBottomLeft() {
        const x = this.gameObject.pos.x + 32;
        const y = this.gameObject.pos.y + 32;
        return { x, y };
    }
}
