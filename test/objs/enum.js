
var enumobj = require('../../lib/objs/enum');

exports['reverse function on array'] = function (test) {
    test.ok(enumobj.reverse);
    test.equal(typeof enumobj.reverse, 'function');
    test.deepEqual(enumobj.reverse([1, 2, 3]), [3, 2, 1]);
};