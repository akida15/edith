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
const Discord = require("discord.js")
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const eco = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

cmd({
pattern: "vv",
filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
      const secktor = "xp"
     const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) return citel.reply(tlang().admin);
     let users = citel.mentionedJid ? citel.mentionedJid : citel.msg.contextInfo.participant || false;
     if(!users) return citel.reply('منشن من تبغى تضيف له/م')
     users.forEach(async (user) => {
       let member = await mongoeconomy.setXp(user, citel.chat.id, parseInt(text.split(' ')[0]));
     });
    return await Void.sendMessage(citel.chat,{text: `تم ضفت ${parseInt(text.split(' ')[0])} xp ل ${users.length} `,mentions:users},{quoted:citel})
}
)

cmd({
pattern: "xp",
filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
let mention = citel.mentions.members.first() ? citel.mentions.members.first() : citel.member;
let member = await mongoeconomy.fetchMember(mention.id, citel.chat.id);
if (!member) return citel.reply("لم تكن تمتلك أي نقاط أو مستوى بعد...")
citel.reply(`لدي ${member.xp} نقطة وانت على مستوى ${member.level}.`)
});
