
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['get name'] = function (test) {
    const lexer = lexers.lexer("a");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get two names'] = function (test) {
    const lexer = lexers.lexer("self class");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "self");
    test.equal(token.type, TokenType.Name);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, "class");
    test.equal(token2.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get name and delimiter'] = function (test) {
    const lexer = lexers.lexer("name)");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "name");
    test.equal(token.type, TokenType.Name);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ")");
    test.equal(token2.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get null when empty string'] = function (test) {
    const lexer = lexers.lexer("");
    
    test.equal(lexer.next(), null);
}

exports['get name with comments'] = function (test) {
    const lexer = lexers.lexer('"a comment" a "other comment"');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get null when null string'] = function (test) {
    const lexer = lexers.lexer(null);
    
    test.equal(lexer.next(), null);
}

exports['get name with spaces'] = function (test) {
    const lexer = lexers.lexer(" a  ");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get keyword'] = function (test) {
    const lexer = lexers.lexer("with:");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:");
    test.equal(token.type, TokenType.Keyword);
    
    test.equal(lexer.next(), null);
}

exports['get integer'] = function (test) {
    const lexer = lexers.lexer("123");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123");
    test.equal(token.type, TokenType.Integer);
    
    test.equal(lexer.next(), null);
}

exports['get integer and point'] = function (test) {
    const lexer = lexers.lexer("123.");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123");
    test.equal(token.type, TokenType.Integer);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, ".");
    test.equal(token2.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get symbol'] = function (test) {
    const lexer = lexers.lexer("#with:with:");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:with:");
    test.equal(token.type, TokenType.Symbol);
    
    test.equal(lexer.next(), null);
}

exports['get symbol and dot'] = function(test) {
	const lexer = lexers.lexer("#Point.");
	const token = lexer.next();

	test.notEqual(null, token);
    test.equal(token.type, TokenType.Symbol);
	test.equal("Point", token.value);

	const token2 = lexer.next();

	test.notEqual(null, token2);
	test.equal(token2.type, TokenType.Delimiter);
	test.equal(".", token2.value);

	test.equal(null, lexer.next());
}

exports['get keyword and name'] = function (test) {
    const lexer = lexers.lexer("with:a");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:");
    test.equal(token.type, TokenType.Keyword);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, "a");
    test.equal(token2.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get punctuation marks'] = function (test) {
    const punctuations = "(),.|!{}[];";
    
    const lexer = lexers.lexer(punctuations);
    
    for (let k = 0; k < punctuations.length; k++) {    
        const token = lexer.next();
    
        test.ok(token);
        test.equal(token.value, punctuations[k]);
        test.equal(token.type, TokenType.Delimiter);
    }
}

exports['get begin dynamic array as punctuation'] = function (test) {
    const punctuations = "#(";
    
    const lexer = lexers.lexer(punctuations);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '#(');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get return empty dynamic array'] = function (test) {
    const punctuations = "^#()";
    
    const lexer = lexers.lexer(punctuations);
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, '#(');
    test.equal(token2.type, TokenType.Delimiter);
    
    const token3 = lexer.next();
    
    test.ok(token3);
    test.equal(token3.value, ')');
    test.equal(token3.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get string'] = function (test) {
    const lexer = lexers.lexer("'foo'");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "foo");
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.next(), null);
}

exports['get unclosed string'] = function (test) {
    const lexer = lexers.lexer("'foo");
    
    test.throws(
        function() { lexer.next(); },
        function(err) {
            test.ok(err, 'unclosed string');
            return true;
        }
    );
}

exports['get string with quote'] = function(test) {
	const lexer = lexers.lexer("'foo\\''");
	const token = lexer.next();

	test.notEqual(token, null);
	test.equal(token.type, TokenType.String);
	test.equal(token.value, 'foo\'');

	test.equal(lexer.next(), null);
}

exports['get real'] = function (test) {
    const lexer = lexers.lexer("123.45");
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123.45");
    test.equal(token.type, TokenType.Real);
    
    test.equal(lexer.next(), null);
}

exports['get minus and name'] = function(test) {
	const lexer = lexers.lexer("-title");
	const token = lexer.next();

	test.notEqual(token, null);
	test.equal(token.type, TokenType.Operator);
	test.equal(token.value, '-');

	const token2 = lexer.next();

	test.notEqual(token2, null);
	test.equal(token2.type, TokenType.Name);
	test.equal(token2.value, 'title');

	test.equal(null, lexer.next());
}

exports['skip comment'] = function (test) {
    const lexer = lexers.lexer('"this is a comment"');
    
    test.equal(lexer.next(), null);
}

exports['skip multiline comment'] = function (test) {
    const lexer = lexers.lexer('"this is a\nmultiline\ncomment"');
    
    test.equal(lexer.next(), null);
}

exports['skip two comments'] = function (test) {
    const lexer = lexers.lexer('"this is a comment" "this is another comment"');
    
    test.equal(lexer.next(), null);
}

exports['get plus operator'] = function (test) {
    const lexer = lexers.lexer('+');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get number and plus operator'] = function (test) {
    const lexer = lexers.lexer('1+');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '1');
    test.equal(token.type, TokenType.Integer);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, '+');
    test.equal(token2.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get name and plus operator'] = function (test) {
    const lexer = lexers.lexer('a+');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Name);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, '+');
    test.equal(token2.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get return operator'] = function (test) {
    const lexer = lexers.lexer('^');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get assignment operator'] = function (test) {
    const lexer = lexers.lexer(':=');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ':=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get right arrow'] = function (test) {
    const lexer = lexers.lexer('->');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '->');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get less'] = function (test) {
    const lexer = lexers.lexer('<');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '<');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get less or equal operator'] = function (test) {
    const lexer = lexers.lexer('<=');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '<=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get character'] = function (test) {
    const lexer = lexers.lexer('$c');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'c');
    test.equal(token.type, TokenType.Character);
    
    test.equal(lexer.next(), null);
}

exports['get parameter'] = function (test) {
    const lexer = lexers.lexer(':a');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Parameter);
    
    test.equal(lexer.next(), null);
}

exports['get return name'] = function (test) {
    const lexer = lexers.lexer('^a');
    
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    const token2 = lexer.next();
    
    test.ok(token2);
    test.equal(token2.value, 'a');
    test.equal(token2.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}


