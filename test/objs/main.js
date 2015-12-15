
var main = require('../../lib/objs/main');
var atoms = require('../../lib/atoms');

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
    test.strictEqual(main.is_boolean(atoms.atom('false')), true);
    test.strictEqual(main.is_boolean(atoms.atom('true')), true);
};

exports['is_atom function'] = function (test) {
    test.ok(main.is_atom);
    test.equal(typeof main.is_atom, 'function');
    test.strictEqual(main.is_atom(null), false);
    test.strictEqual(main.is_atom(42), false);
    test.strictEqual(main.is_atom("foo"), false);
    test.strictEqual(main.is_atom(3.1416), false);
    test.strictEqual(main.is_atom([1, 2, 3]), false);
    test.strictEqual(main.is_atom(false), true);
    test.strictEqual(main.is_atom(true), true);
    test.strictEqual(main.is_atom(atoms.atom('foo')), true);
};

exports['is_number function'] = function (test) {
    test.ok(main.is_number);
    test.equal(typeof main.is_number, 'function');
    test.strictEqual(main.is_number(null), false);
    test.strictEqual(main.is_number(42), true);
    test.strictEqual(main.is_number("foo"), false);
    test.strictEqual(main.is_number(3.1416), true);
    test.strictEqual(main.is_number(false), false);
    test.strictEqual(main.is_number(true), false);
    test.strictEqual(main.is_number(atoms.atom('false')), false);
};
