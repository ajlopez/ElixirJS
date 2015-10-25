
var parsers = require('./parsers');
var contexts = require('./contexts');

function evaluate(text, ctx) {
    var parser = parsers.parser(text);
    var expr = parser.parseExpression();
    return expr.evaluate(ctx);
}

module.exports = {
    context: contexts.context,
    evaluate: evaluate
}