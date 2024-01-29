const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
  .setName("ping")
  .setDescription("Affiche la latence")

  async execute(bot, interaction, args) {
    await interaction.reply(`Ping : \`${bot.ws.ping}\``);
  },
};
