import Character from "../characters/character";

export const enum SpellType {
    Root = "Root",
    Intent = "Intent",
}

export const enum SpellBehavior {
    Instant = "Instant",
    Lingering = "Lingering",
    Projectile = "Projectile",
}

export default interface Spell {
    name: string;
    type: SpellType;
    fizzle: boolean;
    effect(player: Character, target: Character);
}
