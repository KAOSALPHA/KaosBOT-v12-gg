const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

const db = require('wio.db')

exports.run = (client, message, params) => {
message.react("✅");
let p = db.fetch(`prefix_${message.guild.id}`)
let prefix = ayarlar.prefix;
if (p) prefix = p;
let muterol
    muterol = message.guild.roles.create({
    data:{
    name: "Muted",
    color: "WHITE"
    }
   }).then(muterol => {
 
 message.guild.channels.cache.forEach(channel => {
   
   channel.updateOverwrite(muterol, {
     SEND_MESSAGES: false,
     ADD_REACTIONS: false
    })})})
    message.channel.send(`Mute rolü başarıyla ${muterol} olarak oluşturuldu, ayarlamak için ${prefix}muterol.`)
  }
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: 'muterololuştur',
    description: '',
    usage: 'neivainsta'
}