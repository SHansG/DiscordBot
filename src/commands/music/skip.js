const {
    SlashCommandBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("skip")
      .setDescription("skips song in queue"),
      async execute(interaction, client) {


        //const success = client.guilds.cache.emojis.find(find => emoji.id = ':white_check_mark:');

        const queue = client.Distube.getQueue(interaction);
        
        if (!queue) {
          await interaction.reply(`:x: | There is nothing in the queue right now!`)
            .then(() => setTimeout(() => interaction.deleteReply(), 5_000));
          return;
        }

        try {
          if(queue.songs.length === 1) {
            return queue.stop();
          }

          const song = await queue.skip();
          await interaction.reply({content: `:white_check_mark: | Skipped! Now playing:\n${song.name}`})
            // for interactions that is how you delete it with timeout
            .then(() => setTimeout(() => interaction.deleteReply(), 5_000));
            // await interaction.deleteReply();
          return;
        } catch (err) {
            await interaction.reply({content: err.message})
              .then(() => setTimeout(() => interaction.deleteReply(), 5_000));
            console.log(err.stack);
            return;
        }
      },
  };