
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

exports['evaluate normal or'] = function (test) {
    test.strictEqual(expressions.or(expressions.constant(true), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.or(expressions.constant(null), expressions.constant(null)).evaluate(), false);
    test.strictEqual(expressions.or(expressions.constant(0), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(""), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(null), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(0)).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant("")).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(null)).evaluate(), false);
};

exports['evaluate normal and'] = function (test) {
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(null), expressions.constant(null)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(0), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(0), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(""), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(""), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(null), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(0)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant(0)).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant("")).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant("")).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(null)).evaluate(), false);
};

exports['evaluate normal not'] = function (test) {
    test.strictEqual(expressions.not(expressions.constant(true)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.not(expressions.constant(null)).evaluate(), true);
    test.strictEqual(expressions.not(expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant("")).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant(3.1415)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant("foo")).evaluate(), false);
};

exports['evaluate logical or'] = function (test) {
    test.strictEqual(expressions.logicalOr(expressions.constant(true), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(true), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(false), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(false), expressions.constant(false)).evaluate(), false);
};

exports['evaluate logical and'] = function (test) {
    test.strictEqual(expressions.logicalAnd(expressions.constant(true), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalAnd(expressions.constant(true), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.logicalAnd(expressions.constant(false), expressions.constant(true)).evaluate(), false);
    test.strictEqual(expressions.logicalAnd(expressions.constant(false), expressions.constant(false)).evaluate(), false);
};

