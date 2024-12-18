import { GameObj, ShaderComp, SpriteComp, Vec2 } from "kaplay";
import k from "../kaplay";

export default class VFX {

    constructor() {

    }

    public static createProjectile(castPoint: Vec2, target: Vec2, sprite: SpriteComp, shader: ShaderComp, ttl: number, speed: number) {
        const d = target.sub(castPoint).unit();
        const a = target.angle(castPoint);

        let projectile = k.add([
            sprite,
            shader,
            k.z(110),
            k.pos(castPoint.x, castPoint.y),
            k.rotate(a),
            k.anchor("center"),
            k.body(),
            k.area({collisionIgnore: ["projectile"]}),
            "projectile",
            { dir: d, hit: false },
        ]);
        projectile.onUpdate(() => {
            projectile.move(projectile.dir.scale(speed));
        });
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
