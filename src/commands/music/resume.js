const {
    SlashCommandBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("resume")
      .setDescription("resume song"),
      async execute(interaction, client) {
        const queue = client.Distube.getQueue(interaction)

        if (!queue) return interaction.reply(`There is nothing in the queue right now.`);

        // if (queue.paused) {
        //     queue.resume()
        //     return interaction.reply('Song has been resumed');
        // }

        try{
            queue.resume()
            return interaction.reply('Song has been resumed');
        }
        catch(err) {
            return interaction.reply('Something went wrong while resuming song or you are trying to resume song that is currently actively being played');
        }

        // queue.pause()
        // return interaction.reply('Song has been paused.');
        //interaction.channel.send(`Song has been paused!`);
      },
  };