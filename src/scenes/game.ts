import k from "../kaboom";
import Incantation from "../spells/incantation";
import Player from "../characters/player";
import Enemy from "../characters/enemy";
import Character from "../characters/character";
import Stats from "../characters/stats";
import Spell from "../spells/spell";
import Ignis from "../spells/ignis";

k.scene("game", () => {

    const projectileSpeed = 1000;

    const player = new Player("auto", new Stats());
    const enemy = new Enemy("minion", new Stats());

    let caster = new Incantation(
        [
            new Ignis(),
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
        spellText.text = caster.getCastText()
    });

    // Game logic

    k.onCollide("enemy", "projectile", (a, b) => {
        b.hit = true;
        b.destroy();
        a.health = Math.max(0, a.health - 10);
    })

    k.onUpdate("projectile", (a) => {
        a.move(a.dir.scale(projectileSpeed));
    });

    function castSpell(target: Character, incantations: Spell[]) {

        // const d = target.gameObject.pos.sub(player.gameObject.pos).unit();
        // const a = target.gameObject.pos.angle(target.gameObject.pos);

        // let projectile = k.add([
        //     k.pos(player.gameObject.pos.x + 100, player.gameObject.pos.y - 100),
        //     k.rotate(a),
        //     k.sprite("fire"),
        //     k.anchor("center"),
        //     k.body(),
        //     k.area(),
        //     "projectile",
        //     { dir: d, hit: false },
        // ]);
        // k.wait(3, () => {
        //     if (projectile) {
        //         projectile.destroy();
        //     }
        // });

    }
})
