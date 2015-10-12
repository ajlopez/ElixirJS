
function Variable(name) {
    this.toString = function() { return name; }
    
    this.name = function () { return name; }
}

function createVariable(name) {
    return new Variable(name);
}

module.exports = {
    variable: createVariable
}