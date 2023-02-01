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

const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime, prefix, Config } = require('../lib')
    //---------------------------------------------------------------------------
cmd({
            pattern: "ملاحظة",
            category: "",
            desc: "",
            filename: __filename
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            if (!text) return citel.reply("")
            await addnote(text)
            return citel.reply(`تم`)

        }
    )
 
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "فك_البان",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply("هذا الأمر خاص بالمطور")
            try {
                let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
                if (!users) return citel.reply("منشن شخص")
                let pushnamer = Void.getName(users);
                sck1.findOne({ id: users }).then(async(usr) => {
                    if (!usr) {
                        console.log(usr.ban)
                        return citel.reply(`${pushnamer} تم فك البان عن`)
                    } else {
                        console.log(usr.ban)
                        if (usr.ban !== "true") return citel.reply(`${pushnamer} مبند مسبقا`)
                        await sck1.updateOne({ id: users }, { ban: "false" })
                        return citel.reply(`${pushnamer} يمكنه استعمال البوت الان`)
                    }
                })
            } catch {
                return citel.reply("منشن شخص")
            }


        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "ترجم",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text) => {
            const translatte = require("translatte");
            if (!citel.quoted) return citel.reply("رد على نص");
            if (!citel.quoted) return citel.reply(`رد على نص`);
            let textt = citel.quoted.text;
            whole = await translatte(textt, {
                from: text[1] || "auto",
                to: text.split(" ")[0] || "ar",
            });
            if ("text" in whole) {
                return await citel.reply("" + whole.text + "");
            }

        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "حذف_ملاحظة",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text,{ isCreator }) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return citel.reply(tlang().owner)
            await delnote(text.split(" ")[0])
             return citel.reply(`تم حذف الملاحظة رقم ${text.split(" ")[0]}\' `)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "حذف_ملاحظات",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text, isCreator) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return citel.reply(tlang().owner)
            await delallnote()
             return citel.reply(`تم حذف جميع الملاحظات`)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "بان",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text,{ isCreator}) => {
            if (!isCreator) return citel.reply(tlang().owner)
            try {
                let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
                if (!users) return citel.reply(`منشن شخص`)
                let pushnamer = Void.getName(users);
                sck1.findOne({ id: users }).then(async(usr) => {
                    if (!usr) {
                        await new sck1({ id: users, ban: "true" }).save()
                        return citel.reply(`تم حضر ${pushnamer} من استخدام البوت`)
                    } else {
                        if (usr.ban == "true") return citel.reply(`${pushnamer} محضور مسبقا`)
                        await sck1.updateOne({ id: users }, { ban: "true" })
                        return citel.reply(`تم حضر ${pushnamer} من استخدام البوت`)
                    }
                })
            } catch (e) {
                console.log(e)
                return citel.reply("منشن شخص ")
            }


        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "قواعد",
            category: "",
            filename: __filename,
            desc: ""
        },
        async(Void, citel, text, isAdmins) => {
            const alivtxt = `
*السلام عليكم, ${citel.pushName},*

- رقم البوت وهمي اذا حطيته مشرف وانزرف رقمه وراح قروبك مب شغلي.

⧉ الاسم : جيرايا - 🌑

⧉ اللقب: مبتدئ
            
⧉ المستوى: 10
            
⧉ اكس بي: 18
            
⧉ الرابط : wa.me/34631821794
`;
            let aliveMessage = {
                image: {
                    url: await botpic(),
                },
                caption: alivtxt,
                footer: tlang().footer,
                headerType: 4,
            };
             return Void.sendMessage(citel.chat, aliveMessage, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "ملاحظات",
        category: "",
        filename: __filename,
        desc: ""
    },
    async(Void, citel, text,{ isCreator }) => {
        const { tlang } = require('../lib')
        if (!isCreator) return citel.reply(tlang().owner)
        const note_store = new Array()
        let leadtext = `الملاحظات التي تم تسجيلها هي:-\n\n`
        leadtext += await allnotes()
        return citel.reply(leadtext)

    }
)
