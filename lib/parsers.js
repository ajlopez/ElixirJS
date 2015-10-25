
'use strict';

var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');
var atoms = require('./atoms');

function Parser(text) {
    var lexer = lexers.lexer(text);
    var self = this;
    
    this.parseExpression = function () {
        var expr = parseTerm();
        
        if (tryParseToken("=", TokenType.Operator))
            return expressions.match(expr, this.parseExpression());

        if (tryParseToken("+", TokenType.Operator))
            return expressions.add(expr, this.parseExpression());
            
        if (tryParseToken("-", TokenType.Operator))
            return expressions.subtract(expr, this.parseExpression());
            
        if (tryParseToken("*", TokenType.Operator))
            return expressions.multiply(expr, this.parseExpression());
            
        if (tryParseToken("/", TokenType.Operator))
            return expressions.divide(expr, this.parseExpression());
            
        if (tryParseToken("++", TokenType.Operator))
            return expressions.append(expr, this.parseExpression());
            
        if (tryParseToken("--", TokenType.Operator))
            return expressions.subtractl(expr, this.parseExpression());
            
        if (tryParseToken("<>", TokenType.Operator))
            return expressions.concat(expr, this.parseExpression());
            
        return expr;
    }
    
    function parseTerm() {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.type === TokenType.Delimiter && token.value === "(") {
            var expr = self.parseExpression();
            parseToken(")", TokenType.Delimiter);
            return expr;
        }
            
        if (token.type === TokenType.Delimiter && token.value === "{")
            return parseTuple();
            
        if (token.type === TokenType.Delimiter && token.value === "[")
            return parseList();
            
        if (token.type === TokenType.String)
            return expressions.constant(token.value);
            
        if (token.type === TokenType.Integer)
            return expressions.constant(parseInt(token.value));
            
        if (token.type === TokenType.Atom) {
            if (token.value === 'false')
                return expressions.constant(false);
                
            if (token.value === 'true')
                return expressions.constant(true);
                
            return expressions.constant(atoms.atom(token.value));
        }
            
        if (token.type === TokenType.Name)
            return expressions.variable(token.value);
            
        lexer.pushToken(token);
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
    
    function parseList() {
        var exprs = [];
        
        while (!tryParseToken("]", TokenType.Delimiter)) {
            exprs.push(self.parseExpression());
            if (!tryParseToken(",", TokenType.Delimiter)) {
                parseToken("]", TokenType.Delimiter);
                break;
            }
        }
        
        return expressions.list(exprs);
    }
    
    function tryParseToken(value, type) {
        var token = lexer.nextToken();
        
        if (token == null)
            return false;
            
        if (token.value === value && token.type === type)
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