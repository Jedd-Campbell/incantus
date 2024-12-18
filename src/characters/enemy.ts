import k from "../kaplay";
import Aquae from "../spells/aquae";
import Impedio from "../spells/impedio";
import Impetus from "../spells/impetus";
import SpellEffect from "../spells/spell-effect";
import Utils from "../utils";
import Character from "./character";
import Stats from "./stats";

export default class Enemy extends Character {

    constructor(name: string, stats: Stats, base: Stats) {
        const startPosition = k.vec2(k.width() - 250, 250);
        const castPoint = k.vec2(startPosition.x - 100, startPosition.y - 100);
        super(name, stats, base, "enemy", "red", startPosition, castPoint);
    }

    startSpellCasting(player: Character) {
        if (this.dead) return;

        let spellEffect = new SpellEffect(this);
        let spellChoices = [
            [new Aquae(), new Impetus(), player],
            // [new Aquae(), new Impedio(), this],
        ];
        const spellChoice = Utils.randomInteger(0, spellChoices.length - 1);
        const utterances = spellChoices[spellChoice];

        // Update cast text every second
        const fps = 10;
        const frameTime = 1 / fps;
        const castTime = 5; // Utils.randomInteger(6, 12);
        let timeLeft = castTime * fps;

        k.loop(frameTime, () => {
            const percentage = Math.max(1 - ((timeLeft / (castTime * fps))), 0);
            this.gameObject.castPercentage = percentage;
            this.gameObject.castText = utterances.map(i => i.name).join(" ") + "!";
            timeLeft--;
        }, castTime * fps);

        // Wait for cast time, then cast spell
        const waitTime = 1; // Utils.randomInteger(2, 6);
        k.wait(castTime, () => {
            if (this.dead) return;

            spellEffect.parseUtterances(utterances);
            this.gameObject.castText = "...";
            this.gameObject.castPercentage = 0;
            k.wait(waitTime, () => {
                this.startSpellCasting(player);
            })
        });

    }
}