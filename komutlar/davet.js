const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const Embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor("ST-AT", client.user.avatarURL)
    .setColor("BLUE")
    .setTitle("ST-AT BOT")
    .setURL(
      "https://discordapp.com/oauth2/authorize?client_id=647386467844227074&scope=bot&permissions=8"
    )
    .setDescription(`Sunucuna İstatistik Paneli Yapmak İçin Davet Edebilirsin`)

    .addField("Davet Linki.", `https://www.google.com/`)

    .setFooter("© Mcadventuretime.com", client.user.avatarURL);
  message.channel.send(Embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "davet",
  description: "Davet Et.",
  usage: "davet"
};
