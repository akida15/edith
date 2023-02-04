 const { sck,sck1,cmd, getBuffer, tlang, prefix } = require('../lib')
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
         pattern: "resetwallet",
         desc: "reset wallet of quoted user.",
         category: "economy",
         filename: __filename,
         react: "💷"
     },
     async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
	 if(!isCreator) return citel.reply(tlang().owner)
        let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
	if(!users) return citel.reply('Please give me user.')
        const balance  = await eco.balance(users, "secktor")
        await eco.deduct(users, "secktor", balance.wallet);
        return await citel.reply(`⛩️ User: @${users.split('@')[0]} \n *🧧 @${users.split('@')[0]} lost all 🪙 in wallet.*\n_Now live with that poverty.🫡_`,{mentions:[users]})
 }
 )
    //---------------------------------------------------------------------------
 cmd({
    pattern: "capacity",
    desc: "update capacity.",
    category: "economy",
    filename: __filename,
    react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
    let zerogroup = (await sck.findOne({
        id: citel.chat,
    })) || (await new sck({
            id: citel.chat,
        })
        .save());
    let mongoschemas = zerogroup.economy || "false";
    if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
    if (!citel.isGroup) return citel.reply(tlang().group);
    if (!text) return citel.reply(`💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`)
    let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    const secktor = "secktor"
	let value = text.trim();
	let k = parseInt(value)
    const balance  = await eco.balance(user, secktor)
    switch (value) {
        case '1000':
        case '1':
        if (k > balance.wallet ) return citel.reply(`*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*`);
          const deduct1 = await eco.deduct(user, secktor, 100);
          const add1 = eco.giveCapacity(user, secktor, 1000);
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
        return await Void.sendButtonText(citel.chat, buttons, `*1000 🪙diamond storage has been added in ${citel.pushName} bank*`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);

              break
        case '100000':
        case '2':
        if (k < balance.wallet) return citel.reply(`*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*`);
          const deduct2 = await eco.deduct(user, secktor, 1000);
          const add2 = eco.giveCapacity(user, secktor, 100000);
              let buttonss = [{
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
        return await Void.sendButtonText(citel.chat, buttonss, `*100000 🪙diamond storage has been added in ${citel.pushName} bank*`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);


              break
        case '10000000':
        case '3':
        if (k < balance.wallet) return citel.reply(`You need to pay 🪙10000 to increase bank capacity ~ 1000 sp`);
           const deduct3 = await eco.deduct(user, secktor, 10000);
           const add3 = eco.giveCapacity(user, secktor, 10000000);
               let buttonst = [{
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
        return await Void.sendButtonText(citel.chat, buttonst, `*10000000 🪙diamond storage has been added in ${citel.pushName}\'s bank*`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);


             break
default:
 await citel.reply('*What are you trying to do📉*.')

 }
}
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "deposit",
        desc: "deposit gold.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
      //  let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
        if (!text) return citel.reply("Baka!! Provide the 💰amount you want to deposit!");
        let d = parseInt(text)
        const deposit = await eco.deposit(citel.sender, "secktor", d);
        const balance = await eco.balance(citel.sender, "secktor")
        if(deposit.noten) return citel.reply('You can\'t deposit what you don\'t have💰.'); //if user states more than whats in his wallet
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
    return await Void.sendButtonText(citel.chat, buttons, `⛩️ Sender: ${citel.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);
    }
)
     cmd({
        pattern: "lb",
        desc: "check leaderboard.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
	let h = await eco.lb('secktor',10);
	let str = `*Top ${h.length} users with more money in wallet.*\n`
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
str+= `*${i+1}*\n╭─────────────◆\n│ *Name:-* _${tname}_\n│ *User:-* _@${h[i].userID.split('@')[0]}_\n│ *Wallet:-* _${h[i].wallet}_\n│ *Bank Amount:-* _${h[i].bank}_\n│ *Bank Capacity:-* _${h[i].bankCapacity}_\n╰─────────────◆\n\n`  	 
	 arr.push(h[i].userID)
	 }
	     citel.reply(str,{mentions:arr})
	     
     })

cmd({
    pattern: "transfer",
    desc: "transfer gold.",
    category: "economy",
    filename: __filename,
    react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
    let zerogroup = (await sck.findOne({
        id: citel.chat,
    })) || (await new sck({
            id: citel.chat,
        })
        .save());
    let mongoschemas = zerogroup.economy || "false";
    if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
    let value = text.trim().split(" ");
    if (value[0] === "") return citel.reply(`Use ${prefix}transfer 100 @user`);
    let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    if(!user) return citel.reply('Please give me any user🤦‍♂️.');
    const secktor = "secktor"
        const user1 = citel.sender
        const user2 = user
        const word = value[0];
		const code = value[1];
        let d = parseInt(word)
		if (!d) return citel.reply("check your text plz u r using the command in a wrong way👀");
        const balance = await eco.balance(user1, secktor);
        let a = (balance.wallet) < parseInt(word)
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        if(a == true) return citel.reply("you dont have sufficient money to transfer👎");

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
    return await Void.sendButtonText(citel.chat, buttons, `*📠 Transaction successful of ${value[0]} 💰*`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);


}
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "wallet",
        desc: "shows wallet.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
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
    return await Void.sendButtonText(citel.chat, buttons, `*👛 ${citel.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);

    }
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "give",
        desc: "Add money in wallet.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        if(!isCreator) return

         const secktor = "secktor"
         let users = citel.mentionedJid || false;
if(!users) return citel.reply('Please mention the users to add money to their wallets.')
for (const user of users) {
  await eco.give(user, secktor, parseInt(text.split(' ')[0]));
}

        return await Void.sendMessage(citel.chat,{text: `Added 📈 ${parseInt(text.split(' ')[0])} to @${users.split('@')[0]} wallet🛸.`,mentions:[users]},{quoted:citel})

    }
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "take",
        desc: "Add money in wallet.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        if(!isCreator) return

         const secktor = "secktor"
         let users = citel.mentionedJid || false;
if(!users) return citel.reply('Please mention the users to add money to their wallets.')
for (const user of users) {
  await eco.deduct(user, secktor, parseInt(text.split(' ')[0]));
}

        return await Void.sendMessage(citel.chat,{text: `Added 📈 ${parseInt(text.split(' ')[0])} to @${users.split('@')[0]} wallet🛸.`,mentions:[users]},{quoted:citel})

    }
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "bank",
        desc: "shows bank amount.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦Economy* is not active in current group.");
        const balance = await eco.balance(citel.sender, "secktor"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        let buttons = [{
            buttonId: `${prefix}slot`,
            buttonText: {
                displayText: "Slot🎰",
            },
            type: 1,
        },
        {
            buttonId: `${prefix}wallet`,
            buttonText: {
                displayText: "Wallet👛",
            },
            type: 1,
        },
    ];
    return await Void.sendButtonText(citel.chat, buttons, `🍀User: ${citel.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`, `${Config.ownername.split(' ')[0]}-Economy
Version: 0.0.6`, citel);

    }
)
