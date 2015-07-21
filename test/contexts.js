
var contexts = require('../lib/contexts');

exports['get undefined variable'] = function (test) {
    var context = contexts.context();
    
    test.ok(context);
    test.equal(typeof context, 'object');
    test.strictEqual(context.get("foo"), undefined);
}

