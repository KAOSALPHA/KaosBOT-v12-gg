const Discord = require('discord.js');
exports.run = async(client, message, args, ops) => {
    message.delete()
    if (!message.member.roles.find("name", "ᕒ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ ᓬ")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`ᕒ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ ᓬ*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }
    let toverify = message.guild.member(message.mentions.users.first());
    let verifyrole = message.guild.roles.find(`name`, "ᴇʀᴋᴇᴋ");
    let verifyrolee = message.guild.roles.find(`name`, "ᴍɪsᴀғɪʀ");
    if (!verifyrole) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!verifyrolee) return message.reply("Rol Bulunamadı Lütfen 'Lianslı' Adıyla Rol Oluşturunuz.");
    if (!toverify) return message.reply("Bir kullanıcıdan bahsetmelisin.");
    await (toverify.addRole(verifyrole.id),toverify.removeRole(verifyrolee.id));
    let vUser = message.guild.member(message.mentions.users.first());
    let verifembed = new Discord.RichEmbed()
        .setTitle("Teyit Çıktısı")
        .setColor('#a5f23a')
        .addField("Teyit Eden Kişi", `${message.author.tag}`, true)
        .addField("Kanal", message.channel, true)
        .addField("Teyit Olan Kişi", `${vUser}`, true)
        .addField("Teyit Cinsiyeti", "Erkek", true)
        .setTimestamp();
    let veriflog = message.guild.channels.find(`name`, "🔺ᴋᴀʏıᴛʟᴀʀ");
    if (!veriflog) return message.channel.send("Doğrulama Kullanıcı Log Kanalı bulunamadı. Lütfen '🔺ᴋᴀʏıᴛʟᴀʀ' Adlı Kanal Oluşturunuz.`");
    veriflog.send(verifembed);
  
    
    let onay = message.guild.channels.find(`name`, "💬ɢᴇɴᴇʟ-sᴏʜʙᴇᴛ");
    onay.send(`${vUser} Aramıza Katıldı.!`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['erkek', 'Erkek', 'ERKEK', 'ᴇʀᴋᴇᴋ', 'bay', 'Bay', 'BAY'],
};

exports.help = {
  name: 'teyit-erkek',
  description: 'Kullanıcı İçin Lianslı Rolünü Verir.',
  usage: 'bay'
};