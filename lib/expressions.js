
function ConstantExpression(value) {
    this.evaluate = function () { return value; };
}

function VariableExpression(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function AddExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) + right.evaluate(ctx); };
}

function createConstant(value) {
    return new ConstantExpression(value);
}

function createVariable(name) {
    return new VariableExpression(name);
}

function createAdd(left, right) {
    return new AddExpression(left, right);
}

module.exports = {
    constant: createConstant,
    variable: createVariable,
    add: createAdd
};