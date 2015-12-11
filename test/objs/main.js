
var main = require('../../lib/objs/main');

exports['length function on array'] = function (test) {
    test.ok(main.length);
    test.equal(typeof main.length, 'function');
    test.equal(main.length([1, 2, 3]), 3);
};

exports['is_boolean function'] = function (test) {
    test.ok(main.is_boolean);
    test.equal(typeof main.is_boolean, 'function');
    test.strictEqual(main.is_boolean(null), false);
    test.strictEqual(main.is_boolean(42), false);
    test.strictEqual(main.is_boolean("foo"), false);
    test.strictEqual(main.is_boolean(3.1416), false);
    test.strictEqual(main.is_boolean(false), true);
    test.strictEqual(main.is_boolean(true), true);
};