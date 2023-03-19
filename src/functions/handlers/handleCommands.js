const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const fs = require("fs");

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolder = fs.readdirSync("./src/commands");
        for(const folder of commandFolder) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for(const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
//                console.log(command.data);
                commandArray.push(command.data.toJSON());
                console.log(`Command ${command.data.name} has been registered`)
            }
        }

        const clientId = '573210232797396992';
        const guildId = '';
        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            console.log('Started refreshing application (/) commands.');

            // use Routes.applicationGuildCommands(clientId, guildId) for commands usage bound to specific server
            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);   
        }
    };
};