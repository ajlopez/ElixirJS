
'use strict';

var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');
var atoms = require('./atoms');

function Parser(text) {
    var lexer = lexers.lexer(text);
    
    this.parseExpression = function () {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.type === TokenType.String)
            return expressions.constant(token.value);
            
        if (token.type === TokenType.Integer)
            return expressions.constant(parseInt(token.value));
            
        if (token.type === TokenType.Atom)
            return expressions.constant(atoms.atom(token.value));
    };
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
}