
'use strict';

const matches = require('./matches');

function Tuple(vals) {
    const values = vals.slice();
    
    this.size = function () { return values.length; };
    
    this.get = function (n) { return values[n]; };
    
    this.match = function (value, ctx) {
        if (value && value.isTuple && value.isTuple()) {
            const l = value.size();
            
            if (values.length != l)
                return null;
                
            for (let k = 0; k < l; k++)
                if (!matches.match(values[k], value.get(k), ctx))
                    return null;
             
            return value;
        }
        
        return null;
    };
    
    this.toString = function () {
        let result = "{";
        
        for (let k = 0; k < values.length; k++) {
            if (k)
                result += ",";
                
            result += " " + values[k].toString();
        }
        
        result += " }";
        
        return result;
    }
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

