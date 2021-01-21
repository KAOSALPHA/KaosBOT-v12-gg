{
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});

  const listener = app.listen(process.env.PORT, () => {
  console.log("Port Dinleniliyor " + listener.address().port);
});
  
}
setInterval(() => {
    require('node-fetch')("https://SİTE-LINKI.glitch.me");
    console.log(`Keeping the bot online.`);
}, 5 * 60 * 1000);

const { Client, MessageEmbed } = require('discord.js');

const fs = require('fs');

require('dotenv').config();

const client = new Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', async () => {

    console.log('Hazır olun ve tepki vermeye başlayın!');
    client.user.setActivity('Reaksiyon! | Loz Bey', { type: 'PLAYING' });

    let reactions = JSON.parse(fs.readFileSync('./ayarlar/reaksiyon.json', 'utf8'));

    client.guilds.cache.forEach(g => {
        g.channels.cache.forEach(async c => {
            if (reactions[c.id]) {
                for (let messageID in reactions[c.id]) {
                    await c.messages.fetch(messageID).then(msgID => {
						for (let reaction in reactions[c.id][messageID]) {
							msgID.react(reaction);
						}
					}).catch(() => {
						delete reactions[c.id][messageID];
						fs.writeFileSync("./ayarlar/reaksiyon.json", JSON.stringify(reactions, null, 4), err => {});
					})
                }
            }
        })
    })


});

