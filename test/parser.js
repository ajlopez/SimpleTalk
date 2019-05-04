
const parser = require('../lib/parser');

const geast = require('geast');

function parse(test, type, text, expected) {
    test.deepEqual(geast.toObject(parser.parse(type, text)), expected);
}

exports['parse integer constant'] = function (test) {
    const result = parser.parse('integer', '42');
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 42 });
};

exports['parse real constant'] = function (test) {
    const result = parser.parse('real', '3.14159');
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 3.14159 });
};

exports['parse string constant'] = function (test) {
    const result = parser.parse('string', "'foo'");
    
    test.ok(result);
    test.deepEqual(geast.toObject(result), { ntype: 'constant', value: 'foo' });
};

exports['parse constants as terms'] = function (test) {
    parse(test, 'term', '42', { ntype: 'constant', value: 42 });
    parse(test, 'term', '3.14159', { ntype: 'constant', value: 3.14159 });    
    parse(test, 'term', "'foo'", { ntype: 'constant', value: 'foo' });    
};

exports['parse constants as expressions'] = function (test) {
    parse(test, 'expression', '42', { ntype: 'constant', value: 42 });
    parse(test, 'expression', '3.14159', { ntype: 'constant', value: 3.14159 });    
    parse(test, 'expression', "'foo'", { ntype: 'constant', value: 'foo' });    
};

