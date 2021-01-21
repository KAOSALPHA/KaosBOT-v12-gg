const Discord = require('discord.js');
const db = require('quick.db')
const kasalar = require('.././kasalar');

exports.run = async (client, message, args) => {
  
  const kasalarfilter = kasalar.filter(x => x.kasaid).map(x => `Kasa İsmi: **${x.isim}** Kasa fiyatı: **${x.fiyat}** İD: **${x.kasaid}**`).join('\n ')
  const embed = new Discord.RichEmbed()
  .addField(`Kasa Listesi ${client.ekoayarlar.botismi}`, `${kasalarfilter}`)
  .setFooter(`Bir kasa hakkında bilgi almak için: ${client.ekoayarlar.botunuzunprefixi}kasa-bilgi <kasaid>`)
  .setColor(client.ekoayarlar.renk)
  message.channel.send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'kasalar',
    description: 'Kasaları listeler.',
    usage: 'kasalar'
}