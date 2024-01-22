module.exports = async (bot, interaction) => {
  if (!interaction.isCommand()) return;

  const command = bot.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.run(interaction);
  } catch (error) {
    console.error("Erreur lors de l'exécution de la commande:", error);
    await interaction.reply({
      content: "Une erreur est survenue lors de l'exécution de cette commande.",
      ephemeral: true,
    });
  }
};
