
var contexts = require('./contexts');

function Fn(name, argnames, exprs, ctx) {
    this.name = function () { return name; };
    this.arity = function () { return argnames.length; };
    
    this.evaluate = function (args) {
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

function createFunction(name, argnames, exprs, ctx) {
    return new Fn(name, argnames, exprs, ctx);
}

module.exports = {
    fn: createFunction
};