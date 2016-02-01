
function Fn(name, argnames, exprs) {
    this.name = function () { return name; };
    this.arity = function () { return argnames.length; };
    
    this.evaluate = function (ctx, args) {
        var result = null;
        
        exprs.forEach(function (expr) {
            result = expr.evaluate(ctx);
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