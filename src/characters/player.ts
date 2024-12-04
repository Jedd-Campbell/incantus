import k from "../kaboom";

export default function Player(stats: { name: string, health: number, healthMax: number }) {
    const player = k.add([
        k.sprite("blue"),
        k.z(100),
        k.pos(100, k.height() - 100),
        k.area(),
        k.body(),
        k.anchor("botleft"),
        "player",
        stats
    ]);

    let health = player.add([
        k.text(player.health + "/" + player.healthMax, { size: 24 }),
        k.color(255, 255, 255),
        k.pos(player.width / 2, player.height / 2 - 10),
        k.anchor("center"),
    ]);

    health.onUpdate(() => {
        health.text = player.health + "/" + player.healthMax
    });

    return player;
}