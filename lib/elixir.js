
var parsers = require('./parsers');

function evaluate(text) {
    var parser = parsers.parser(text);
    var expr = parser.parseExpression();
    return expr.evaluate();
}

module.exports = {
    evaluate: evaluate
}