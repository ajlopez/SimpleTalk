
function ConstantExpression(value) {
    this.compile = function (compiler) {
        compiler.compileConstant(value);
    }
}

function createConstant(value) {
    return new ConstantExpression(value);
}

function SendExpression(targetexpr, selector, argexprs) {
    this.compile = function (compiler) {
        targetexpr.compile(compiler);

        for (let n = 0; n < argexprs.length; n++)
            argexprs[n].compile(compiler);

        compiler.compileSend(selector);
    }
}

function createSend(targetexpr, selector, argexprs) {
    return new SendExpression(targetexpr, selector, argexprs);
}

module.exports = {
    constant: createConstant,
    send: createSend
}
