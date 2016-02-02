
var contexts = require('./contexts');

function Fn(name, argnames, exprs) {
    this.name = function () { return name; };
    this.arity = function () { return argnames.length; };
    
    this.evaluate = function (ctx, args) {
        var result = null;
        
        var newctx = contexts.context(ctx);
        
        for (var k = 0; k < argnames.length; k++)
            ctx.set(argnames[k], args[k]);
        
        exprs.forEach(function (expr) {
            result = expr.evaluate(newctx);
        });
        
        return result;
    }
}

function createFunction(name, argnames, exprs) {
    return new Fn(name, argnames, exprs);
}

module.exports = {
    fn: createFunction
};