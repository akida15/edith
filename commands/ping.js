const { tlang, botpic,cmd, prefix, runtime,Config } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
//---------------------------------------------------------------------------

const email = 'botbotawa@gmail.com';
const password = 'nourajarifi';

cmd({
  pattern: "chat",
  desc: "chat with an AI",
  category: "General",
  use: '<Hii,Secktor>',
  filename: __filename,
}, async(Void, citel, text) => {
  if (!text) {
    return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
  }

  axios.post('https://chat.openai.com/chat', {
    prompt: text,
  }, {
    auth: {
      username: email,
      password: password,
    },
  })
  .then(response => {
    citel.reply(response.data);
  })
  .catch(error => {
    console.error(error);
    citel.reply(`An error occurred: ${error}`);
  });
});
