
var objects = require('./objects');

var OpCodes = {
    Self: 0,
    LoadValue: 1,
    LoadArgument: 2,
    LoadVariable: 3,
    StoreVariable: 4,
    Add: 5,
    Subtract: 6,
    Multiply: 7
};

function Machine(values, self) {
    const stack = [];
    
    this.execute = function (bytecodes, args) {
        var l = bytecodes.length;
        
        for (var ip = 0; ip < l; ip++) {
            var bc = bytecodes[ip];
            
            switch (bc) {
                case OpCodes.LoadValue:
                    stack.push(values[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.LoadArgument:
                    stack.push(args[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.LoadVariable:
                    stack.push(self.get(bytecodes[++ip]));
                    
                    break;
                    
                case OpCodes.StoreVariable:
                    self.put(bytecodes[++ip], stack.pop());
                    
                    break;
                    
                case OpCodes.Add:
                    var operand1 = stack.pop().value();
                    var operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 + operand2));
                    
                    break;
                    
                case OpCodes.Subtract:
                    var operand1 = stack.pop().value();
                    var operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 - operand2));
                    
                    break;
                    
                case OpCodes.Multiply:
                    var operand1 = stack.pop().value();
                    var operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 * operand2));
                    
                    break;
                    
                case OpCodes.Self:
                    stack.push(self);
                    
                    break;
            }
        }
    };
    
    this.stack = function () { return stack; };
}

function createMachine(values, self) {
    return new Machine(values, self);
}

module.exports = {
    machine: createMachine,
    OpCodes: OpCodes
};