import k from "../kaboom";

export default function Enemy(stats: { name: string, health: number, healthMax: number }) {
    const npc = k.add([
        k.sprite("red"),
        k.z(100),
        k.pos(k.width() - 150, 150),
        k.area(),
        k.body(),
        k.anchor("botleft"),
        "enemy",
        stats.name,
        stats
    ]);

    let health = npc.add([
        k.text(npc.health + "/" + npc.healthMax, { size: 24 }),
        k.color(255, 255, 255),
        k.pos(npc.width / 2, npc.height / 2 - 10),
        k.anchor("center"),
    ]);

    health.onUpdate(() => {
        health.text = npc.health + "/" + npc.healthMax
    });

    return npc;
}