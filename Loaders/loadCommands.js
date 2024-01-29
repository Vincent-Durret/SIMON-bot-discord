const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./Commandes")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../Commandes/${file}`);

      // Utilisez command.data.name pour les commandes slash
      let commandName = command.data ? command.data.name : command.name;

      if (!commandName)
        throw new TypeError(`La commande ${file} n'a pas de nom !`);

      bot.commands.set(commandName, command);

      console.log(`Commande ${commandName} chargée avec succès ! `);
    });
};
