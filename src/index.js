require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits, ActivityFlagsBitField } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.on("ready", () => {
  client.user.setPresence({ status: "online" });
  setInterval(() => {
    client.user.setActivity("josh's orders", { type: 2 });
  }, 1000);
});

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
