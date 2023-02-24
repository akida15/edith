const fetch = require('node-fetch')
const {fetchJson,cmd, tlang } = require('../lib')

cmd({
  pattern: "chatgpt",
  fromMe: true,
  desc: "Chat with GPT AI",
  usage: "chatgpt <text>",
  vars: true
}, async (Void, citel, text) => {
  if (!text) throw 'Please provide text to chat with GPT AI';
  try {
    let tiores = await fetchJson(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino&text=${text}&user=user-unique-id`)
    let hasil = tlang(tiores.result)
    await Void.reply(citel.chat, hasil, citel.id)
  } catch (error) {
    console.error(error);
    await Void.reply(citel.chat, 'Sorry, something went wrong while chatting with GPT AI :(', citel.id);
  }
});
