var test       = require('tape');
var browserify = require('browserify');
var vm         = require('vm');

test('Dogescript bundling', function (t) {
    t.plan(1);

    function logger (msg) {
        t.equal(msg, 'wow', 'Bundled code returns expected result');
    }

    var b = browserify();
    b.add(__dirname + '/fixtures/doge_require_js.djs');
    b.transform(__dirname + '/..');

    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        vm.runInNewContext(src, {
            console: {
                log: logger
            }
        });
    });
});
