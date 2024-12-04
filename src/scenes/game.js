import k from "../kaboom";
import SpellType from "../spells/spell-type";
import Caster from "../spells/caster";
import Player from "../characters/player";
import Enemy from "../characters/enemy";

k.scene("game", () => {

    const projectileSpeed = 1000;

    const player = Player({ health: 100, healthMax: 100, name: "auto" });
    const enemy = Enemy({ health: 100, healthMax: 100, name: "minion" });

    let caster = new Caster(
        player,
        [
            { name: "ignisb", type: SpellType.Intent },
            { name: "ignisa", type: SpellType.Intent },
            { name: "putrid", type: SpellType.Intent },
        ],
        [
            player,
            enemy
        ]
    );

    // Controls
    k.onKeyPress((key) => {
        caster.parse(key, castSpell);
    });

    k.onKeyPress("escape", () => {
        k.go("menu");
    });

    // UI
    add([
        rect(width() - 10, 50),
        color(0, 0, 0),
        pos(5, height() - 5),
        anchor("botleft"),
        z(100),
        fixed(),
        opacity(0.3),
    ]);

    let spellText = add([
        text("Spell System Test", { size: 24 }),
        color(255, 255, 255),
        pos(30, height() - 30),
        z(101),
        anchor("left"),
    ]);

    spellText.onUpdate(() => {
        spellText.text = caster.getCastText()
    });

    // Game logic

    onCollide("enemy", "projectile", (a, b) => {
        b.hit = true;
        b.destroy();
        a.health = Math.max(0, a.health - 10);
    })

    onUpdate("projectile", (a) => {
        a.move(a.dir.scale(projectileSpeed))
    });

    function castSpell(player, target, effect) {
        if (!player && !target && !effect) {
            // todo: fizzle
            return;
        }
        const d = target.pos.sub(player.pos).unit();
        const a = target.pos.angle(player.pos);
        let projectile = add([
            pos(player.pos.x + 100, player.pos.y - 100),
            rotate(a),
            sprite("fire"),
            anchor("center"),
            body(),
            area(),
            "projectile",
            { dir: d, hit: false },
        ]);
        wait(10, () => {
            if (projectile) {
                projectile.destroy();
            }
        });

    }
})
