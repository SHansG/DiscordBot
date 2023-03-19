module.exports = {
    name: "empty",
    async execute(queue, playList) {
        queue.textChannel.send("empty event")
    }
}