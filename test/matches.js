
var matches = require('../lib/matches');
var variables = require('../lib/variables');
var contexts = require('../lib/contexts');
var tuples = require('../lib/tuples');

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

exports['match tuples'] = function (test) {
    var tuple1 = tuples.tuple([1, 2, 3]);
    var tuple2 = tuples.tuple([1, 2, 3]);
    var tuple3 = tuples.tuple([1, 2]);
    var tuple4 = tuples.tuple([1, 2, 4]);
    
    test.ok(matches.match(tuple1, tuple1, null));
    test.ok(matches.match(tuple1, tuple2, null));
    test.ok(matches.match(tuple2, tuple1, null));
    
    test.equal(matches.match(tuple1, tuple3, null), false);
    test.equal(matches.match(tuple1, tuple4, null), false);
    test.equal(matches.match(tuple1, null, null), false);
    test.equal(matches.match(tuple1, 42, null), false);
    test.equal(matches.match(tuple1, "foo", null), false);
};

exports['match tuples with variables'] = function (test) {
    var vara = variables.variable('a');
    var varb = variables.variable('b');
    var varc = variables.variable('c');
    
    var tuple1 = tuples.tuple([vara, varb, varc]);
    var tuple2 = tuples.tuple([1, 2, 3]);

    var ctx = contexts.context();
    
    test.ok(matches.match(tuple1, tuple2, ctx));
    
    test.equal(ctx.get('a'), 1);
    test.equal(ctx.get('b'), 2);
    test.equal(ctx.get('c'), 3);
};


