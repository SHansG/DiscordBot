require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp')

// const { connect } = require('mongoose');
// const { AlphaVantageAPIMonitor } = require("./utility/AVAPIMonitor");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ]
});

client.Distube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnEmpty: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    ytdlOptions: {
        quality: 'highestqaudio',
        highWaterMark: 1 << 25
    },
})

client.commands = new Collection();
client.commandArray = [];


const functionFolders = fs.readdirSync(`./src/functions`);
for(const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles){
        require(`./functions/${folder}/${file}`)(client);
    }
}


client.handleEvents();
client.handleCommands();
client.login(token);

//connect to database
// (async () => {
//     await connect(databaseToken).catch(console.error);
// })();

// create instance of AlphaVantageAPIMonitor (singleton class)
// var alphaVantageAPIMonitor = new AlphaVantageAPIMonitor();
// alphaVantageAPIMonitor.autoReset(); // autoRefresh() refills apicall pool

// start autoupdaters
// let interval = 60000 * 60; // 60000 ms * 60 = 1h
// client.weatherDataAutoUpdate(interval);
// client.financeDataAutoUpdate(interval);