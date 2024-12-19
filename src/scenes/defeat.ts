import k from "../kaplay";
import Level from "../level";

k.scene("defeat", (args: {level: Level}) => {
    // k.debug.inspect = true;
    k.add([
        k.text("Defeated by " + args.level.enemy.name, { size: 60 }),
        k.color(201, 29, 20),
        k.pos(k.width() / 2, k.height() / 2 - 100),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press ENTER to try again", { size: 24 }),
        k.color(255, 255, 255),
        k.pos(k.width() / 2, k.height() / 2 - 30),
        k.anchor("center"),
    ]);

    k.add([
        k.sprite(args.level.enemy.sprite),
        k.pos(k.width() / 2, k.height() / 2 + 80),
        k.anchor("center"),
        k.scale(2)
    ]);


    k.onKeyPress("enter", () => {
        k.go("game", {level: 1, playerName: args.level.player.name});
    });
});