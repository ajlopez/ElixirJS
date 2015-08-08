
function ConstantExpression(value) {
    this.evaluate = function () { return value; };
}

function VariableExpression(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function LogicalOrExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        
        if (lvalue === true)
            return true;
            
        if (lvalue !== false)
            throw new Error("Value is not boolean");
            
        var rvalue = right.evaluate(ctx);
        
        if (rvalue === true)
            return true;
        
        if (rvalue !== false)
            throw new Error("Value is not boolean");
            
        return false;
    };
}

function LogicalAndExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        
        if (lvalue === false)
            return false;
            
        var rvalue = right.evaluate(ctx);
        
        if (rvalue === false)
            return false;
        
        return true;
    };
}

function OrExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        
        if (lvalue != null && lvalue !== false)
            return true;
            
        var rvalue = right.evaluate(ctx);
        
        if (rvalue != null && rvalue !== false)
            return true;
        
        return false;
    };
}

function AndExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        
        if (lvalue == null || lvalue === false)
            return false;
            
        var rvalue = right.evaluate(ctx);
        
        if (rvalue == null || rvalue === false)
            return false;
        
        return true;
    };
}

function NotExpression(expr) {
    this.evaluate = function (ctx) {
        var value = expr.evaluate(ctx);
        
        if (value == null || value === false)
            return true;
            
        return false;
    }
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

function createLogicalOr(left, right) {
    return new LogicalOrExpression(left, right);
}

function createLogicalAnd(left, right) {
    return new LogicalAndExpression(left, right);
}

function createOr(left, right) {
    return new OrExpression(left, right);
}

function createAnd(left, right) {
    return new AndExpression(left, right);
}

function createNot(expr) {
    return new NotExpression(expr);
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
    greaterEqual: createGreaterEqual,
    logicalOr: createLogicalOr,
    logicalAnd: createLogicalAnd,
    or: createOr,
    and: createAnd,
    not: createNot
};