const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime, prefix, Config } = require('../lib')
    //---------------------------------------------------------------------------//
    function akidapic() {	
        return new Promise( (resolve, reject) => {	
          let LangG = getString("global");	
          let todlink = [
            "https://www.entoin.com/images/sllaye19.jpg",
            "https://www.entoin.com/images/sllaye20.jpg",
            "https://www.entoin.com/images/sllaye21.jpg"
        ];	
       const picsecktorh = todlink[Math.floor(Math.random() * todlink.length)];	
       resolve(picsecktorh)	
       })	
        }	
    //---------------------------------------------------------------------------//

cmd({
        pattern: "احزر",
        filename: __filename,
    },
    async(Void, citel, text, isAdmins) => {
        const alivtxt = `احزر اسم الشخصية`;
        let aliveMessage = {
            image: {
                url: await akidapic(),
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
