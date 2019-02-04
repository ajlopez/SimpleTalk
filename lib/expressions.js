
function ConstantExpression(value) {
    this.compile = function (compiler) {
        compiler.compileConstant(value);
    }
}

function createConstant(value) {
    return new ConstantExpression(value);
}

module.exports = {
    constant: createConstant
}
