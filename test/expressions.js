
const expressions = require('../lib/expressions');
const contexts = require('../lib/contexts');

exports['create and evaluate integer constant'] = function (test) {
    const result = expressions.constant(42);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate variable in context'] = function (test) {
    const result = expressions.variable("n");
    const ctx = contexts.context();
    
    ctx.set("n", 42);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(ctx), 42);
};

exports['evaluate undefined variable'] = function (test) {
    const expr = expressions.variable("n");
    const ctx = contexts.context();
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(result.isVariable());
    test.equal(result.name(), "n");
};

exports['create and evaluate add constants'] = function (test) {
    const result = expressions.add(expressions.constant(20), expressions.constant(22));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate multiply constants'] = function (test) {
    const result = expressions.multiply(expressions.constant(2), expressions.constant(21));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate divide constants'] = function (test) {
    const result = expressions.divide(expressions.constant(84), expressions.constant(2));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.evaluate(), 42);
};

exports['create and evaluate compare constants with less'] = function (test) {
    const result = expressions.less(expressions.constant(42), expressions.constant(43));
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.strictEqual(result.evaluate(), true);
};

exports['evaluate equal'] = function (test) {
    test.strictEqual(expressions.equal(expressions.constant(42), expressions.constant(43)).evaluate(), false);
    test.strictEqual(expressions.equal(expressions.constant(42), expressions.constant(42)).evaluate(), true);
    test.strictEqual(expressions.equal(expressions.constant(42), expressions.constant(40)).evaluate(), false);
};

exports['evaluate not equal'] = function (test) {
    test.strictEqual(expressions.notEqual(expressions.constant(42), expressions.constant(43)).evaluate(), true);
    test.strictEqual(expressions.notEqual(expressions.constant(42), expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.notEqual(expressions.constant(42), expressions.constant(40)).evaluate(), true);
};

exports['evaluate less than'] = function (test) {
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(43)).evaluate(), true);
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.less(expressions.constant(42), expressions.constant(40)).evaluate(), false);
};

exports['evaluate greater than'] = function (test) {
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(43)).evaluate(), false);
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.greater(expressions.constant(42), expressions.constant(40)).evaluate(), true);
};

exports['evaluate greater or equal than'] = function (test) {
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(43)).evaluate(), false);
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(42)).evaluate(), true);
    test.strictEqual(expressions.greaterEqual(expressions.constant(42), expressions.constant(40)).evaluate(), true);
};

exports['evaluate less or equal than'] = function (test) {
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(43)).evaluate(), true);
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(42)).evaluate(), true);
    test.strictEqual(expressions.lessEqual(expressions.constant(42), expressions.constant(40)).evaluate(), false);
};

exports['evaluate normal or'] = function (test) {
    test.strictEqual(expressions.or(expressions.constant(true), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.or(expressions.constant(null), expressions.constant(null)).evaluate(), null);
    test.strictEqual(expressions.or(expressions.constant(0), expressions.constant(false)).evaluate(), 0);
    test.strictEqual(expressions.or(expressions.constant(""), expressions.constant(false)).evaluate(), "");
    test.strictEqual(expressions.or(expressions.constant(null), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(0)).evaluate(), 0);
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant("")).evaluate(), "");
    test.strictEqual(expressions.or(expressions.constant(false), expressions.constant(null)).evaluate(), null);
};

exports['evaluate normal and'] = function (test) {
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(null), expressions.constant(null)).evaluate(), null);
    test.strictEqual(expressions.and(expressions.constant(0), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(0), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(""), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(""), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.and(expressions.constant(null), expressions.constant(false)).evaluate(), null);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(0)).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant(17)).evaluate(), 17);
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant("")).evaluate(), false);
    test.strictEqual(expressions.and(expressions.constant(true), expressions.constant("")).evaluate(), "");
    test.strictEqual(expressions.and(expressions.constant(false), expressions.constant(null)).evaluate(), false);
};

exports['evaluate normal not'] = function (test) {
    test.strictEqual(expressions.not(expressions.constant(true)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.not(expressions.constant(null)).evaluate(), true);
    test.strictEqual(expressions.not(expressions.constant(42)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant("")).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant(3.1415)).evaluate(), false);
    test.strictEqual(expressions.not(expressions.constant("foo")).evaluate(), false);
};

