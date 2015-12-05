
'use strict';

var variables = require('./variables');
var tuples = require('./tuples');
var lists = require('./lists');
var matches = require('./matches');

function DotExpression(expr, name) {
    this.evaluate = function (ctx) {
        var obj = expr.evaluate(ctx);
        
        return obj[name];
    }
}

function CallExpression(expr, argexprs) {
    this.evaluate = function (ctx) {
        var args = [];
        var fn = expr.evaluate(ctx);
        
        argexprs.forEach(function (argexpr) {
            args.push(argexpr.evaluate(ctx));
        });
        
        return fn.apply(null, args);
    }
}

function AppendExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        var rvalue = right.evaluate(ctx);
        
        return lvalue.append(rvalue);
    };
}

function SubtractListsExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        var rvalue = right.evaluate(ctx);
        
        return lvalue.subtract(rvalue);
    };
}

function MatchExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        var rvalue = right.evaluate(ctx);
        
        return matches.match(lvalue, rvalue, ctx);
    };
}

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
            return lvalue;
            
        var rvalue = right.evaluate(ctx);
        
        return rvalue;
    };
}

function AndExpression(left, right) {
    this.evaluate = function (ctx) {
        var lvalue = left.evaluate(ctx);
        
        if (lvalue == null || lvalue === false)
            return lvalue;
            
        var rvalue = right.evaluate(ctx);
        
        return rvalue;
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

function DivExpression(left, right) {
    this.evaluate = function (ctx) { 
        var value = left.evaluate(ctx) / right.evaluate(ctx); 
        
        if (value < 0)
            return Math.ceil(value);
        else
            return Math.floor(value);
    };
}

function EqualExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) == right.evaluate(ctx); };
}

function NotEqualExpression(left, right) {
    this.evaluate = function (ctx) { return left.evaluate(ctx) != right.evaluate(ctx); };
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

function createEqual(left, right) {
    return new EqualExpression(left, right);
}

function createNotEqual(left, right) {
    return new NotEqualExpression(left, right);
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

function createDiv(left, right) {
    return new DivExpression(left, right);
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

function createMatch(lexpr, rexpr) {
    return new MatchExpression(lexpr, rexpr);
}

function createAppend(lexpr, rexpr) {
    return new AppendExpression(lexpr, rexpr);
}

function createSubtractLists(lexpr, rexpr) {
    return new SubtractListsExpression(lexpr, rexpr);
}

function createCall(expr, argexprs) {
    return new CallExpression(expr, argexprs);
}

function createDot(expr, name) {
    return new DotExpression(expr,name);
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
    equal: createEqual,
    notEqual: createNotEqual,
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
    div: createDiv,
    concat: createConcat,
    match: createMatch,
    append: createAppend,
    subtractl: createSubtractLists,
    call: createCall,
    dot: createDot
};

