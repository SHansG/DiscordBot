module.exports = {
    name: "addList",
    async execute(queue, playList) {
        queue.textChannel.send("addList event")
    }
}