const { sck,sck1,cmd, getBuffer, tlang, prefix } = require('../lib')
const Config = require('../config')
const eco = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);

    //---------------------------------------------------------------------------

cmd({
        pattern: "صفر",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
       let zerogroup = (await sck.findOne({
           id: citel.chat,
       })) || (await new sck({
               id: citel.chat,
           })
           .save());
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return citel.reply("لم يتم تشغيل البنك فالمجموعة");
    if(!isCreator) return citel.reply(tlang().owner)
       let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   if(!users) return citel.reply('منشن احد')
       const balance  = await eco.balance(users, "secktor")
       await eco.deduct(users, "secktor", balance.wallet);
       return await citel.reply(`تم تصفير اموال: @${users.split('@')[0]} `,{mentions:[users]})
}
)
   //---------------------------------------------------------------------------

       cmd({
       pattern: "البنك",
       filename: __filename,
   },
   async(Void, citel, text,{ isCreator }) => {
   let h = await eco.lb('secktor',10);
   let str = `*البنك مرتب من الاغنى للافقر*\n`
   const { sck1 } = require('../lib');
   let arr = []
    for(let i=0;i<h.length;i++){
           let username = await sck1.findOne({ id: h[i].userID })
           var tname;
           if (username.name && username.name !== undefined) {
               tname = username.name
           } else {
               tname = Void.getName(h[i].userID)
           }
str+= `*${i+1}*│ *⧉ - الاسم:* ${tname}\n│ *⧉ - الرقم:* @${h[i].userID.split('@')[0]}\n│ *⧉ - البنك:* ${h[i].wallet}\n\n`  	 
    arr.push(h[i].userID)
    }
        citel.reply(str,{mentions:arr})
        
    })

cmd({
   pattern: "تحويل",
   filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
   let zerogroup = (await sck.findOne({
       id: citel.chat,
   })) || (await new sck({
           id: citel.chat,
       })
       .save());
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return citel.reply("لم يتم تشغيل البنك فالمجموعة");
   let value = text.trim().split(" ");
   if (value[0] === "") return citel.reply(`مثال : . تحويل 1000 @منشن احد`);
   let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   if(!user) return citel.reply('منشن احد تحول له');
   const secktor = "secktor"
       const user1 = citel.sender
       const user2 = user
       const word = value[0];
       const code = value[1];
       let d = parseInt(word)
       if (!d) return citel.reply("تستخدم الامر بطريقة خاطئة");
       const balance = await eco.balance(user1, secktor);
       let a = (balance.wallet) < parseInt(word)
       //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
       if(a == true) return citel.reply("يا فقير انت وما عندك وتبي تحول؟");

       const deduct = await eco.deduct(user1, secktor, value[0]);
       const give = await eco.give(user2, secktor, value[0]);
       let buttons = [{
           buttonId: `${prefix}wallet`,
           buttonText: {
               displayText: "Wallet👛",
           },
           type: 1,
       },
       {
           buttonId: `${prefix}Bank`,
           buttonText: {
               displayText: "Bank🏦",
           },
           type: 1,
       },
   ];
   return await Void.sendButtonText(citel.chat, buttons, `*تم تحويل ${value[0]} من حسابك لحسابه*`, `${Config.ownername.split(' ')[0]}`, citel);


}
)

    //---------------------------------------------------------------------------
    cmd({
       pattern: "اموالي",
       filename: __filename,
   },
   async(Void, citel, text,{ isCreator }) => {
       let zerogroup = (await sck.findOne({
           id: citel.chat,
       })) || (await new sck({
               id: citel.chat,
           })
           .save());
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return citel.reply("لم يتم تشغيل البنك فالمجموعة");
        const secktor = "secktor"
        const balance = await eco.balance(citel.sender, secktor); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        let buttons = [{
           buttonId: `${prefix}deposit`,
           buttonText: {
               displayText: "Deposit",
           },
           type: 1,
       },
       {
           buttonId: `${prefix}Bank`,
           buttonText: {
               displayText: "Bank🏦",
           },
           type: 1,
       },
   ];
   return await Void.sendButtonText(citel.chat, buttons, `*👛 ${citel.pushName} اموالك تُقدر ب:*\n\n ${balance.wallet} بيلي`, `${Config.ownername.split(' ')[0]}`, citel);

   }
)

    //---------------------------------------------------------------------------
cmd({
  pattern: "give",
  filename: __filename,
},
async(Void, citel, text,{ isCreator }) => {
  if (!isCreator) return;

  const secktor = "secktor";
  let users = citel.mentionedJid || false;
  if (!users) return citel.reply('Please mention the users to add money to their wallets.');

  for (const user of users) {
    await eco.give(user, secktor, parseInt(text.split(' ')[0]));
  }

  const mentionList = users.map(user => `@${user.split("@")[0]}`).join(", ");
  return await Void.sendMessage(citel.chat, {
    text: `Added 📈 ${parseInt(text.split(' ')[0])} to ${mentionList}'s wallets🛸.`,
    mentions: users
  }, {
    quoted: citel
  });
});


    //---------------------------------------------------------------------------
    cmd({
       pattern: "جرد",
       filename: __filename,
       react: "💷"
   },
   async(Void, citel, text,{ isCreator }) => {
       if(!isCreator) return

        const secktor = "secktor"
        let users = citel.mentionedJid || false;
if(!users) return citel.reply('منشن من تبغى اخذ منه/م')
for (const user of users) {
 await eco.deduct(user, secktor, parseInt(text.split(' ')[0]));
}

       return await Void.sendMessage(citel.chat,{text: `تم اخذت ${parseInt(text.split(' ')[0])} من @${users.split('@')[0]}`,mentions:[users]},{quoted:citel})

   }
)

    //---------------------------------------------------------------------------
