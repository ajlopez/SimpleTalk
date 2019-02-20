
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
        else if (selector === '-')
            bytecodes.push(OpCodes.Subtract);
        else if (selector === '*')
            bytecodes.push(OpCodes.Multiply);
        else if (selector === '/')
            bytecodes.push(OpCodes.Divide);
        else {
            this.compileConstant(selector);
            var p = bytecodes[bytecodes.length - 1];
            bytecodes.push(OpCodes.Send);
            bytecodes.push(p);
            bytecodes.push(selectorArity(selector));
        }        
    }

    function selectorArity(selector) {
        var n = 0;

        for (var k = 0; k < selector.length; k++)
            if (selector[k] == ':')
                n++;

        return n;
    }
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
}

