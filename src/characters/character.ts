import { GameObj } from "kaplay";
import k from "../kaplay";
import Stats from "./stats";
import SpellEffect from "../spells/spell-effect";

export default class Character {

    name: string;
    stats: Stats;
    base: Stats;
    gameObject: GameObj;

    effects: SpellEffect[] = [];

    constructor(name: string, stats: Stats, base: Stats, tag: string, sprite: string, x: number, y: number) {
        this.name = name;
        this.stats = stats;
        this.base = base;
        this.gameObject = this.createGameObject(tag, sprite, x, y);
    }

    applySpellEffects() {
        this.effects?.forEach(e => e.applySpellEffect());
    }

    createGameObject(tag: string, sprite: string, x: number, y: number) {
        const character = k.add([
            k.sprite(sprite),
            k.z(100),
            k.scale(2),
            k.pos(x, y),
            k.area(),
            k.body({ isStatic: true }),
            k.anchor("center"),
            "character",
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
            k.z(103),
            k.pos(0, character.height / 2 + 30),
            k.anchor("center"),
        ]);
        health.onUpdate(() => {
            health.text = character.stats.health + "/" + character.base.health
        });

        const pedestal = k.add([
            k.sprite("pedestal"),
            k.scale(6),
            k.pos(x, y + 210),
            k.anchor("center"),
            k.z(99),
        ])

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
