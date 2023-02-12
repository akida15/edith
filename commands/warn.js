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

 const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
 const moment = require("moment-timezone");
 const fs = require('fs-extra')
 const Levels = require("discord-xp");
 const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 //---------------------------------------------------------------------------
 //---------------------------------------------------------------------------
 cmd({
    pattern: "انذار",
    filename: __filename
  }, async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply('هذا الأمر خاص بالقروب');
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) return citel.reply('هذا الأمر خاص بالمشرفين');
    if (!citel.quoted) return citel.reply('رجاءا منشن على رسالة الشخص');
    
    const timesam = moment(moment()).format('HH:mm:ss');
    moment.tz.setDefault('Asia/Riyadh');
    
    try {
      let metadata = await Void.getMetadata(citel.chat);
      await new warndb({
        id: citel.quoted.subject.split('@')[0] + '_' + timesam,
        reason: text,
        group: metadata.subject,
        warnedby: citel.sender,
        date: timesam
      }).save();
      
      let ment = citel.quoted.subject;
      Void.sendMessage(citel.chat, {
        text: '*----انذار----*\n الانذار ل :@' + ment.split('@')[0] + '\n\n*سبب الانذار*\n' + text,
      });
    } catch (err) {
      console.log(err);
    }
  });
  
     //---------------------------------------------------------------------------
 //---------------------------------------------------------------------------
 cmd({
             pattern: "طلب",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return reply(`.طلب ممكن تضيف امر يسوي ملصقات؟`);
             textt = `*| لديك طلب |*`;
             teks1 = `\n\n*المُطالب* : @${
     citel.sender.split("@")[0]
   }\n*الطلب* : ${text}`;
             teks2 = `\n\n*السلام عليكم  @${citel.sender.split("@")[0]},تم ارسال الطلب للمطور*.\n*انتظر الرد .....*`;
             for (let i of owner) {
                 Void.sendMessage(i + "@s.whatsapp.net", {
                     text: textt + teks1,
                     mentions: [citel.sender],
                 }, {
                     quoted: citel,
                 });
             }
             Void.sendMessage(citel.chat, {
                 text: textt + teks2 ,
                 mentions: [citel.sender],
             }, {
                 quoted: citel,
             });
 
         }
     )
     //---------------------------------------------------------------------------

     //---------------------------------------------------------------------------
 cmd({
             pattern: "انذارات",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply('هذا الأمر خاص بالقروب')
             if (!citel.quoted) return citel.reply('منشن شخص')
             teskd = ``
             let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
             console.log(h)
             teskd += `*جميع الإنذارات ال${h.length}*\n`
             for (let i = 0; i < h.length; i++) {
                 teskd += `*ـ ${i+1}*\n◆─────────────╮\n│ *المكان:* ${h[i].group}\n`
                 teskd += `│ *الوقت:* ${h[i].date}\n`
                 teskd += `│ *المُنذر:* ${h[i].warnedby}\n`
                 teskd += `│ *السبب:* ${h[i].reason}_\n◆─────────────╯\n\n`
             }
             citel.reply(teskd)
         }
 
     )
     //---------------------------------------------------------------------------
