
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

exports['parse name'] = function (test) {
    parse(test, 'name', 'foo', { ntype: 'name', name: 'foo' });
};

exports['parse arithmetic expressions'] = function (test) {
    parse(test, 'expression', '40+2', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '20*2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 20 }, right: { ntype: 'constant', value: 2 }}, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '80/2+2', { ntype: 'binary', operator: '+', left: { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 80 }, right: { ntype: 'constant', value: 2 }}, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '2+2*20', { ntype: 'binary', operator: '*', left: { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2 }, right: { ntype: 'constant', value: 2 }}, right: { ntype: 'constant', value: 20 }});
    parse(test, 'expression', '2+80/2', { ntype: 'binary', operator: '/', left: { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 2 }, right: { ntype: 'constant', value: 80 }}, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '44-2', { ntype: 'binary', operator: '-', left: { ntype: 'constant', value: 44 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '21*2', { ntype: 'binary', operator: '*', left: { ntype: 'constant', value: 21 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '84/2', { ntype: 'binary', operator: '/', left: { ntype: 'constant', value: 84 }, right: { ntype: 'constant', value: 2 }});
    parse(test, 'expression', '(40+2)', { ntype: 'binary', operator: '+', left: { ntype: 'constant', value: 40 }, right: { ntype: 'constant', value: 2 }});
};

