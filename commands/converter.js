
const axios = require('axios')
const { sck1, tiny, fancytext, listall,cmd } = require('../lib/')
const fs = require('fs-extra');
const { exec } = require('child_process')

    //---------------------------------------------------------------------------


cmd({
        pattern: "tag",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);

        let textt = `${text ? text : "السلام عليكم"}\n`
        let count = 1;
        for (let mem of groupAdmins) {
            textt += `${count} ↭ @${mem.id.split("@")[0]}\n`;
            count++;
        }
        for (let mem of participants) {
            textt += `${count} ↭ @${mem.id.split("@")[0]}\n`;
            count++;
        }
        Void.sendMessage(citel.chat, {
            text: textt,
            mentions: [...groupAdmins, ...participants].map((a) => a.id),
        }, {
            quoted: citel,
        });
    }
)

    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "كتابة",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (isNaN(text.split(" ")[0]) || !text) {
                let text = tiny(
                    "تعديل الكتابة\n\nمثال: .كتابة 32 jiraya\n\n"
                );
                return await citel.reply(text);
            }

            let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
            citel.reply(fancytextt)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "اختصار",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply('وين رابط؟')
            try {
                link = text.split(" ")[0];
                anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
                citel.reply(`*تم اختصار الرابط*\n\n${anu.data}`);
            } catch (e) {
                console.log(e);
            }
        }
    )
    //---------------------------------------------------------------------------

