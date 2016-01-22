
var math = require('../../lib/objs/math');

exports['Pi value'] = function (test) {
    test.equal(math.pi, Math.PI);
}

exports['sine function'] = function (test) {
    test.equal(math.sin(0), Math.sin(0));
    test.equal(math.sin(1), Math.sin(1));
    test.equal(math.sin(math.pi), Math.sin(Math.PI));
}

exports['arcsine function'] = function (test) {
    test.equal(math.asin(0), Math.asin(0));
    test.equal(math.asin(1), Math.asin(1));
    test.equal(math.asin(-1), Math.asin(-1));
}

exports['cosine function'] = function (test) {
    test.equal(math.cos(0), Math.cos(0));
    test.equal(math.cos(1), Math.cos(1));
    test.equal(math.cos(math.pi), Math.cos(Math.PI));
}

exports['tangent function'] = function (test) {
    test.equal(math.tan(0), Math.tan(0));
    test.equal(math.tan(1), Math.tan(1));
    test.equal(math.tan(math.pi), Math.tan(Math.PI));
}

exports['power function'] = function (test) {
    test.equal(math.pow(2, 16), Math.pow(2,16));
    test.equal(math.pow(3, 2), Math.pow(3, 2));
    test.equal(math.pow(1.3, 0.5), Math.pow(1.3, 0.5));
}

