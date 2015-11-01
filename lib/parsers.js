
'use strict';

var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');
var atoms = require('./atoms');

var binops = [
    [ "=" ],
    [ "<>", "++", "--" ],
    [ "+", "-" ],
    [ "*", "/" ],
    [ "or", "||" ],
    [ "and", "&&" ]
];

function Parser(text) {
    var lexer = lexers.lexer(text);
    var self = this;
    
    this.parseExpression = function () {
        var expr = parseBinaryExpression(0);
            
        return expr;
    }
    
    function parseBinaryExpression(level) {
        if (level >= binops.length)
            return parseTerm();
                    
        var expr = parseBinaryExpression(level + 1);
        
        if (!expr)
            return expr;
        
        for (var token = lexer.nextToken(); token && token.type == TokenType.Operator && binops[level].indexOf(token.value) >= 0; token = lexer.nextToken()) {
            if (token.value === "=")
                expr = expressions.match(expr, parseBinaryExpression(level));
            else if (token.value === "+")
                expr = expressions.add(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "-")
                expr = expressions.subtract(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "*")
                expr = expressions.multiply(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "/")
                expr = expressions.divide(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "++")
                expr = expressions.append(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "--")
                expr = expressions.subtractl(expr, parseBinaryExpression(level + 1));                
            else if (token.value === "<>")
                expr = expressions.concat(expr, parseBinaryExpression(level + 1));
            else if (token.value === "and")
                expr = expressions.logicalAnd(expr, parseBinaryExpression(level + 1));
            else if (token.value === "or")
                expr = expressions.logicalOr(expr, parseBinaryExpression(level + 1));
            else if (token.value === "&&")
                expr = expressions.and(expr, parseBinaryExpression(level + 1));
            else if (token.value === "||")
                expr = expressions.or(expr, parseBinaryExpression(level + 1));
        }
        
        if (token)
            lexer.pushToken(token);
            
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
                
            if (token.value === 'nil')
                return expressions.constant(null);
                
            return expressions.constant(atoms.atom(token.value));
        }
            
        if (token.type === TokenType.Name)
            return expressions.variable(token.value);
            
        if (token.type === TokenType.Operator)
            if (token.value === "rem") {
                var lexpr = self.parseExpression();
                parseToken(",", TokenType.Delimiter);
                var rexpr = self.parseExpression();
                return expressions.rem(lexpr, rexpr);
            }
            
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