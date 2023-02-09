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
async(context, reply, text, { isCreator }) => {
    if (!isCreator) return reply.send("Only the creator can use this command.");

    let groups = await context.getAllGroups();
    let groupList = groups.map(group => `Name: ${group.name} ID: ${group.id}`).join("\n");

    reply.send(`Here is a list of all the groups the bot is in: \n\n${groupList}`);

    reply.ask("Please enter the ID of the group you would like to enter:", async response => {
        let selectedGroup = groups.find(group => group.id === response.text);

        if (!selectedGroup) return reply.send("Invalid group ID");

        await context.enterGroup(selectedGroup.id);
        reply.send("Successfully entered the group!");

        setTimeout(async () => {
            await context.leaveGroup(selectedGroup.id);
            reply.send("Successfully left the group after 10 minutes!");
        }, 10 * 60 * 1000);
    });
});
