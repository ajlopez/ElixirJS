
function ConstantExpression(value) {
    this.evaluate = function () { return value; };
}

function VariableExpression(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function AddExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) + right.evaluate(ctx); };
}

function SubtractExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) - right.evaluate(ctx); };
}

function MultiplyExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) * right.evaluate(ctx); };
}

function DivideExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) / right.evaluate(ctx); };
}

function LessExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) < right.evaluate(ctx); };
}

function LessEqualExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) <= right.evaluate(ctx); };
}

function GreaterExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) > right.evaluate(ctx); };
}

function GreaterEqualExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) >= right.evaluate(ctx); };
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

function createSubtract(left, right) {
    return new SubtractExpression(left, right);
}

function createMultiply(left, right) {
    return new MultiplyExpression(left, right);
}

function createDivide(left, right) {
    return new DivideExpression(left, right);
}

function createLess(left, right) {
    return new LessExpression(left, right);
}

function createLessEqual(left, right) {
    return new LessEqualExpression(left, right);
}

function createGreater(left, right) {
    return new GreaterExpression(left, right);
}

function createGreaterEqual(left, right) {
    return new GreaterEqualExpression(left, right);
}

module.exports = {
    constant: createConstant,
    variable: createVariable,
    add: createAdd,
    subtract: createSubtract,
    multiply: createMultiply,
    divide: createDivide,
    less: createLess,
    lessEqual: createLessEqual,
    greater: createGreater,
    greaterEqual: createGreaterEqual
};