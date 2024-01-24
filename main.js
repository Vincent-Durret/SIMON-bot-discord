const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events,
} = require("discord.js");
const { Captcha } = require("discord.js-captcha");
const newMemberHandler = require("./security/newMemberHandler.js");
const reactionHandler = require("./Reaction/reactionHandler");
const { checkOrCreateRoleMessage } = require("./message/roleMessageManager");
// const config = require("./config");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});
bot.once(Events.ClientReady, () => {
  console.log(
    `Je suis reveiller! Connecter et pret a travailler ${bot.user.tag}`
  );
  checkOrCreateRoleMessage(bot, "1198929195477245962");
});

bot.on("messageReactionAdd", (reaction, user) => {
  console.log("Reaction");
  reactionHandler.handleReaction(reaction, user);
});
// Créer une instance de Captcha avec les options souhaitées
const captcha = new Captcha(bot, {
  kickOnFailure: true,
  attempts: 3,
  roleID: "1198915078301425727",
  channelID: "1198681113397301309", //optional
  sendToTextChannel: false,
  addRoleOnSuccess: true,
});

// Gestionnaire d'événements global pour les nouveaux membres
bot.on("guildMemberAdd", (member) => {
  newMemberHandler(member, captcha);
});

bot.login(process.env.TOKEN);

// bot.login(config.token);
