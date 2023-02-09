const axios = require("axios");
const gis = require("g-i-s");

cmd({
    pattern: "pokemon",
    filename: __filename,
    category: "weeb",
    desc: "Sends image of pokemon in current chat.",
  },
  async(Void, citel, args) => {
    if (args[0] === "pic") {
      const pictured = "Pokemon Pics only HD ";
      gis(args[1] + pictured, async(error, result) => {
        const n = result;
        const images = n[Math.floor(Math.random() * n.length)].url;
        const buttonMessage = {
          image: {
            url: images,
          },
          caption: `*---「 Poke Pic 」---*`,
          footer: Void.user.name,
          headerType: 4,
          contextInfo: {
            externalAdReply: {
              title: LangG.title,
              body: querie,
              thumbnail: log0,
              mediaType: 2,
              mediaUrl: ``,
              sourceUrl: ``,
            },
          },
        };
        Void.sendMessage(citel.chat, buttonMessage, {
          quoted: citel,
        });
      });
    } else if (args[0] === "search") {
      if (!args[1]) return citel.reply(`❌Give me a Name ${lang.Title}`);
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${args[1]}`
        );
        if (!data.name)
          return citel.reply(`❌ Could not found any pokemon with that name`);
        const poinfo = `*•Name: ${data.name}*\n*•Pokedex ID: ${data.id}*\n*•Height: ${data.height}*\n*•Weight: ${data.weight}*\n*•Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}*\n*•Base Experience: ${data.base_experience}*\n*•Type: ${data.types[0].type.name}*\n*•Base Stat: ${data.stats[0].base_stat}*\n*•Attack: ${data.stats[1].base_stat}*\n*•Defense: ${data.stats[2].base_stat}*\n*•Special Attack: ${data.stats[3].base_stat}*\n*•Special Defense:${data.stats[4].base_stat}*\n*•Speed: ${data.stats[5].base_stat}*\n`;
        Void.sendMessage(citel.chat, {
          image: { url: data.sprites.front_default },
          caption: poinfo,
        }, {
          quoted: citel,
        });
      } catch (err) {
        citel.reply("Ahh,Couldn't found any pokemon.");
        console.log(err);
      }
    }
 
