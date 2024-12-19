import { GameObj, Vec2 } from "kaplay";
import k from "../kaplay";
import Stats from "./stats";
import SpellEffect from "../spells/spell-effect";
import VFX from "../vfx/vfx";
import Spell from "../spells/spell";

export default class Character {

    name: string;
    stats: Stats;
    gameObject: GameObj;
    sprite: string;
    dead: boolean = false;

    effects: SpellEffect[] = [];
    spells: Spell[] = [];

    constructor(name: string, stats: Stats, tag: string, sprite: string, startPosition: Vec2, castPoint: Vec2) {
        this.name = name;
        this.stats = stats;
        this.sprite = sprite;
        this.gameObject = this.createGameObject(tag, sprite, startPosition, castPoint);
    }

    modifySpellEffect(effect: SpellEffect) {
        effect.target = this;
    }

    addSpellEffect(effect: SpellEffect) {
        this.effects.push(effect);
        k.wait(effect.ticks, () => {
            this.removeSpellEffect(effect);
        });
    }

    removeSpellEffect(effect: SpellEffect) {
        const index = this.effects.indexOf(effect);
        if (index > -1) {
            this.effects.splice(index, 1);
        }
        VFX.destroyImmediately(effect?.intent?.spellObject);
        VFX.destroyImmediately(effect?.root?.spellObject);
    }

    applyDamage(effect: SpellEffect) {
        this.applyShieldBlock(effect);

        this.stats.health = Math.max(0, this.stats.health - effect.damage);
    }

    private applyShieldBlock(effect: SpellEffect) {
        const shieldEffect = this.effects.find((e) => e.intent.name === "protectio" && e.root?.name === effect?.root?.inverse?.name);
        if (shieldEffect) {
            const blockAmount = Math.max(0, shieldEffect.blockAmount - effect.damage);
            const damage = Math.max(0, effect.damage - shieldEffect.blockAmount);
            effect.damage = damage;
            shieldEffect.blockAmount = blockAmount;
            if (shieldEffect.blockAmount <= 0) {
                this.removeSpellEffect(shieldEffect);
            }
        }
    }

    // todo: Move stuff to UI class
    createGameObject(tag: string, sprite: string, startPosition: Vec2, castPoint: Vec2) {
        const character = k.add([
            k.sprite(sprite),
            k.z(100),
            k.scale(1.5),
            k.pos(startPosition),
            k.area(),
            k.body({ isStatic: true }),
            k.anchor("center"),
            "character",
            tag,
            this.name,
            {
                castText: "",
                castPercentage: 0,
                castPoint,
                stats: this.stats,
            }
        ]);        

        // Cast Bar
        const castBarWidth = 75;
        let castBar = character.add([
            k.rect(castBarWidth, 5),
            k.color(36, 20, 61),
            k.z(103),
            k.pos(0, character.height / 2 + 48),
            k.anchor("center"),
        ]);
        let castPercentage = castBar.add([
            k.rect(0, 5),
            k.color(253, 132, 0),
            k.z(104),
            k.pos(0, 0),
            k.anchor("center"),
        ]);
        castPercentage.onUpdate(() => {
            castPercentage.width = character.castPercentage * castBarWidth;
        });

        let castText = character.add([
            k.text(character.castText, { size: 14 }),
            k.color(255, 255, 255),
            k.z(105),
            k.pos(0, -character.height),
            k.anchor("center"),
        ]);
        castText.onUpdate(() => {
            castText.text = character.castText.toLowerCase();
        });

        // Health Bar
        const healthBarWidth = 75;
        let healthMax = character.add([
            k.rect(healthBarWidth, 5),
            k.color(255, 0, 0),
            k.z(103),
            k.pos(healthBarWidth * -0.5, character.height / 2 + 40),
            k.anchor("topleft"),
        ]);
        let health = healthMax.add([
            k.rect(healthBarWidth, 5),
            k.color(0, 255, 0),
            k.z(103),
            k.pos(0, 0),
            k.anchor("topleft"),
        ]);
        health.onUpdate(() => {
            const percentage = (character.stats.health / character.stats.healthMax);
            health.width = Math.max(percentage * healthBarWidth, 0);
        });

        // Name Plate
        character.add([
            k.text(this.name, { size: 14 }),
            k.color(255, 255, 255),
            k.z(103),
            k.pos(0, character.height / 2 + 30),
            k.anchor("center"),
        ]);

        // Todo: Death
        character.onUpdate(() => {
            if (character.stats.health <= 0) {
                this.dead = true;
            }
        });
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
