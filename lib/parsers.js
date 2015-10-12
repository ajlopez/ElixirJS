
'use strict';

var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');
var atoms = require('./atoms');

function Parser(text) {
    var lexer = lexers.lexer(text);
    var self = this;
    
    this.parseExpression = function () {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.type === TokenType.Delimiter && token.value === "{")
            return parseTuple();
            
        if (token.type === TokenType.String)
            return expressions.constant(token.value);
            
        if (token.type === TokenType.Integer)
            return expressions.constant(parseInt(token.value));
            
        if (token.type === TokenType.Atom)
            return expressions.constant(atoms.atom(token.value));
            
        if (token.type === TokenType.Name)
            return expressions.variable(token.value);
    };
    
    function parseTuple() {
        var exprs = [];
        
        while (!tryParseToken("}", TokenType.Delimiter)) {
            exprs.push(self.parseExpression());
            if (!tryParseToken(",", TokenType.Delimiter)) {
                parseToken("}", TokenType.Delimiter);
                break;
            }
        }
        
        return expressions.tuple(exprs);
    }
    
    function tryParseToken(value, type) {
        var token = lexer.nextToken();
        
        if (token == null)
            return false;
            
        if (token.value === value && token.type === TokenType.Delimiter)
            return true;
            
        lexer.pushToken(token);
        
        return false;
    }
    
    function parseToken(value, type) {
        var token = lexer.nextToken();
        
        if (!token || token.type !== type || token.value !== value)
            throw new Error("Expected '" + value + "'");
    }
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
}