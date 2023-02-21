 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd } = require('../lib')
 const { MessageType, Mimetype } = require("@adiwajshing/baileys");
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------



cmd({
  pattern: "pokemon",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118");
    const randomPokemonIndex = Math.floor(Math.random() * response.data.results.length);
    const randomPokemonUrl = response.data.results[randomPokemonIndex].url;
    const pokemonResponse = await axios.get(randomPokemonUrl);
    const pokemonImageUrl = pokemonResponse.data.sprites.other["official-artwork"].front_default;
    await Void.sendMessage(citel.chat, {image: { url: pokemonImageUrl }});
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the Pokémon image :(");
  }
});


cmd({
  pattern: "cat",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const imageUrl = response.data[0].url;
    await Void.sendMessage(citel.chat, {image: { url: imageUrl }});
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the cat image :(");
  }
});

cmd({
  pattern: "pokemon1",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118");
    const randomPokemonIndex = Math.floor(Math.random() * response.data.results.length);
    const randomPokemonUrl = response.data.results[randomPokemonIndex].url;
    const pokemonResponse = await axios.get(randomPokemonUrl);
    const pokemonName = pokemonResponse.data.name;
    const pokemonImageUrl = pokemonResponse.data.sprites.other["official-artwork"].front_default;
    await Void.sendMessage(citel.chat, {
      image: { url: pokemonImageUrl },
      caption: `Here's a random Pokémon: ${pokemonName}!`
    });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the Pokémon image :(");
  }
});

cmd({
  pattern: "animal",
  fromMe: true,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query: "animals",
        client_id: "xAxA4SsnCLw9WA7pnxiR3D8LbgMUSQ8N8UEx2wtYsg4",
      },
    });
    const imageUrl = response.data.urls.regular;
    await Void.sendMessage(citel.chat, {image: { url: imageUrl }});
  } catch (error) {
    console.error(error);
    await message.client.sendMessage(message.jid, "Sorry, something went wrong while fetching the animal image :(", MessageType.text);
  }
});


cmd({
  pattern: "pokemon2",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118");
    const randomPokemonIndex = Math.floor(Math.random() * response.data.results.length);
    const randomPokemonUrl = response.data.results[randomPokemonIndex].url;
    const pokemonResponse = await axios.get(randomPokemonUrl);

    const pokemonName = pokemonResponse.data.name;
    const pokemonLevel = Math.floor(Math.random() * 100) + 1; // generate a random level between 1 and 100

    await Void.sendMessage(citel.chat, {
      caption: `You have encountered a wild ${pokemonName} at level ${pokemonLevel}!`
    });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the Pokémon information :(");
  }
});
cmd({
  pattern: "pokemon3",
  filename: __filename,
},
async (Void, citel) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118");
    const randomPokemonIndex = Math.floor(Math.random() * response.data.results.length);
    const randomPokemonUrl = response.data.results[randomPokemonIndex].url;
    const pokemonResponse = await axios.get(randomPokemonUrl);
    const pokemonName = pokemonResponse.data.name;
    const pokemonImageUrl = pokemonResponse.data.sprites.other["official-artwork"].front_default;
    const pokemonStats = pokemonResponse.data.stats;
    const pokemonLevel = Math.floor(Math.random() * 100) + 1;
    const pokemonPower = pokemonStats.reduce((total, stat) => total + stat.base_stat, 0);
    await Void.sendMessage(citel.chat, {
      image: { url: pokemonImageUrl },
      caption: `Here's a random Pokémon: ${pokemonName}!\n\nLevel: ${pokemonLevel}\nPower: ${pokemonPower}`
    });
  } catch (error) {
    console.error(error);
    await citel.reply("Sorry, something went wrong while fetching the Pokémon information :(");
  }
});


cmd({
    pattern: "1تحويل",
    filename: __filename,
},
async (Void, citel, text) => {
    if (!text) return citel.reply(`مثال : .تحويل 50 دولار الى يورو`)
    const regex = /(\d+) ([a-zA-Z]+) (?:to|in|into) ([a-zA-Z]+)/i;
    const match = text.match(regex);
    if (!match) return citel.reply(`خطأ في الصيغة. يرجى استخدام الصيغة التالية : عدد وحدة1 الى وحدة2`);
    const amount = match[1];
    const from = match[2].toUpperCase();
    const to = match[3].toUpperCase();
    const conversionRate = await getConversionRate(from, to);
    if (!conversionRate) return citel.reply(`لا يمكن تحويل الوحدات. يرجى التأكد من الصيغة المدخلة وحاول مرة أخرى.`);
    const result = (amount * conversionRate).toFixed(2);
    citel.reply(`\`\`\`「  تحويل الوحدات  」\`\`\`\n*${amount} ${from} يساوي :*\n${result} ${to}`);
});

// Helper function to get the conversion rate
async function getConversionRate(from, to) {
    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`);
        const rates = response.data.rates;
        return rates[to];
    } catch (error) {
        console.error(error);
        return null;
    }
}


cmd({
  pattern: "roll",
  }, async (message, match) => {
    const sides = match[1];
    const roll = Math.floor(Math.random() * sides) + 1;
  await citel.reply(`🎲 You rolled a ${roll} out of ${sides}!`) 
});
 

cmd({
  pattern: "news",
  fromMe: true,
  desc: "Get the latest anime news in Arabic",
}, async (Void, citel) => {
  const url = "https://newsapi.org/v2/top-headlines?country=sa&category=entertainment&q=anime&apiKey=cada6c084c244d45aac0bc858adecc29";
  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    let articleList = "";
    for (let i = 0; i < articles.length; i++) {
      const title = articles[i].title;
      const description = articles[i].description;
      articleList += `📰 *${title}*\n${description}\n\n`;
    }
    await Void.sendMessage(citel.chat, { 
      text: `🎌 *Latest anime news in Arabic* 🎌\n\n${articleList}`,
      quoted: citel
    }, MessageType.text);
  } catch (error) {
    console.error(error);
    await Void.sendMessage(citel.chat, "An error occurred while getting the latest anime news in Arabic.", MessageType.text);
  }
});
