import Spell from "./spell";
import Character from "../characters/character";
import { Key } from "kaplay";

export default class Incantation {
    resolved: boolean = false;
    keys: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "enter", "space"];
    previousKey: string = "";

    targets: Character[] = [];
    spells: Spell[] = [];

    targetsMatch: any[] = [];
    spellsMatch: any[] = [];

    utterances: (Spell | Character)[] = [];
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
                        this.utterances.push(this.spellsMatch[0]);
                    }
                    if (this.targetsMatch?.length > 0) {
                        this.utterances.push(this.targetsMatch[0]);
                    }
                }
                this.command = "";
            }
        }
    }

    private resolveCast(key: Key, castSpell: (utterances: (Spell | Character)[]) => any) {
        if (key === "enter") {
            if(castSpell) {
                castSpell(this.utterances);
            }

            // Reset caster
            this.resolved = true;
            this.previousKey = "";
            this.command = "";
            this.targetsMatch = this.targets;
            this.spellsMatch = this.spells;
            this.utterances = [];
        }
    }

    private partialMatch(key: Key) {
        if (key === "space") {
            return false;
        }

        const match = this.command + key;
        const isSpellMatch = this.spells?.some((s) => s.name?.toLowerCase().slice(0, match.length) === match);
        const isTargetMatch = this.targets?.some((t) => t.name?.toLowerCase().slice(0, match.length) === match);
        return isSpellMatch || isTargetMatch;
    }

    private fullMatch() {
        const match = this.command;
        this.spellsMatch = this.spells?.filter((s) => s.name?.toLowerCase() === match);
        this.targetsMatch = this.targets?.filter((t) => t.name?.toLowerCase() === match);
        return this.spellsMatch?.length > 0 || this.targetsMatch?.length > 0;
    }

    getIncantationText() {
        return this.utterances.map(i => i.name).join(" ") + " " + this.command;
    }
}
