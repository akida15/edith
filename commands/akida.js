const Secktor = require('../lib');

Secktor.cmd({
    pattern: "الاوامر",
    filename: __filename,
}, async(Void, citel) => {
    if (citel.group === 'akida') {
        return await citel.reply(`✠═ • ═  •༺⊱╠💠╣⊰༻• ═ • ═✠
        ↫ ⟦ فـهـرس إسـتـ📜ـارات مـون ⟧
        ⊹⊱≼━━━⌬〔💠〕⌬━━━≽⊰⊹
        
     `);
    }
});
