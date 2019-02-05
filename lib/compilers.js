
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
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
}

