
const matches = require('../lib/matches');
const variables = require('../lib/variables');
const contexts = require('../lib/contexts');
const tuples = require('../lib/tuples');
const lists = require('../lib/lists');
const atoms = require('../lib/atoms');

exports['match integers'] = function (test) {
    test.ok(matches.match(1, 1, null));
    test.equal(matches.match(1, 2, null), null);
};

exports['match strings'] = function (test) {
    test.ok(matches.match("foo", "foo", null));
    test.equal(matches.match("foo", "bar", null), null);
};

exports['match variable'] = function (test) {
    const vara = variables.variable('a');
    const ctx = contexts.context();
    test.equal(matches.match(vara, 42, ctx), 42);
    test.equal(ctx.get('a'), 42);
};

exports['match tuples'] = function (test) {
    const tuple1 = tuples.tuple([1, 2, 3]);
    const tuple2 = tuples.tuple([1, 2, 3]);
    const tuple3 = tuples.tuple([1, 2]);
    const tuple4 = tuples.tuple([1, 2, 4]);
    
    test.ok(matches.match(tuple1, tuple1, null));
    test.ok(matches.match(tuple1, tuple2, null));
    test.ok(matches.match(tuple2, tuple1, null));
    
    test.equal(matches.match(tuple1, tuple3, null), null);
    test.equal(matches.match(tuple1, tuple4, null), null);
    test.equal(matches.match(tuple1, null, null), null);
    test.equal(matches.match(tuple1, 42, null), null);
    test.equal(matches.match(tuple1, "foo", null), null);
};

exports['match tuples with atoms'] = function (test) {
    const atoma = atoms.atom('a');
    const atoma2 = atoms.atom('a');
    const atomb = atoms.atom('b');
    const atomb2 = atoms.atom('b');
    const atomc = atoms.atom('c');
    const atomc2 = atoms.atom('c');
    const atomd = atoms.atom('d');
    
    const tuple1 = tuples.tuple([atoma, atomb, atomc]);
    const tuple2 = tuples.tuple([atoma2, atomb2, atomc2]);
    const tuple3 = tuples.tuple([atoma, atomb]);
    const tuple4 = tuples.tuple([atoma, atomb, atomd]);
    
    test.ok(matches.match(tuple1, tuple1, null));
    test.ok(matches.match(tuple1, tuple2, null));
    test.ok(matches.match(tuple2, tuple1, null));
    
    test.equal(matches.match(tuple1, tuple3, null), null);
    test.equal(matches.match(tuple1, tuple4, null), null);
    test.equal(matches.match(tuple1, null, null), null);
    test.equal(matches.match(tuple1, 42, null), null);
    test.equal(matches.match(tuple1, "foo", null), null);
};

exports['match tuples with variables'] = function (test) {
    const vara = variables.variable('a');
    const varb = variables.variable('b');
    const varc = variables.variable('c');
    
    const tuple1 = tuples.tuple([vara, varb, varc]);
    const tuple2 = tuples.tuple([1, 2, 3]);

    const ctx = contexts.context();
    
    test.ok(matches.match(tuple1, tuple2, ctx));
    
    test.equal(ctx.get('a'), 1);
    test.equal(ctx.get('b'), 2);
    test.equal(ctx.get('c'), 3);
};

exports['match lists'] = function (test) {
    const list1 = lists.list(1, lists.list(2, lists.list(3, null)));
    const list2 = lists.list(1, lists.list(2, lists.list(3, null)));
    const list3 = lists.list(1, lists.list(2, null));
    const list4 = lists.list(1, lists.list(2, lists.list(4, null)));
    
    test.ok(matches.match(list1, list1, null));
    test.ok(matches.match(list1, list2, null));
    test.ok(matches.match(list2, list1, null));
    
    test.equal(matches.match(list1, list3, null), null);
    test.equal(matches.match(list1, list4, null), null);
    test.equal(matches.match(list1, null, null), null);
    test.equal(matches.match(list1, 42, null), null);
    test.equal(matches.match(list1, "foo", null), null);
};

exports['match lists with variables'] = function (test) {
    const vara = variables.variable('a');
    const varb = variables.variable('b');
    const varc = variables.variable('c');
    
    const list1 = lists.list(vara, lists.list(varb, lists.list(varc, null)));
    const list2 = lists.list(1, lists.list(2, lists.list(3, null)));

    const ctx = contexts.context();
    
    test.ok(matches.match(list1, list2, ctx));
    
    test.equal(ctx.get('a'), 1);
    test.equal(ctx.get('b'), 2);
    test.equal(ctx.get('c'), 3);
};

