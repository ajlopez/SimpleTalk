
const x = require('../lib/expressions');
const compilers = require('../lib/compilers');
const OpCodes = require('../lib/machines').OpCodes;

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

exports['create and compile send'] = function (test) {
    const expr = x.send(x.constant(40), '+', [ x.constant(2) ]);

    test.ok(expr);
    test.equal(typeof expr, 'object');
    
    const compiler = compilers.compiler();
    
    expr.compile(compiler);
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 2);
    test.strictEqual(values[0], 40);
    test.strictEqual(values[1], 2);

    const bytecodes = compiler.bytecodes();

    test.ok(bytecodes);
    test.equal(bytecodes.length, 5);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.LoadValue);
    test.equal(bytecodes[3], 1);
    test.equal(bytecodes[4], OpCodes.Add);
};

