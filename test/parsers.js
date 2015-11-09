
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');

exports['parse and evaluate integer'] = function (test) {
    var parser = parsers.parser('42');
    
    var result = parser.parseExpression();
    
    test.ok(result);
    
    test.strictEqual(result.evaluate(null), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate integer in parenthesis'] = function (test) {
    var parser = parsers.parser('(42)');
    
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

exports['parse and evaluate false'] = function (test) {
    var parser = parsers.parser('false');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.strictEqual(result, false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate nil as null'] = function (test) {
    var parser = parsers.parser('nil');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.strictEqual(result, null);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate true'] = function (test) {
    var parser = parsers.parser('true');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.strictEqual(result, true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate atom false'] = function (test) {
    var parser = parsers.parser(':false');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.strictEqual(result, false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate atom true'] = function (test) {
    var parser = parsers.parser(':true');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.strictEqual(result, true);
    
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

exports['parse and evaluate tuple expression with variable'] = function (test) {
    var parser = parsers.parser('{1,a,3}');
    var ctx = contexts.context();
    ctx.set('a', 42);
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(ctx);
    
    test.ok(result);
    test.ok(result.isTuple());
    test.equal(result.size(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 42);
    test.equal(result.get(2), 3);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate list expression'] = function (test) {
    var parser = parsers.parser('[1,2,3]');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate list expression with variable'] = function (test) {
    var parser = parsers.parser('[1,a,3]');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var ctx = contexts.context();
    ctx.set('a', 42);
    
    var result = expr.evaluate(ctx);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 42);
    test.equal(result.get(2), 3);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate append lists'] = function (test) {
    var parser = parsers.parser('[1,2,3] ++ [4,5]');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 5);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
    test.equal(result.get(3), 4);
    test.equal(result.get(4), 5);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate subtract lists'] = function (test) {
    var parser = parsers.parser('[1,2,3,3,4,5] -- [4,3,2]');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 3);
    test.equal(result.get(2), 5);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate match variable'] = function (test) {
    var parser = parsers.parser("a = 42");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var ctx = contexts.context();
    
    var result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(ctx.get('a'), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate match two variables using right association'] = function (test) {
    var parser = parsers.parser("x = y = 42");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var ctx = contexts.context();
    
    var result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(ctx.get('x'), 42);
    test.equal(ctx.get('y'), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate add numbers'] = function (test) {
    var parser = parsers.parser("40 + 2");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate add and multiply numbers using precedence'] = function (test) {
    var parser = parsers.parser("1 + 3 * 2");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 7);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate multiply and add numbers using precedence'] = function (test) {
    var parser = parsers.parser("3 * 2 + 1");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 7);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate subtract numbers'] = function (test) {
    var parser = parsers.parser("44 - 2");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate multiply numbers'] = function (test) {
    var parser = parsers.parser("21 * 2");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate divide numbers'] = function (test) {
    var parser = parsers.parser("3/2");
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, 3/2);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate string concatenation'] = function (test) {
    var parser = parsers.parser('"foo" <> "bar"');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    
    var result = expr.evaluate(null);
    
    test.ok(result);
    test.equal(result, "foobar");
    
    test.equal(parser.parseExpression(), null);
};

exports['parse and evaluate logical and expression'] = function (test) {
    test.strictEqual(eval("true and true"), true);
    test.strictEqual(eval("true and false"), false);
    test.strictEqual(eval("false and true"), false);
    test.strictEqual(eval("false and false"), false);
};

exports['parse and evaluate logical or expression'] = function (test) {
    test.strictEqual(eval("true or true"), true);
    test.strictEqual(eval("true or false"), true);
    test.strictEqual(eval("false or true"), true);
    test.strictEqual(eval("false or false"), false);
};

exports['parse and evaluate and expression'] = function (test) {
    test.strictEqual(eval("1 && false"), false);
    test.strictEqual(eval("1 && nil"), null);
    test.strictEqual(eval("false && 17"), false);
    test.strictEqual(eval("3 && 17"), 17);
};

exports['parse and evaluate or expression'] = function (test) {
    test.strictEqual(eval("1 || false"), 1);
    test.strictEqual(eval("1 || nil"), 1);
    test.strictEqual(eval("false || 17"), 17);
    test.strictEqual(eval("3 || 17"), 3);
};

exports['parse and evaluate rem expression'] = function (test) {
    test.strictEqual(eval("rem 1, 2"), 1);
    test.strictEqual(eval("rem -2, 3"), -2);
    test.strictEqual(eval("rem 4, -2"), 0);
    test.strictEqual(eval("rem 3, -2"), 1);
};

exports['parse and evaluate rem expression with parens'] = function (test) {
    test.strictEqual(eval("rem(1, 2)"), 1);
    test.strictEqual(eval("rem(-2, 3)"), -2);
    test.strictEqual(eval("rem(4, -2)"), 0);
    test.strictEqual(eval("rem(3, -2)"), 1);
};

exports['parse and evaluate div expression'] = function (test) {
    test.strictEqual(eval("div 1, 2"), 0);
    test.strictEqual(eval("div -2, 3"), 0);
    test.strictEqual(eval("div -4, 3"), -1);
    test.strictEqual(eval("div 4, -2"), -2);
    test.strictEqual(eval("div 3, -2"), -1);
};

exports['parse and evaluate div expression with parens'] = function (test) {
    test.strictEqual(eval("div(1, 2)"), 0);
    test.strictEqual(eval("div(-2, 3)"), 0);
    test.strictEqual(eval("div(-4, 3)"), -1);
    test.strictEqual(eval("div(4, -2)"), -2);
    test.strictEqual(eval("div(3, -2)"), -1);
};

exports['parse and evaluate equal expression'] = function (test) {
    test.strictEqual(eval("1 == 0"), false);
    test.strictEqual(eval("42 == 42"), true);
};

exports['parse and evaluate not equal expression'] = function (test) {
    test.strictEqual(eval("1 != 0"), true);
    test.strictEqual(eval("42 != 42"), false);
};

exports['parse and evaluate less expression'] = function (test) {
    test.strictEqual(eval("1 < 0"), false);
    test.strictEqual(eval("1 < 1"), false);
    test.strictEqual(eval("1 < 42"), true);
};

exports['parse and evaluate greater expression'] = function (test) {
    test.strictEqual(eval("1 > 0"), true);
    test.strictEqual(eval("1 > 1"), false);
    test.strictEqual(eval("1 > 42"), false);
};

function eval(text) {
    var parser = parsers.parser(text);    
    var expr = parser.parseExpression();
    return expr.evaluate();
}


