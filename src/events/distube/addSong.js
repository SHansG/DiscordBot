module.exports = {
    name: "addSong",
    async execute(queue, playList) {
        console.log(`${playList.name} added to queue.\n ${playList.url}`);
        queue.textChannel.send(`${playList.name} added to queue.\n ${playList.url}`)
            // .then(msg => msg.delete()); <--- deletes message instantly
            .then(msg => setTimeout(() => msg.delete(), 5_000)); // <--- deletes message after 5 seconds
    }
}