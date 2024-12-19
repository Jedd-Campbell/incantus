import k from "../kaplay";
import Aquae from "./aquae";
import Ignis from "./ignis";
import Protectio from "./protectio";
import Impetus from "./impetus";
import Spell from "./spell";

export default class SpellBook {

    static getSpells() {
        return [
            // intents
            new Impetus(),
            new Protectio(),

            // roots
            new Ignis(),
            new Aquae(),
        ];
    }

    static showSpellBook(spells: Spell[]) {

        const bookWidth = 240;
        const bookHeight = 176;
        const bookScale = 1;
        const bookMargin = 20;
        const bookFontSize = 16;

        const book = k.add([
            k.sprite("spellbook"),
            k.z(20),
            k.pos(k.width() - (bookWidth * bookScale + bookMargin), k.height() - (bookHeight * bookScale + bookMargin)),
            k.scale(bookScale),
        ]);

        spells = spells.sort((a,b) => {
            return a.name.localeCompare(b.name);
        });

        spells.forEach((spell, index) => {
            let pageOffset = 132;
            book.add([
                k.text(spell.name, { size: bookFontSize,  }),
                k.color(101, 94, 76),
                k.pos(12, index * bookFontSize + 12),
            ]);
            book.add([
                k.text(`(${spell.description})`, { size: bookFontSize,  }),
                k.color(101, 94, 76),
                k.pos(pageOffset, index * bookFontSize + 12),
            ]);
        });
    }
}
