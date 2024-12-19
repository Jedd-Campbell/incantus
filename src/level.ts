import Character from "./characters/character";
import Enemy from "./characters/enemy";
import Player from "./characters/player";
import Stats from "./characters/stats";
import Aquae from "./spells/aquae";
import Ignis from "./spells/ignis";
import Protectio from "./spells/protectio";
import Impetus from "./spells/impetus";
import Spell from "./spells/spell";
import SpellBook from "./spells/spell-book";
import SpellSequence from "./spells/spell-sequence";
import Utils from "./utils";


export default class Level {

    level: number = 0;
    player: Character;
    enemy: Enemy;

    constructor(level: number, player: Character, enemy: Enemy,) {
        this.level = level;
        this.player = player;
        this.enemy = enemy;
    }

    private static createPlayer(spells: Spell[], name: string) {
        if (!name) {
            const names = ["Eric", "Admus", "Narkin", "Hazelix", "Seldrest", "Moradeane"];
            const nameIndex = Utils.randomInteger(0, names.length - 1);
            name = names[nameIndex];
        }
        const player = new Player(name, new Stats(), spells);
        return player;
    }

    private static createEnemy(level: number) {

        // todo: buff stats
        switch (level) {
            case 0: return new Enemy("Dummy", new Stats(4), "dummy");
            case 1: return new Enemy("Strawman", new Stats(10), "dummy");
            case 2: return new Enemy("Scarecrow", new Stats(15), "dummy");
            case 3: return new Enemy("ZugZug", new Stats(50), "shaman");
            case 4: return new Enemy("Gorbag", new Stats(60), "shaman");
            default: return Level.randomizedEnemy(level);
        }
    }


    private static randomizedEnemy(level: number) {
        const hp = 50 + (level * 5);
        return new Enemy("Dummy", new Stats(hp), "shaman");
    }

    private static getPlayerSpells(level: number) {

        return SpellBook.getSpells().filter(spell => spell.level <= level)
    }

    private static getEnemySpellSequences(level: number, player: Character, enemy: Enemy): SpellSequence[] {
        const sequences = [
            new SpellSequence(1, [player, new Impetus()]),
            new SpellSequence(1, [enemy, new Protectio()]),

            new SpellSequence(2, [enemy, new Protectio(), new Aquae()]),
            new SpellSequence(2, [player, new Impetus(), new Ignis()]),
            new SpellSequence(2, [player, new Impetus(), new Aquae()]),
        ];

        return sequences.filter(s => s.level <= level);
    }

    // todo: pass player through instead of re-creating
    static createLevel(level: number, playerName: string): Level {
        const spells = Level.getPlayerSpells(level);
        const player = Level.createPlayer(spells, playerName);
        const enemy = Level.createEnemy(level);
        const spellSequences = Level.getEnemySpellSequences(level, player, enemy);
        enemy.startSpellCasting(player, spellSequences);

        return new Level(level, player, enemy);
    }
}
