 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 const { MessageType, Mimetype } = require("@adiwajshing/baileys");
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------

cmd({
  pattern: "onepiece",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://onepiece.fandom.com/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1");
    const characterName = response.data.query.random[0].title.replace(" ", "_");
    const imageUrl = `https://vignette.wikia.nocookie.net/onepiece/images/4/4d/${characterName}.png/revision/latest?cb=${new Date().getTime()}`;

    const image = await axios.get(imageUrl, { responseType: "arraybuffer" });
    await citel.sendMessage(citel.jid, Buffer.from(image.data), MessageType.image, { quoted: citel.data, mimetype: Mimetype.png });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while generating the One Piece character image :(");
  }
});



cmd({
  pattern: "zoro",
  filename: __filename,
},
async (Void, citel) => {
  try {
    await citel.sendMessage(citel.jid, { url: "https://i.imgur.com/DjgYHTy.png" }, MessageType.image);
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while sending the Zoro image :(");
  }
});



cmd({
  pattern: "cat",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const imageUrl = response.data[0].url;
    await Void.sendMessage(citel.chat, {image: { url: imageUrl }});
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the cat image :(");
  }
});


