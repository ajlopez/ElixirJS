
var variables = require('../lib/variables');

exports['create variable'] = function (test) {
    var variable = variables.variable("foo");
    
    test.ok(variable);
    test.equal(typeof variable, 'object');
    test.equal(variable.toString(), "foo");
    test.equal(variable.name(), "foo");
    test.ok(variable.isVariable());
    test.equal(variable.isAtom(), false);
    test.equal(variable.isList(), false);
    test.equal(variable.isTuple(), false);
}

