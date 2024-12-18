import k from "../kaplay";
import SpellCastResolver from "../spells/spell-cast-resolver";
import Player from "../characters/player";
import Enemy from "../characters/enemy";
import Stats from "../characters/stats";
import Ignis from "../spells/ignis";
import Aquae from "../spells/aquae";
import Impetus from "../spells/impetus";
import Impedio from "../spells/impedio";
import Utils from "../utils";

k.scene("game", (args) => {
    // k.debug.inspect = true;
    const projectileSpeed = 1500;

    const names = ["Eric", "Admus", "Narkin", "Hazelix", "Seldrest", "Moradeane"];
    const nameIndex = Utils.randomInteger(0, names.length - 1);

    const player = new Player(names[nameIndex], new Stats(), new Stats());
    const enemy = new Enemy("Dummy", new Stats(), new Stats());
    const targets = [player, enemy];
    const spells = [
        // intents
        new Impetus(),
        new Impedio(),

        // roots
        new Ignis(),
        new Aquae(),
    ];

    let incantation = new SpellCastResolver(player, spells, targets);

    // enemy.startSpellCasting(player);

    // Controls
    k.onKeyPress((key) => {
        incantation.parse(key);
    });
    k.onKeyPress("escape", () => {
        k.go("menu");
    });

    // Game logic
    k.onUpdate(() => {
        if (player.stats.health <= 0) {
            k.go("defeat", { enemy });
        }
        if (enemy.stats.health <= 0) {
            k.go("victory", { enemy, level: args.level });
        }
    });

    k.onCollide("character", "projectile", (a, b) => {
        b.hit = true;
        b.destroy();
        a.stats.health = Math.max(0, a.stats.health - 10);
    })
})
