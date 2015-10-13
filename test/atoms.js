
var atoms = require('../lib/atoms');

exports['create atom'] = function (test) {
    var atom = atoms.atom("foo");
    
    test.ok(atom);
    test.equal(typeof atom, 'object');
    test.equal(atom.toString(), ":foo");
    test.equal(atom.name(), "foo");
    
    test.ok(atom.isAtom());
    test.equal(atom.isVariable(), false);
    test.equal(atom.isList(), false);
    test.equal(atom.isTuple(), false);
}

