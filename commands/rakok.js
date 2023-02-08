 const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
 const moment = require("moment-timezone");
 const fs = require('fs-extra')
 const Levels = require("discord-xp");
 const canvacord = require("canvacord");
 const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 //---------------------------------------------------------------------------
 cmd({
    pattern: "جيرايا",
},
async(Void, citel, text) => {
    let disc = citel.sender.substring(3, 7);
    var role = 'جيرايا'
    let textr = '';
    textr += `
⧉ اللقب : جيرايا

⧉ المنصب : مؤسس

⧉ عدد مسابقات : 56 

⧉ الفوز : 10

⧉ البنك : 627k 

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
        .setLevel(10)
        .setLevelColor(randomHex, randomHex)
        .setCurrentXP(50)
        .setStatus("online")
        .setBackground("IMAGE", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQ2FaU2C-dSC-6OlY14wM_7hWajwD3x41cA&usqp=CAU")
        .setOverlay(randomHex, 100, false)
        .setRequiredXP(100)
        .setProgressBar(randomHexs, "COLOR")
        .setBackground("IMAGE", randomImageLink)
        .setRank(0, role, false)
        .setUsername("Jiraya")
        .setDiscriminator("مون");
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
