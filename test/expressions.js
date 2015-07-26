
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

