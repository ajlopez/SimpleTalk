
const objects = require('./objects');
const OpCodes = require('./machines').OpCodes;

function Compiler() {
    const values = [];
    const bytecodes = [];
    
    this.values = function () { return values; };
    
    this.bytecodes = function () { return bytecodes; };
    
    this.compileConstant = function (value) {
        var p = values.indexOf(value);
        
        if (p < 0) {
            p = values.length;
            values.push(value);
        }
        
        bytecodes.push(OpCodes.LoadValue);
        bytecodes.push(p);
    };
    
    this.compileSend = function (selector) {
        if (selector === '+')
            bytecodes.push(OpCodes.Add);
        
        if (selector === '-')
            bytecodes.push(OpCodes.Subtract);
        
        if (selector === '*')
            bytecodes.push(OpCodes.Multiply);
        
        if (selector === '/')
            bytecodes.push(OpCodes.Divide);
    }
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
}

