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
const canvacord = require("canvacord");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//---------------------------------------------------------------------------

cmd({
    pattern: "akida",
    filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const groupOwner = await groupMetadata.owner || ""
    const botOwner = await Void.getContactOwner() || ""
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) return citel.reply(tlang().admin);

    const admins = []
    const members = []
    let botOwnerText = ""
    let groupOwnerText = ""

    for (let mem of participants) {
        if (mem.id === botOwner) {
            botOwnerText = `🤖 *@${mem.id.split("@")[0]}*`
        } else if (mem.id === groupOwner) {
            groupOwnerText = `👑 *@${mem.id.split("@")[0]}*`
        } else if (groupAdmins.includes(mem.id)) {
            admins.push(mem.id)
        } else {
            members.push(mem.id)
        }
    }

    let textt = `${text ? text : "السلام عليكم"}\n\n`
    let count = 1;

    if (botOwnerText) {
        textt += `${count} ↭ ${botOwnerText}\n`;
        count++;
    }

    if (groupOwnerText) {
        textt += `${count} ↭ ${groupOwnerText}\n`;
        count++;
    }

    for (let i = 0; i < admins.length; i++) {
        textt += `${count} 🥇 *@${admins[i].split('@')[0]}*\n`;
        count++;
    }

    for (let i = 0; i < members.length; i++){
        textt += `${count} 🥈 *@${members[i].split('@')[0]}*\n`;
        count++;
    }

    Void.sendMessage(citel.chat, {
        text: textt,
        mentions: participants.map((a) => a.id),
    }, {
        quoted: citel,
    });
})



cmd({
   pattern: "profile",
},
async(Void, citel, text) => {
   const userq = await Levels.fetch(citel.sender, "RandomXP");
   const lvpoints = userq.level;
   let disc = citel.sender.substring(3, 7);
   let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Asia/Kolakata')
                .locale('id')
   var role = 'جيرايا'
   let textr = '';
   textr += `
⧉ اللقب : جيرايا

⧉ المنصب : مؤسس

⧉ عدد مسابقات : 56 

⧉ الفوز : 10

⧉ البنك : ${ttms} 

⧉ رابط : wa.me/+34612538080

يتم تجديد البروفايل كل اسبوع وقيمته 1 مليون بيلي`;
                

   try {
       ppuser = await Void.profilePictureUrl(citel.sender, "image");
   } catch {
       ppuser = 'https://i.imgur.io/Qxh96zE_d.webp?maxwidth=640&shape=thumb&fidelity=medium';
   }

       const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
       const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
       const imageLinks = [
           "https://i.imgur.io/meA2g0G_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/OAh9JA0_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/MxPFtQK_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/qDTuusA_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/50Z9vyY_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/Js5330u_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/sY03jdM_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/duaXpHu_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
           "https://i.imgur.io/Eo6cIRI_d.webp?maxwidth=640&shape=thumb&fidelity=medium",
         ];
         const randomImageLink = imageLinks[Math.floor(Math.random() * imageLinks.length)];
         
const rank = new canvacord.Rank()
       .setAvatar(ppuser)
       .setLevel(userq.level)
       .setLevelColor(randomHex, randomHex)
       .setCurrentXP(userq.xp)
       .setStatus("online")
       .setBackground("IMAGE", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQ2FaU2C-dSC-6OlY14wM_7hWajwD3x41cA&usqp=CAU")
       .setOverlay(randomHex, 100, false)
       .setRequiredXP(100)
       .setProgressBar(randomHexs, "COLOR")
       .setBackground("IMAGE", randomImageLink)
       .setRank(0, role, false)
       .setUsername("Jiraya")
       .setDiscriminator(disc);
   rank.build()
       .then(async(data) => {
           Void.sendMessage(citel.chat, {
               image: data,
               caption: textr,
           }, {
               quoted: citel,
           });
       });
   }
)
  

//---------------------------------------------------------------------------

cmd({
            pattern: "ادخل",
            desc: "",
            category: "",
            use: '',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner);
            if (!text) return citel.reply(`وين رابط ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com"))
                citel.reply("رابط غلط");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => citel.reply("تم"))
                .catch((err) => citel.reply("مقدرت ادخل"));

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "ملصق",
            alias: ["ستكر"],
            desc: "",
            category: "",
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply(`*رد على صورة او فيديو*`);
            let mime = citel.quoted.mtype
            pack = Config.packname
            author = Config.author
            if (citel.quoted) {
                let media = await citel.quoted.download();
                let sticker = new Sticker(media, {
                    pack: citel.pushName, // The pack name
                    author: "bot", // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
            } else if (/video/.test(mime)) {
                if ((quoted.msg || citel.quoted)
                    .seconds > 20) return citel.reply("الحد الاقصى للفيد 20 ثانية");
                let media = await quoted.download();
                let sticker = new Sticker(media, {
                    pack: citel.pushName, // The pack name
                    author: "bot", // The author name
                    type: StickerTypes.FULL, // The sticker type
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 70, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const stikk = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {  sticker: stikk   }, {    quoted: citel });
            } else {
                citel.reply("*رد على صورة او فيديو*");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "مساعدة",
        desc: "",
        category: "",
        filename: __filename,
    },
    async(Void, citel, text) => {
        citel.reply(`*شوف خاصك* ${tlang().greet}`);
        await Void.sendMessage(`${citel.sender}`, {
            image: log0,
            caption: `*الرابط:* https://chat.whatsapp.com/GxTgtHUcroEE8YC6A7IZa1`,
        });

    }
)

