import k from "../kaboom";
import Incantation from "../spells/incantation";
import Player from "../characters/player";
import Enemy from "../characters/enemy";
import Character from "../characters/character";
import Stats from "../characters/stats";
import Spell from "../spells/spell";
import Ignis from "../spells/ignis";
import Aquae from "../spells/aquae";
import SpellEffect from "../spells/spell-effect";

k.scene("game", () => {

    const projectileSpeed = 1000;

    const player = new Player("auto", new Stats(), new Stats());
    const enemy = new Enemy("minion", new Stats(), new Stats());
    const targets = [player, enemy];
    const spells = [
        new Ignis(),
        new Aquae(),
    ];

    let caster = new Incantation(spells, targets);

    // Controls
    k.onKeyPress((key) => {
        caster.parse(key, castSpell);
    });

    k.onKeyPress("escape", () => {
        k.go("menu");
    });

    // UI
    k.add([
        k.rect(k.width() - 10, 50),
        k.color(0, 0, 0),
        k.pos(5, k.height() - 5),
        k.anchor("botleft"),
        k.z(100),
        k.fixed(),
        k.opacity(0.3),
    ]);

    let spellText = k.add([
        k.text("Spell System Test", { size: 24 }),
        k.color(255, 255, 255),
        k.pos(30, k.height() - 30),
        k.z(101),
        k.anchor("left"),
    ]);

    spellText.onUpdate(() => {
        spellText.text = caster.getIncantationText()
    });

    // Game logic

    k.loop(1, () => {
        targets.forEach((t) => t.applySpellEffects())
    });

    k.onCollide("enemy", "projectile", (a, b) => {
        b.hit = true;
        b.destroy();
        a.stats.health = Math.max(0, a.stats.health - 10);
    })

    k.onUpdate("projectile", (a) => {
        a.move(a.dir.scale(projectileSpeed));
    });

    function castSpell(utterances: (Spell | Character)[]) {

        console.log(utterances);

        // todo: create spell effect

        let spellEffect = new SpellEffect(player);
        utterances.forEach(utterance => {
            if (utterance instanceof Character) {
                spellEffect.target = enemy;
            } else if (utterance.modifySpellEffect) {
                utterance.modifySpellEffect(spellEffect);
            }
        });
        spellEffect.applySpellEffect();



    }
})
