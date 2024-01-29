const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Vérifiez votre compte")
    .addStringOption((option) =>
      option
        .setName("platform")
        .setDescription("Votre plateforme de jeu")
        .setRequired(true)
        .addChoice("PC", "PC")
        .addChoice("PS5", "PS5")
        .addChoice("XBOX", "XBOX")
    ),
  async execute(interaction) {
    const platform = interaction.options.getString("platform");
    const roleName = platform.toUpperCase();
    // La logique de vérification reste la même
    const role = interaction.guild.roles.cache.find((r) => r.name === roleName);

    if (!role) {
      await interaction.reply({
        content: `Le rôle pour la plateforme ${platform} n'existe pas.`,
        ephemeral: true,
      });
      return;
    }

    try {
      if (interaction.member.roles.cache.has(role.id)) {
        await interaction.reply({
          content: `Vous avez déjà le rôle ${role.name}.`,
          ephemeral: true,
        });
      } else {
        await interaction.member.roles.add(role);
        await interaction.reply({
          content: `Rôle ${role.name} attribué avec succès !`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'attribution du rôle:", error);
      await interaction.reply({
        content:
          "Une erreur s’est produite lors de la tentative de vérification.",
        ephemeral: true,
      });
    }
  },
};
