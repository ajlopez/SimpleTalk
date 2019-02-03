
const objects = require('./objects');

function Compiler() {
    const values = [];
    
    this.values = function () { return values; };
    
    this.compileConstant = function (value) {
        values.push(value);
    };
}

function createCompiler() {
    return new Compiler();
}

module.exports = {
    compiler: createCompiler
}

