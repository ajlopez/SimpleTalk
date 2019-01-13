
const machines = require('../lib/machines');

exports['create machine'] = function (test) {
    const machine = machines.machine();
    
    test.ok(machine);
    test.equal(typeof machine, 'object');
};