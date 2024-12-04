import Character from "../characters/character";
import Spell, { SpellType } from "./spell";

export default class Ignis implements Spell {

    constructor() {
        this.name = "ignis";
        this.type = SpellType.Root;
    }

    name: string;
    type: SpellType;
    fizzle: boolean;

    effect(player: Character, target: Character) {
        // Fizzle
        if (!player || !target || target.name === player.name) {
            this.fizzle = true;
            return;
        };

        // Effect
        target.stats.health = Math.max(0, target.stats.health - 10);
    }

}
