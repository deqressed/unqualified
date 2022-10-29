const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityFlagsBitField,
} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      `\nSuccessfully logged in as ${client.user.tag}`
    );
    setInterval(() => {
      client.user.setPresence({ status: "online" });
    }, 5000);
    setInterval(() => {
      client.user.setActivity("josh's orders", { type: 2 });
    }, 1000);
  },
};
