const { MessageReaction, User } = require("discord.js");

module.exports = {
  handleReaction: async (reaction, user) => {
    const selectRoleChannelId = "1198929195477245962"; // ID de votre salon pour les réactions de rôle
    const pcRoleId = "1185360872672079882"; // ID du rôle "PC"
    const ps5RoleId = "1185360580425564260"; // ID du rôle "PS5"
    const xboxRoleId = "1190391528384909342"; // ID du rôle "XBOX"

    if (reaction.message.channel.id === selectRoleChannelId) {
      try {
        // Vérifier si le message existe toujours
        const fetchedMessage = await reaction.message.channel.messages.fetch(
          reaction.message.id
        );

        if (!fetchedMessage) {
          console.log("Le message a déjà été supprimé ou est introuvable");
          return;
        }

        const member = reaction.message.guild.members.cache.get(user.id);
        if (!member) return;
        let roleAdded = false;

        switch (reaction.emoji.name) {
          case "🖥":
            await member.roles.add(pcRoleId);
            member.send("Le rôle PC a été attribué avec succès !");
            break;
          case "🎮":
            await member.roles.add(ps5RoleId);
            member.send("Le rôle PS5 a été attribué avec succès !");
            break;
          case "🕹":
            await member.roles.add(xboxRoleId);
            member.send("Le rôle XBOX a été attribué avec succès !");
            break;
        }

        // Ajouter d'autres logiques si nécessaire...
      } catch (error) {
        console.error("Erreur lors de la gestion de la réaction :", error);
      }
    }
  },
};
