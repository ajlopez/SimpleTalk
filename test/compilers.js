
const compilers = require('../lib/compilers');
const OpCodes = require('../lib/machines').OpCodes;

exports['create compiler as object'] = function (test) {
    const compiler = compilers.compiler();
    
    test.ok(compiler);
    test.equal(typeof compiler, 'object');
};

exports['compile argument'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileArgument('a');
    
    const arguments = compiler.arguments();
    
    test.ok(arguments);
    test.ok(Array.isArray(arguments));
    test.equal(arguments.length, 1);
    test.strictEqual(arguments[0], 'a');
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 2);
    test.equal(bytecodes[0], OpCodes.LoadArgument);
    test.equal(bytecodes[1], 0);
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

exports['compile integer constant twice'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileConstant(42);
    compiler.compileConstant(42);
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], 42);
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 4);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.LoadValue);
    test.equal(bytecodes[3], 0);
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

exports['compile send binary add operator'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileConstant(40);
    compiler.compileConstant(2);
    compiler.compileSend('+');
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 2);
    test.strictEqual(values[0], 40);
    test.strictEqual(values[1], 2);
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 5);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.LoadValue);
    test.equal(bytecodes[3], 1);
    test.equal(bytecodes[4], OpCodes.Add);
};

exports['compile send binary subtract operator'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileConstant(44);
    compiler.compileConstant(2);
    compiler.compileSend('-');
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 2);
    test.strictEqual(values[0], 44);
    test.strictEqual(values[1], 2);
    
    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 5);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.LoadValue);
    test.equal(bytecodes[3], 1);
    test.equal(bytecodes[4], OpCodes.Subtract);
};

exports['compile operators'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileSend('+');
    compiler.compileSend('-');
    compiler.compileSend('*');
    compiler.compileSend('/');

    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 4);
    test.equal(bytecodes[0], OpCodes.Add);
    test.equal(bytecodes[1], OpCodes.Subtract);
    test.equal(bytecodes[2], OpCodes.Multiply);
    test.equal(bytecodes[3], OpCodes.Divide);
};

exports['compile send unary selector'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileSend('do');
    
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], "do");

    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 5);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.Send);
    test.equal(bytecodes[3], 0);
    test.equal(bytecodes[4], 0);
};

exports['compile send selector with one argument'] = function (test) {
    const compiler = compilers.compiler();
    
    compiler.compileSend('do:');
    
    
    const values = compiler.values();
    
    test.ok(values);
    test.ok(Array.isArray(values));
    test.equal(values.length, 1);
    test.strictEqual(values[0], "do:");

    const bytecodes = compiler.bytecodes();
    
    test.ok(bytecodes);
    test.ok(Array.isArray(bytecodes));
    test.equal(bytecodes.length, 5);
    test.equal(bytecodes[0], OpCodes.LoadValue);
    test.equal(bytecodes[1], 0);
    test.equal(bytecodes[2], OpCodes.Send);
    test.equal(bytecodes[3], 0);
    test.equal(bytecodes[4], 1);
};
