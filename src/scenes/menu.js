import k from "../kaboom";

k.scene("menu", () => {

    add([
        text("Incantus", { size: 60 }),
        color(255, 255, 255),
        pos(width() / 2, height() / 2),
        anchor("center"),
    ]);

    add([
        text("Press ENTER to start", { size: 24 }),
        color(255, 255, 255),
        pos(width() / 2, height() / 2 + 40),
        anchor("center"),
    ]);


    onKeyPress("enter", () => {
        k.go("game");
    });
});