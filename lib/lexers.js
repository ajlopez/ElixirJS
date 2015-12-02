
var TokenType = { Name: 1, Integer: 2, String: 3, Atom: 4, Operator: 5, Delimiter: 6  };

var operators = [ "=>", "=", "+", "-", "*", "/", "==", "!=", "<", ">", "<=", ">=", "++", "--", "<>", "!", "&&", "||", "not", "and", "or", "div", "rem", "in", "when", "|>", "=~", ".." ];
var delimiters = [ "{", "}", "[", "]", ",", "(", ")", ">>", "<<", ".", ";", "|" ];

function Lexer(text) {
    var length = text.length;
    var position = 0;
    var tokens = [];
    
    this.nextToken = function () {
        if (tokens.length > 0)
            return tokens.pop();
            
        skipWhiteSpaces();
            
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
            
        if (operators.indexOf(value + text[position]) >= 0)
            return { value: value + text[position++], type: TokenType.Operator };
            
        if (delimiters.indexOf(value) >= 0)
            return { value: value, type: TokenType.Delimiter };
            
        if (operators.indexOf(value) >= 0)
            return { value: value, type: TokenType.Operator };
        
        if (isDigit(value))
            return nextInteger(value);

        if (isNameFirstChar(value))
            return nextName(value);
            
        throw new Error("Unexpected '" + value + "'");
    };
    
    function skipWhiteSpaces() {
        while (true) {
            while (position < length && text[position] <= ' ')
                position++;
                
            if (position >= length || text[position] != '#')
                return;
                
            while (position < length && text[position] != '\n')
                position++;
        }
    }
    
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
        return isDigit(ch) || isLetter(ch) || ch === '_' || ch === '?' || ch === '!';
    }
    
    function isAtomChar(ch) {
        return isNameChar(ch) || ch === '@';
    }
    
    function isLetter(ch) {
        return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
    }
    
    function nextString() {
        var value = "";

        while (position < length && text[position] != '"') {
            var ch = text[position++];
            
            if (ch === '\\') {
                var ch2 = text[position++];
                
                if (ch2 == 'n')
                    ch2 = '\n';
                else if (ch2 == 'r')
                    ch2 = '\r';
                
                value += ch2;
            }
            else
                value += ch;
        }
            
        if (position < length)
            position++;
            
        var token = { value: value, type: TokenType.String };
        
        return token;
    }
    
    function nextName(value) {
        while (position < length && isNameChar(text[position])) {
            var ch = text[position];
            
            if ((ch === '?' || ch === '!') && isNameChar(text[position + 1]))
                throw new "Invalid character '" + ch + "' in name";
                
            value += ch;
            position++;
        }
            
        var token = { value: value, type: TokenType.Name };
        
        if (operators.indexOf(value) >= 0)
            token.type = TokenType.Operator;

        if (value == 'true' || value == 'false' || value == 'nil')
            token.type = TokenType.Atom;
            
        return token;
    }
    
    function nextAtom() {
        var value = text[position++];
        
        if (value === '"') {
            var token = nextString();
            token.type = TokenType.Atom;
            return token;
        }
        
        while (position < length && isAtomChar(text[position]) > ' ') {
            var ch = text[position];

            if ((ch === '?' || ch === '!') && isNameChar(text[position + 1]))
                throw new "Invalid character '" + ch + "' in atom";

            value += ch;
            position++;
        }
            
            
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

