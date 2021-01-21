const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix
const ms = require('parse-ms')
const db = require('quick.db')
const DBL = require('dblapi.js')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


/*

BU KOMUDU HAZIRLADIĞI İÇİN HİVIN GARDAŞIMA ÇOK TEŞG EDİYORUM...
SONRADA EDİTLEDİĞİM İÇİN KENDİME TEŞG EDİYORUM...


*/

exports.run = async (client, message, args) => {
    let timeout = 86400000 //bunu ellemeyin 24 saat 

    let daily = await db.fetch(`günlükkullanımgodareçdare-${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`Günlük ödülünü tekrar alabilmek için **${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye** beklemelisin!`)
    } else {
      if(client.ekoayarlar.dbloy == false) {
        db.set(`günlükkullanımgodareçdare-${message.author.id}`, Date.now())
        if(client.ekoayarlar.rastgelepara == true) {
          const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
          db.add(`bakiyecdare-${message.author.id}`, randomizer)
          let para1 = new Discord.RichEmbed()
          .setColor(client.ekoayarlar.renk)
          .setDescription(`**Günlük Para**`)
          .addField(`Aldığınız Miktar;`, randomizer + ` ${client.ekoayarlar.parabirimi}`)
          message.channel.send(para1)
        } else {
          if(client.ekoayarlar.rastgelepara == false) {
            db.add(`bakiyecdare-${message.author.id}`, client.ekoayarlar.günlükpara)
            let para1 = new Discord.RichEmbed()
            .setColor(client.ekoayarlar.renk)
            .setDescription(`**Günlük Para**`)
            .addField(`Aldığınız Miktar;`, client.ekoayarlar.günlükpara + ` ${client.ekoayarlar.parabirimi}`)
            message.channel.send(para1)
          }
        }
      } else {
        if(client.ekoayarlar.dbloy == true) {
          const dbl = new DBL(client.ekoayarlar.dblkey, client)
          dbl.hasVoted(message.author.id).then(voted => {
            if(voted) {
              db.set(`günlükkullanımgodareçdare-${message.author.id}`, Date.now())
              if(client.ekoayarlar.rastgelepara == true) {
                const randomizer = getRandomInt(client.ekoayarlar.minpara, client.ekoayarlar.maxpara)
                db.add(`bakiyecdare-${message.author.id}`, randomizer)
                let para1 = new Discord.RichEmbed()
                .setColor(client.ekoayarlar.renk)
                .setDescription(`**Günlük Para**`)
                .addField(`Aldığınız Miktar;`, randomizer + ` ${client.ekoayarlar.parabirimi}`)
                message.channel.send(para1)
              } else {
                if(client.ekoayarlar.rastgelepara == false) {
                  db.add(`bakiyecdare-${message.author.id}`, client.ekoayarlar.günlükpara)
                  let para1 = new Discord.RichEmbed()
                  .setColor(client.ekoayarlar.renk)
                  .setDescription(`**Günlük Para**`)
                  .addField(`Aldığınız Miktar;`, client.ekoayarlar.günlükpara + ` ${client.ekoayarlar.parabirimi}`)
                  message.channel.send(para1)
                }
              }
            } else {
              return message.channel.send(`${client.ekoayarlar.dblmsj}`)
            }
          })
        }
      }
   }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['günlük-para'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'günlükpara',
    description: 'Günlük para alırsınız.',
    usage: 'günlükpara'
}