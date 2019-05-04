
const lexers = require('./lexers');

const gepars = require('gepars');
const geast = require('geast');

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'term');

// terms
pdef.define('term', 'integer');

// constants
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });

function parse(type, text) {
    const lexer = lexers.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);    
}

module.exports = {
    parse: parse
};