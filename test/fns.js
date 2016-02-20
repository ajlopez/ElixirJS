
var fns = require('../lib/fns');
var contexts = require('../lib/contexts');
var expressions = require('../lib/expressions');

exports['create and evaluate empty function'] = function (test) {
    var ctx = contexts.context();
    var fn = fns.fn('foo', [], [], ctx);
    
    test.equal(fn.name(), 'foo');
    test.equal(fn.arity(), 0);
    
    var result = fn.evaluate([]);
    
    test.equal(result, null);
}

exports['function with one expression'] = function (test) {
    var ctx = contexts.context();
    var fn = fns.fn('foo', [], [expressions.constant(42)], ctx);
    
    test.equal(fn.name(), 'foo');
    test.equal(fn.arity(), 0);
    
    var result = fn.evaluate([]);
    
    test.equal(result, 42);
}

exports['function with one expression referencing argument'] = function (test) {
    var ctx = contexts.context();
    var fn = fns.fn('foo', ["a"], [expressions.variable("a")], ctx);
    
    test.equal(fn.name(), 'foo');
    test.equal(fn.arity(), 1);
    
    var result = fn.evaluate([42]);
    
    test.equal(result, 42);
}

