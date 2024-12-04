import k from "../kaboom";

k.scene("menu", () => {

    k.add([
        k.text("Incantus", { size: 60 }),
        k.color(255, 255, 255),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press ENTER to start", { size: 24 }),
        k.color(255, 255, 255),
        k.pos(k.width() / 2, k.height() / 2 + 40),
        k.anchor("center"),
    ]);


    k.onKeyPress("enter", () => {
        k.go("game");
    });
});