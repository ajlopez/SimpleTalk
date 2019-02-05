
var compilers = require('../lib/compilers');
var OpCodes = require('../lib/machines').OpCodes;

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
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 2);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
};

exports['compile string constant'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileConstant("foo");
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], "foo");
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 2);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
};

