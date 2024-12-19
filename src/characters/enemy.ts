import k from "../kaplay";
import SpellEffect from "../spells/spell-effect";
import SpellSequence from "../spells/spell-sequence";
import Utils from "../utils";
import Character from "./character";
import Stats from "./stats";

export default class Enemy extends Character {


    constructor(name: string, stats: Stats, sprite: string) {
        const offset = 150;
        const startPosition = k.vec2(k.width() - offset, offset);
        const castPoint = k.vec2(startPosition.x - 100, startPosition.y - 100);
        super(name, stats, "enemy", sprite, startPosition, castPoint);
    }

    startSpellCasting(player: Character, spellSequences: SpellSequence[]) {
        if (this.dead || spellSequences?.length === 0) return;

        let spellEffect = new SpellEffect(this);
        const spellChoice = Utils.randomInteger(0, spellSequences.length - 1);
        const sequence = spellSequences[spellChoice];

        // Update cast bar every second
        const fps = 10;
        const frameTime = 1 / fps;
        const castTime = Utils.randomInteger(10, 20);
        let timeLeft = castTime * fps;
        k.loop(frameTime, () => {
            const percentage = Math.max(1 - ((timeLeft / (castTime * fps))), 0);
            this.gameObject.castPercentage = percentage;
            this.gameObject.castText = sequence.spells.map(i => i.name).join(" ") + "!";
            timeLeft--;
        }, castTime * fps);

        // Wait for cast time, then cast spell
        const waitTime = Utils.randomInteger(2, 6);
        k.wait(castTime, () => {
            if (this.dead) return;

            spellEffect.parseSpellChain(sequence.spells);
            this.gameObject.castText = "...";
            this.gameObject.castPercentage = 0;
            k.wait(waitTime, () => {
                this.startSpellCasting(player, spellSequences);
            })
        });

    }
}