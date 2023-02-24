const fetch = require('node-fetch');
const { fetchJson, cmd, tlang } = require('../lib');

cmd({
  pattern: "chatgpt",
  fromMe: true,
  desc: "Chat with GPT AI",
  usage: "chatgpt <text>",
  vars: true
}, async (client, message, args) => {
  const text = args.join(' ');
  if (!text) {
    return await client.reply(message.chat, 'Please provide text to chat with GPT AI', message.id);
  }
  try {
    const result = await fetchJson(`https://api.lolhuman.xyz/api/openai?apikey=BrunoSobrino&text=${text}&user=user-unique-id`);
    const response = tlang(result.result);
    await client.reply(message.chat, response, message.id);
  } catch (error) {
    console.error(error);
    await client.reply(message.chat, 'Sorry, something went wrong while chatting with GPT AI :(', message.id);
  }
});
