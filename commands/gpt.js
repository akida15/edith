const axios = require('axios')
const { sck1, tiny, fancytext, listall,cmd } = require('../lib/')
const fs = require('fs-extra');
const { exec } = require('child_process')

cmd({
    pattern: "توصيات",
    fromMe: true,
    onlyGroup: true,
    desc: "يعطيك توصيات لأفضل الأنميات",
    usage: "/توصيات",
    },
    async (message, match) => {
        try {
            const response = await axios.get('https://api.jikan.moe/v3/top/anime/1/bypopularity');
            const animeList = response.data.top.slice(0, 10);
            let result = "تفضل، إليك بعض توصياتي لأفضل 10 أنميات:\n\n";
            animeList.forEach((anime, index) => {
                result += `${index + 1}. ${anime.title}\n`;
            });
            await message.reply(result);
        } catch (error) {
            console.log(error);
            await message.reply("حدث خطأ أثناء جلب التوصيات، يرجى المحاولة مرة أخرى لاحقًا.");
        }
    }
);

cmd({
            pattern: "أنمي",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply('ما هو عنوان الأنمي الذي تريد الاقتراح عليه؟')
            try {
                anime = text;
                anu = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${anime}&page=1`);
                data = anu.data.results[0];
                if (!data) return citel.reply('عذرا، لم يتم العثور على نتائج لهذا البحث');
                citel.reply(
                    `*إليك بعض الاقتراحات لأنمي ${anime}:*\n\n` +
                    `*اسم الأنمي*: ${data.title}\n` +
                    `*عدد الحلقات*: ${data.episodes}\n` +
                    `*التقييم*: ${data.score}\n` +
                    `*الرابط*: ${data.url}`
                );
            } catch (e) {
                console.log(e);
            }
        }
    )
