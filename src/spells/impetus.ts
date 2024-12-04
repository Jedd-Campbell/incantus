import Spell from "./spell";
import SpellType from "./spell-type";

export default class Impetus extends Spell {

    constructor() {
        super();
        this.name = "impetus";
        this.type = SpellType.Intent;
    }

}
