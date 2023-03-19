const {
    SlashCommandBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("pause")
      .setDescription("pause song"),
      async execute(interaction, client) {
        const queue = client.Distube.getQueue(interaction)

        if (!queue) return interaction.reply(`There is nothing in the queue right now.`);

        if (queue.paused) {
            // queue.resume()
            return interaction.reply('Song has been already paused, if you want to resume it use /resume')
              .then(() => setTimeout(() => interaction.deleteReply(), 5_000));
        }

        queue.pause()
        return interaction.reply('Song has been paused.');
        //interaction.channel.send(`Song has been paused!`);
      },
  };