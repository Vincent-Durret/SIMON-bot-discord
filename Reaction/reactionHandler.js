const { MessageReaction, User } = require("discord.js");

module.exports = {
  handleReaction: async (reaction, user) => {
    const selectRoleChannelId = "1198929195477245962"; // Remplacez par l'ID réel de votre salon
    const verifiedRoleId = "1198915078301425727"; // Remplacez par l'ID réel du rôle "Vérifié"
    const pcRoleId = "1185360872672079882"; // Remplacez par l'ID réel du rôle "PC"
    const ps5RoleId = "1185360580425564260"; // Remplacez par l'ID réel du rôle "PS5"
    const xboxRoleId = "1190391528384909342"; // Remplacez par l'ID réel du rôle "XBOX"

    // Vérifier si la réaction est dans le salon de sélection de rôle
    if (reaction.message.channel.id === selectRoleChannelId) {
      const member = reaction.message.guild.members.cache.get(user.id);

      if (!member) return;
      let roleAdded = false;

      try {
        // Logique pour ajouter ou supprimer des rôles
        switch (reaction.emoji.name) {
          case "🖥": // Emoji pour PC
            await member.roles.add("1185360872672079882"); // ID du rôle PC
            roleAdded = true;
            break;
          case "🎮": // Emoji pour PS5
            await member.roles.add("1185360580425564260"); // ID du rôle PS5
            roleAdded = true;
            break;
          case "🕹": // Emoji pour XBOX
            await member.roles.add("1190391528384909342"); // ID du rôle XBOX
            roleAdded = true;
            break;
        }

        // Si un rôle a été ajouté, définir un délai pour la suppression du message
        if (roleAdded) {
          setTimeout(() => {
            reaction.message.channel.messages
              .fetch(reaction.message.id)
              .then((msg) => {
                if (msg)
                  msg
                    .delete()
                    .catch((error) =>
                      console.error(
                        "Erreur lors de la suppression du message :",
                        error
                      )
                    );
              })
              .catch((error) =>
                console.log("Le message a déjà été supprimé ou est introuvable")
              );
          }, 60000); // 60 secondes
        }
      } catch (error) {
        console.error("Erreur lors de la gestion de la réaction :", error);
      }
    }
  },
};
