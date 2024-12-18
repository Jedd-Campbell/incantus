import k from "../kaplay";
import Aquae from "../spells/aquae";
import Ignis from "../spells/ignis";
import Impedio from "../spells/impedio";
import Impetus from "../spells/impetus";
import Spell from "../spells/spell";
import SpellEffect from "../spells/spell-effect";
import Utils from "../utils";
import Character from "./character";
import Stats from "./stats";

export default class Enemy extends Character {

    constructor(name: string, stats: Stats, base: Stats) {
        super(name, stats, base, "enemy", "red", k.width() - 250, 250);
    }

    startSequence(player: Character) {

    }

    castSpell(player: Character) {
        let spellEffect = new SpellEffect(this);
        let spellChoices = [
            [new Aquae(), new Impetus(), player],
            [new Aquae(), new Impedio(), this],
        ];
        const spellChoice = Utils.randomInteger(0, spellChoices.length - 1);
        const utterances = spellChoices[spellChoice];

        // Update cast text every second
        const fps = 10;
        const frameTime = 1 / fps;
        const castTime = Utils.randomInteger(6, 12);
        let timeLeft = castTime * fps;
        k.loop(frameTime, () => {
            const percentage = Math.max(1 - ((timeLeft / (castTime * fps))), 0);
            this.gameObject.castPercentage = percentage;
            this.gameObject.castText = utterances.map(i => i.name).join(" ") + "!";
            timeLeft--;
            console.log(fps, frameTime, percentage, timeLeft)
        }, castTime * fps);

        // Wait for cast time, then cast spell
        const waitTime = Utils.randomInteger(2, 6);
        k.wait(castTime, () => {
            spellEffect.parseUtterances(utterances);
            this.gameObject.castText = "...";
            this.gameObject.castPercentage = 0;
            k.wait(waitTime, () => {
                this.castSpell(player);
            })
        });

    }
}