
const machines = require('../lib/machines');
const OpCodes = machines.OpCodes;
const objects = require('../lib/objects');

exports['create machine'] = function (test) {
    const machine = machines.machine();
    
    test.ok(machine);
    test.equal(typeof machine, 'object');
};

exports['load argument'] = function (test) {    
    const answer = objects.value(42);
    const machine = machines.machine([ ]);
    
    machine.execute([ OpCodes.LoadArgument, 0 ], [ answer ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 42);
};

exports['add two values'] = function (test) {
    const one = objects.value(1);
    const two = objects.value(2);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Add ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 3);
};

exports['subtract two values'] = function (test) {
    const one = objects.value(1);
    const two = objects.value(2);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Subtract ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 1);
};

exports['multiply two values'] = function (test) {
    const one = objects.value(2);
    const two = objects.value(21);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Multiply ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 42);
};

exports['divide two values'] = function (test) {
    const one = objects.value(2);
    const two = objects.value(84);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Divide ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 42);
};

exports['self'] = function (test) {
    const obj = objects.object();
    const machine = machines.machine([ ], obj);
    
    machine.execute([ OpCodes.Self ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.strictEqual(stack[0], obj);
};

exports['load instance variable'] = function (test) {
    const obj = objects.object();
    obj.put(0, objects.value(42));
    
    const machine = machines.machine([ ], obj);
    
    machine.execute([ OpCodes.LoadInstanceVariable, 0 ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.strictEqual(stack[0].value(), 42);
};

exports['store instance variable'] = function (test) {
    const one = objects.value(1);
    const two = objects.value(2);
    
    const obj = objects.object();
    
    const machine = machines.machine([ one, two ], obj);
    
    machine.execute([ OpCodes.LoadValue, 1, OpCodes.StoreInstanceVariable, 0 ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 0);
    test.strictEqual(obj.get(0).value(), 2);
};

exports['store and load local variable'] = function (test) {
    const one = objects.value(1);
    const two = objects.value(2);
    
    const obj = objects.object();
    
    const machine = machines.machine([ one, two ], obj);
    
    machine.execute([ OpCodes.LoadValue, 1, OpCodes.StoreLocalVariable, 0, OpCodes.LoadLocalVariable, 0 ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.strictEqual(stack.pop().value(), 2);
};

exports['return value'] = function (test) {
    const one = objects.value(1);
    const two = objects.value(2);
    
    const obj = objects.object();
    
    const machine = machines.machine([ one, two ], obj);
    
    machine.execute([ OpCodes.LoadValue, 1, OpCodes.Return, OpCodes.LoadLocalVariable, 0 ]);
    
    const stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 0);
    
    test.strictEqual(machine.returnValue().value(), 2);
};

