
var enumobj = require('../../lib/objs/enum');

exports['reverse function on array'] = function (test) {
    test.ok(enumobj.reverse);
    test.equal(typeof enumobj.reverse, 'function');
    test.deepEqual(enumobj.reverse([1, 2, 3]), [3, 2, 1]);
};

exports['member function on array'] = function (test) {
    test.ok(enumobj['member?']);
    test.equal(typeof enumobj['member?'], 'function');
    test.strictEqual(enumobj['member?']([1, 2, 3], 1), true);
    test.strictEqual(enumobj['member?']([1, 2, 3], 2), true);
    test.strictEqual(enumobj['member?']([1, 2, 3], 4), false);
};