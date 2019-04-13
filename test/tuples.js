
const tuples = require('../lib/tuples');

exports['create tuple'] = function (test) {
    const tuple = tuples.tuple([1, 2, 3]);
    
    test.ok(tuple);
    test.equal(typeof tuple, 'object');
    test.equal(tuple.size(), 3);
    test.equal(tuple.get(0), 1);
    test.equal(tuple.get(1), 2);
    test.equal(tuple.get(2), 3);

    test.ok(tuple.isTuple());
    test.equal(tuple.isAtom(), false);
    test.equal(tuple.isVariable(), false);
    test.equal(tuple.isList(), false);
}

exports['tuple to string'] = function (test) {
    const tuple = tuples.tuple([1, 2, 3]);
    
    test.equal(tuple.toString(), "{ 1, 2, 3 }");
}

