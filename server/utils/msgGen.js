const moment = require('moment');

function msgGenerator(from, text) {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
}
function locationGenerator(from, lat, long) {
    return {
        from: from,
        link: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    };
}

module.exports = {
    msgGenerator,
    locationGenerator
};
