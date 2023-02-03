const { tlang, botpic,cmd, prefix, runtime,Config } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
//---------------------------------------------------------------------------

const axios = require('axios');

const API_KEY = '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';

cmd({
  pattern: "chat",
  desc: "chat with an AI",
  category: "General",
  use: '<Hii,Secktor>',
  filename: __filename,
},
async (Void, citel, text) => {
  axios.post('https://chat.openai.com/chat', {
    prompt: text || 'Hello',
  }, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  })
  .then(response => {
    citel.reply(response.data.choices[0].text);
  })
  .catch(error => {
    console.error(error);
  });
});
