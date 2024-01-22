const handleVerifyCommand = async (interaction) => {
  const platform = interaction.options.getString("platform");
  const roleName =
    platform === "PC" ? "PC" : platform === "PS5" ? "PS5" : "XBOX"; // Ajustez selon les noms exacts de vos rôles

  const role = interaction.guild.roles.cache.find(
    (role) => role.name === roleName
  );
  if (!role) {
    await interaction.reply(`Le rôle ${roleName} n'existe pas.`);
    return;
  }

  await interaction.member.roles.add(role);
  await interaction.reply(
    `Vous avez été vérifié en tant que joueur ${platform}!`
  );
};

module.exports = handleVerifyCommand;
