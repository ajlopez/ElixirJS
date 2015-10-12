
function Tuple(vals) {
    var values = vals.slice();
    
    this.size = function () { return values.length; };
    
    this.get = function (n) { return values[n]; };
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

