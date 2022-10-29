const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(0x02f3136).setDescription(`Something went wrong while executing the command..`)
          ],
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error(`There is no code for this button. : ${button}`);

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const modals = client.modals;
      const { customId } = interaction;
      const modal = modals.find(i => String(i.data.name) === String(customId));
      if (!modal) {
        return console.error(`There is no valid code for modal: ${customId}`);
      }

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) {
        return console.error(`There is no valid code for this select menu: ID: ${customId}`);
      }

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      } 
    }
  },
};
