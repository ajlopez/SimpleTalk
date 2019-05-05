
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['get name'] = function (test) {
    var lexer = lexers.lexer("a");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get two names'] = function (test) {
    var lexer = lexers.lexer("self class");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "self");
    test.equal(token.type, TokenType.Name);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "class");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get name and delimiter'] = function (test) {
    var lexer = lexers.lexer("name)");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "name");
    test.equal(token.type, TokenType.Name);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ")");
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get null when empty string'] = function (test) {
    var lexer = lexers.lexer("");
    
    test.equal(lexer.next(), null);
}

exports['get name with comments'] = function (test) {
    var lexer = lexers.lexer('"a comment" a "other comment"');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get null when null string'] = function (test) {
    var lexer = lexers.lexer(null);
    
    test.equal(lexer.next(), null);
}

exports['get name with spaces'] = function (test) {
    var lexer = lexers.lexer(" a  ");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get keyword'] = function (test) {
    var lexer = lexers.lexer("with:");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:");
    test.equal(token.type, TokenType.Keyword);
    
    test.equal(lexer.next(), null);
}

exports['get integer'] = function (test) {
    var lexer = lexers.lexer("123");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123");
    test.equal(token.type, TokenType.Integer);
    
    test.equal(lexer.next(), null);
}

exports['get integer and point'] = function (test) {
    var lexer = lexers.lexer("123.");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123");
    test.equal(token.type, TokenType.Integer);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ".");
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get symbol'] = function (test) {
    var lexer = lexers.lexer("#with:with:");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:with:");
    test.equal(token.type, TokenType.Symbol);
    
    test.equal(lexer.next(), null);
}

exports['get symbol and dot'] = function(test) {
	var lexer = lexers.lexer("#Point.");
	var token = lexer.next();

	test.notEqual(null, token);
    test.equal(token.type, TokenType.Symbol);
	test.equal("Point", token.value);

	token = lexer.next();

	test.notEqual(null, token);
	test.equal(token.type, TokenType.Delimiter);
	test.equal(".", token.value);

	test.equal(null, lexer.next());
}

exports['get keyword and name'] = function (test) {
    var lexer = lexers.lexer("with:a");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "with:");
    test.equal(token.type, TokenType.Keyword);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "a");
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}

exports['get punctuation marks'] = function (test) {
    var punctuations = "(),.|!{}[];";
    
    var lexer = lexers.lexer(punctuations);
    
    for (var k = 0; k < punctuations.length; k++) {    
        var token = lexer.next();
    
        test.ok(token);
        test.equal(token.value, punctuations[k]);
        test.equal(token.type, TokenType.Delimiter);
    }
}

exports['get begin dynamic array as punctuation'] = function (test) {
    var punctuations = "#(";
    
    var lexer = lexers.lexer(punctuations);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '#(');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}

exports['get return empty dynamic array'] = function (test) {
    var punctuations = "^#()";
    
    var lexer = lexers.lexer(punctuations);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '#(');
    test.equal(token.type, TokenType.Delimiter);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ')');
    test.equal(token.type, TokenType.Delimiter);
    
    test.equal(lexer.next(), null);
}
exports['get string'] = function (test) {
    var lexer = lexers.lexer("'foo'");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "foo");
    test.equal(token.type, TokenType.String);
    
    test.equal(lexer.next(), null);
}

exports['get unclosed string'] = function (test) {
    var lexer = lexers.lexer("'foo");
    
    test.throws(
        function() { lexer.next(); },
        function(err) {
            test.ok(err, 'unclosed string');
            return true;
        }
    );
}

exports['get string with quote'] = function(test) {
	var lexer = lexers.lexer("'foo\\''");
	var token = lexer.next();

	test.notEqual(token, null);
	test.equal(token.type, TokenType.String);
	test.equal(token.value, 'foo\'');

	test.equal(lexer.next(), null);
}

exports['get real'] = function (test) {
    var lexer = lexers.lexer("123.45");
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, "123.45");
    test.equal(token.type, TokenType.Real);
    
    test.equal(lexer.next(), null);
}

exports['get minus and name'] = function(test) {
	var lexer = lexers.lexer("-title");
	var token = lexer.next();

	test.notEqual(token, null);
	test.equal(token.type, TokenType.Operator);
	test.equal(token.value, '-');

	token = lexer.next();

	test.notEqual(token, null);
	test.equal(token.type, TokenType.Name);
	test.equal(token.value, 'title');

	test.equal(null, lexer.next());
}

exports['skip comment'] = function (test) {
    var lexer = lexers.lexer('"this is a comment"');
    
    test.equal(lexer.next(), null);
}

exports['skip multiline comment'] = function (test) {
    var lexer = lexers.lexer('"this is a\nmultiline\ncomment"');
    
    test.equal(lexer.next(), null);
}

exports['skip two comments'] = function (test) {
    var lexer = lexers.lexer('"this is a comment" "this is another comment"');
    
    test.equal(lexer.next(), null);
}

exports['get plus operator'] = function (test) {
    var lexer = lexers.lexer('+');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get number and plus operator'] = function (test) {
    var lexer = lexers.lexer('1+');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '1');
    test.equal(token.type, TokenType.Integer);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get name and plus operator'] = function (test) {
    var lexer = lexers.lexer('a+');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Name);
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '+');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get return operator'] = function (test) {
    var lexer = lexers.lexer('^');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get assignment operator'] = function (test) {
    var lexer = lexers.lexer(':=');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, ':=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get right arrow'] = function (test) {
    var lexer = lexers.lexer('->');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '->');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get less'] = function (test) {
    var lexer = lexers.lexer('<');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '<');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get less or equal operator'] = function (test) {
    var lexer = lexers.lexer('<=');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '<=');
    test.equal(token.type, TokenType.Operator);
    
    test.equal(lexer.next(), null);
}

exports['get character'] = function (test) {
    var lexer = lexers.lexer('$c');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'c');
    test.equal(token.type, TokenType.Character);
    
    test.equal(lexer.next(), null);
}

exports['get parameter'] = function (test) {
    var lexer = lexers.lexer(':a');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Parameter);
    
    test.equal(lexer.next(), null);
}

exports['get return name'] = function (test) {
    var lexer = lexers.lexer('^a');
    
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '^');
    test.equal(token.type, TokenType.Operator);
    
    token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'a');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
}


