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
               guild.fetchInvites().then(invites => {
                 invites.forEach(invite => {
                  console.log("Server: " + guild.name + " Invite: https://discord.gg/" + invite.code)
                 })
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
