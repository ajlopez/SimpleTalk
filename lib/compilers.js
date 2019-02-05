
const objects = require('./objects');
const OpCodes = require('./machines').OpCodes;

function Compiler() {
    const values = [];
    const bytecodes = [];
    
    this.values = function () { return values; };
    
    this.bytecodes = function () { return bytecodes; };
    
    this.compileConstant = function (value) {
        values.push(value);
        bytecodes.push(OpCodes.LoadValue);
        bytecodes.push(values.length - 1);
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
}

