
var matches = require('./matches');

function Tuple(vals) {
    var values = vals.slice();
    
    this.size = function () { return values.length; };
    
    this.get = function (n) { return values[n]; };
    
    this.match = function (value, ctx) {
        if (value && value.isTuple && value.isTuple()) {
            var l = value.size();
            
            if (values.length != l)
                return false;
                
            for (var k = 0; k < l; k++)
                if (!matches.match(values[k], value.get(k), ctx))
                    return false;
             
            return true;
        }
        
        return false;        
    };
}

Tuple.prototype.isAtom = function () { return false; }
Tuple.prototype.isVariable = function () { return false; }
Tuple.prototype.isList = function () { return false; }
Tuple.prototype.isTuple = function () { return true; }

function createTuple(values) {
    return new Tuple(values);
}

module.exports = {
    tuple: createTuple
};

