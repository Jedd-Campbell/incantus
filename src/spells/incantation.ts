import { Key } from "kaboom";
import Spell from "./spell";
import Character from "../characters/character";

export default class Incantation {
    resolved: boolean = false;
    keys: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "enter", "space"];
    previousKey: string = "";

    targets: Character[] = [];
    spells: Spell[] = [];

    targetsMatch: any[] = [];
    spellsMatch: any[] = [];

    commands: any[] = [];
    command: string = "";

    constructor(spells: Spell[], targets: Character[]) {
        this.spells = spells;
        this.targets = targets;
    }

    parse(key: Key, castSpell) {
        if (this.keys.includes(key.toString())) {
            this.processCast(key);
            this.resolveCast(key, castSpell);
            this.previousKey = key;
            this.resolved = false;
        }
    }

    private processCast(key: Key) {
        if (!this.resolved) {

            // todo: tally up errors and modify incantation based on errors
            // todo: consider incantation fizzle after 5 errors

            // Set constituents
            if (this.partialMatch(key)) {
                this.command += key;
            }

            // invoke
            if (key === "space" || key === "enter") {
                if (this.fullMatch()) {
                    if (this.spellsMatch?.length > 0) {
                        this.commands.push(this.spellsMatch[0]);
                    }
                    if (this.targetsMatch?.length > 0) {
                        this.commands.push(this.targetsMatch[0]);
                    }
                }
                this.command = "";
            }
        }
    }

    private resolveCast(key: Key, castSpell: (target, effect) => any) {
        if (key === "enter") {
            // todo: Resolve cast  
            if(castSpell) {
                let effect = true; // todo: build effect from incantation
                castSpell(this.targetsMatch[0], effect);
            }

            // Reset caster
            this.resolved = true;
            this.previousKey = "";
            this.command = "";
            this.targetsMatch = this.targets;
            this.spellsMatch = this.spells;
            this.commands = [];
        }
    }

    private partialMatch(key: Key) {
        if (key === "space") {
            return false;
        }

        const match = this.command + key;
        const isSpellMatch = this.spells?.some((s) => s.name.slice(0, match.length) === match);
        const isTargetMatch = this.targets?.some((t) => t.name.slice(0, match.length) === match);
        return isSpellMatch || isTargetMatch;
    }

    private fullMatch() {
        const match = this.command;
        this.spellsMatch = this.spells?.filter((s) => s.name === match);
        this.targetsMatch = this.targets?.filter((t) => t.name === match);
        return this.spellsMatch?.length > 0 || this.targetsMatch?.length > 0;
    }

    getCastText() {
        return this.commands.map(i => i.name).join(" ") + " " + this.command;
    }
}
