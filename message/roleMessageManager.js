const { Client } = require("discord.js");

const selectRoleMessageId = "1199716171306516621"; // Remplacez par l'ID réel, si disponible

async function checkOrCreateRoleMessage(client, channelId) {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;

  try {
    const existingMessage = await channel.messages.fetch(selectRoleMessageId);
    if (!existingMessage) {
      createRoleSelectionMessage(channel);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du message :", error);
    createRoleSelectionMessage(channel);
  }
}

function createRoleSelectionMessage(channel) {
  const messageContent = `Choisissez votre rôle...`;
  channel.send(messageContent).then((sentMessage) => {
    sentMessage.react("🖥");
    sentMessage.react("🎮");
    sentMessage.react("🕹");
    // Stocker l'ID du message nouvellement créé si nécessaire
  });
}

module.exports = { checkOrCreateRoleMessage };
