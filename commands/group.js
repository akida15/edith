/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
const people = {};

cmd({
        pattern: "Ij",
        desc: "Declare your presence",
        category: "General",
        filename: __filename,
    },
    async (Void, citel) => {
        const userId = citel.message.from;
        people[userId] = true;
        return await citel.reply(`Okay, noted that you are here.`);
    }
);

cmd({
        pattern: "pick",
        desc: "Pick two people from the list",
        category: "General",
        filename: __filename,
    },
    async (Void, citel) => {
        const userIds = Object.keys(people);
        if (userIds.length < 2) {
            return await citel.reply(`Sorry, not enough people have declared their presence.`);
        }
        const selected = [userIds[Math.floor(Math.random() * userIds.length)], userIds[Math.floor(Math.random() * userIds.length)]];
        return await citel.reply(`I have randomly selected two people: ${selected[0]} and ${selected[1]}`);
    }
);

cmd({
    pattern: "rps",
    desc: "Play rock, paper, scissors game",
    category: "Fun",
    filename: __filename,
},
async (Void, citel) => {
    await citel.reply("Let's play rock, paper, scissors! Choose either rock, paper, or scissors.");

    let userChoice = await citel.ask("Your choice?");
    userChoice = userChoice.toLowerCase();

    // Make sure the user entered a valid choice
    while (userChoice !== "rock" && userChoice !== "paper" && userChoice !== "scissors") {
        await citel.reply("Invalid choice! Please choose either rock, paper, or scissors.");
        userChoice = await citel.ask("Your choice?");
        userChoice = userChoice.toLowerCase();
    }

    // Generate the bot's choice
    const choices = ["rock", "paper", "scissors"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    if (userChoice === "rock") {
        if (botChoice === "rock") {
            await citel.reply("It's a tie! We both chose rock.");
        } else if (botChoice === "paper") {
            await citel.reply("You lose! Paper beats rock.");
        } else if (botChoice === "scissors") {
            await citel.reply("You win! Rock beats scissors.");
        }
    } else if (userChoice === "paper") {
        if (botChoice === "rock") {
            await citel.reply("You win! Paper beats rock.");
        } else if (botChoice === "paper") {
            await citel.reply("It's a tie! We both chose paper.");
        } else if (botChoice === "scissors") {
            await citel.reply("You lose! Scissors beat paper.");
        }
    } else if (userChoice === "scissors") {
        if (botChoice === "rock") {
            await citel.reply("You lose! Rock beats scissors.");
        } else if (botChoice === "paper") {
            await citel.reply("You win! Scissors beat paper.");
        } else if (botChoice === "scissors") {
            await citel.reply("It's a tie! We both chose scissors.");
        }
    }
});


cmd({
        pattern: "play",
        desc: "To play a game of choose",
        category: "Games",
        filename: __filename,
    },
    async(Void, citel) => {
        var players = []
        await citel.reply("Who wants to play a game? Type 'I want to play' to join!")

        citel.onMessage(async msg => {
            if (msg.body === "I want to play") {
                players.push(msg.from)
                await citel.reply(`${msg.from} joined the game!`)
            }
        })

        setTimeout(async () => {
            if (players.length < 2) {
                return await citel.reply("Not enough players, game cancelled")
            }

            var chooser = players[Math.floor(Math.random() * players.length)]
            await citel.reply(`${chooser} will choose the game to play!`)
        }, 30000)
    }
);


cmd({
        pattern: "spot1",
    description: "A game where the bot presents a list of items and the player must choose the odd one out.",
    execute(message, args) {
        // List of items to choose from
        const items = [
            "apple",
            "banana",
            "cherry",
            "orange",
            "pear",
            "grape"
        ];
        
        // Select 3 random items from the list
        const item1 = getRandomItem(items);
        const item2 = getRandomItem(items);
        const item3 = getRandomItem(items);
        
        // Find the odd one out by comparing all the items
        let oddOneOut = item1;
        if (item1 === item2) {
            oddOneOut = item3;
        } else if (item1 === item3) {
            oddOneOut = item2;
        } else if (item2 === item3) {
            oddOneOut = item1;
        }
        
        // Build the question
        const question = `Which of these is the odd one out?\n\n${item1}\n${item2}\n${item3}`;
        
        // Send the question to the user
        message.channel.send(question).then(() => {
            // Wait for the user's response
            message.channel.awaitMessages(response => {
                // Check if the user's response is correct
                if (response.content.toLowerCase() === oddOneOut) {
                    message.reply("You're correct! Well done.");
                } else {
                    message.reply(`Sorry, that's incorrect. The correct answer was ${oddOneOut}.`);
                }
            }, {
                // Only accept one message
                max: 1,
                // Wait for up to 10 seconds for a response
                time: 10000
            });
        });
    }
};

//---------------------------------------------------------------------------


cmd({
    pattern: "guess",
    desc: "Play a number guessing game",
    category: "Fun",
    filename: __filename,
},
async (Void, citel) => {
    // Generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    await citel.reply("I'm thinking of a number between 1 and 100. Can you guess it?");

    let userGuess = null;
    let attempts = 0;

    // Keep asking for the user's guess until they get it right
    while (userGuess !== randomNumber) {
        attempts += 1;
        userGuess = await citel.ask("What's your guess?");

        if (userGuess > randomNumber) {
            await citel.reply("The number is lower.");
        } else if (userGuess < randomNumber) {
            await citel.reply("The number is higher.");
        }
    }

    await citel.reply(`Congratulations! You guessed the number in ${attempts} attempts.`);
});


cmd({
        pattern: "update code",
        desc: "Update the code of a file",
        category: "Advanced",
        filename: __filename,
    },
    async (Void, citel) => {
        const filePath = './example.js';
        const updatedCode = `console.log('Hello, this is updated code!');`;
        
        fs.writeFile(filePath, updatedCode, (error) => {
            if (error) {
                return citel.reply(`Failed to update the code: ${error}`);
            }
            return citel.reply(`Successfully updated the code in ${filePath}`);
        });
    }
);
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
            pattern: "ادخل",
            desc: "",
            category: "",
            use: '',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner);
            if (!text) return citel.reply(`وين رابط ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com"))
                citel.reply("رابط غلط");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => citel.reply("تم"))
                .catch((err) => citel.reply("مقدرت ادخل"));

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "ملصق",
            alias: ["ستكر"],
            desc: "",
            category: "",
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply(`*رد على صورة او فيديو*`);
            let mime = citel.quoted.mtype
            pack = Config.packname
            author = Config.author
            if (citel.quoted) {
                let media = await citel.quoted.download();
                let sticker = new Sticker(media, {
                    pack: citel.pushName, // The pack name
                    author: "bot", // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
            } else if (/video/.test(mime)) {
                if ((quoted.msg || citel.quoted)
                    .seconds > 20) return citel.reply("الحد الاقصى للفيد 20 ثانية");
                let media = await quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: StickerTypes.FULL, // The sticker type
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 70, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const stikk = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {  sticker: stikk   }, {    quoted: citel });
            } else {
                citel.reply("*رد على صورة او فيديو*");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "مساعدة",
        desc: "",
        category: "",
        filename: __filename,
    },
    async(Void, citel, text) => {
        citel.reply(`*شوف خاصك* ${tlang().greet}`);
        await Void.sendMessage(`${citel.sender}`, {
            image: log0,
            caption: `*الرابط:* https://chat.whatsapp.com/GxTgtHUcroEE8YC6A7IZa1`,
        });

    }
)

