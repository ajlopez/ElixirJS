
var atomobj = require('../../lib/objs/atom');
var atoms = require('../../lib/atoms');

exports['to_string function'] = function (test) {
    test.ok(atomobj.to_string);
    test.equal(typeof atomobj.to_string, 'function');
    test.deepEqual(atomobj.to_string(atoms.atom('foo')), 'foo');
};
