import { GameObj } from "kaboom";
import k from "../kaboom";
import Stats from "./stats";

export default class Character {
    
    name: string;
    stats: Stats;
    gameObject: GameObj;

    constructor(name: string, stats: Stats, tag: string, sprite: string, x: number, y: number) {
        this.name = name;
        this.stats = stats;
        this.gameObject = this.createGameObject(tag, sprite, x, y);
    }

    createGameObject(tag: string, sprite: string, x: number, y: number) {
        const character = k.add([
            k.sprite(sprite),
            k.z(100),
            k.pos(x, y),
            k.area(),
            k.body(),
            k.anchor("botleft"),
            tag,
            this.name,
            this.stats
        ]);
    
        // Health Bar
        let health = character.add([
            k.text(character.health + "/" + character.healthMax, { size: 24 }),
            k.color(255, 255, 255),
            k.pos(character.width / 2, character.height / 2 - 10),
            k.anchor("center"),
        ]);
        health.onUpdate(() => {
            health.text = character.health + "/" + character.healthMax
        });

        // Todo: Death
        // Todo: Animations (Cast, Hit, Death, Spawn?, Victory?)
    
        return character;
    }
}