exports['evaluate logical or'] = function (test) {
    test.strictEqual(expressions.logicalOr(expressions.constant(true), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(true), expressions.constant(false)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(false), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalOr(expressions.constant(false), expressions.constant(false)).evaluate(), false);
};

exports['evaluate logical and'] = function (test) {
    test.strictEqual(expressions.logicalAnd(expressions.constant(true), expressions.constant(true)).evaluate(), true);
    test.strictEqual(expressions.logicalAnd(expressions.constant(true), expressions.constant(false)).evaluate(), false);
    test.strictEqual(expressions.logicalAnd(expressions.constant(false), expressions.constant(true)).evaluate(), false);
    test.strictEqual(expressions.logicalAnd(expressions.constant(false), expressions.constant(false)).evaluate(), false);
};

exports['logical or raise exception if first value is not boolean'] = function (test) {
    test.throws(
        function () {
            expressions.logicalOr(expressions.constant(1), expressions.constant(true)).evaluate();
        },
        "Value is not boolean"
    );
};

exports['logical or is short circuit'] = function (test) {
    test.ok(expressions.logicalOr(expressions.constant(true), expressions.constant(1)).evaluate());
};

exports['logical or raise exception if second value is not boolean'] = function (test) {
    test.throws(
        function () {
            expressions.logicalOr(expressions.constant(false), expressions.constant(1)).evaluate();
        },
        "Value is not boolean"
    );
};

exports['logical and raise exception if first value is not boolean'] = function (test) {
    test.throws(
        function () {
            expressions.logicalAnd(expressions.constant(1), expressions.constant(true)).evaluate();
        },
        "Value is not boolean"
    );
};

exports['logical and is short circuit'] = function (test) {
    test.ok(!expressions.logicalAnd(expressions.constant(false), expressions.constant(1)).evaluate());
};

exports['logical and raise exception if second value is not boolean'] = function (test) {
    test.throws(
        function () {
            expressions.logicalAnd(expressions.constant(true), expressions.constant(1)).evaluate();
        },
        "Value is not boolean"
    );
};

exports['evaluate logical not'] = function (test) {
    test.strictEqual(expressions.logicalNot(expressions.constant(true)).evaluate(), false);
    test.strictEqual(expressions.logicalNot(expressions.constant(false)).evaluate(), true);
};

exports['logical not raise exception if value is not boolean'] = function (test) {
    test.throws(
        function () {
            expressions.logicalNot(expressions.constant(1)).evaluate();
        },
        "Value is not boolean"
    );
};

exports['evaluate rem with positive integers'] = function (test) {
    test.strictEqual(expressions.rem(expressions.constant(3), expressions.constant(2)).evaluate(), 1);
    test.strictEqual(expressions.rem(expressions.constant(4), expressions.constant(2)).evaluate(), 0);
    test.strictEqual(expressions.rem(expressions.constant(5), expressions.constant(3)).evaluate(), 2);
};

exports['evaluate rem with negative integers'] = function (test) {
    test.strictEqual(expressions.rem(expressions.constant(-3), expressions.constant(2)).evaluate(), -1);
    test.strictEqual(expressions.rem(expressions.constant(-3), expressions.constant(-2)).evaluate(), -1);
    test.strictEqual(expressions.rem(expressions.constant(-3), expressions.constant(3)).evaluate(), 0);
    test.strictEqual(expressions.rem(expressions.constant(-3), expressions.constant(-3)).evaluate(), 0);
};

exports['evaluate div with positive integers'] = function (test) {
    test.strictEqual(expressions.div(expressions.constant(3), expressions.constant(2)).evaluate(), 1);
    test.strictEqual(expressions.div(expressions.constant(4), expressions.constant(2)).evaluate(), 2);
    test.strictEqual(expressions.div(expressions.constant(5), expressions.constant(3)).evaluate(), 1);
};

exports['evaluate div with negative integers'] = function (test) {
    test.strictEqual(expressions.div(expressions.constant(-3), expressions.constant(2)).evaluate(), -1);
    test.strictEqual(expressions.div(expressions.constant(-3), expressions.constant(-2)).evaluate(), 1);
    test.strictEqual(expressions.div(expressions.constant(-3), expressions.constant(3)).evaluate(), -1);
    test.strictEqual(expressions.div(expressions.constant(-3), expressions.constant(-3)).evaluate(), 1);
};

exports['evaluate string concatenation'] = function (test) {
    test.strictEqual(expressions.concat(expressions.constant("foo"), expressions.constant("bar")).evaluate(), "foobar");
};

exports['evaluate tuple expression'] = function (test) {
    const expr = expressions.tuple([expressions.constant(1), expressions.constant(2), expressions.constant(3)]);
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isTuple());
    test.equal(result.size(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
};

exports['evaluate tuple expression with variable'] = function (test) {
    const expr = expressions.tuple([expressions.constant(1), expressions.variable('a'), expressions.constant(3)]);
    const ctx = contexts.context();
    
    ctx.set('a', 42);
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.ok(result.isTuple());
    test.equal(result.size(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 42);
    test.equal(result.get(2), 3);
};

exports['evaluate cons expression'] = function (test) {
    const expr = expressions.cons(expressions.constant(1), expressions.cons(expressions.constant(2), expressions.list([expressions.constant(3)])));
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
};

exports['evaluate list expression'] = function (test) {
    const expr = expressions.list([expressions.constant(1), expressions.constant(2), expressions.constant(3)]);
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 2);
    test.equal(result.get(2), 3);
};

exports['evaluate append lists expression'] = function (test) {
    const lexpr1 = expressions.list([expressions.constant(1), expressions.constant(2), expressions.constant(3)])
    const lexpr2 = expressions.list([expressions.constant(4), expressions.constant(5)])
    const expr = expressions.append(lexpr1, lexpr2);
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 5);
    test.deepEqual(result.toArray(), [1, 2, 3, 4, 5]);
};

exports['evaluate subtract lists expression'] = function (test) {
    const lexpr1 = expressions.list([expressions.constant(1), expressions.constant(2), expressions.constant(3)])
    const lexpr2 = expressions.list([expressions.constant(2), expressions.constant(5)])
    const expr = expressions.subtractList(lexpr1, lexpr2);
    
    const result = expr.evaluate(null);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 2);
    test.deepEqual(result.toArray(), [1, 3]);
};

