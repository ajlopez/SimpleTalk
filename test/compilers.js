
var compilers = require('../lib/compilers');

exports['create compiler as object'] = function (test) {
    const compiler = compilers.compiler();
    
    test.ok(compiler);
    test.equal(typeof compiler, 'object');
};

exports['compile integer constant'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileConstant(42);
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], 42);
};

