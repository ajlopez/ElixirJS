
function Variable(name) {
    this.toString = function() { return name; }
    
    this.name = function () { return name; }
    
    this.match = function (value, ctx) { ctx.set(name, value); return true; }
}

Variable.prototype.isVariable = function () { return true; }
Variable.prototype.isAtom = function () { return false; }
Variable.prototype.isList = function () { return false; }
Variable.prototype.isTuple = function () { return false; }

function createVariable(name) {
    return new Variable(name);
}

module.exports = {
    variable: createVariable
}