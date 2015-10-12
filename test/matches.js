
var matches = require('../lib/matches');

exports['match integers'] = function (test) {
    test.ok(matches.match(1, 1, null));
    test.equal(matches.match(1, 2, null), false);
};

