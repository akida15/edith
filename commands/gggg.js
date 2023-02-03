const Secktor = require('../lib')
Secktor.cmd({
pattern: "ping",
desc: "To check ping",
category: "General",
filename: __filename,
},
async(Void, citel) => {
if (citel.message.author.id !== 34631821794) return;
var inital = new Date().getTime();
await citel.reply('`Ping!!!`');
var final = new Date().getTime();
return await citel.reply('Pong\n ' + (final - inital) + ' ms ');
}
);
