
var objects = require('./objects');

var OpCodes = {
    LoadValue: 1,
    Add: 2
};

function Machine(values) {
    const stack = [];
    
    this.execute = function (bytecodes) {
        var l = bytecodes.length;
        
        for (var ip = 0; ip < l; ip++) {
            var bc = bytecodes[ip];
            
            switch (bc) {
                case OpCodes.LoadValue:
                    stack.push(values[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.Add:
                    var operand1 = stack.pop().value();
                    var operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 + operand2));
                    
                    break;
            }
        }
    };
    
    this.stack = function () { return stack; };
}

function createMachine(values) {
    return new Machine(values);
}

module.exports = {
    machine: createMachine,
    OpCodes: OpCodes
};