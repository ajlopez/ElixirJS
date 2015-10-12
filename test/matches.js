
var matches = require('../lib/matches');
var variables = require('../lib/variables');
var contexts = require('../lib/contexts');

exports['match integers'] = function (test) {
    test.ok(matches.match(1, 1, null));
    test.equal(matches.match(1, 2, null), false);
};

exports['match strings'] = function (test) {
    test.ok(matches.match("foo", "foo", null));
    test.equal(matches.match("foo", "bar", null), false);
};

exports['match variable'] = function (test) {
    var vara = variables.variable('a');
    var ctx = contexts.context();
    test.ok(matches.match(vara, 42, ctx));
    test.equal(ctx.get('a'), 42);
};

