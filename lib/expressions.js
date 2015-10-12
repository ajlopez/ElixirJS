
var variables = require('./variables');
var tuples = require('./tuples');
var lists = require('./lists');

function TupleExpression(exprs) {
    this.evaluate = function (ctx) {
        var values = [];
        
        exprs.forEach(function (expr) {
            values.push(expr.evaluate(ctx));
        });
        
        return tuples.tuple(values);
    };
}

function ListExpression(exprs) {
    this.evaluate = function (ctx) {
        var values = [];
        
        exprs.forEach(function (expr) {
            values.push(expr.evaluate(ctx));
        });
        
        return lists.create(values);
    };
}

function ConstantExpression(value) {
    this.evaluate = function () { return value; };
}

function VariableExpression(name) {
    var variable = variables.variable(name);
    
    this.evaluate = function (ctx) { 
        var value = ctx.get(name);
        
        if (value === undefined)
            return variable;
        else
            return value;
    };
}

function ConcatenateExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx).toString() + right.evaluate(ctx).toString(); };
}

function LogicalNotExpression(expr) {
    this.evaluate = function (ctx) {
        var value = expr.evaluate(ctx);
        
        if (value === true)
            return false;
 
        if (value === false)
            return true;
            
        throw new Error("Value is not boolean");
    };
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
            
        
        if (lvalue !== true)
            throw new Error("Value is not boolean");
            
        var rvalue = right.evaluate(ctx);
        
        if (rvalue === false)
            return false;
        
        if (rvalue !== true)
            throw new Error("Value is not boolean");
        
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

function RemExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) % right.evaluate(ctx); };
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

function createLogicalNot(expr) {
    return new LogicalNotExpression(expr);
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

function createRem(left, right) {
    return new RemExpression(left, right);
}

function createConcat(left, right) {
    return new ConcatenateExpression(left, right);
}

function createTuple(exprs) {
    return new TupleExpression(exprs);
}

function createList(exprs) {
    return new ListExpression(exprs);
}

module.exports = {
    constant: createConstant,
    variable: createVariable,
    tuple: createTuple,
    list: createList,
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
    logicalNot: createLogicalNot,
    or: createOr,
    and: createAnd,
    not: createNot,
    rem: createRem,
    concat: createConcat
};

