const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────✧${s.BOT }✧────◆
Eypz-WaBot
     ╭──────────────
|❏│   _Préfix_ : ${s.PREFIXE}
|❏│   _Proprio_ : ${s.OWNER_NAME}
|❏│   _Mode_ : ${mode}
|❏│   _Commands_ : ${cm.length}
|❏│   _Date_ : ${date}
|❏│   _Heure_ : ${temps}
|❏│   _Mémoire_ : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|❏│   _Plateforme_ : ${os.platform()}
|❏│   _Développer_ : Eypz
|❏|    𝘃𝗲𝗿𝘀𝗶𝗼𝗻    : 1.0.0
    ╰───────────────
╰─────✧THO-BOT✧─────◆ \n\n`;
    

let menuMsg = `
👋 Hello how are you ${nomAuteurMessage} 👋

*Liste des commandes de Eypz-WaBot:*
◇                             ◇
`;

// Vérifier si une catégorie spécifique est sélectionnée
if (commandeOptions.categorie) {
    const categorieSelectionnee = commandeOptions.categorie;
    if (coms[categorieSelectionnee]) {
        menuMsg += `╭────💯${categorieSelectionnee} ❏ ✧────`;
        for (const cmd of coms[categorieSelectionnee]) {
            menuMsg += `
*|❏│ ${cmd}*`;
        }
        menuMsg += `
╰═════════════⊷\n`;
    } else {
        menuMsg += `La catégorie "${categorieSelectionnee}" n'existe pas.\n`;
    }
} else {
    for (const cat in coms) {
        menuMsg += `╭────💯${cat} ❏ ✧────`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*|❏│ ${cmd}*`;
        }
        menuMsg += `
╰═════════════⊷ \n`;
    }
}

menuMsg += `
◇            ◇
*»»————— ★ —————««*
"Mettre la commande, et insérez ${prefixe} tu like et la commande_nom."
                                           
*»»—————    ★   —————««*
`;

var lien = mybotpic();

if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Hacking-MD*, développé par Thomas+" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Hacking-MD*, développé par Thomas+" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(infoMsg + menuMsg);
}
});