exports['evaluate list expression with variable'] = function (test) {
    const expr = expressions.list([expressions.constant(1), expressions.variable('a'), expressions.constant(3)]);
    const ctx = contexts.context();
    
    ctx.set('a', 42);
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.ok(result.isList());
    test.equal(result.length(), 3);
    test.equal(result.get(0), 1);
    test.equal(result.get(1), 42);
    test.equal(result.get(2), 3);
};

exports['evaluate call expression'] = function (test) {
    function add(x, y) { return x + y };
    const ctx = contexts.context();
    
    ctx.set('add', add);
    
    const expr = expressions.call(expressions.variable('add'), [expressions.constant(2), expressions.constant(3)]);
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(result, 5);
}

exports['evaluate dot expression'] = function (test) {
    const obj = { name: 'Adam' };
    const ctx = contexts.context();
    
    ctx.set('adam', obj);
    
    const expr = expressions.dot(expressions.variable('adam'), 'name');
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(result, 'Adam');
}

exports['evaluate def expression'] = function (test) {
    const ctx = contexts.context();
    const expr = expressions.def('foo', ["a"], [expressions.variable("a")]);
    
    const fn = expr.evaluate(ctx);
    
    test.ok(fn);
    test.equal(fn, ctx.get('foo'));
    test.equal(fn.evaluate([42]), 42);
}

exports['evaluate def expression using def context'] = function (test) {
    const ctx = contexts.context();
    ctx.set('a', 42);
    const expr = expressions.def('foo', [], [expressions.variable("a")]);
    
    const fn = expr.evaluate(ctx);
    
    test.ok(fn);
    test.equal(fn, ctx.get('foo'));
    
    test.equal(fn.evaluate([42]), 42);
}

exports['evaluate if expression with true condition'] = function (test) {
    const ctx = contexts.context();
    ctx.set('a', 42);
    const expr = expressions.if(expressions.constant(true), expressions.constant(1));
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(result, 1);
}

exports['evaluate if expression with false condition with no else expression'] = function (test) {
    const ctx = contexts.context();
    ctx.set('a', 42);
    const expr = expressions.if(expressions.constant(false), expressions.constant(1));
    
    const result = expr.evaluate(ctx);
    
    test.equal(result, null);
}

exports['evaluate if expression with false condition with else expression'] = function (test) {
    const ctx = contexts.context();
    ctx.set('a', 42);
    const expr = expressions.if(expressions.constant(false), expressions.constant(1), expressions.constant(2));
    
    const result = expr.evaluate(ctx);
    
    test.ok(result);
    test.equal(result, 2);
}
