
function Atom(name) {
    this.toString = function() { return ":" + name; }
}

function createAtom(name) {
    return new Atom(name);
}

module.exports = {
    atom: createAtom
}