var dogescript = require('dogescript');
var through    = require('through');

module.exports = function (file) {
    if (!/\.djs$/.test(file)) return through();

    var data = '';
    var write = function (chunk) {
        data += chunk;
    }
    var end = function () {
        this.queue(dogescript(data, true));
        this.queue(null);
    }

    return through(write, end);
}
