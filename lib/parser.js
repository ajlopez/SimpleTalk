
const lexers = require('./lexers');

const gepars = require('gepars');
const geast = require('geast');

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'term');

// terms
pdef.define('term', 'integer');
pdef.define('term', 'real');
pdef.define('term', 'string');

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