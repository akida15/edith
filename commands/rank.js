require('../../../handler/MessageHandler')
const canvacord=require('canvacord')
const {fetchBuffer}=require('../../../lib/Function')
const Secktor = require('../lib')
Secktor.cmd({
    
    pattern: "rank",
    desc: "Sends rank card of user.",
    category: "group",
    filename: __filename,
},
async(Void, citel, text) => {
    const userq = await Levels.fetch(citel.sender, "RandomXP");
    const lvpoints = userq.level;
    var role = "GOD✨";
    if (lvpoints <= 2) {
        var role = "🏳Citizen";
    } else if (lvpoints <= 4) {
        var role = "👼Baby Wizard";
    } else if (lvpoints <= 6) {
        var role = "🧙‍♀️Wizard";
    } else if (lvpoints <= 8) {
        var role = "🧙‍♂️Wizard Lord";
    } else if (lvpoints <= 10) {
        var role = "🧚🏻Baby Mage";
    } else if (lvpoints <= 12) {
        var role = "🧜Mage";
    } else if (lvpoints <= 14) {
        var role = "🧜‍♂️Master of Mage";
    } else if (lvpoints <= 16) {
        var role = "🌬Child of Nobel";
    } else if (lvpoints <= 18) {
        var role = "❄Nobel";
    } else if (lvpoints <= 20) {
        var role = "⚡Speed of Elite";
    } else if (lvpoints <= 22) {
        var role = "🎭Elite";
    } else if (lvpoints <= 24) {
        var role = "🥇Ace I";
    } else if (lvpoints <= 26) {
        var role = "🥈Ace II";
    } else if (lvpoints <= 28) {
        var role = "🥉Ace Master";
    } else if (lvpoints <= 30) {
        var role = "🎖Ace Dominator";
    } else if (lvpoints <= 32) {
        var role = "🏅Ace Elite";
    } else if (lvpoints <= 34) {
        var role = "🏆Ace Supreme";
    } else if (lvpoints <= 36) {
        var role = "💍Supreme I";
    } else if (lvpoints <= 38) {
        var role = "💎Supreme Ii";
    } else if (lvpoints <= 40) {
        var role = "🔮Supreme Master";
    } else if (lvpoints <= 42) {
        var role = "🛡Legend III";
    } else if (lvpoints <= 44) {
        var role = "🏹Legend II";
    } else if (lvpoints <= 46) {
        var role = "⚔Legend";
    } else if (lvpoints <= 55) {
        var role = "🐉Immortal";
    }
    let disc = citel.sender.substring(3, 7);
    let textr = '';
    if (pushName) {
        textr += `*${pushName}#${disc}'s* Exp\n\n`
       } else {
           textr += `*${m.sender}#${disc}'s* Exp\n\n`
       }
       textr += `*🎯️XP*: ${userq.xp} / ${Levels.xpFor(userq.level + 1)}\n*❤️Level*: ${userq.level}\n*🔮️Role*: ${role}`

       try {
               ppuser = await client.profilePictureUrl(m.sender, 'image')
           } catch {
               pppuser = 'https://www.linkpicture.com/q/IMG-20220118-WA0387.png'
               ppuser=await fetchBuffer(pppuser)

           }
           const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
           const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
           const randomHexz = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`

                       const rank = new canvacord.Rank()
               .setAvatar(ppuser)
               .setLevel(55)
               .setLevelColor(randomHexs, randomHex)
               .setCurrentXP(73)
               .setOverlay(randomHex, 100, false)
               .setRequiredXP(6)
               .setProgressBar(randomHexs, 'COLOR')
               .setRank(0, role, false)
               .setBackground('COLOR', randomHexz)
               .setUsername(pushName)
               .setDiscriminator(disc)
           rank.build().then(async(data)=>{
               client.sendMessage(m.from,{image:data,caption:textr},{quoted:m})
            });
}
)
