 const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
 const moment = require("moment-timezone");
 const fs = require('fs-extra')
 const Levels = require("discord-xp");
 const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 //---------------------------------------------------------------------------
 //---------------------------------------------------------------------------
 cmd({
             pattern: "انذار",
             filename: __filename,
         },
         async(Void, citel, text,{ isCreator }) => {
              if (!citel.isGroup) return citel.reply('هذا الأمر خاص بالقروب')
             const groupAdmins = await getAdmin(Void, citel)
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply('هذا الأمر خاص بالمشرفين')
  const S=m;function Z(){const F=['126402oKAcRa','date','سيتم طرد هذا الشخص لانه اخذ انذارات كثيرة\x0a\x0a*جميع الإنذارات*\x0a','chat','8qachoN','580yXDZAo','groupParticipantsUpdate','114528WgITIL','reply','groupMetadata','│\x20*🔰Time:-*\x20','find','locale','log','196311jXGmuc','quoted','save','*\x0a╭─────────────◆\x0a│\x20*🍁In\x20Group:-*\x20','759700KYdstU','warnedby','pushName','reason','8dUtMfa','2BlOCqD','550MdvhLT','*----انـذار----*\x0a الانذار ل :@','54828ViphBF','subject','1100323uEahgH','30204512uUuJcj','*There\x20are\x20total\x20','split','│\x20*⚠️Warned\x20by:-*\x20','length','sender','setDefault','group','Asia/KOLKATA','../config','215XZLRSE','HH:mm:ss','warn','remove'];Z=function(){return F;};return Z();}(function(U,w){const c=m,s=U();while(!![]){try{const q=parseInt(c(0x1eb))/0x1*(parseInt(c(0x1f0))/0x2)+parseInt(c(0x1e7))/0x3*(parseInt(c(0x1ef))/0x4)+-parseInt(c(0x200))/0x5*(-parseInt(c(0x204))/0x6)+-parseInt(c(0x1f5))/0x7*(-parseInt(c(0x1dd))/0x8)+-parseInt(c(0x1f3))/0x9*(-parseInt(c(0x1de))/0xa)+parseInt(c(0x1f1))/0xb*(parseInt(c(0x1e0))/0xc)+-parseInt(c(0x1f6))/0xd;if(q===w)break;else s['push'](s['shift']());}catch(B){s['push'](s['shift']());}}}(Z,0x707d4));function m(Y,U){const w=Z();return m=function(s,q){s=s-0x1dd;let B=w[s];return B;},m(Y,U);}if(!citel['quoted'])return citel[S(0x1e1)]('رجاءا منشن على رسالة الشخص');const timesam=moment(moment())['format'](S(0x201));moment['tz'][S(0x1fc)](S(0x1fe))[S(0x1e5)]('id');try{let metadata=await Void[S(0x1e2)](citel[S(0x207)]);await new warndb({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202),'reason':text,'group':metadata[S(0x1f4)],'warnedby':citel[S(0x1ed)],'date':timesam})[S(0x1e9)]();let ment=citel[S(0x1e8)][S(0x1fb)];Void['sendMessage'](citel['chat'],{'text':S(0x1f2)+citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+'سبب الانذار :'+text+'سبب الانذار :'+citel[S(0x1ed)],'mentions':[citel[S(0x1e8)][S(0x1fb)]]},{'quoted':citel});let h=await warndb[S(0x1e4)]({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});const Config=require(S(0x1ff));if(h[S(0x1fa)]>Config['warncount']){teskd=S(0x206);let h=await warndb[S(0x1e4)]({'id':citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});teskd+=S(0x1f7)+h[S(0x1fa)]+'\x20\x20warnings.*\x0a';for(let i=0x0;i<h[S(0x1fa)];i++){teskd+='*'+(i+0x1)+S(0x1ea)+h[i][S(0x1fd)]+'\x0a',teskd+=S(0x1e3)+h[i][S(0x205)]+'\x0a',teskd+=S(0x1f9)+h[i][S(0x1ec)]+'\x0a',teskd+='│\x20_📍Reason:\x20'+h[i][S(0x1ee)]+'_\x0a╰─────────────◆\x0a\x0a';}citel[S(0x1e1)](teskd),await Void[S(0x1df)](citel['chat'],[citel['quoted'][S(0x1fb)]],S(0x203));}}catch(Y){console[S(0x1e6)](Y);}
             
         }
     )
     //---------------------------------------------------------------------------
 //---------------------------------------------------------------------------
 cmd({
             pattern: "طلب",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!text) return reply(`.طلب ممكن تضيف امر يسوي ملصقات؟`);
             textt = `*| الطلب |*`;
             teks1 = `\n\n*المُطالب* : @${
     citel.sender.split("@")[0]
   }\n*الطلب* : ${text}`;
             teks2 = `\n\n*السلام عليكم  @${citel.sender.split("@")[0]},تم ارسال الطلب للمطور*.\n*انتظر الرد .....*`;
             for (let i of owner) {
                 Void.sendMessage(i + "@s.whatsapp.net", {
                     text: textt + teks1,
                     mentions: [citel.sender],
                 }, {
                     quoted: citel,
                 });
             }
             Void.sendMessage(citel.chat, {
                 text: textt + teks2 + teks1,
                 mentions: [citel.sender],
             }, {
                 quoted: citel,
             });
 
         }
     )
     //---------------------------------------------------------------------------

     //---------------------------------------------------------------------------
 cmd({
             pattern: "انذارات",
             filename: __filename,
         },
         async(Void, citel, text) => {
             if (!citel.isGroup) return citel.reply('هذا الأمر خاص بالقروب')
             if (!citel.quoted) return citel.reply('منشن شخص')
             teskd = ``
             let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
             console.log(h)
             teskd += `*جميع الإنذارات ال${h.length}*\n`
             for (let i = 0; i < h.length; i++) {
                 teskd += `*ـ ${i+1}*\n◆─────────────╮\n│ *المكان:* ${h[i].group}\n`
                 teskd += `│ *الوقت:* ${h[i].date}\n`
                 teskd += `│ *المُنذر:* ${h[i].warnedby}\n`
                 teskd += `│ *السبب:* ${h[i].reason}_\n◆─────────────╯\n\n`
             }
             citel.reply(teskd)
         }
 
     )
     //---------------------------------------------------------------------------
