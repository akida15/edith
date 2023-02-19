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

 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "ترحيب_دخول",
    desc: "",
    category: "",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, welcome: text,events:'true' }).save()
                return citel.reply('تم')
            } else {
                await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
                return citel.reply('تم')
                
            }      
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "رسالة_خروج",
    desc: "",
    category: "",
},
async(Void, citel, text,{ isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
          let Group = await sck.findOne({ id: citel.chat })
            if (!Group) {
                await new sck({ id: citel.chat, goodbye: text,events:'true' }).save()
                return citel.reply('تم');
            } else {
                await await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' })
                return citel.reply('تم');     
            }      
}
)
 //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ملصقي",
             desc: "",
             category: "",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.quoted) return citel.reply(`*رد على صورة او فيديو*`);
             let mime = citel.quoted.mtype
             var pack;
             var author;
             if (text) {
                 anu = text.split("|");
                 pack = anu[0] !== "" ? anu[0] : citel.pushName + 'bot';
                 author = anu[1] !== "" ? anu[1] : Config.author;
             } else {
                 pack = citel.pushName;
                 author = "bot";
             }
                 let media = await citel.quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer }, {quoted: citel });
         }
     )
     //---------------------------------------------------------------------------

 cmd({
             pattern: "exec",
             desc: "Evaluates quoted code with given language.",
             category: "misc",
             filename: __filename,
         },
         async(Void, citel, text) => {
             try {
                 const code = {
                     script: citel.quoted.text,
                     language: text[1],
                     versionIndex: "0",
                     stdin: text.slice(2).join(" "),
                     clientId: '694805244d4f825fc02a9d6260a54a99',
                     clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                 };
                 request({
                     url: "https://api.jdoodle.com/v1/execute",
                     method: "POST",
                     json: code
                 }, function(_error, _response, body) {
                     citel.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");
                 });
             } catch (error) {
                 console.log(error);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "رابطه",
             desc: "",
             category: "",
             filename: __filename,
         },
         async(Void, citel, text) => {
             let users = citel.mentionedJid ? citel.mentionedJid[0].split('@')[0] : citel.quoted ? citel.quoted.sender.split('@')[0] : text.replace('@')[0]
             citel.reply(`https://wa.me/${users}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "شخص",
             desc: "",
             category: "",
             filename: __filename,
         },
         async(Void, citel, match) => {
             if (!match) return citel.reply("*اختر صفة معينة?*");
             const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
                 .catch((e) => {}) : "";
             const participants = citel.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = citel.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             Void.sendMessage(citel.chat, {
                 text: `اكثر شخص ${match} في هذا القروب هو *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: citel,
             });
         }
     )
     //---------------------------------------------------------------------------

 cmd({
             pattern: "emix",
             desc: "Mixes two emojies.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             if (!text) return citel.reply(`Example : ${prefix}emix 😅,🤔`);
             let [emoji1, emoji2] = text.split `,`;
             let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1 )}_${encodeURIComponent(emoji2)}`);
             for (let res of anu.results) {
                 let encmedia = await Void.sendImageAsSticker(citel.chat, res.url, citel, {
                     packname: global.packname,
                     author: global.author,
                     categories: res.tags,
                 });
                 await fs.unlinkSync(encmedia);
             }
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "عكس",
             desc: "",
             category: "",
             use: '',
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`مثال : .عكس جيرايا`)
             flipe = text.split('').reverse().join('')
             citel.reply(`\`\`\`「  عكس الكلمات  」\`\`\`\n*الكلمة الاصليه :*\n${text}\n*العكس حقها :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "الاحداث",
             desc: "",
             category: "",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}شغل الاحداث`,
                     buttonText: {
                         displayText: "تشغيل",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}عطل الاحداث`,
                     buttonText: {
                         displayText: "تعطيل",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(citel.chat, buttons, `اختر تشغيل او تعطيل الاحداث`, Void.user.name, citel);
         }
     )
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
     //---------------------------------------------------------------------------
 cmd({
             pattern: "بيناري",
             desc: "",
             category: "",
             use: '',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(``);
 
                 let textt = text || citel.quoted.text
                 let eb = await eBinary(textt);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "بيناري1",
             desc: "",
             category: "",
             use: '',
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(``);
                 let eb = await dBinary(text);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "بوت",
  desc: "",
  category: "",
  filename: __filename,
},
async(Void, citel, text,{isCreator}) => {
  if (!citel.isGroup) return citel.reply(tlang().group);
  if(!isCreator) return //citel.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: citel.chat })
         if (!checkgroup) {
             await new sck({ id: citel.chat, botenable: "شغال" }).save()
             return citel.reply(`يمكنك استعمال البوت فالقروب`)
         } else {
             if (checkgroup.botenable == "شغال") return citel.reply("البوت شغال مسبقا")
             await sck.updateOne({ id: citel.chat }, { botenable: "شغال" })
             return citel.reply(`يمكنك استعمال البوت فالقروب `)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!checkgroup) {
                 await new sck({ id: citel.chat, botenable: "معطل" })
                     .save()
                 return citel.reply(`تم منع البوت فالقروب `)
             } else {
                 if (checkgroup.botenable == "معطل") return citel.reply("البوت غير شغال مسبقا")
                 await sck.updateOne({ id: citel.chat }, { botenable: "معطل" })
                 return citel.reply(`تم منع البوت فالقروب `)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: citel.chat })
let buttons = [{
          buttonId: `${prefix}بوت on`,
          buttonText: {
              displayText: "تشغيل",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}بوت off`,
          buttonText: {
              displayText: "تعطيل",
          },
          type: 1,
      },
  ];
  await Void.sendButtonText(citel.chat, buttons, `تشغيل او تعطيل البوت: ${checkgroup.botenable}`, Void.user.name, citel);
}
}
})   
         
     //---------------------------------------------------------------------------
 cmd({
             pattern: "مضاد_روابط",
             desc: "",
             category: "",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}شغل مضاد_روابط`,
                     buttonText: {
                         displayText: "تشغيل",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}عطل مضاد_روابط`,
                     buttonText: {
                         displayText: "تعطيل",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(citel.chat, buttons, `تشغيل او تعطيل مضاد الروابط`, Void.user.name, citel);
         }
     )
     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(Void, citel) => {
     if (Config.autoreaction === 'true' && citel.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         Void.sendMessage(citel.chat, {
             react: {
                 text: emokis,
                 key: citel.key
             }
         })
     }
 })
