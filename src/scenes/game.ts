import k from "../kaplay";
import Incantation from "../spells/incantation";
import Player from "../characters/player";
import Enemy from "../characters/enemy";
import Character from "../characters/character";
import Stats from "../characters/stats";
import Spell from "../spells/spell";
import Ignis from "../spells/ignis";
import Aquae from "../spells/aquae";
import SpellEffect from "../spells/spell-effect";
import Impetus from "../spells/impetus";
import Impedio from "../spells/impedio";
import Utils from "../utils";

k.scene("game", () => {
    // k.debug.inspect = true;
    const projectileSpeed = 1500;

    const names = ["Hazelix", "Odelius", "Thigron", "Exon", "Stora", "Seldrest"];
    const nameIndex = Utils.randomInteger(0, names.length - 1);

    const player = new Player(names[nameIndex], new Stats(), new Stats());
    const enemy = new Enemy("Minion", new Stats(), new Stats());
    const targets = [player, enemy];
    const spells = [
        // intents
        new Impetus(),
        new Impedio(),

        // roots
        new Ignis(),
        new Aquae(),
    ];

    let caster = new Incantation(spells, targets);

    enemy.castSpell(player);

    // Controls
    k.onKeyPress((key) => {
        caster.parse(key, castSpell);
    });

    k.onKeyPress("escape", () => {
        k.go("menu");
    });

    k.onUpdate(() => {
        player.gameObject.castText = caster.getIncantationText()
    });

    // Game logic

    k.loop(1, () => {
        targets.forEach((t) => t.applySpellEffects())
    });

    k.onCollide("character", "projectile", (a, b) => {
        b.hit = true;
        b.destroy();
        a.stats.health = Math.max(0, a.stats.health - 10);
    })

    k.onUpdate("projectile", (a) => {
        a.move(a.dir.scale(projectileSpeed));
    });

    function castSpell(utterances: (Spell | Character)[]) {
        let spellEffect = new SpellEffect(player);
        spellEffect.parseUtterances(utterances);
    }
})
