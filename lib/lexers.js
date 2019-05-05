
const gelex = require('gelex');

const TokenType = { Name: 'name', String: 'string', Integer: 'integer', Real: 'real', Keyword: 'keyword', Symbol: 'symbol', Delimiter: 'delimiter', Operator: 'operator', Character: 'character', Parameter: 'parameter', Comment: 'comment' };

function CharacterRule(ch) {
    this.first = function () { return ch; };
    
    this.match = function (scanner) {
        if (scanner.peek() !== ch)
            return null;
        
        scanner.scan();
        
        return scanner.scan();
    };
}

const ldef = gelex.definition();

ldef.define('keyword', '[a-zA-Z_][a-zA-Z0-9_]*:');
ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('parameter', ':[a-zA-Z_][a-zA-Z0-9_]*', function (value) { return value.substring(1); });
ldef.define('real', '[0-9][0-9]*.[0-9][0-9]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', ':= -> <= >='.split(' '));
ldef.define('operator', "+-*/^<>".split(''));
ldef.define('character', new CharacterRule('$'));
ldef.define('delimiter', '#(');
ldef.define('delimiter', "(),.|![]{};".split(''));
ldef.define('symbol', '#[a-zA-Z_][a-zA-Z0-9_:]*', function (value) { return value.substring(1); });
ldef.defineText('string', "'", "'", { escape: '\\', escaped: {} });
ldef.defineComment('"', '"');

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}
