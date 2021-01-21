const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../ayarlar.json")

module.exports = async message => {
    let prefix = config.prefix;
    let bot = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0].slice(prefix.length);
    let params = message.content.split(' ').slice(1);
    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd) {
        cmd.run(bot, message, params);
    }

}