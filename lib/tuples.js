
function Tuple(vals) {
    var values = vals.slice();
    
    this.size = function () { return values.length; };
    
    this.get = function (n) { return values[n]; };
}

function createTuple(values) {
    return new Tuple(values);
}

module.exports = {
    tuple: createTuple
};

