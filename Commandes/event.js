const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createevent")
    .setDescription("Crée un nouvel événement")
    .addStringOption((option) =>
      option
        .setName("titre")
        .setDescription("Titre de l'événement")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Date de l'événement (ex: 2023-12-31)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("heure")
        .setDescription("Heure de l'événement (ex: 20:00)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description de l'événement")
        .setRequired(false)
    ),
  async execute(interaction) {
    const titre = interaction.options.getString("titre");
    const date = interaction.options.getString("date");
    const heure = interaction.options.getString("heure");
    const description =
      interaction.options.getString("description") ||
      "Pas de description fournie";

    // Logique pour créer l'événement
    // ...

    await interaction.reply({
      content: `Événement créé: ${titre} le ${date} à ${heure}`,
      ephemeral: true,
    });
  },
};
