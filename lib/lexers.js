
var TokenType = { Name: 1, Integer: 2, String: 3, Operator: 4  };

var operators = [ "+", "-", "*", "/" ];

function Lexer(text) {
    var length = text.length;
    var position = 0;
    
    this.nextToken = function () {
        while (position < length && text[position] <= ' ')
            position++;
            
        if (position >= length)
            return null;

        var value = text[position++];
        
        if (value == '"')
            return nextString();
        
        if (operators.indexOf(value) >= 0)
            return { value: value, type: TokenType.Operator };
        
        if (isDigit(value))
            return nextInteger(value);

        return nextName(value);
    };
    
    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }
    
    function nextString() {
        var value = "";

        while (position < length && text[position] != '"')
            value += text[position++];
            
        if (position < length)
            position++;
            
        var token = { value: value, type: TokenType.String };
        
        return token;
    }
    
    function nextName(value) {
        while (position < length && text[position] > ' ')
            value += text[position++];
            
        var token = { value: value, type: TokenType.Name };
        
        return token;
    }
    
    function nextInteger(value) {
        while (position < length && isDigit(text[position]))
            value += text[position++];
            
        var token = { value: value, type: TokenType.Integer };
        
        return token;
    }
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}