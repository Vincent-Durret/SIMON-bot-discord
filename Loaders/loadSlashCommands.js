const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

module.exports = async (bot) => {
  let commands = [];

  bot.commands.forEach(async (command) => {
    let slashCommand = new Discord.SlashCommandBuilder()
      .setName(command.data.name)
      .setDescription(command.data.description)
      .setDMPermission(command.data.dm)
      .setDefaultMemberPermissions(
        command.permission === "Aucune" ? null : command.permission
      );

    if (command.options?.length >= 1) {
      for (let option of command.options) {
        switch (option.type.toUpperCase()) {
          case "STRING":
            slashCommand.addStringOption((opt) =>
              opt
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
            );
            break;
          case "INTEGER":
            slashCommand.addIntegerOption((opt) =>
              opt
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
            );
            break;
          case "BOOLEAN":
            slashCommand.addBooleanOption((opt) =>
              opt
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
            );
            break;
          case "USER":
            slashCommand.addUserOption((opt) =>
              opt
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required)
            );
            break;
          // Ajoutez des cas pour d'autres types d'options supportés si nécessaire
          default:
            console.log(`Type d'option inconnu: ${option.type}`);
        }
      }
    }
    commands.push(slashCommand);
  });

  const rest = new REST({ version: "10" }).setToken(bot.token);

  await rest.put(Routes.applicationCommands(bot.user.id), { body: commands });

  console.log("Les slash command sont créées avec succès !");
};
