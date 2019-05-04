
const parser = require('../lib/parser');

const geast = require('geast');

exports['parse integer constant'] = function (test) {
    const result = parser.parse('integer', '42');
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 42 });
};

exports['parse string constant'] = function (test) {
    const result = parser.parse('string', "'foo'");
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 'foo' });
};

