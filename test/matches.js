
var matches = require('../lib/matches');
var variables = require('../lib/variables');
var contexts = require('../lib/contexts');
var tuples = require('../lib/tuples');
var lists = require('../lib/lists');
var atoms = require('../lib/atoms');

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

exports['match tuples with atoms'] = function (test) {
    var atoma = atoms.atom('a');
    var atoma2 = atoms.atom('a');
    var atomb = atoms.atom('b');
    var atomb2 = atoms.atom('b');
    var atomc = atoms.atom('c');
    var atomc2 = atoms.atom('c');
    var atomd = atoms.atom('d');
    
    var tuple1 = tuples.tuple([atoma, atomb, atomc]);
    var tuple2 = tuples.tuple([atoma2, atomb2, atomc2]);
    var tuple3 = tuples.tuple([atoma, atomb]);
    var tuple4 = tuples.tuple([atoma, atomb, atomd]);
    
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


exports['match lists'] = function (test) {
    var list1 = lists.list(1, lists.list(2, lists.list(3, null)));
    var list2 = lists.list(1, lists.list(2, lists.list(3, null)));
    var list3 = lists.list(1, lists.list(2, null));
    var list4 = lists.list(1, lists.list(2, lists.list(4, null)));
    
    test.ok(matches.match(list1, list1, null));
    test.ok(matches.match(list1, list2, null));
    test.ok(matches.match(list2, list1, null));
    
    test.equal(matches.match(list1, list3, null), false);
    test.equal(matches.match(list1, list4, null), false);
    test.equal(matches.match(list1, null, null), false);
    test.equal(matches.match(list1, 42, null), false);
    test.equal(matches.match(list1, "foo", null), false);
};

exports['match lists with variables'] = function (test) {
    var vara = variables.variable('a');
    var varb = variables.variable('b');
    var varc = variables.variable('c');
    
    var list1 = lists.list(vara, lists.list(varb, lists.list(varc, null)));
    var list2 = lists.list(1, lists.list(2, lists.list(3, null)));

    var ctx = contexts.context();
    
    test.ok(matches.match(list1, list2, ctx));
    
    test.equal(ctx.get('a'), 1);
    test.equal(ctx.get('b'), 2);
    test.equal(ctx.get('c'), 3);
};

