const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createevent")
    .setDescription("Crée un nouvel événement")
    .addStringOption((opt) =>
      opt
        .setName("titre")
        .setDescription("Titre de l'événement")
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName("date")
        .setDescription("Date de l'événement (ex: 2023-12-31)")
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName("heure")
        .setDescription("Heure de l'événement (ex: 20:00)")
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName("description")
        .setDescription("Description de l'événement")
        .setRequired(false)
    ),
  async run(interaction) {
    const titre = interaction.options.getString("titre");
    const date = interaction.options.getString("date");
    const heure = interaction.options.getString("heure");
    const description =
      interaction.options.getString("description") ||
      "Pas de description fournie";

    const dateIsValid =
      date && heure && !isNaN(Date.parse(`${date}T${heure}:00`));

    if (!dateIsValid) {
      // Répondre à l'interaction
      await interaction.reply({
        content: "La date ou l'heure fournie est invalide.",
        ephemeral: true,
      });
    } else {
      // Convertir la date et l'heure en un objet Date JavaScript
      const startAt = new Date(`${date}T${heure}:00`);

      // Créer l'événement
      await interaction.guild.scheduledEvents.create({
        name: titre,
        description: description,
        scheduledStartTime: startAt,
        privacyLevel: 2,
        entityType: 1, // ou 'VOICE'
        channel_id: "1185350340980256899", // Remplacez ceci par l'ID du canal vocal où l'événement doit se dérouler
      });

      // Répondre à l'interaction
      await interaction.reply({
        content: `Événement créé: ${titre} le ${date} à ${heure}`,
        ephemeral: true,
      });

      // Envoyer un message de suivi
      await interaction.followUp({
        content: "Voici un message de suivi.",
        ephemeral: true,
      });
    }
  },
};
