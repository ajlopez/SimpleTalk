
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

