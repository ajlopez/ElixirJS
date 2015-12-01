
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

function getName(text, value, test) {
    var lexer = lexers.lexer(text);
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, value);
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.nextToken(), null);
}

exports['get name'] = function (test) {
    getName('foo', 'foo', test);
};

exports['get name with underscore'] = function (test) {
    getName('foo_bar', 'foo_bar', test);
};

exports['get name with question mark'] = function (test) {
    getName('foo?', 'foo?', test);
};

exports['get name with exclamation mark'] = function (test) {
    getName('foo!', 'foo!', test);
};

exports['get name starting with underscore'] = function (test) {
    getName('_foo', '_foo', test);
};

exports['get name with spaces'] = function (test) {
    getName('  foo   ', 'foo', test);
};

exports['get name skipping comments'] = function (test) {
    getName('# this is a comment\n  foo  # this is another comment', 'foo', test);
};

exports['reject name with internal question mark'] = function (test) {
    var lexer = lexers.lexer("foo?bar");
    
    test.throws(
        function () { lexer.nextToken(); },
        "Invalid character '?' in name"
    );
};

exports['reject name with internal exclamation mark'] = function (test) {
    var lexer = lexers.lexer("foo!bar");
    
    test.throws(
        function () { lexer.nextToken(); },
        "Invalid character '!' in name"
    );
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

exports['get atom with exclamation mark'] = function (test) {
    var lexer = lexers.lexer(':foo!');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo!');
    test.equal(token.type, TokenType.Atom);
    
    test.equal(lexer.nextToken(), null);
};

exports['get atom with question mark'] = function (test) {
    var lexer = lexers.lexer(':foo?');
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'foo?');
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

exports['reject atom name with internal question mark'] = function (test) {
    var lexer = lexers.lexer(":foo?bar");
    
    test.throws(
        function () { lexer.nextToken(); },
        "Invalid character '?' in atom"
    );
};

exports['reject atom name with internal exclamation mark'] = function (test) {
    var lexer = lexers.lexer(":foo!bar");
    
    test.throws(
        function () { lexer.nextToken(); },
        "Invalid character '!' in atom"
    );
};

exports['get atom with double quotes'] = function (test) {
    var lexer = lexers.lexer(":\"an atom\"");
    
    var token = lexer.nextToken();

    test.ok(token);
    test.equal(token.value, 'an atom');
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

exports['get pipe operator'] = function (test) {
    var lexer = lexers.lexer('|>');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "|>");
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.nextToken(), null);
};

exports['get string match operator'] = function (test) {
    var lexer = lexers.lexer('=~');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "=~");
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

exports['get string with escaped backslash'] = function (test) {
    var lexer = lexers.lexer('"foo\\\\"');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "foo\\");
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.nextToken(), null);
};

exports['get string with escaped new line and carriage return'] = function (test) {
    var lexer = lexers.lexer('"foo\\n\\r"');
    
    var token = lexer.nextToken();
    
    test.ok(token);
    test.equal(token.value, "foo\n\r");
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
