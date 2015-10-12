
function Atom(name) {
    this.toString = function() { return ":" + name; };
    
    this.name = function () { return name; };
}

Atom.prototype.isAtom = function () { return true; }
Atom.prototype.isVariable = function () { return false; }
Atom.prototype.isList = function () { return false; }
Atom.prototype.isTuple = function () { return false; }

function createAtom(name) {
    return new Atom(name);
}

module.exports = {
    atom: createAtom
}