
function ConstantExpression(value) {
    this.evaluate = function () { return value; }
}

function createConstant(value) {
    return new ConstantExpression(value);
}

module.exports = {
    constant: createConstant
};