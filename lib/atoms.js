
function Atom(name) {
    this.toString = function() { return ":" + name; };
    
    this.name = function () { return name; };
}

Atom.prototype.isAtom = function () { return true; }

function createAtom(name) {
    return new Atom(name);
}

module.exports = {
    atom: createAtom
}