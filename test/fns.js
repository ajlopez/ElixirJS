
var fns = require('../lib/fns');
var contexts = require('../lib/contexts');

exports['create and evaluate empty function'] = function (test) {
    var fn = fns.fn('foo', [], []);
    var ctx = contexts.context();
    
    test.equal(fn.name(), 'foo');
    test.equal(fn.arity(), 0);
    
    var result = fn.evaluate(ctx, []);
    
    test.equal(result, null);
}