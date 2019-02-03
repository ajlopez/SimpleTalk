
var compilers = require('../lib/compilers');

exports['create compiler as object'] = function (test) {
    const compiler = compilers.compiler();
    
    test.ok(compiler);
    test.equal(typeof compiler, 'object');
};