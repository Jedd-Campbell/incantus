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

    private static createPlayer(spells: Spell[]) {
        const names = ["Eric", "Admus", "Narkin", "Hazelix", "Seldrest", "Moradeane"];
        const nameIndex = Utils.randomInteger(0, names.length - 1);
        const player = new Player(names[nameIndex], new Stats(), spells);
        return player;
    }

    private static createEnemy(level: number) {

        // todo: buff stats
        switch (level) {
            case 0: return new Enemy("Dummy", new Stats(), "dummy");
            case 1: return new Enemy("Dummy", new Stats(), "dummy");
            case 2: return new Enemy("Zog", new Stats(), "shaman");
            default: return Level.randomizedEnemy(level);
        }
    }

    
    private static randomizedEnemy(level: number) {
        return new Enemy("Dummy", new Stats(), "dummy");
    }

    private static getPlayerSpells(level: number) {

        return SpellBook.getSpells().filter(spell => spell.level <= level)
    }

    private static getEnemySpellSequences(level: number, player: Character, enemy: Enemy): SpellSequence[] {
        const sequences = [
            new SpellSequence(1, [enemy, new Protectio(), new Ignis()]),
            new SpellSequence(2, [player, new Impetus(), new Ignis()]),
        ];

        return sequences.filter(s => s.level <= level);
    }

    static createLevel(level: number): Level {
        const spells = Level.getPlayerSpells(level);
        const player = Level.createPlayer(spells);
        const enemy = Level.createEnemy(level);
        const spellSequences = Level.getEnemySpellSequences(level, player, enemy);
        enemy.startSpellCasting(player, spellSequences);

        return new Level(level, player, enemy);
    }
}