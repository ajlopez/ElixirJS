
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');

exports['create and evaluate integer constant'] = function (test) {
    var result = expressions.constant(42);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate variable in context'] = function (test) {
    var result = expressions.variable("n");
    var ctx = contexts.context();
    
    ctx.set("n", 42);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(ctx), 42);
};

exports['create and evaluate add constants'] = function (test) {
    var result = expressions.add(expressions.constant(20), expressions.constant(22));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate multiply constants'] = function (test) {
    var result = expressions.multiply(expressions.constant(2), expressions.constant(21));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate divide constants'] = function (test) {
    var result = expressions.divide(expressions.constant(84), expressions.constant(2));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate compare constants with less'] = function (test) {
    var result = expressions.less(expressions.constant(42), expressions.constant(43));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.strictEqual(result.evaluate(), true);
};

exports['evaluate less than'] = function (test) {
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(43)).evaluate(), true);
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(40)).evaluate(), false);
};

exports['evaluate greater than'] = function (test) {
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(43)).evaluate(), false);
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(40)).evaluate(), true);
};

exports['evaluate greater or equal than'] = function (test) {
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(43)).evaluate(), false);
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(42)).evaluate(), true);
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(40)).evaluate(), true);
};

exports['evaluate less or equal than'] = function (test) {
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(43)).evaluate(), true);
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(42)).evaluate(), true);
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(40)).evaluate(), false);
};
