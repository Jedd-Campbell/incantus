import Spell from "./spell";
import SpellType from "./spell-type";

export default class Ignis extends Spell implements SpellEffectDec {

    constructor() {
        super();
        this.name = "ignis";
        this.type = SpellType.Root;
    }
    
    healthEffect(): number {
        throw new Error("Method not implemented.");
    }
    manaEffect(): number {
        throw new Error("Method not implemented.");
    }
    damageEffect(): number {
        throw new Error("Method not implemented.");
    }

}
