
function Fn(name, argnames, exprs) {
    this.name = function () { return name; };
    this.arity = function () { return argnames.length; };
    
    this.evaluate = function (ctx, args) { return null; }
}

function createFunction(name, argnames, exprs) {
    return new Fn(name, argnames, exprs);
}

module.exports = {
    fn: createFunction
};