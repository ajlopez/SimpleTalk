
const objects = require('./objects');
const OpCodes = require('./machines').OpCodes;

function Compiler() {
    const values = [];
    const bytecodes = [];
    const args = [];

    this.values = function () { return values; };

    this.arguments = function () { return args; };
    
    this.bytecodes = function () { return bytecodes; };
    
    this.compileConstant = function (value) {
        let p = values.indexOf(value);
        
        if (p < 0) {
            p = values.length;
            values.push(value);
        }
        
        bytecodes.push(OpCodes.LoadValue);
        bytecodes.push(p);
    };
    
    this.compileArgument = function (arg) {
        var p = args.indexOf(arg);
        
        if (p < 0) {
            p = args.length;
            args.push(arg);
        }
        
        bytecodes.push(OpCodes.LoadArgument);
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
            
            const p = bytecodes[bytecodes.length - 1];
            
            bytecodes.push(OpCodes.Send);
            bytecodes.push(p);
            bytecodes.push(selectorArity(selector));
        }        
    }

    function selectorArity(selector) {
        let n = 0;

        for (let k = 0; k < selector.length; k++)
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

