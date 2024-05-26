"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "channel", categorie:"General", reaction: "💎", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const img = 'https://avatars.githubusercontent.com/u/105191630?v=4';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `HELLO 👋 
THIS YOU *Eypz-WaBot.*\n Follow the Eypz-WaBot channel on WhatsApp: https://whatsapp.com/channel/0029Vaf2tKvGZNCmuSg8ma2O

📅 *RELEASE DATE:* ${releaseDate}
🕐 *UPDATE ON:* ${repoInfo.lastUpdate}
👨‍💻 *OWNER:* *Thomas*
__________________________________
            *Made With* Thomas`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
