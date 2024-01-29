const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban un membre",
  permission: PermissionFlagsBits.BanMembers,
  dm: false,
  options: [
    {
      type: "USER",
      name: "membre",
      description: "Le membre à bannir",
      required: true,
    },
    {
      type: "STRING",
      name: "raison",
      description: "La raison du bannissement",
      required: false,
    },
  ],
  async run(interaction) {
    const member = interaction.options.getMember("membre");
    const reason =
      interaction.options.getString("raison") || "Pas de raison fournie";

    if (!member) {
      await interaction.reply({
        content: "Pas de membre à bannir",
        ephemeral: true,
      });
      return;
    }

    if (interaction.user.id === member.id) {
      await interaction.reply({
        content: "Essaie pas de te bannir !",
        ephemeral: true,
      });
      return;
    }

    if (interaction.guild.ownerId === interaction.user.id) {
      await interaction.reply({
        content: "Ne ban pas le propriétaire du serveur",
        ephemeral: true,
      });
      return;
    }

    if (!member.bannable) {
      await interaction.reply({
        content: "Je ne peux pas bannir ce membre !",
        ephemeral: true,
      });
      return;
    }

    if (
      interaction.member.roles.highest.comparePositionTo(
        member.roles.highest
      ) <= 0
    ) {
      await interaction.reply({
        content: "Tu ne peux pas bannir cette personne",
        ephemeral: true,
      });
      return;
    }

    const bans = await interaction.guild.bans.fetch();
    if (bans.has(member.id)) {
      await interaction.reply({
        content: "Ce membre est déjà banni",
        ephemeral: true,
      });
      return;
    }

    // Envoyer un message à l'utilisateur banni, si possible
    try {
      await member.send(
        `Tu as été banni du serveur ${interaction.guild.name} pour la raison : \`${reason}\``
      );
    } catch (err) {
      console.error("Erreur lors de l'envoi du message de bannissement :", err);
    }

    // Effectuer le bannissement
    await member.ban({ reason: reason });

    // Confirmer le bannissement
    await interaction.reply({
      content: `${member.user.tag} a été banni pour la raison : \`${reason}\``,
      ephemeral: true,
    });
  },
};
