module.exports = {
    name: "finish",
    async execute(queue, playList) {
        queue.textChannel.send("Queue empty")
            .then(msg => setTimeout(() => msg.delete(), 5_000));
    }
}