const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Créer un événement")
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description de l'événement")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("Date et heure de l'événement (ex: 21h, samedi)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const description = interaction.options.getString("description");
    const date = interaction.options.getString("date");
    // Logique pour enregistrer l'événement et envoyer un message
  },
};
