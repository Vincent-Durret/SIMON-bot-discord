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

    // Convertir la date et l'heure en un objet Date JavaScript
    const startAt = new Date(`${date}T${heure}:00`);

    // Créer l'événement
    await interaction.guild.events.create({
      name: titre,
      description: description,
      startAt: startAt,
      privacyLevel: "GUILD_ONLY",
    });

    await interaction.reply({
      content: `Événement créé: ${titre} le ${date} à ${heure}`,
      ephemeral: true,
    });
  },
};
