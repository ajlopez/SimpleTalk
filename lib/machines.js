
const objects = require('./objects');

const OpCodes = {
    Self: 0,
    LoadValue: 1,
    LoadArgument: 2,
    LoadLocalVariable: 3,
    StoreLocalVariable: 4,
    LoadInstanceVariable: 5,
    StoreInstanceVariable: 6,
    Add: 16,
    Subtract: 17,
    Multiply: 18,
    Divide: 19,
    Return: 32,
    Send: 64
};

function Machine(values, self) {
    const stack = [];
    let returnValue;
    
    this.execute = function (bytecodes, args) {
        const locals = [];
        const l = bytecodes.length;
        let operand1;
        let operand2;
                    
        for (let ip = 0; ip < l; ip++) {
            const bc = bytecodes[ip];
            switch (bc) {
                case OpCodes.LoadValue:
                    stack.push(values[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.LoadArgument:
                    stack.push(args[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.LoadLocalVariable:
                    stack.push(locals[bytecodes[++ip]]);
                    
                    break;
                    
                case OpCodes.StoreLocalVariable:
                    locals[bytecodes[++ip]] = stack.pop();
                    
                    break;
                    
                case OpCodes.LoadInstanceVariable:
                    stack.push(self.get(bytecodes[++ip]));
                    
                    break;
                    
                case OpCodes.StoreInstanceVariable:
                    self.put(bytecodes[++ip], stack.pop());
                    
                    break;
                    
                case OpCodes.Add:
                    operand1 = stack.pop().value();
                    operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 + operand2));
                    
                    break;
                    
                case OpCodes.Subtract:
                    operand1 = stack.pop().value();
                    operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 - operand2));
                    
                    break;
                    
                case OpCodes.Multiply:
                    operand1 = stack.pop().value();
                    operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 * operand2));
                    
                    break;
                    
                case OpCodes.Divide:
                    operand1 = stack.pop().value();
                    operand2 = stack.pop().value();
                    
                    stack.push(objects.value(operand1 / operand2));
                    
                    break;
                    
                case OpCodes.Self:
                    stack.push(self);
                    
                    break;
                    
                case OpCodes.Return:
                    returnValue = stack.pop();
                    
                    return;
            }
        }
    };
    
    this.stack = function () { return stack; };
    
    this.returnValue = function () { return returnValue; };
}

function createMachine(values, self) {
    return new Machine(values, self);
}

module.exports = {
    machine: createMachine,
    OpCodes: OpCodes
};

