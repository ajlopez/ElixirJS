
var parsers = require('../lib/parsers');

exports['parse and evaluate integer'] = function (test) {
    var parser = parsers.parser('42');
    
    var result = parser.parseExpression();
    
    test.ok(result);
    
    test.strictEqual(result.evaluate(null), 42);
    
    test.equal(parser.parseExpression(), null);
};

