
var x = require('../lib/expressions');
var compilers = require('../lib/compilers');

exports['create and compile constant'] = function (test) {
    const expr = x.constant(42);
    
    test.ok(expr);
    test.equal(typeof expr, 'object');
    
    const compiler = compilers.compiler();
    
    expr.compile(compiler);
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], 42);    
};

