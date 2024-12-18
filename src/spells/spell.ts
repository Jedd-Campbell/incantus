import { ShaderComp, SpriteComp } from "kaplay";
import SpellEffect from "./spell-effect";
import { SpellType } from "./spell-type";

export default interface Spell {
    name: string;
    type: SpellType;
    modifySpellEffect(effect: SpellEffect);
    shader(): ShaderComp;
    sprite(): SpriteComp;
}
