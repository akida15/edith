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

 const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime, prefix, Config } = require('../lib')
 //---------------------------------------------------------------------------
 function akida() {	
    return new Promise( (resolve, reject) => {	
      let LangG = getString("akida");	
      let todlink = [`${LangG.pic1}`,`${LangG.pic2}`,`${LangG.pic3}`,`${LangG.pic4}`,`${LangG.pic5}`,`${LangG.pic6}`	
     ];	
   const picsecktorh = todlink[Math.floor(Math.random() * todlink.length)];	
   resolve(picsecktorh)	
   })	
    }	

    //---------------------------------------------------------------------------

cmd({
         pattern: "احزر",
         category: "",
         filename: __filename,
         desc: ""
     },
     async(Void, citel, text, isAdmins) => {
         const alivtxt = `احزر اسم الشخصية`;
         let aliveMessage = {
             image: {
                 url: await akida(),
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
