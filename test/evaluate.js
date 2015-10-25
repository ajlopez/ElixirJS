
var elixir = require('..');

exports['Evaluate number'] = function (test) {
    var result = elixir.evaluate('42');
    
    test.ok(result);
    test.strictEqual(result, 42);
};

exports['Evaluate string'] = function (test) {
    var result = elixir.evaluate('"foo"');
    
    test.ok(result);
    test.strictEqual(result, "foo");
};

exports['Evaluate list'] = function (test) {
    var result = elixir.evaluate('[1,2,3]');
    
    test.ok(result);
    test.strictEqual(result.toString(), "[ 1, 2, 3 ]");
};

exports['Evaluate append lists'] = function (test) {
    var result = elixir.evaluate('[1,2,3]++[4,5]');
    
    test.ok(result);
    test.strictEqual(result.toString(), "[ 1, 2, 3, 4, 5 ]");
};

exports['Evaluate subtract lists'] = function (test) {
    var result = elixir.evaluate('[1,2,3]--[3,5]');
    
    test.ok(result);
    test.strictEqual(result.toString(), "[ 1, 2 ]");
};
