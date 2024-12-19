import { GameObj, SpriteComp, Vec2 } from "kaplay";
import k from "../kaplay";

export default class VFX {

    constructor() {

    }

    public static createProjectile(castPoint: Vec2, target: Vec2, sprite: SpriteComp, ttl: number, speed: number): GameObj {
        const d = target.sub(castPoint).unit();
        const a = target.angle(castPoint);
        let object = k.add([
            sprite,
            k.z(110),
            k.pos(castPoint.x, castPoint.y),
            k.rotate(a),
            k.anchor("center"),
            k.body(),
            k.area({ collisionIgnore: ["projectile"] }),
            "projectile",
            { dir: d },
        ]);
        object.onUpdate(() => {
            object?.move(object.dir.scale(speed));
        });
        VFX.destroyAfterSomeTime(object, ttl);
        return object;
    }

    public static createShield(point: Vec2, sprite: SpriteComp, ttl: number): GameObj {
        let object = k.add([
            sprite,
            k.z(110),
            k.scale(2),
            k.rotate(0),
            k.pos(point.x, point.y),
            k.anchor("center"),
            "shield",
        ]);
        let ring1 = object.add([
            sprite,
            k.z(111),
            k.rotate(30),
            k.pos(0,0),
            k.anchor("center"),
            "shield",
        ]);
        ring1.flipX = true;
        object.onUpdate(() => {
            object.angle += k.dt() * 30;
        });
        ring1.onUpdate(() => {
            ring1.angle += k.dt() * -60;
        });
        // ring2.onUpdate(() => {
        //     ring2.angle += k.dt() * 40;
        // });
        VFX.destroyAfterSomeTime(object, ttl);
        return object;
    }

    public static fizzle(point: Vec2, sprite: SpriteComp, ttl: number) {
        // todo
    }

    public static destroyAfterSomeTime(object: GameObj, ttl: number) {
        k.wait(ttl, () => {
            VFX.destroyImmediately(object);
        });
    }

    public static destroyImmediately(object: GameObj) {
        if (!object) return;
        object.destroy();
    }
}
