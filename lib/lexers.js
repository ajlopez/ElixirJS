
var TokenType = { Name: 1 };

function Lexer(text) {
    var length = text.length;
    var position = 0;
    
    this.nextToken = function () {
        while (position < length && text[position] <= ' ')
            position++;
            
        if (position >= length)
            return null;

        var value = text[position++];
        
        while (position < length && text[position] > ' ')
            value += text[position++];
            
        var token = { value: value, type: TokenType.Name };
        
        return token;
    };
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}