//---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
    cmd({
        pattern: "منشن",
        desc: "",
        category: "",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);

        let textt = `${text ? text : "السلام عليكم"}\n`
        let count = 1;
        for (let mem of participants) {
            textt += `${count} ↭ @${mem.id.split("@")[0]}\n`;
            count++;
        }
        Void.sendMessage(citel.chat, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: citel,
        });
    }
)

//---------------------------------------------------------------------------


    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "ترقية",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
            } catch {
                		citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "طرد",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().admin);

            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
            } catch {
                		citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "مخفي",
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
            const participants = citel.isGroup ? await groupMetadata.participants : "";
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins) return citel.reply(tlang().admin);

            if (!isAdmins) citel.reply(tlang().admin);
            Void.sendMessage(citel.chat, {
                text: text ? text : "",
                mentions: participants.map((a) => a.id),
            }, {
                quoted: citel,
            });
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "قروبات",
            desc: "",
            category: "",
            filename: __filename,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let getGroups = await Void.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
                .slice(0)
                .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
            let jackhuh = `جميع قروبات البوت\n\n`
            for (let i of anu) {
                let metadata = await Void.groupMetadata(i);
                await sleep(500)
                jackhuh += `*الاسم:* ${metadata.subject}\n`
                jackhuh += `*الاعضاء :* ${metadata.participants.length}\n`
                jackhuh += `*الايدي:* ${i}\n\n`

            }
            citel.reply(jackhuh)

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "تخفيض",
        desc: "",
        category: "",
        filename: __filename,
        use: '',
    },
    async(Void, citel, text) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

        if (!isAdmins) return citel.reply(tlang().admin);
        if (!isBotAdmins) return citel.reply(tlang().botAdmin);
        try {
            let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            if (!users) return;
            await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
        } catch {
            		citel.reply(tlang().botAdmin);

        }
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "احذف",
            alias: ["حذف"],
            desc: "",
            category: "",
            filename: __filename,
            use: '',
        },
        async(Void, citel, text) => {
            if (citel.quoted.Bot) {
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })

            }
            if (!citel.quoted.isBot) {
                if (!citel.isGroup) return citel.reply(tlang().group)
                const groupAdmins = await getAdmin(Void, citel)
                const botNumber = await Void.decodeJid(Void.user.id)
                const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                if (!isAdmins) return citel.reply('فقط المشرفين يمكن حذف رسائل الاعضاء')
                if (!isBotAdmins) return citel.reply('لازم اشراف')
                if (!citel.quoted) return citel.reply(`وش تبي احذف؟ ${tlang().greet}`);
                let { chat, fromMe, id } = citel.quoted;
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
//---------------------------------------------------------------------------
