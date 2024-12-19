import k from "../kaplay";
import SpellCastResolver from "../spells/spell-cast-resolver";
import Player from "../characters/player";
import Enemy from "../characters/enemy";
import Stats from "../characters/stats";
import Utils from "../utils";
import SpellBook from "../spells/spell-book";
import Level from "../level";

k.scene("game", (args) => {
    // k.debug.inspect = true;


    const level = Level.createLevel(args.level);
    const resolver = new SpellCastResolver(level.player, [level.player, level.enemy]);

    // Controls
    k.onKeyPress((key) => {
        resolver.parse(key);
    });
    k.onKeyPress("escape", () => {
        k.go("menu");
    });

    // Game logic
    k.onUpdate(() => {
        if (level.player.stats.health <= 0) {
            k.go("defeat", { level });
        }
        if (level.enemy.stats.health <= 0) {
            k.go("victory", { level });
        }
    });

    // environment
    k.add([
        k.sprite("ground"),
        k.z(10),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.scale(),
    ]);

    // ui
    k.add([
        k.text("Level " + args.level, { size: 24 }),
        k.color(255, 255, 255),
        k.pos(50, 50),
        k.anchor("topleft"),
        k.z(20),
    ]);
    SpellBook.showSpellBook(level.player.spells);
})
