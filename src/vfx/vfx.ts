import { GameObj, ShaderComp, SpriteComp, Vec2 } from "kaplay";
import k from "../kaplay";

export default class VFX {

    constructor() {

    }

    public static createProjectile(pointA: Vec2, pointB: Vec2, sprite: SpriteComp, shader: ShaderComp, ttl: number) {
        const d = pointB.sub(pointA).unit();
        const a = pointB.angle(pointA);

        console.log(pointA);
        console.log(pointB);

        let projectile = k.add([
            sprite,
            shader,
            k.z(110),
            k.pos(pointA.x, pointA.y),
            k.rotate(a),
            k.anchor("center"),
            k.body(),
            k.area(),
            "projectile",
            { dir: d, hit: false },
        ]);
        k.wait(ttl, () => {
            if (projectile) {
                projectile.destroy();
            }
        });
    }

    public static createShield(point: Vec2, sprite: SpriteComp, shader: ShaderComp, ttl: number) {

        let shield = k.add([
            sprite,
            shader,
            k.z(110),
            k.pos(point.x, point.y),
            k.anchor("center"),
            "shield",
        ]);
        k.wait(ttl, () => {
            if (shield) {
                shield.destroy();
            }
        });
    }
}
