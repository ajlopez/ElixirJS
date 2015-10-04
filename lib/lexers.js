
var TokenType = { Name: 1 };

function Lexer(text) {
    this.nextToken = function () {
        if (!text)
            return null;
            
        var token = { value: text.trim(), type: TokenType.Name };
        
        text = null;
        
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