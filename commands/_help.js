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

const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const Secktor = require('../lib/commands')
    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "اوامر",
            desc: "",
            category: "",
            filename: __filename
        },
        async(Void, citel, text) => {
            const { commands } = require('../lib');
            if (text.split(" ")[0]) {
                let arr = [];
                const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
                if (!cmd) return await citel.reply("**");
                else arr.push(`*:* ${cmd.pattern}`);
                if (cmd.category) arr.push(`*:* ${cmd.category}`);
                if (cmd.alias) arr.push(`*:* ${cmd.alias}`);
                if (cmd.desc) arr.push(`*:* ${cmd.desc}`);
                if (cmd.use) arr.push(`*:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
                return await citel.reply(arr.join('\n'));
            } else {
                const cmds = {}
                commands.map(async(command, index) => {
                    if (command.dontAddCommandList === false && command.pattern !== undefined) {
                        if (!cmds[command.category]) cmds[command.category] = []
                        cmds[command.category].push(command.pattern)
                    }
                })
                const time = moment(moment())
                    .format('HH:mm:ss')
                moment.tz.setDefault('Asia/Riyadh')
                    .locale('id')
                const date = moment.tz('Asia/Riyadh').format('DD/MM/YYYY')
                let total = await sck1.countDocuments()
                let str = `⋄═──═◞🛡️ قائمة المشرفين 🛡️◟━──━⋄
⧉ -منشن
⧉ منشن جماعي لكل الاعضاء
 
⧉ -مخفي
⧉ منشن مخفي لكل الاعضاء    
 
⧉ -ترقية
⧉ ترقية عضو لمشرف 
 
⧉ -تخفيض
⧉ تخفيض مشرف لعضو  

⧉ -طرد
⧉ طرد شخص من القروب

⧉ -بوت
⧉ حضر القروب من استخدام االبوت

⧉ -شغل الاحداث 
⧉ تشغيل الترحيب بالأعضاء وتوديعهم

⧉ -ترحيب_دخول
⧉ تغير رسالة الترحيب بالأعضاء الجدد

⧉ -رسالة_خروج
⧉ تغيير رسالة توديع المغادرين

⋄═──═◞🔰 قائمة العضو 🔰◟━──━⋄

⧉ -رابطه
⧉ انشاء رابط رقم شخص  

⧉ -مساعدة
⧉ قروب البوت للمساعدة

⧉ -المطور
⧉ معرفة مطور البوت
            
⧉ -قرعة
⧉ قرعة شخص بيفوزو

⧉ -رابطي
⧉ انشاء رابط لرقمك

⧉ -اختصار
⧉ اختصار روابط

⧉ -ملصق
⧉ تحويل صورة او فيديو لملصق

⧉ -ملصقي
⧉ ملصق بحقوقك

⧉ -شخص
⧉ مثال : شخص غبي  
 
⧉ -عكس
⧉ عكس الكلام 
 
⧉ -صورة 
⧉ البحث عن صورة من جوجل 
 
⧉ -تطقيم
⧉ جلب تطقيمات  
 
⧉ -ترجم
⧉ الترجمة للعربي

⧉ -تشبيك
⧉ تشبيك بين 2

⧉ -اكس_او
⧉ لعبة اكس او

⧉ -كت
⧉ كتابة الاسماء

⧉ -ح
⧉ سؤال واجب بصراحة

⧉ -س
⧉ سؤال انمي

⧉ -احزر
⧉ احزر من في الصورة 

⧉ -خلفية
⧉ صور انمي بجودة فل`
              
                let generatebutton = [{
                    buttonId: `${prefix}المطور`,
                    buttonText: {
                        displayText: 'المطور'
                    },
                    type: 1
                }]
                let buttonMessaged = {
                    image: { url: await botpic() },
                    caption: str,
                    footer: tlang().title,
                    headerType: 4,
                    buttons: generatebutton
                };
                return await Void.sendMessage(citel.chat, buttonMessaged);
            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
Secktor.cmd({
        pattern: "المطور",
        desc: "",
        category: "",
        react: "💙",
        filename: __filename
    },
    async(Void, citel) => {
        const Config = require('../config')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + Config.ownername + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: Config.ownername,
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hi' + citel.pushName,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)
