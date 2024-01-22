const sendRoleSelectionMessage = (guild) => {
  const roleChannelId = "1198929195477245962"; // Remplacez par l'ID de votre salon de rôles
  const roleChannel = guild.channels.cache.get(roleChannelId);
  if (!roleChannel) return;

  const messageContent = `Choisissez votre rôle en réagissant à ce message :
    
    🖥 pour PC si tu es un joueur PC
    
    🎮 pour PS5 si tu es un joueur PS5
    
    🕹 pour XBOX si tu es un joueur XBOX

    Tu peux aussi choisir plusieur rôle !

    Veuillez simplement cliquer sur l'emoji correspondant à votre choix.`;

  roleChannel.send(messageContent).then((sentMessage) => {
    sentMessage.react("🖥");
    sentMessage.react("🎮");
    sentMessage.react("🕹");
  });
};

module.exports = { sendRoleSelectionMessage };
