module.exports = {
  name: "verify",
  description: "Vérifiez votre compte",
  options: [
    {
      type: "STRING",
      name: "platform",
      description: "Votre plateforme de jeu",
      required: true,
      choices: [
        { name: "PC", value: "PC" },
        { name: "PS5", value: "PS5" },
        { name: "XBOX", value: "XBOX" },
      ],
    },
  ],
  async run(interaction) {
    const platform = interaction.options.getString("platform");
    const roleName = platform.toUpperCase(); // Ici, le nom du rôle est supposé être le même que la plateforme
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
