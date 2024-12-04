import SpellType from "./spell-type";

export default class Spell {

    name: string;
    type: SpellType;
    fizzle: boolean;
    
    constructor() {
        this.fizzle = false;
    }
    
}
