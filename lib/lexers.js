
const TokenType = { Name: 1, Integer: 2, Real: 3, String: 4, Atom: 5, Operator: 6, Delimiter: 7, EndOfLine: 8  };

const operators = [ "=>", "=", "+", "-", "*", "/", "==", "!=", "<", ">", "<=", ">=", "++", "--", "<>", "!", "&&", "||", "|", "not", "and", "or", "xor", "div", "rem", "in", "when", "|>", "=~", "..", "->" ];
const delimiters = [ "{", "}", "[", "]", ",", "(", ")", ">>", "<<", ".", ";" ];

function Lexer(text) {
    const length = text.length;
    let position = 0;
    const tokens = [];
    
    this.nextToken = function () {
        if (tokens.length > 0)
            return tokens.pop();
            
        skipWhiteSpaces();
            
        if (position >= length)
            return null;

        const value = text[position++];

        if (value === '\n')
            return { value: value, type: TokenType.EndOfLine };
        
        if (value === '"')
            return nextString();
            
        if (value === ':')
            return nextAtom();
            
        if (value === '-' && isDigit(text[position]))
            return nextInteger(value + text[position++]);
            
        if (value === '0' && text[position] === 'x')
            return nextHexadecimalInteger();
            
        if (value === '0' && text[position] === 'b')
            return nextBinaryInteger();

        if (!isDigit(value) && !isLetter(value)) {
            if (delimiters.indexOf(value + text[position]) >= 0)
                return { value: value + text[position++], type: TokenType.Delimiter };
                
            if (operators.indexOf(value + text[position]) >= 0)
                return { value: value + text[position++], type: TokenType.Operator };
                
            if (delimiters.indexOf(value) >= 0)
                return { value: value, type: TokenType.Delimiter };
                
            if (operators.indexOf(value) >= 0)
                return { value: value, type: TokenType.Operator };
        }
        
        if (isDigit(value))
            return nextInteger(value);

        if (isNameFirstChar(value))
            return nextName(value);
            
        throw new Error("Unexpected '" + value + "'");
    };
    
    function skipWhiteSpaces() {
        while (true) {
            while (position < length && text[position] <= ' ' && text[position] != '\n')
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
    
    function isHexadecimalDigit(ch) {
        return ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'F' || ch >= 'a' && ch <= 'f';
    }
    
    function isBinaryDigit(ch) {
        return ch === '0' || ch === '1';
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
        let value = "";

        while (position < length && text[position] != '"') {
            var ch = text[position++];
            
            if (ch === '\\') {
                var ch2 = text[position++];
                
                if (ch2 === 'n')
                    ch2 = '\n';
                else if (ch2 === 'r')
                    ch2 = '\r';
                else if (ch2 === 't')
                    ch2 = '\t';
                
                value += ch2;
            }
            else
                value += ch;
        }
            
        if (position < length)
            position++;
            
        return { value: value, type: TokenType.String };
    }
    
    function nextName(value) {
        while (position < length && isNameChar(text[position])) {
            const ch = text[position];
            
            if ((ch === '?' || ch === '!') && isNameChar(text[position + 1]))
                throw new "Invalid character '" + ch + "' in name";
                
            value += ch;
            position++;
        }
            
        const token = { value: value, type: TokenType.Name };
        
        if (operators.indexOf(value) >= 0)
            token.type = TokenType.Operator;

        if (value === 'true' || value === 'false' || value === 'nil')
            token.type = TokenType.Atom;
            
        return token;
    }
    
    function nextAtom() {
        let value = text[position++];
        
        if (value === '"') {
            const token = nextString();
            token.type = TokenType.Atom;
            return token;
        }
        
        while (position < length && isAtomChar(text[position]) > ' ') {
            const ch = text[position];

            if ((ch === '?' || ch === '!') && isNameChar(text[position + 1]))
                throw new "Invalid character '" + ch + "' in atom";

            value += ch;
            position++;
        }
            
        return { value: value, type: TokenType.Atom };
    }
    
    function nextInteger(value) {
        let ch;
        
        while (position < length) {
            ch = text[position];
            
            if (ch !== '_')
                if (!isDigit(ch))
                    break;
                else
                    value += ch;
                    
            position++;
        }
            
        if (ch === '.')
            return nextReal(value);
            
        return { value: value, type: TokenType.Integer };
    }
    
    function nextHexadecimalInteger() {
        let value = '0x';        
        position++;
        
        for (var ch = text[position++]; isHexadecimalDigit(ch); ch = text[position++])
            value += ch;
            
        return { value: value, type: TokenType.Integer };
    }
    
    function nextBinaryInteger() {
        let value = '0b';        
        
        position++;
        
        for (var ch = text[position++]; isBinaryDigit(ch); ch = text[position++])
            value += ch;
            
        return { value: value, type: TokenType.Integer };
    }
        
    function nextReal(value) {
        position++;
        value += '.';
        
        while (position < length && isDigit(text[position]))
            value += text[position++];
            
        return { value: value, type: TokenType.Real };
    }    
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}

