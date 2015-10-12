
var lists = require('../lib/lists');

exports['create list'] = function (test) {
    var list = lists.list(1, lists.list(2, null));
    
    test.ok(list);
    test.equal(typeof list, 'object');
    test.equal(list.head(), 1);
    test.equal(list.tail().head(), 2);
    test.equal(list.tail().tail(), null);
    test.equal(list.length(), 2);
    
    test.ok(list.isList());
    test.equal(list.isAtom(), false);
    test.equal(list.isVariable(), false);
    test.equal(list.isTuple(), false);
}

exports['create list from array'] = function (test) {
    var list = lists.create([1, 2, 3]);
    
    test.ok(list);
    test.equal(typeof list, 'object');
    test.equal(list.head(), 1);
    test.equal(list.tail().head(), 2);
    test.equal(list.tail().tail().head(), 3);
    test.equal(list.tail().tail().tail(), null);
    test.equal(list.length(), 3);
}

exports['create empty list'] = function (test) {
    var list = lists.list();
    
    test.ok(list);
    test.equal(typeof list, 'object');
    test.equal(list.length(), 0);
    
    test.ok(list.isList());
    test.equal(list.isAtom(), false);
    test.equal(list.isVariable(), false);
    test.equal(list.isTuple(), false);
}