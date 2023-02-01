/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const axios = require('axios')
const { sck1, tiny, fancytext, listall,cmd } = require('../lib/')
const fs = require('fs-extra');
const { exec } = require('child_process')

    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "كتابة",
            desc: "",
            category: "",
            use: '',
            filename: __filename
        },
        async(Void, citel, text) => {
            if (isNaN(text.split(" ")[0]) || !text) {
                let text = tiny(
                    "تعديل الكتابة\n\nمثال: .كتابة 32 jiraya\n\n"
                );
                listall("jiraya").forEach((txt, num) => {
                    text += `${(num += 1)} ${txt}\n`;
                });
                return await citel.reply(text);
            }

            let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
            citel.reply(fancytextt)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "اختصار",
            desc: "",
            category: "",
            use: '',
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

