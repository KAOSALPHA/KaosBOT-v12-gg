const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var oyun = [
         
    ];
    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        }, 5000);
    
  console.log(`[ST-AT] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[ST-AT] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
  client.user.setActivity(`ryz!kurulum 🔥`);
  console.log(`[ST-AT] BOT: Oyun ismi ayarlandı!`);
  console.log(`[ST-AT] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
};
