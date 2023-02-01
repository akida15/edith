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

 const { dare, truth, kt } = require('../lib/truth-dare.js')
 const axios = require('axios')
 const { cmd } = require('../lib')
     //---------------------------------------------------------------------------
 cmd({
             pattern: "كت",
             filename: __filename,
         },
         async(Void, citel, text) => {
             return await citel.reply(`${kt()}`);
         }
     )
 
 //---------------------------------------------------------------------------
//---------------------------------------------------------------------------
 cmd({
             pattern: "س",
             filename: __filename,
         },
         async(Void, citel, text) => {
             return await citel.reply(`${truth()}`);
         }
     )
     //---------------------------------------------------------------------------
 
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ح",
             filename: __filename,
         },
         async(Void, citel, text) => {
             return await citel.reply(`${dare()}`);
         }
     )
     //---------------------------------------------------------------------------
 
