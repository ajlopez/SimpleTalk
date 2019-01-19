
const objects = require('../lib/objects');

exports['create empty object'] = function (test) {
    const object = objects.object();
    
    test.ok(object);
    test.equal(typeof object, 'object');
    
    test.equal(object.get(0), null);
};

exports['object class'] = function (test) {
    const object = objects.object();
    
    test.ok(object.class());
    test.equal(object.class().name(), 'Object');
    test.equal(object.class().class().name(), 'Object class');
    test.equal(object.class().class().class().name(), 'Metaclass');
    test.strictEqual(object.class().indexed(), false);
};

exports['put and get value'] = function (test) {
    const object = objects.object();
    
    object.put(0, 42);
    test.equal(object.get(0), 42);
};

exports['value object'] = function (test) {
    const value = objects.value(42);
    
    test.ok(value);
    test.equal(typeof value, 'object');
    test.equal(value.value(), 42);
};

exports['class object'] = function (test) {
    const klass = objects.class('Person', null, [ 'name', 'age' ], [ 'count' ]);
    
    test.ok(klass);
    test.equal(typeof klass, 'object');
    
    test.equal(klass.name(), 'Person');
    test.equal(klass.class().name(), 'Person class');
    test.equal(klass.class().class().name(), 'Metaclass');
    test.equal(klass.superclass(), null);
    test.equal(klass.instanceSize(), 2);
    test.deepEqual(klass.instanceVarNames().value(), [ 'name', 'age' ]);
    test.deepEqual(klass.classVarNames().value(), [ 'count' ]);
    test.deepEqual(klass.class().instanceVarNames().value(), [ 'count' ]);
};

exports['class with superclass object'] = function (test) {
    const superklass = objects.class('Animal', null, [ 'age' ], [ 'count' ]);
    const klass = objects.class('Person', superklass, [ 'name' ], [ ]);
    
    test.ok(klass);
    test.equal(typeof klass, 'object');
    
    test.equal(klass.name(), 'Person');
    test.equal(klass.class().name(), 'Person class');
    test.equal(klass.class().class().name(), 'Metaclass');
    test.equal(klass.superclass(), superklass);
    test.equal(klass.instanceSize(), 2);

    test.deepEqual(klass.instanceVarNames().value(), [ 'name' ]);
    test.deepEqual(klass.classVarNames().value(), [ ]);
    test.deepEqual(klass.class().instanceVarNames().value(), [ ]);

    test.deepEqual(superklass.instanceVarNames().value(), [ 'age' ]);
    test.deepEqual(superklass.classVarNames().value(), [ 'count' ]);
    test.deepEqual(superklass.class().instanceVarNames().value(), [ 'count' ]);
    
    test.equal(klass.class().superclass(), superklass.class());
};

exports['new instance'] = function (test) {
    const klass = objects.class('Person', null, [ 'name', 'age' ], []);
    
    const instance = klass.newInstance();
    
    test.ok(instance);
    test.equal(typeof instance, 'object');
    test.equal(instance.class(), klass);
    test.equal(instance.class().name(), 'Person');
    test.equal(instance.class().class().name(), 'Person class');
};

exports['block object'] = function (test) {
    const args = [ 'x', 'y' ];
    const locals = [ 'a', 'b' ];
    const bytecodes = [ 1, 2, 3 ];
    
    const block = objects.block(args, locals, bytecodes);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    
    test.deepEqual(block.argumentNames().value(), args);
    test.deepEqual(block.localVarNames().value(), locals);
    test.equal(block.bytecodes().value(), bytecodes);
    test.ok(block.class());
    test.equal(block.class().name(), 'Block');
    test.equal(block.class().class().name(), 'Block class');
};

