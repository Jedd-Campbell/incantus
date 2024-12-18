import { ShaderComp, SpriteComp } from "kaplay";
import SpellEffect from "./spell-effect";

export default interface Spell {
    name: string;
    modifySpellEffect(effect: SpellEffect);
    shader(): ShaderComp;
    sprite(): SpriteComp;
}
