
const lexers = require('./lexers');

const gepars = require('gepars');
const geast = require('geast');

geast.node('nary', [ 'selector', 'target', 'arguments' ]);

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'expression0');
pdef.define('expression0', 'expression1');
// TODO cover 3ary and more, refactor
pdef.define('expression0', [ 'expression0', 'keyword:', 'expression1', 'keyword:', 'expression1', 'keyword:', 'expression1' ], function (values) { return geast.nary(values[1] + values[3] + values[5], values[0], [ values[2], values[4], values[6] ]); });
pdef.define('expression0', [ 'expression0', 'keyword:', 'expression1', 'keyword:', 'expression1' ], function (values) { return geast.nary(values[1] + values[3], values[0], [ values[2], values[4] ]); });
pdef.define('expression0', [ 'expression0', 'keyword:', 'expression1' ], function (values) { return geast.nary(values[1], values[0], [ values[2] ]); });
pdef.define('expression1', 'expression2');
pdef.define('expression1', [ 'expression1', 'binop', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'term');
pdef.define('expression2', [ 'expression2', 'name:' ], function (values) { return geast.unary(values[1], values[0]); });

pdef.define('binop', 'operator:+');
pdef.define('binop', 'operator:-');
pdef.define('binop', 'operator:*');
pdef.define('binop', 'operator:/');

// terms
pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

pdef.define('name', 'name:', function (value) { return geast.name(value); });

// constants
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('real', 'real:', function (value) { return geast.constant(parseFloat(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });

function parse(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);    
}

module.exports = {
    parse: parse
};

