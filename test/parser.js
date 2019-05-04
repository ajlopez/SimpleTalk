
const parser = require('../lib/parser');

const geast = require('geast');

exports['parse constant'] = function (test) {
    const result = parser.parse('integer', '42');
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 42 });
};

