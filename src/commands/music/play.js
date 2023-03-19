const {
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("test command for reading user arguments")
    .addStringOption((option) =>
      option.setName('query').setDescription("link or search query").setRequired(true)
    ),
    async execute(interaction, client) {
      const args = interaction.options.get('query').value

      if (!interaction.member.voice.channel){
        return interaction.reply('You need to be on voice channel when you request song')
                  .then(() => setTimeout(() => interaction.deleteReply(), 5_000));
      }

      await interaction.reply({content: "Loading song ..."});
      await interaction.deleteReply()
      await client.Distube.play(interaction.member.voice.channel, args, {
          member: interaction.member,
          textChannel: interaction.channel,
          args
      })
    },
};
