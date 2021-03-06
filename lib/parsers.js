
'use strict';

const lexers = require('./lexers');
const TokenType = lexers.TokenType;
const expressions = require('./expressions');
const atoms = require('./atoms');

const binops = [
    [ "=" ],
    [ "<>", "++", "--" ],
    [ "+", "-" ],
    [ "*", "/" ],
    [ "==", "!=", "<", ">", "<=", ">=" ],
    [ "or", "||" ],
    [ "and", "&&" ]
];

const binfns = {
    "=": expressions.match,
    "+": expressions.add,
    "-": expressions.subtract,
    "*": expressions.multiply,
    "/": expressions.divide,
    "++": expressions.append,
    "--": expressions.subtractList,
    "<>": expressions.concat,
    "and": expressions.logicalAnd,
    "or": expressions.logicalOr,
    "&&": expressions.and,
    "||": expressions.or,
    "==": expressions.equal,
    "!=": expressions.notEqual,
    "<": expressions.less,
    "<=": expressions.lessEqual,
    ">": expressions.greater,
    ">=": expressions.greaterEqual
}

function Parser(text) {
    const lexer = lexers.lexer(text);
    const self = this;
    
    this.parseExpression = function () {
        const expr = parseBinaryExpression(0);
        
        const token = lexer.nextToken();
        
        if (token && token.type != TokenType.EndOfLine)
            lexer.pushToken(token);
            
        return expr;
    }
    
    function parseBinaryExpression(level) {
        if (level >= binops.length)
            return parseTermExpression();
                    
        let expr = parseBinaryExpression(level + 1);
        
        if (!expr)
            return expr;
        
        let token;
        
        for (token = lexer.nextToken(); token && token.type === TokenType.Operator && binops[level].indexOf(token.value) >= 0; token = lexer.nextToken())
            expr = binfns[token.value](expr, parseBinaryExpression(level + (token.value === "=" ? 0 : 1)));
        
        if (token)
            lexer.pushToken(token);
            
        return expr;
    }
    
    function parseTermExpression() {
        let expr = parseTerm();
        
        if (expr == null)
            return null;
        
        while (tryParseToken("(", TokenType.Delimiter)) {
            const exprs = []
            
            while (!tryParseToken(")", TokenType.Delimiter)) {
                exprs.push(self.parseExpression());
                
                if (tryParseToken(")", TokenType.Delimiter))
                    break;
                    
                parseToken(",", TokenType.Delimiter);
            }
            
            expr = expressions.call(expr, exprs);
        }
        
        const exprs = [];
        let argexpr = self.parseExpression();
        
        while (argexpr != null) {
            exprs.push(argexpr);
            
            if (!tryParseToken(",", TokenType.Delimiter))
                break;

            argexpr = self.parseExpression();
        }
        
        if (exprs.length)
            expr = expressions.call(expr, exprs);
        
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
                var parens = tryParseToken("(", TokenType.Delimiter);
                var lexpr = self.parseExpression();
                parseToken(",", TokenType.Delimiter);
                var rexpr = self.parseExpression();
                if (parens)
                    parseToken(")", TokenType.Delimiter);
                return expressions.rem(lexpr, rexpr);
            }
            else if (token.value === "div") {
                var parens = tryParseToken("(", TokenType.Delimiter);
                var lexpr = self.parseExpression();
                parseToken(",", TokenType.Delimiter);
                var rexpr = self.parseExpression();
                if (parens)
                    parseToken(")", TokenType.Delimiter);
                return expressions.div(lexpr, rexpr);
            }
            
        lexer.pushToken(token);
        
        return null;
    };
    
    function parseTuple() {
        const exprs = [];
        
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
        const exprs = [];
        
        while (!tryParseToken("]", TokenType.Delimiter)) {
            exprs.push(self.parseExpression());
            
            if (exprs.length === 1 && tryParseToken("|", TokenType.Operator)) {
                parseToken("[", TokenType.Delimiter);
                var list = parseList();
                return expressions.cons(exprs[0], list);
            }
            
            if (!tryParseToken(",", TokenType.Delimiter)) {
                parseToken("]", TokenType.Delimiter);
                break;
            }
        }
        
        return expressions.list(exprs);
    }
    
    function tryParseToken(value, type) {
        const token = lexer.nextToken();
        
        if (token == null)
            return false;
            
        if (token.value === value && token.type === type)
            return true;
            
        lexer.pushToken(token);
        
        return false;
    }
    
    function parseToken(value, type) {
        const token = lexer.nextToken();
        
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
