
var expressions = require('../lib/expressions');

exports['create and evaluate integer constant'] = function (test) {
    var result = expressions.constant(42);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

