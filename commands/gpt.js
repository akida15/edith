 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------

cmd({
  pattern: "random (\\d+)",
  filename: __filename,
},
async (match, event) => {
  const max = parseInt(match[1])
  const randomNumber = Math.floor(Math.random() * max) + 1
  await event.reply(`Your random number is: ${randomNumber}`)
})
