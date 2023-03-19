module.exports = {
    name: "error",
    async execute(queue, error) {
        queue.textChannel.send(error)
            .then(msg => setTimeout(() => msg.delete(), 10_000));
    }
}