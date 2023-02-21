const { sck, sck1, cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep, getAdmin, getBuffer, prefix } = require('../lib');
const moment = require("moment-timezone");
const fs = require('fs-extra');
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
let gis = require("g-i-s");
const axios = require('axios');
const fetch = require('node-fetch');


cmd({
    pattern: "gpt",
    filename: __filename
},
async (match, message) => {
    const prompt = match[1];
    const apiKey = "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"; // replace with your OpenAI API key
    const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
    
    try {
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 50,
            n: 1,
            temperature: 0.7
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });
        
        const completion = response.data.choices[0].text;
        message.reply(`Here's what GPT-3 says: ${completion}`);
    } catch (error) {
        console.log(error);
        message.reply("Sorry, I couldn't get a response from GPT-3.");
    }
});
