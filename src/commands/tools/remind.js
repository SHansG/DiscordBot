const {
    SlashCommandBuilder
} = require("discord.js");

const { HoursToSeconds, MinutesToSeconds, SecondsToMiliseconds } = require("../../Utility/TimeConverter");
  
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remind")
        .setDescription("reminds user about phrase that was set as input")
        .addStringOption((option) =>
            option.setName('phrase')
            .setDescription("input phrase").setRequired(true))
        .addIntegerOption((option) => 
            option.setName('time')
            .setDescription("input time").setRequired(true))
        .addStringOption((option) =>
            option.setName('modifier')
            .setDescription('time modifier')
            .setRequired(true)
            .addChoices(
                { name: 'Seconds', value: 's'},
                { name: 'Minutes', value: 'min'},
                { name: 'Hours', value: 'h'}
            )),
    async execute(interaction, client) {
        const phrase = interaction.options.get('phrase').value;
        let time = interaction.options.get('time').value;
        const modifier = interaction.options.get('modifier').value;
    

        if(modifier === 'min') 
        {
            time = MinutesToSeconds(time);
        }

        if(modifier === 'h') 
        {
            time = HoursToSeconds(time);
        }

        //to mention user that used command interaction.member.user
        const message = `${interaction.member.user}, I will remind you about "${phrase}" at <t:${Math.floor((Date.now()/1000 + 3600)+time)}:f>`;
        
        await interaction.reply(message);
        
        //setTimeout takes timeout parameter in miliseconds
        const timeMs = SecondsToMiliseconds(time);

        const delayedMessage = `${interaction.member.user} ${phrase} done`;
        //to send message from within event we need to get textChatId and pass it as parameter
        const textChatId = interaction.channel.id;
        client.emit('delayedMessage', client, delayedMessage, timeMs, textChatId);
    },
};
  