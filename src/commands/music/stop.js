const {
    SlashCommandBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("stop")
      .setDescription("test command for reading user arguments"),
      async execute(interaction, client) {

        const queue = client.Distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`:x: | There is nothing in the queue right now.`)

        queue.stop();
        await interaction.reply({content: "Stopped playing music."});
        await interaction.deleteReply();
        return;
        //interaction.channel.send(`Stopped!`);
      },
  };