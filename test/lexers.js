
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['get name'] = function (test) {
    var lexer = lexers.lexer('foo');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get integer'] = function (test) {
    var lexer = lexers.lexer('123');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, '123');
    test.equal(token.type, TokenType.Integer);
    
    test.equal(lexer.nextToken(), null);
};

exports['get name with underscore'] = function (test) {
    var lexer = lexers.lexer('foo_bar');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get name with spaces'] = function (test) {
    var lexer = lexers.lexer('  foo   ');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get names'] = function (test) {
    var lexer = lexers.lexer('foo bar');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get arithmethic operators'] = function (test) {
    var lexer = lexers.lexer('+ - * /');
    
    ["+", "-", "*", "/"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Operator);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get string'] = function (test) {
    var lexer = lexers.lexer('"foo"');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "foo");
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.nextToken(), null);
};

