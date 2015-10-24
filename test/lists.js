
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
};

exports['list to string'] = function (test) {
    var list = lists.list(1, lists.list(2, null));
    
    test.equal(list.toString(), "[ 1, 2 ]");
};

exports['empty list to string'] = function (test) {
    var list = lists.list();
    
    test.equal(list.toString(), "[]");
};

exports['create list from array'] = function (test) {
    var list = lists.create([1, 2, 3]);
    
    test.ok(list);
    test.equal(typeof list, 'object');
    test.equal(list.head(), 1);
    test.equal(list.tail().head(), 2);
    test.equal(list.tail().tail().head(), 3);
    test.equal(list.tail().tail().tail(), null);
    test.equal(list.length(), 3);
};

exports['get elements'] = function (test) {
    var list = lists.create([1, 2, 3]);
    
    test.equal(list.get(0), 1);
    test.equal(list.get(1), 2);
    test.equal(list.get(2), 3);
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

exports['append lists'] = function (test) {
    var list1 = lists.create([1, 2, 3]);
    var list2 = lists.create([4, 5]);
    
    var result = list1.append(list2);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 5);

    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
    test.equal(result.get(3), 4);
    test.equal(result.get(4), 5);
}

exports['append empty list to list'] = function (test) {
    var list1 = lists.create([]);
    var list2 = lists.create([4, 5]);
    
    var result = list1.append(list2);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 2);

    test.equal(result.get(0), 4);
    test.equal(result.get(1), 5);
}

exports['append list to empty list'] = function (test) {
    var list1 = lists.create([4, 5]);
    var list2 = lists.create([]);
    
    var result = list1.append(list2);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 2);

    test.equal(result.get(0), 4);
    test.equal(result.get(1), 5);
}

exports['list to array'] = function (test) {
    var list = lists.create([1, 2, 3, 4]);
    
    var result = list.toArray();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.deepEqual(result, [1, 2, 3, 4]);
}

