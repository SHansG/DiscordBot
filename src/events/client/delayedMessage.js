module.exports = {
    name: 'delayedMessage',
    async execute(client, message, timeout, textChatId) {
        const textChat = client.channels.cache.get(textChatId);
        setTimeout(() => {
            textChat.send(`${message} <t:${Math.floor((Date.now()/1000 + 3600))}:f>`);
        }, timeout);
    }
}