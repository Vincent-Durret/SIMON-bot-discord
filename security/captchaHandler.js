const { Captcha } = require("discord.js-captcha");
const captcha = new Captcha(client, {
  // Options de configuration (vous pouvez ajuster celles-ci selon vos besoins)
  timeout: 30000,
  // ... autres options
});
