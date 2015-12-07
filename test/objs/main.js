
var main = require('../../lib/objs/main');

exports['length function on array'] = function (test) {
    test.ok(main.length);
    test.equal(typeof main.length, 'function');
    test.equal(main.length([1, 2, 3]), 3);
};