client.on('message', async message => {

    let prefixes = JSON.parse(fs.readFileSync('./ayarlar/prefixler.json', 'utf8'));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = "r.";
        fs.writeFileSync('./ayarlar/prefixler.json', JSON.stringify(prefixes, null, 4), err => { });
    }

    if (message.author.bot) return;

    let prefix = prefixes[message.guild.id];

    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) { return message.channel.send(`Bu Sunucunun Prefixi: \`${prefix}\``) }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift();

    switch (cmd.toLowerCase()) {
		case 'sil':
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu Yetkiye Sahip Değilsiniz.`);
        
            if (!args[0]) return message.channel.send(`Bir Miktar Giriniz`);
            if (isNaN(args[0])) return message.channel.send(`Sayısal Bir Değer Giriniz`);
            let amount = parseInt(args[0]);
            if (amount === 0) return message.channel.send(`0 Miktarını Giremezsiniz`);
            if (amount > 100) amount = 100;
            await message.channel.messages.fetch({ limit: amount }).then(msgs => {
                message.channel.bulkDelete(amount).then(() => {
                    message.channel.send(`Silinen Mesaj Sayısı ${msgs.size}`);
                }).catch(() => message.channel.send(`2 Haftayı Geçen Mesajları Silemem`));
            });
            break;
        case 'prefix':
            message.channel.send(`Sunucunun Prefixi: \`${prefixes[message.guild.id]}\``);
            break;
        case 'prefix-değiştir':
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu Yetkiye Sahip Değilsiniz.`);

            if (!args[0]) return message.channel.send(`Lütfen Bir Prefix Giriniz. (Geçerli Prefix: ${prefixes[message.guild.id]})`);

            prefixes[message.guild.id] = args.join(' ');
            fs.writeFileSync('./ayarlar/prefixler.json', JSON.stringify(prefixes, null, 4), err => { });

            message.channel.send(`Bu sunucudaki geçerli prefix şimdi: \`${args.join(' ')}\``);
            break;
        case 'yardım':
            let embedHelp = new MessageEmbed()
                .setTitle('Yardım Menüsü')
                .setColor('#19ce0e')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Emoji İle Rol Alma Altyapısı | Loz 'Bey ❤️!`)
                .addField(
                    `KOMUTLAR`,
                    `**YARDIM - YARDIM MENÜSÜ**

                    **${prefix}prefix | Sunucunun Geçerli Prefixini Gösterir.**

                    **${prefix}prefix-değiştir | Prefixi Değiştirir.**

                    **${prefix}oluştur [channel] [messageID] [emoji] [role] - Bir Reaksiyon Oluştur.**

                    **${prefix}embed-oluştur [channel] [emoji] [role] [embed BAŞLIĞI | embed AÇIKLAMASIS] - Bir Embed Reaksiyonu Oluştur.**`);

            message.channel.send(embedHelp);
            break;
        case 'oluştur':
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu Yetkiye Sahip Değilsin.`);
            let reactions = JSON.parse(fs.readFileSync('./ayarlar/reaksiyon.json', 'utf8'));
            if (!args[0]) return message.channel.send('Lütfen Bir Kanal Sağlayın.');
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`Kanalı yönetemiyorum. Kanalları yönetme iznine ihtiyacım var.`);
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!args[1]) return message.channel.send('Bir Mesaj ID Giriniz.');
            if (isNaN(args[1])) return message.channel.send(`Lütfen Geçerli Bir Mesaj ID Giriniz.`);
            await channel.messages.fetch(args[1]).then(async msgID => {
                if (!args[2]) return message.channel.send('Emoji Belirtiniz.');
                let emoji = args[2];
                if (!args[3]) return message.channel.send('Rol Etiketleyiniz.');
                if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`Rolü yönetemiyorum. Rolleri yönetme iznine ihtiyacım var.`);
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]) || message.guild.roles.cache.find(r => r.name === args.slice(args[0].length + 1 + args[1].length + 1 + args[2].length + 1).join(' '));
                if (!role) message.channel.send(`Rolü Bulamadım.`);
                if (!message.guild.me.hasPermission('ADD_REACTIONS')) return message.channel.send(`Mesaja cevap veremem. Reaksiyon iznini Vermelisiniz.`);
                msgID.react(emoji);

                if (!reactions[channel.id]) {
                    reactions[channel.id] = {
                        [msgID.id]: {
                            [emoji]: role.name
                        }
                    };
                } else {
                    if (!reactions[channel.id][msgID.id]) {
                        reactions[channel.id][msgID.id] = {
                            [emoji]: role.name
                        }
                    } else {
                        reactions[channel.id][msgID.id][emoji] = role.name;
                    }
                }

                fs.writeFileSync('./ayarlar/reaksiyon.json', JSON.stringify(reactions, null, 4), err => { });

                if (!message.guild.me.hasPermission('EMBED_LINKS')) {
                    return (await message.channel.send(`I cannot send embedded message. I will send in a normal message.`).then(() => {
                        message.channel.send(
                            `**Reaksiyon Rolü Oluşturuldu**
                            **Kanal**: ${channel}
                            **Mesaj ID**: ${msgID.id}
                            **Emoji**: ${emoji}
                            **Rol**: ${role.name}`
                        )
                    }));
                } else {
                    message.channel.send({
                        embed: {
                            title: "Reaksiyon Rolü Oluşturuldu",
                            color: "#19ce0e",
                            fields: [
                                {
                                    name: "Kanal",
                                    value: channel,
                                    inline: true
                                },
                                {
                                    name: "Mesaj ID",
                                    value: msgID.id,
                                    inline: true
                                },
                                {
                                    name: "Emoji",
                                    value: emoji,
                                    inline: true
                                },
                                {
                                    name: "Rol",
                                    value: role,
                                    inline: true
                                }
                            ]
                        }
                    });
                }
            }).catch(() => {
                message.channel.send(`Mesaj bu kanalda mevcut değil.`);
                return;
            });
            break;
        case 'crembed':
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu komutu kullanma izniniz yok.`);
            let reactionsEmbed = JSON.parse(fs.readFileSync('./ayarlar/reaksiyon.json', 'utf8'));
            if (!args[0]) return message.channel.send('Please provide a channel.');
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`Kanalı yönetemiyorum. Kanalları yönetme iznine ihtiyacım var.`);
            let channelEmbed = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!args[1]) return message.channel.send('Lütfen bir emoji sağlayın.');
            let emojiEmbed = args[1];
            if (!args[2]) return message.channel.send('Lütfen bir rol sağlayın.');
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`Rolü yönetemiyorum. Rolleri yönetme iznine ihtiyacım var`);
            let roleEmbed = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
            if (!roleEmbed) message.channel.send(`The role does not exist.`);
            if (!message.guild.me.hasPermission('ADD_REACTIONS')) return message.channel.send(`Mesaja cevap veremem. Reaksiyon iznine ihtiyacım var.`);
            // msgID.react(emoji);
            if (!args[3]) return message.channel.send('Lütfen bir embed başlığı ve bir açıklama sağlayın.');
            let titleNdescription = args.join(' ').slice(args[0].length + 1 + args[1].length + 1 + args[2].length + 1).split(" | ");

            let msgID_Embed = await channelEmbed.send({ embed: { title: titleNdescription[0], description: titleNdescription[1], color: '#19ce0e' } });
            msgID_Embed.react(emojiEmbed);

            if (!reactionsEmbed[channelEmbed.id]) {
                reactionsEmbed[channelEmbed.id] = {
                    [msgID_Embed.id]: {
                        [emojiEmbed]: roleEmbed.name
                    }
                };
            } else {
                if (!reactionsEmbed[channelEmbed.id][msgID_Embed.id]) {
                    reactionsEmbed[channelEmbed.id][msgID_Embed.id] = {
                        [emojiEmbed]: roleEmbed.name
                    }
                } else {
                    reactionsEmbed[channelEmbed.id][msgID_Embed.id][emojiEmbed] = roleEmbed.name;
                }
            }

            fs.writeFileSync('./ayarlar/reaksiyon.json', JSON.stringify(reactionsEmbed, null, 4), err => { });

            if (!message.guild.me.hasPermission('EMBED_LINKS')) {
                return message.channel.send(`Embed mesajı gönderemiyorum. Normal bir mesaj göndereceğim.`).then(() => {
                    message.channel.send(
                        `**Reaksiyon Rolü Oluşturuldu**
                        **Kanal**: ${channelEmbed}
                        **Mesaj ID**: ${msgID_Embed.id}
                        **Emoji**: ${emojiEmbed}
                        **Rol**: ${roleEmbed.name}`
                    )
                });
            } else {
                message.channel.send({
                    embed: {
                        title: "Reaksiyon Rolü Oluşturuldu",
                        color: "#19ce0e",
                        fields: [
                            {
                                name: "Kanal",
                                value: channelEmbed,
                                inline: true
                            },
                            {
                                name: "Mesaj ID",
                                value: msgID_Embed.id,
                                inline: true
                            },
                            {
                                name: "Emoji",
                                value: emojiEmbed,
                                inline: true
                            },
                            {
                                name: "Rol",
                                value: roleEmbed,
                                inline: true
                            }
                        ]
                    }
                });
            }
            break;
    }

});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;

    let reactions = JSON.parse(fs.readFileSync('./ayarlar/reaksiyon.json', 'utf8'));

    if (reactions[reaction.message.channel.id]) {
        if (reactions[reaction.message.channel.id][reaction.message.id]) {
            if (reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji]) {
                let role = reaction.message.guild.roles.cache.find(r => r.name === reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji]);
                reaction.message.guild.members.cache.get(user.id).roles.add(role);
            }
        }
    }

})

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;

    let reactions = JSON.parse(fs.readFileSync('./ayarlar/reaksiyon.json', 'utf8'));

    if (reactions[reaction.message.channel.id]) {
        if (reactions[reaction.message.channel.id][reaction.message.id]) {
            if (reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji]) {
                let role = reaction.message.guild.roles.cache.find(r => r.name === reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji]);
                reaction.message.guild.members.cache.get(user.id).roles.remove(role);
            }
        }
    }

})

