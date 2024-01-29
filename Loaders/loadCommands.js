const fs = require("fs");

module.exports = async (bot) => {
  fs.readdirSync("./Commandes")
    .filter((f) => f.endsWith(".js"))
    .forEach(async (file) => {
      let command = require(`../Commandes/${file}`);

      // Vérifier si la commande est une commande slash et obtenir le nom en conséquence
      let commandName = command.data?.name || command.name;

      if (!commandName)
        throw new TypeError(
          `La commande ${file.slice(0, -3)} n'a pas de nom !`
        );

      bot.commands.set(commandName, command);

      console.log(`Commande ${file} chargée avec succès ! `);
    });
};
