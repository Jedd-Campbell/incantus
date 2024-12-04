import Character from "../characters/character";
import { SpellType } from "./spell-type";

export default interface Spell {
    name: string;
    type: SpellType;
    effect(player: Character, target: Character);
}