//---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
    cmd({
        pattern: "منشن",
        desc: "",
        category: "",
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
        for (let mem of participants) {
            textt += `${count} ↭ @${mem.id.split("@")[0]}\n`;
            count++;
        }
        Void.sendMessage(citel.chat, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: citel,
        });
    }
)

//---------------------------------------------------------------------------


    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "ترقية",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
            } catch {
                		citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "طرد",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().admin);

            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
            } catch {
                		citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "مخفي",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
            const participants = citel.isGroup ? await groupMetadata.participants : "";
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins) return citel.reply(tlang().admin);

            if (!isAdmins) citel.reply(tlang().admin);
            Void.sendMessage(citel.chat, {
                text: text ? text : "",
                mentions: participants.map((a) => a.id),
            }, {
                quoted: citel,
            });
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "قروبات",
            desc: "",
            category: "",
            filename: __filename,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let getGroups = await Void.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
                .slice(0)
                .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
            let jackhuh = `جميع قروبات البوت\n\n`
            for (let i of anu) {
                let metadata = await Void.groupMetadata(i);
                await sleep(500)
                jackhuh += `*الاسم:* ${metadata.subject}\n`
                jackhuh += `*الاعضاء :* ${metadata.participants.length}\n`
                jackhuh += `*الايدي:* ${i}\n\n`

            }
            citel.reply(jackhuh)

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "تخفيض",
        desc: "",
        category: "",
        filename: __filename,
        use: '',
    },
    async(Void, citel, text) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

        if (!isAdmins) return citel.reply(tlang().admin);
        if (!isBotAdmins) return citel.reply(tlang().botAdmin);
        try {
            let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            if (!users) return;
            await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
        } catch {
            		citel.reply(tlang().botAdmin);

        }
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "احذف",
            alias: ["حذف"],
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (citel.quoted.Bot) {
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })

            }
            if (!citel.quoted.isBot) {
                if (!citel.isGroup) return citel.reply(tlang().group)
                const groupAdmins = await getAdmin(Void, citel)
                const botNumber = await Void.decodeJid(Void.user.id)
                const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                if (!isAdmins) return citel.reply('فقط المشرفين يمكن حذف رسائل الاعضاء')
                if (!isBotAdmins) return citel.reply('لازم اشراف')
                if (!citel.quoted) return citel.reply(`وش تبي احذف؟ ${tlang().greet}`);
                let { chat, fromMe, id } = citel.quoted;
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
//---------------------------------------------------------------------------

