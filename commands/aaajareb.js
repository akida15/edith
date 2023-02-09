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

//---------------------------------------------------------------------------

cmd({
pattern: "bobo",
filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
if (!isCreator) return citel.reply(tlang().owner);
let getGroups = await Void.groupFetchAllParticipating();
let groups = Object.entries(getGroups)
.slice(0)
.map((entry) => entry[1]);
let groupIds = groups.map((v) => v.id);
let groupList = `All Groups the bot is participating in: \n\n`;
for (let i of groupIds) {
let metadata = await Void.groupMetadata(i);
await sleep(500);
groupList += `*Name:* ${metadata.subject}\n`;
groupList += `*Members:* ${metadata.participants.length}\n`;
groupList += `*Id:* ${i}\n\n`;
}
citel.reply(groupList);
citel.reply("Please choose the group Id you want to enter: ");
citel.once("text", async (text) => {
let groupId = text;
if (!groupIds.includes(groupId)) return citel.reply("Invalid group Id.");
await Void.groupJoin(groupId);
citel.reply("Entered the group successfully.");
setTimeout(() => {
Void.groupLeave(groupId);
citel.reply("Kicked out of the group after 10 minutes.");
}, 600000);
});
});




