module.exports = {
    name: 'playSong',
    async execute(queue, song) {
        console.log(`Playing now: ${song.name} ${song.url}`);
        queue.textChannel.send(`Playing now: ${song.url}`);
    }
}