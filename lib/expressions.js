
function ConstantExpression(value) {
    this.evaluate = function () { return value; };
}

function VariableExpression(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function createConstant(value) {
    return new ConstantExpression(value);
}

function createVariable(name) {
    return new VariableExpression(name);
}

module.exports = {
    constant: createConstant,
    variable: createVariable
};