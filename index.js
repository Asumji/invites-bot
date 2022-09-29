try { 
  const discord = require("discord.js");
 
   const bot = new discord.Client();
   bot.on("ready", () => {
     console.log("invites ready to be sent!!");
     console.log(bot.user.id)
     console.log(bot.guilds.cache.size)
     if (bot.guilds.cache.size > 0) {
       let channelID
       let guildd = []
       bot.guilds.cache.forEach(guild => {
         guild.channels.cache.forEach(channell => {
           if (channell.type != "category") {
             if (!guildd.includes(guild.name)) {
               channelID = channell.id
               guildd.push(guild.name)
               console.log(guildd)
               console.log(channell.type)
               let channel = bot.channels.cache.get(channelID)
               channel.createInvite().then(invite => {
                 console.log(guild.name + ": " + invite.url)
               })
             }
           }
         })
       })
     
     } else {
       console.warn("No Guilds found!")
     }
   });
  
   bot.login("token-here");
 } catch(e) {
   console.error("Something went wrong!\nError:\n"+ e)
 }
