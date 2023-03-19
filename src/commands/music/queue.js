const {
    SlashCommandBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("queue")
      .setDescription("checks what's in queue"),
      async execute(interaction, client) {


        //const success = client.guilds.cache.emojis.find(find => emoji.id = ':white_check_mark:');

        const queue = client.Distube.getQueue(interaction);
        
        
        console.log(queue.songs.length);
      },
  };