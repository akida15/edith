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

const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const canvacord = require("canvacord");
//---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
cmd({
            pattern: "rank",
            desc: "Sends rank card of user.",
            category: "group",
        },
        async(Void, citel, text) => {
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "👼Baby Wizard";
            } else if (lvpoints <= 6) {
                var role = "🧙‍♀️Wizard";
            } else if (lvpoints <= 8) {
                var role = "🧙‍♂️Wizard Lord";
            } else if (lvpoints <= 10) {
                var role = "🧚🏻Baby Mage";
            } else if (lvpoints <= 12) {
                var role = "🧜Mage";
            } else if (lvpoints <= 14) {
                var role = "🧜‍♂️Master of Mage";
            } else if (lvpoints <= 16) {
                var role = "🌬Child of Nobel";
            } else if (lvpoints <= 18) {
                var role = "❄Nobel";
            } else if (lvpoints <= 20) {
                var role = "⚡Speed of Elite";
            } else if (lvpoints <= 22) {
                var role = "🎭Elite";
            } else if (lvpoints <= 24) {
                var role = "🥇Ace I";
            } else if (lvpoints <= 26) {
                var role = "🥈Ace II";
            } else if (lvpoints <= 28) {
                var role = "🥉Ace Master";
            } else if (lvpoints <= 30) {
                var role = "🎖Ace Dominator";
            } else if (lvpoints <= 32) {
                var role = "🏅Ace Elite";
            } else if (lvpoints <= 34) {
                var role = "🏆Ace Supreme";
            } else if (lvpoints <= 36) {
                var role = "💍Supreme I";
            } else if (lvpoints <= 38) {
                var role = "💎Supreme Ii";
            } else if (lvpoints <= 40) {
                var role = "🔮Supreme Master";
            } else if (lvpoints <= 42) {
                var role = "🛡Legend III";
            } else if (lvpoints <= 44) {
                var role = "🏹Legend II";
            } else if (lvpoints <= 46) {
                var role = "⚔Legend";
            } else if (lvpoints <= 55) {
                var role = "🐉Immortal";
            }
            let disc = citel.sender.substring(3, 7);
            let textr = '';
            textr += `h`;
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
                ppuser = THUMB_IMAGE;
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
                .setLevel(32)
                .setLevelColor(randomHex, randomHex)
                .setCurrentXP(34)
                .setStatus("online")
                .setBackground("IMAGE", randomImageLink)
                .setOverlay(randomHex, 100, false)
                .setRequiredXP(100)
                .setProgressBar(randomHexs, "COLOR")
                .setRank(0, role, false)
                .setBackground("COLOR", "#000000")
                .setUsername("jeje")
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
