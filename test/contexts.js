
var contexts = require('../lib/contexts');

exports['get undefined variable'] = function (test) {
    var context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
    test.strictEqual(context.get("foo"), undefined);
}

exports['set and get variable'] = function (test) {
    var context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
    context.set("foo", 42);
    test.equal(context.get("foo"), 42);
}

