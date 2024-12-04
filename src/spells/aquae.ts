import Spell from "./spell";
import SpellType from "./spell-type";

export default class Aquae extends Spell {

    constructor() {
        super();
        this.name = "aquae";
        this.type = SpellType.Root;
    }

}
