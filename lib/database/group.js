const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
id: { type: String,  unique: true ,required: true },
events: { type: String, default: "false" },
nsfw: { type: String, default: "false" },
welcome:{ type: String, default: "@صورة *السلام عليكم,* @منشن \n*انرت في* @اسم \n*الاعضاء* : @اعضاء" },
goodbye:{ type: String, default: ` @صورة  ✠═ • ═  •༺⊱╠🌑╣⊰༻• ═ • ═✠
◈ تـعـلـن ادارة 𝐌𝐎𝐎𝐍
↫ ⟦ خـروج 📯 عـضـو ⟧
⊹⊱≼━━━⌬〔🌑〕⌬━━━≽⊰⊹

֎╎الـلـقـب🎴 ⊑ @منشن ⊒

֎╎مـسـؤول الـبـنـك 🎩 ⊑ @34612538080 ⊒

֎╎مـسـؤول الـمـنـشـن 🎩 ⊑ @34631821794 ⊒

֎ مـلاحـظـات ‼️
↲ يتم حذف لقبه من المنشن اي انه لن يستطيع اخذه اذا عاد مره ثانيه
↲ يتم حذف حسابه بالبنك 
↲ يتم حذف تقدمه بالمستويات 

⊹⊱≼━━━⌬〔🌑〕⌬━━━≽⊰⊹
〄 ¦ مـع تـحـيـات ادارة :
〖 𝐌𝐎𝐎𝐍 𓆩🌑𓆪 𝐍𝐈𝐆𝐇𝐓 〗
✠═ • ═  •༺⊱╠🌑╣⊰༻• ═ • ═✠ ` },
botenable: { type: String, default: "true" },
antilink: { type: String, default: "false" },
economy: { type: String, default: "false" },
mute: { type: String },
unmute: { type: String }
})
const sck =mongoose.model("Sck", GroupSchema)
module.exports = { sck }
