function msgGenerator(from, text) {
    return {
        from: from,
        text: text,
        createdAt: `${new Date().getHours()} : ${new Date().getMinutes()}`
    };
}

module.exports = {
    msgGenerator
};
