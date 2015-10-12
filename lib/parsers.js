
var lexers = require('./lexers');
var expressions = require('./expressions');

function Parser(text) {
    var lexer = lexers.lexer(text);
    
    this.parseExpression = function () {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        return expressions.constant(parseInt(token.value));
    };
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
}