const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const comamndFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of comamndFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          chalk.dim(`✅ /${command.data.name} has been passed through the handler.`)
        );
      }
    }

    const clientID = process.env.clientID;
    const guildID = process.env.guildID;
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refreshing application (/) commads.");

      await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: client.commandArray,
      });

      console.log("Successfully refreshed all application (/) commands.");
    } catch (error) {
      console.log(error);
    }
  };
};
