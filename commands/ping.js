const { tlang, botpic,cmd, prefix, runtime,Config } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
//---------------------------------------------------------------------------
cmd({
        pattern: "chat",
        desc: "chat with an AI",
        category: "general",
        use: '<Hii,Secktor>',
        filename: __filename,
    },
    async(Void, citel,text) => {
        let zx = text.length;
        if (zx < 30) {
            let {data} = await axios.get(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
            return citel.reply(data.cnt);  
        }
        if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: Config.OPENAI_API_KEY || "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",
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: text,
            temperature: 0.5,
            max_tokens: 80,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ['"""'],
        });
        citel.reply(completion.data.choices[0].text);
    }
)
