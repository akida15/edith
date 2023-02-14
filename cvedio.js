const { tlnag,cmd,getBuffer,prefix,Config} = require('../lib')
/**
=
================================================
*@video: Send Video
===============================================
*//
cmd({
  pattern: 'video',
  desc: 'Sends video',
  category: 'gen',
  use: '<option>',
}, async(Void,citel,text) => {
await Void.sendMessage(citel.chat,{image:{url: 'https://drive.google.com/file/d/1AjxwPn9Fh8SamzaLrk8ZWrO9i38EGYds/view?usp=drivesdk'}, caption: "YOUR CAPTION HERE" }) 
});
