const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const s = require('../set');
const axios = require('axios');
//const fetch = require('node-fetch');



zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("yes I'm listening to you.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'en' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Error when translating into French :', error);
      repondre('Error when translating into French');
    });
})
.catch(error => {
  console.error('Error requesting BrainShop :', error);
  repondre('Error requesting BrainShop');
});

  }catch(e){ repondre("oops an error : "+e)}
    
  
  });  


zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nécessaires pour générer l'image.`);
    }

    // Regrouper les arguments en une seule chaîne séparée par "-"
    const image = arg.join(' ');
    const response = await axios.get(`https://api.maher-zubair.tech/ai/photoleap?q=${image}`);
    
    const data = response.data;
    let caption = '*Propulsé par HACKING-MD*';
    
    if (data.status && data.result) {
      // Utiliser les données retournées par le service
      const imageUrl = data.result;
      zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
    } else {
      repondre("Erreur lors de la génération de l'image");
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
  
  
  zokou({ nomCom: "gpt", reaction: "🌐", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`Please ask a question.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const question = arg.join(' ');
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${question}`);
  const data = await response.json();

  if (!data.result) {
    return repondre(`Sorry, I couldn't find an answer to your question.`);
  }

  await repondre(data.result);
  console.log(data.completion);
});

zokou({ nomCom: "calcul", reaction: "😂", categorie: "IA" }, async (dest, zk, commandeOptions) => { const { repondre, arg, ms } = commandeOptions;

if (!arg || arg.length === 0) { return repondre(`Please insert maths calculations like 1000*2.`); }
// Regrouper les arguments en une seule chaîne séparée par "-" const cal = arg.join(' ');
const response = await fetch(`https://api.maher-zubair.tech/ai/mathssolve?q=${cal}`);
const data = await response.json();
await repondre(data.result);console.log(data.completion); 

});


zokou({ nomCom: "thomas", reaction: "🌏", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre(`please ask a question.`);
  }

  // Regrouper les arguments en une seule chaîne séparée par "-"
  const question = arg.join(' ');
  const response = await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${question}`);
  const data = await response.json();

  await repondre(data.result);
  console.log(data.completion);
});

zokou({nomCom:"chat",reaction:"👨‍🏫",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("yes I'm listening to you.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'en' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Error when translating into French :', error);
      repondre('Error when translating into French');
    });
})
.catch(error => {
  console.error('Error requesting BrainShop :', error);
  repondre('Error requesting BrainShop');
});

  }catch(e){ repondre("oops an error : "+e)}
    
  
  });  



/* zokou({ nomCom: "dalle", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre(`Veuillez entrer les informations nécessaires pour générer l'image.`);
    } else {
      // Regrouper les arguments en une seule chaîne séparée par un espace
      const image = arg.join(' ');
      const imageSize = '256x256';
      const apiUrl = 'https://api.openai.com/v1/images/generations';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${s.GPT}`
        },
        body: JSON.stringify({
          model: 'image-alpha-001',
          prompt: image,
          size: imageSize,
          response_format: 'url'
        })
      });

      const data = await response.json();
    
      if (data && data.data && data.data.length > 0 && data.data[0].url) {
        zk.sendMessage(dest, { image: { url: data.data[0].url }, caption: '*Propulsé par HACKING-MD*'}, { quoted: ms });
      } else {
        repondre("Erreur lors de la génération de l'image");
      }
    }
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
*/

