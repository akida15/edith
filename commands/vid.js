const { tlnag,cmd,getBuffer,prefix,Config} = require('../lib')

*//===============================================//

cmd({
  pattern: 'video',
  desc: 'Sends video',
  category: 'gen',
  use: '<option>',
}, async(Void,citel,text) => {
await Void.sendMessage(citel.chat,{image:{url: './vid/Parasyte.mp4'}, caption: "YOUR CAPTION HERE" }) 
});