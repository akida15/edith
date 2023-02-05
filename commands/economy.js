const { sck,sck1,cmd, getBuffer, tlang,sleep,getAdmin, prefix } = require('../lib')
const Config = require('../config')
const eco = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);
/*
 cmd({
        pattern: "economy",
        desc: "daily gold.",
        category: "economy",
    },
    */
    //---------------------------------------------------------------------------

cmd({
        pattern: "صفر",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);
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
       return await citel.reply(`تم تصفير البيلي الخاص ب : @${users.split('@')[0]} `,{mentions:[users]})
}
)
   //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    cmd({
       pattern: "ترتيب_البيلي",
       filename: __filename,
   },
   async(Void, citel, text,{ isCreator }) => {
    const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);
   let h = await eco.lb('secktor',10);
   let str = ``
   const { sck1 } = require('../lib');
   let arr = []
    for(let i=0;i<h.length;i++){
           let username = await sck1.findOne({ id: h[i].userID })
           var tname;
           if (username && username !== undefined) {
               tname = username.name
           } else {
               tname = Void.getName(h[i].userID)
           }
str+= `\n *⧉ - الاسم:* ${tname}\n *⧉ - البيلي:* ${h[i].wallet}\n *⧉ - الرقم:* @${h[i].userID.split('@')[0]}\n`
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
   if (value[0] === "") return citel.reply(`مثال : .تحويل 1000 @منشن احد`);
   let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
   if(!user) return citel.reply('منشن احد');
   const secktor = "secktor"
       const user1 = citel.sender
       const user2 = user
       const word = value[0];
       const code = value[1];
       let d = parseInt(word)
       if (!d) return citel.reply("لا تستخدم الأمر بشكل صحيح");
       const balance = await eco.balance(user1, secktor);
       let a = (balance.wallet) < parseInt(word)
       //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
       if(a == true) return citel.reply("يا فقير انت وما عندك ذا المقدار وتبي تحوله ؟");

       const deduct = await eco.deduct(user1, secktor, value[0]);
       const give = await eco.give(user2, secktor, value[0]);
       return await citel.reply(`*تم تحويل ${value[0]} من حسابك*`)

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
         return await citel.reply(`╮──────✧ا✧───────╭
│ ⦿ - ${balance.wallet} بيلي 
╯──────✧ا✧───────╰`)
     
     }
     )
     

    //---------------------------------------------------------------------------
   cmd({
        pattern: "ضف",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {

         const secktor = "secktor"
         const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);
         let users = citel.mentionedJid ? citel.mentionedJid : citel.msg.contextInfo.participant || false;
         if(!users) return citel.reply('منشن من تبغى تضيف له/م')
         users.forEach(async (user) => {
           await eco.give(user, secktor, parseInt(text.split(' ')[0]));
         });
        return await Void.sendMessage(citel.chat,{text: `تم ضفت ${parseInt(text.split(' ')[0])} ل ${users.length} `,mentions:users},{quoted:citel})
    }
)


    //---------------------------------------------------------------------------
    cmd({
       pattern: "جرد",
       filename: __filename,
       react: "👍"
   },
   async(Void, citel, text,{ isCreator }) => {
    const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);
       if(!isCreator) return

        const secktor = "secktor"
        let users = citel.mentionedJid ? citel.mentionedJid : citel.msg.contextInfo.participant || false;
if(!users) return citel.reply('منشن مين تبغى تجرد منه/م')
for (const user of users) {
 await eco.deduct(user, secktor, parseInt(text.split(' ')[0]));
}

       return await Void.sendMessage(citel.chat,{text: `تم اخذت ${parseInt(text.split(' ')[0])} من @${users.split('@')[0]}`,mentions:[users]},{quoted:citel})

   }
)

    //---------------------------------------------------------------------------
