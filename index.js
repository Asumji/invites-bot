const Discord = require("discord.js");

const bot = new Discord.Client();
bot.on("ready", () => {
  console.log("invites ready to be sent!!");
  console.log(bot.user.id)
  if (bot.guilds.cache.size > 0) {
    let channelID
    let guildd = []
    bot.guilds.cache.forEach(guild => {
      guild.channels.cache.forEach(channell => {
        if (channell.type == "text") {
          if (!guildd.includes(guild.name)) {
            channelID = channell.id
            guildd.push(guild.name)
            console.log(guildd)
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

const PREFIX = "!";

bot.on("message", message => {
  // let args = message.content.substring(PREFIX.length).split(" ");
  // let command = message.content.split(" ")[0];
  
  if (bot.member.hasPermission("MANAGE_SERVER")) {
    console.log("Permission")
  } else {
    console.log("No Permission")
  } 
});
bot.login("insert-token");