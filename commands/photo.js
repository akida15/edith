const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime, prefix, Config } = require('../lib')
    //---------------------------------------------------------------------------

    const mikuArray = [
        "https://www.entoin.com/images/sllaye19.jpg",
        "https://www.entoin.com/images/sllaye20.jpg",
        "https://www.entoin.com/images/sllaye21.jpg"
    ];

    const mikuSelection = mikuArray[Math.floor(Math.random() * mikuArray.length)];

    cmd({
        pattern: "احزر",
        filename: __filename,
    },
    async(Void, citel, text, isAdmins) => {
        const alivtxt = `احزر اسم الشخصية`;
        let aliveMessage = {
            image: {
                url: mikuSelection
            },
            caption: alivtxt,
            footer: tlang().footer,
            headerType: 4,
        };
         return Void.sendMessage(citel.chat, aliveMessage, {
            quoted: citel,
        });

    }
)