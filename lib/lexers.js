
var TokenType = { Name: 1, Integer: 2, String: 3, Atom: 4, Operator: 5, Delimiter: 6  };

var operators = [ "=>", "=", "+", "-", "*", "/", "==", "!=", "<", ">", "<=", ">=", "++", "--", "<>", "!", "&&", "||", "not", "and", "or", "div", "rem", "in", "when" ];
var delimiters = [ "{", "}", "[", "]", ",", "(", ")", ">>", "<<", "." ];

function Lexer(text) {
    var length = text.length;
    var position = 0;
    var tokens = [];
    
    this.nextToken = function () {
        if (tokens.length > 0)
            return tokens.pop();
            
        while (position < length && text[position] <= ' ')
            position++;
            
        if (position >= length)
            return null;

        var value = text[position++];
        
        if (value == '"')
            return nextString();
            
        if (value == ':')
            return nextAtom();
            
        if (value == '-' && isDigit(text[position]))
            return nextInteger(value + text[position++]);
        
        if (delimiters.indexOf(value + text[position]) >= 0)
            return { value: value + text[position++], type: TokenType.Delimiter };
            
        if (delimiters.indexOf(value) >= 0)
            return { value: value, type: TokenType.Delimiter };
            
        if (operators.indexOf(value + text[position]) >= 0)
            return { value: value + text[position++], type: TokenType.Operator };

        if (operators.indexOf(value) >= 0)
            return { value: value, type: TokenType.Operator };
        
        if (isDigit(value))
            return nextInteger(value);

        if (isNameFirstChar(value))
            return nextName(value);
    };
    
    this.pushToken = function (token) {
        tokens.push(token);
    }
    
    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }
    
    function isNameFirstChar(ch) {
        return isLetter(ch) || ch === '_';
    }
    
    function isNameChar(ch) {
        return isDigit(ch) || isLetter(ch) || ch === '_' || ch === '?';
    }
    
    function isLetter(ch) {
        return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
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
        while (position < length && isNameChar(text[position]))
            value += text[position++];
            
        var token = { value: value, type: TokenType.Name };
        
        if (operators.indexOf(value) >= 0)
            token.type = TokenType.Operator;

        if (value == 'true' || value == 'false' || value == 'nil')
            token.type = TokenType.Atom;
            
        return token;
    }
    
    function nextAtom() {
        var value = text[position++];
        
        while (position < length && isNameChar(text[position]) > ' ')
            value += text[position++];
            
        var token = { value: value, type: TokenType.Atom };
        
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

