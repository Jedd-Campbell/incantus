import Character from "../characters/character";
import Spell from "./spell";
import { SpellType } from "./spell-type";

export default class Ignis implements Spell {

    constructor() {
        this.name = "ignis";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;

    effect(player: Character, target: Character) {
        // Fizzle
        if (!player || !target || target.name === player.name) {
            return;
        };

        // Effect
        target.stats.health = Math.max(0, target.stats.health - 10);
    }

}
