
function Atom(name) {
    this.toString = function() { return ":" + name; };
    
    this.name = function () { return name; };
}

function createAtom(name) {
    return new Atom(name);
}

module.exports = {
    atom: createAtom
}