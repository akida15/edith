 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
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

    const sticker = await createSticker(imageUrl, {
      author: 'ChatGPT',
      pack: 'One Piece Stickers',
      type: StickerTypes.FULL,
    });
    await citel.sendMessage(citel.jid, sticker, Sticker, { quoted: citel.data });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while generating the One Piece character sticker :(");
  }
});


cmd({
  pattern: "zoro",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const image = await loadImage("https://i.imgur.com/DjgYHTy.png");
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, 512, 512);
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Zoro", 200, 100);
    const sticker = await createSticker(canvas.toBuffer(), {
      pack: "One Piece Stickers",
      author: "ChatGPT",
      type: StickerTypes.FULL,
      categories: [StickerTypes.FULL],
    });
    await citel.sendMessage(citel.jid, { url: sticker }, Sticker, { pack: "One Piece Stickers", author: "ChatGPT" });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while creating the Zoro sticker :(");
  }
});


cmd({
  pattern: "random",
  filename: __filename,
},
async (match, event) => {
  const max = parseInt(match[1])
  const randomNumber = Math.floor(Math.random() * max) + 1
  await event.reply(`Your random number is: ${randomNumber}`)
})

cmd({
  pattern: "cat",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const imageUrl = response.data[0].url;
    await citel.sendMessage(citel.jid, { url: imageUrl }, Sticker, { pack: "Cat Stickers", author: "ChatGPT" });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the cat image :(");
  }
});

