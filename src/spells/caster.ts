import { GameObj, Key } from "kaboom";
import Spell from "./spell";

export default class Caster {
    player: GameObj;
    resolved: boolean = false;
    keys: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "enter", "space"];
    previousKey: string = "";

    targets: GameObj[] = [];
    spells: Spell[] = [];

    targetsMatch: any[] = [];
    spellsMatch: any[] = [];

    incantation: any[] = [];
    command: string = "";

    constructor(player: GameObj, spells: Spell[], targets: GameObj[]) {
        this.player = player;
        this.spells = spells;
        this.targets = targets;
    }

    parse(key: Key, castSpell) {
        if (this.keys.includes(key.toString())) {
            this.resolveCast(key, castSpell);
            this.processCast(key);
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
            if (key === "space") {
                if (this.fullMatch()) {
                    if (this.spellsMatch?.length > 0) {
                        this.incantation.push(this.spellsMatch[0]);
                    }
                    if (this.targetsMatch?.length > 0) {
                        this.incantation.push(this.targetsMatch[0]);
                    }
                }
                this.command = "";
            }
        }
    }

    private resolveCast(key: Key, castSpell: (player, target, effect) => any) {
        if (key === "enter") {
            console.log("resolved")
            // todo: Resolve cast  
            if(castSpell) {
                let effect = true; // todo: build effect from incantation
                castSpell(this.player, this.targetsMatch[0] ?? this.player, effect);
            }

            // Reset caster
            this.resolved = true;
            this.previousKey = "";
            this.command = "";
            this.targetsMatch = this.targets;
            this.spellsMatch = this.spells;
            this.incantation = [];
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
        this.spellsMatch = this.spells?.filter((spell) => spell.name === match);
        this.targetsMatch = this.targets?.filter((target) => target.name === match);
        return this.spellsMatch?.length > 0 || this.targetsMatch?.length > 0;
    }

    getCastText() {
        return this.incantation.map(i => i.name).join(" ") + " " + this.command;
    }
}
