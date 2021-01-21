const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("wio.db");
const ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let p = db.fetch(`prefix_${message.guild.id}`)
let prefix = ayarlar.prefix;
if (p) prefix = p;
  let ceza = db.fetch(`muterol_${message.guild.id}`)
    if(args[0] === "sıfırla") {
    if(!ceza) {
           const hataembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .addField('HATA:', 'Ayarlanmayan Şeyi Sıfırlayamazsın.')
      message.channel.send(hataembed)
      return
    }
    
    db.delete(`muterol_${message.guild.id}`)
           const ok = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Muteli Rolü Başarıyla Sıfırlandı.')
    message.channel.send(ok)
    return
  }
  let cezarol = message.mentions.roles.first()
       const error = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .addField('HATA:', 'Muteli Rolü Ayarlamam İçin Bir Rol Yaz')
  if (!cezarol) return message.channel.send(error);
    db.set(`muterol_${message.guild.id}`, cezarol.id)
           const ok = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', `Mute Rolü Başarıyla ${cezarol} Olarak Ayarlandı`)
    message.channel.send(ok)
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'muterol',
  description: '',
  usage: 'cezalırol'
};