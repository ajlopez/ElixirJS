
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');

exports['parse and evaluate integer'] = function (test) {
    var parser = parsers.parser('42');
    
    var result = parser.parseExpression();
    
    test.ok(result);
    
    test.strictEqual(result.evaluate(null), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate string'] = function (test) {
    var parser = parsers.parser('"foo"');
    
    var result = parser.parseExpression();
    
    test.ok(result);
    
    test.strictEqual(result.evaluate(null), "foo");
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate atom'] = function (test) {
    var parser = parsers.parser(':foo');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isAtom());
    test.equal(result.name(), "foo");
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate variable'] = function (test) {
    var parser = parsers.parser('a');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var ctx = contexts.context();
    
    var result = expr.evaluate(ctx);
    
    test.ok(result);
    test.ok(result.isVariable());
    test.equal(result.name(), "a");
    
    ctx.set("a", 42);

    var result = expr.evaluate(ctx);
    test.ok(result);
    test.equal(result, 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate tuple expression'] = function (test) {
    var parser = parsers.parser('{1,2,3}');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isTuple());
    test.equal(result.size(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
    
    test.equal(parser.parseExpression(), null);
};

