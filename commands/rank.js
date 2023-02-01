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
        ppuser = 'https://i.ibb.co/jMwhNS2/th.jpg';
    } catch {
        ppuser = 'https://i.ibb.co/qNt1Hfx/Whats-App-Image-2023-01-29-at-17-00-05.jpg';
    }

        const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
        const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
        const imageLinks = [
            "https://i.ibb.co/XSWV1kx/1.jpg",
            "https://i.ibb.co/CPmZrVR/2.jpg",
            "https://i.ibb.co/NLb7bG2/3.jpg",
            "https://i.ibb.co/3mrhcv5/4.jpg",
            "https://i.ibb.co/WPnprpL/5.jpg",
            "https://i.ibb.co/12xNXhM/6.jpg",
            "https://i.ibb.co/rFRcS6m/7.jpg",
            "https://i.ibb.co/PcBK1cp/8.jpg",
            "https://i.ibb.co/brfCPKB/9.jpg",
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