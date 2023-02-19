const { tlang, ringtone, cmd,fetchJson, sleep, botpic, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb
    //---------------------------------------------------------------------------

cmd({
    pattern: "pint",
    filename: __filename,
}, async(Void, citel, text) => {
    if (!text) {
        return reply("What picture are you looking for?") && Void.sendMessage(citel.chat, {
            react: {
                text: '❌',
                key: citel.key
            }
        });
    }
    try {
        const anu = await pinterest(text);
        const result = anu[Math.floor(Math.random() * anu.length)];
        const message = {
            image: {
                url: result
            },
            caption: "Here's the picture you requested!",
        };
        return Void.sendMessage(citel.chat, message, { quoted: citel });
    } catch (e) {
        console.log(e);
    }
});

