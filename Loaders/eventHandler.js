const handleVerifyCommand = require("./verifyCommand");

const setupEventHandlers = (bot) => {
  bot.on("guildMemberAdd", async (member) => {
    // ID ou nom du rôle "Non Vérifié"
    const unverifiedRoleName = "Non Vérifié";

    // Trouver le rôle "Non Vérifié" dans le serveur
    const unverifiedRole = member.guild.roles.cache.find(
      (role) => role.name === unverifiedRoleName
    );

    if (!unverifiedRole) {
      console.error(`Le rôle '${unverifiedRoleName}' n'existe pas.`);
      return;
    }

    // Assigner le rôle "Non Vérifié" au nouveau membre
    try {
      await member.roles.add(unverifiedRole);
      console.log(
        `Rôle '${unverifiedRoleName}' attribué à ${member.displayName}.`
      );

      // Envoyer un message de bienvenue et d'instructions de vérification
      const welcomeChannelName = "bienvenue"; // Nom du canal de bienvenue
      const welcomeChannel = member.guild.channels.cache.find(
        (channel) => channel.name === welcomeChannelName
      );

      if (welcomeChannel) {
        welcomeChannel.send(
          `Bienvenue sur le serveur, ${member}! Veuillez passer par notre processus de vérification en utilisant la commande \`/verify\` pour accéder aux autres canaux.`
        );
      } else {
        console.error(`Le canal '${welcomeChannelName}' n'existe pas.`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'attribution du rôle non vérifié :",
        error
      );
    }
  });
};

module.exports = setupEventHandlers;
