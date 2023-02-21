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

