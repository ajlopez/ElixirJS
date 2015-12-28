
var main = require('../../lib/objs/main');
var atoms = require('../../lib/atoms');
var lists = require('../../lib/lists');
var tuples = require('../../lib/tuples');

exports['length function on array'] = function (test) {
    test.ok(main.length);
    test.equal(typeof main.length, 'function');
    test.equal(main.length([1, 2, 3]), 3);
};

exports['length function on list'] = function (test) {
    test.equal(main.length(lists.create([1, 2, 3])), 3);
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

exports['is_integer function'] = function (test) {
    test.ok(main.is_integer);
    test.equal(typeof main.is_integer, 'function');
    test.strictEqual(main.is_integer(null), false);
    test.strictEqual(main.is_integer(42), true);
    test.strictEqual(main.is_integer("foo"), false);
    test.strictEqual(main.is_integer(3.1416), false);
    test.strictEqual(main.is_integer(-3.1416), false);
    test.strictEqual(main.is_integer(2), true);
    test.strictEqual(main.is_integer(-2), true);
    test.strictEqual(main.is_integer(1.0), true);
    test.strictEqual(main.is_integer(-1.0), true);
    test.strictEqual(main.is_integer(false), false);
    test.strictEqual(main.is_integer(true), false);
    test.strictEqual(main.is_integer(atoms.atom('false')), false);
};

exports['is_float function'] = function (test) {
    test.ok(main.is_float);
    test.equal(typeof main.is_float, 'function');
    test.strictEqual(main.is_float(null), false);
    test.strictEqual(main.is_float(42), false);
    test.strictEqual(main.is_float("foo"), false);
    test.strictEqual(main.is_float(3.1416), true);
    test.strictEqual(main.is_float(-3.1416), true);
    test.strictEqual(main.is_float(2), false);
    test.strictEqual(main.is_float(-2), false);
    test.strictEqual(main.is_float(1.0), false);
    test.strictEqual(main.is_float(-1.0), false);
    test.strictEqual(main.is_float(false), false);
    test.strictEqual(main.is_float(true), false);
    test.strictEqual(main.is_float(atoms.atom('false')), false);
};

exports['is_list function'] = function (test) {
    test.ok(main.is_list);
    test.equal(typeof main.is_list, 'function');
    test.strictEqual(main.is_list(null), false);
    test.strictEqual(main.is_list(42), false);
    test.strictEqual(main.is_list("foo"), false);
    test.strictEqual(main.is_list(3.1416), false);
    test.strictEqual(main.is_list([1, 2, 3]), false);
    test.strictEqual(main.is_list(false), false);
    test.strictEqual(main.is_list(true), false);
    test.strictEqual(main.is_list(atoms.atom('foo')), false);
    test.strictEqual(main.is_list(lists.list(1, lists.list(2, null))), true);
};

exports['is_tuple function'] = function (test) {
    test.ok(main.is_tuple);
    test.equal(typeof main.is_tuple, 'function');
    test.strictEqual(main.is_tuple(null), false);
    test.strictEqual(main.is_tuple(42), false);
    test.strictEqual(main.is_tuple("foo"), false);
    test.strictEqual(main.is_tuple(3.1416), false);
    test.strictEqual(main.is_tuple([1, 2, 3]), false);
    test.strictEqual(main.is_tuple(false), false);
    test.strictEqual(main.is_tuple(true), false);
    test.strictEqual(main.is_tuple(atoms.atom('foo')), false);
    test.strictEqual(main.is_tuple(lists.list(1, lists.list(2, null))), false);
    test.strictEqual(main.is_tuple(tuples.tuple([1, 2, 3])), true);
};

exports['is_nil function'] = function (test) {
    test.ok(main.is_nil);
    test.equal(typeof main.is_nil, 'function');
    test.strictEqual(main.is_nil(null), true);
    test.strictEqual(main.is_nil(undefined), true);
    test.strictEqual(main.is_nil(42), false);
    test.strictEqual(main.is_nil("foo"), false);
    test.strictEqual(main.is_nil(3.1416), false);
    test.strictEqual(main.is_nil([]), false);
};

exports['abs function'] = function (test) {
    test.ok(main.abs);
    test.equal(typeof main.abs, 'function');
    test.strictEqual(main.abs(1), 1);
    test.strictEqual(main.abs(1.2), 1.2);
    test.strictEqual(main.abs(-42), 42);
    test.strictEqual(main.abs(-3.1415), 3.1415);
};
