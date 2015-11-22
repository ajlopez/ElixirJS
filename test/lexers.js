
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

exports['get name with underscore'] = function (test) {
    var lexer = lexers.lexer('foo_bar');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo_bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get name with question mark'] = function (test) {
    var lexer = lexers.lexer('foo?');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo?');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get name with exclamation mark'] = function (test) {
    var lexer = lexers.lexer('foo!');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo!');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get name starting with underscore'] = function (test) {
    var lexer = lexers.lexer('_foo');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, '_foo');
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

exports['get negative integer'] = function (test) {
    var lexer = lexers.lexer('-123');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, '-123');
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

exports['get atoms'] = function (test) {
    var lexer = lexers.lexer(':foo :bar');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Atom);
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.nextToken(), null);
};

exports['get false, true and nil as atoms'] = function (test) {
    var lexer = lexers.lexer('false true nil');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'false');
    test.equal(token.type, TokenType.Atom);
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'true');
    test.equal(token.type, TokenType.Atom);
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'nil');
    test.equal(token.type, TokenType.Atom);
    
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

exports['get list operators'] = function (test) {
    var lexer = lexers.lexer('++ --');
    
    ["++", "--"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Operator);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get comparison operators'] = function (test) {
    var lexer = lexers.lexer('< > <= >=');
    
    ["<", ">", "<=", ">=" ].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Operator);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get string concatenation operator'] = function (test) {
    var lexer = lexers.lexer('<>');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "<>");
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get strict boolean operators'] = function (test) {
    var lexer = lexers.lexer('not and or');
    
    ["not", "and", "or"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Operator);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get in operator'] = function (test) {
    var lexer = lexers.lexer('in');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'in');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get when operator'] = function (test) {
    var lexer = lexers.lexer('when');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, 'when');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get div and rem operators'] = function (test) {
    var lexer = lexers.lexer('div rem');
    
    ["div", "rem"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Operator);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get match operator'] = function (test) {
    var lexer = lexers.lexer('=');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get equal operator'] = function (test) {
    var lexer = lexers.lexer('==');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '==');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get not equal operator'] = function (test) {
    var lexer = lexers.lexer('!=');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, '!=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get boolean operators'] = function (test) {
    var lexer = lexers.lexer('! && ||');
    
    ["!", "&&", "||"].forEach(function (value) {
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

exports['get first delimiters'] = function (test) {
    var lexer = lexers.lexer('{}[],()');
    
    ["{", "}", "[", "]", ",", "(", ")"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Delimiter);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get dot as delimiter'] = function (test) {
    var lexer = lexers.lexer('.');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ".");
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['get names with dot as delimiter'] = function (test) {
    var lexer = lexers.lexer('foo.bar');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "foo");
    test.equal(token.type, TokenType.Name);
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ".");
    test.equal(token.type, TokenType.Delimiter);
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "bar");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
};

exports['get binary list delimiter'] = function (test) {
    var lexer = lexers.lexer('<< >>');
    
    ["<<", ">>"].forEach(function (value) {
        var token = lexer.nextToken();
        
        test.ok(token);
        test.equal(token.value, value);
        test.equal(token.type, TokenType.Delimiter);
    });
    
    test.equal(lexer.nextToken(), null);
};

exports['get right arrow as operator'] = function (test) {
    var lexer = lexers.lexer('=>');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "=>");
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get semicolon as delimiter'] = function (test) {
    var lexer = lexers.lexer(';');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, ";");
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['get vertical bar as delimiter'] = function (test) {
    var lexer = lexers.lexer('|');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "|");
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.nextToken(), null);
};

exports['skip line comment'] = function (test) {
    var lexer = lexers.lexer('# this is a comment\n');
    
    test.equal(lexer.nextToken(), null);
};
