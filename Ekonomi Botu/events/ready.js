const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ping ~ 》 Gerekli kurulum tamamlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Ping ~ 》 ${client.user.tag} olarak giriş sağlandı...`);
  client.user.setActivity(`Bum!`, {type: 4})


};