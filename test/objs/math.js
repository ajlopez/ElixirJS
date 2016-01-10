
var math = require('../../lib/objs/math');

exports['Pi value'] = function (test) {
    test.equal(math.pi, Math.PI);
}

exports['sine function'] = function (test) {
    test.equal(math.sin(0), Math.sin(0));
    test.equal(math.sin(1), Math.sin(1));
    test.equal(math.sin(math.pi), Math.sin(Math.PI));
}