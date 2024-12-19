import Spell from "./spell";
import Character from "../characters/character";
import { Key } from "kaplay";
import SpellEffect from "./spell-effect";

export default class SpellCastResolver {
    // resolved: boolean = false;
    keys: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "enter", "space"];
    previousKey: string = "";

    caster: Character;
    targets: Character[] = [];
    chain: (Spell | Character)[] = [];

    targetsMatch: any[] = [];
    spellsMatch: any[] = [];

    command: string = "";

    constructor(caster: Character, targets: Character[]) {
        this.caster = caster;
        this.targets = targets;
    }

    parse(key: Key) {
        if (this.caster.dead) {
            return;
        }
        
        if (this.keys.includes(key.toString())) {
            this.processCast(key);
            this.resolveCast(key);
            this.previousKey = key;
            // this.resolved = false;
            this.setCastText();
        }
    }

    private processCast(key: Key) {
        // if (!this.resolved) {

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
                        this.chain.push(this.spellsMatch[0]);
                    }
                    if (this.targetsMatch?.length > 0) {
                        this.chain.push(this.targetsMatch[0]);
                    }
                }
                this.command = "";
            }
        // }
    }

    private resolveCast(key: Key) {
        if (key === "enter") {
            let spellEffect = new SpellEffect(this.caster);
            spellEffect.parseSpellChain(this.chain);

            // Reset caster
            // this.resolved = true;
            this.previousKey = "";
            this.command = "";
            this.targetsMatch = this.targets;
            this.spellsMatch = this.caster.spells;
            this.chain = [];
        }
    }

    private partialMatch(key: Key) {
        if (key === "space") {
            return false;
        }

        const match = this.command + key;
        const isSpellMatch = this.caster.spells?.some((s) => s.name?.toLowerCase().slice(0, match.length) === match);
        const isTargetMatch = this.targets?.some((t) => t.name?.toLowerCase().slice(0, match.length) === match);
        return isSpellMatch || isTargetMatch;
    }

    private fullMatch() {
        const match = this.command;
        this.spellsMatch = this.caster.spells?.filter((s) => s.name?.toLowerCase() === match);
        this.targetsMatch = this.targets?.filter((t) => t.name?.toLowerCase() === match);
        return this.spellsMatch?.length > 0 || this.targetsMatch?.length > 0;
    }

    setCastText() {
        this.caster.gameObject.castText = (this.chain.map(i => i.name).join(" ") + " " + this.command).toLowerCase();
    }
}
