function msgGenerator(from, text) {
    return {
        from: from,
        text: text,
        createdAt: `${new Date().getHours()} : ${new Date().getMinutes()}`
    };
}
function locationGenerator(from, lat, long) {
    return {
        from: from,
        link: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: `${new Date().getHours()} : ${new Date().getMinutes()}`
    };
}

module.exports = {
    msgGenerator,
    locationGenerator
};
