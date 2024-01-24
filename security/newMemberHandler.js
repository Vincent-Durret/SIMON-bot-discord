const {
  PermissionsBitField,
  ChannelType,
  EmbedBuilder,
} = require("discord.js");

module.exports = async (member, captcha) => {
  console.log(`Gestion du nouveau membre : ${member.user.tag}`);

  const customCaptchaEmbed = new EmbedBuilder()
    .setColor("#0099ff") // Couleur de l'embed
    .setTitle("Vérification CAPTCHA")
    .setDescription(
      "Veuillez résoudre le CAPTCHA ci-dessous pour accéder au serveur."
    )
    .setFooter({ text: "Vous avez 3 tentatives pour réussir." });

  // Configurer les gestionnaires d'événements pour cette instance de Captcha
  captcha.on("success", async (data) => {
    console.log(`${data.member.user.tag} a réussi le CAPTCHA`);

    // Attribuer un rôle à l'utilisateur
    try {
      const role = data.member.guild.roles.cache.get("1198915078301425727");
      if (role) {
        await data.member.roles.add(role);

        console.log(`Rôle ${role.name} attribué à ${data.member.user.tag}`);
      } else {
        console.log("Rôle non trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du rôle :", error);
    }

    // Annoncer la réussite du CAPTCHA dans un salon spécifique
    const welcomeChannelId = "1196085171015921774"; // ID du salon d'accueil
    const welcomeChannel =
      data.member.guild.channels.cache.get(welcomeChannelId);
    if (welcomeChannel) {
      welcomeChannel.send(
        `Bravo à ${data.member.user.tag} a rejoint le serveur et a réussi le CAPTCHA. Il ne lui reste plus qu'a choisir son rôle !`
      );
    }
  });

  captcha.on("failure", (data) => {
    console.log(`${data.member.user.tag} a échoué au CAPTCHA`);

    // Expulser l'utilisateur du serveur
    try {
      data.member.kick("Échec du CAPTCHA");
      console.log(
        `${data.member.user.tag} a été expulsé pour échec du CAPTCHA.`
      );
    } catch (error) {
      console.error("Erreur lors de l'expulsion :", error);
    }

    // Notifier dans un salon spécifique ou auprès des modérateurs
    const logChannelId = "1196085171015921774"; // ID du salon de logs
    const logChannel = data.member.guild.channels.cache.get(logChannelId);
    if (logChannel) {
      logChannel.send(
        `Malheuresement ${data.member.user.tag} a échoué au CAPTCHA et a été expulsé.`
      );
    }
  });

  // Présenter le captcha au membre
  captcha.present(member);
};
