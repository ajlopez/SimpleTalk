
const machines = require('../lib/machines');
const OpCodes = machines.OpCodes;
const objects = require('../lib/objects');

exports['create machine'] = function (test) {
    const machine = machines.machine();
    
    test.ok(machine);
    test.equal(typeof machine, 'object');
};

exports['add two values'] = function (test) {
    var one = objects.value(1);
    var two = objects.value(2);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Add ]);
    
    var stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 3);
};

exports['subtract two values'] = function (test) {
    var one = objects.value(1);
    var two = objects.value(2);
    
    const machine = machines.machine([ one, two ]);
    
    machine.execute([ OpCodes.LoadValue, 0, OpCodes.LoadValue, 1, OpCodes.Subtract ]);
    
    var stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.equal(stack[0].value(), 1);
};

exports['self'] = function (test) {
    const obj = objects.object();
    const machine = machines.machine([ ], obj);
    
    machine.execute([ OpCodes.Self ]);
    
    var stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.strictEqual(stack[0], obj);
};

exports['load instance variable'] = function (test) {
    const obj = objects.object();
    obj.put(0, objects.value(42));
    
    const machine = machines.machine([ ], obj);
    
    machine.execute([ OpCodes.LoadVariable, 0 ]);
    
    var stack = machine.stack();
    
    test.ok(stack);
    test.ok(Array.isArray(stack));
    test.equal(stack.length, 1);
    test.strictEqual(stack[0].value(), 42);
};

