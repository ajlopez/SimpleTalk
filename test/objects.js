
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
    test.deepEqual(klass.methods().value(), {});
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
    const values = [ 1, 4, 9 ];
    
    const block = objects.block(args, locals, bytecodes, values);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    
    test.deepEqual(block.argumentNames().value(), args);
    test.deepEqual(block.localVarNames().value(), locals);
    test.equal(block.bytecodes().value(), bytecodes);
    test.ok(block.class());
    test.equal(block.class().name(), 'Block');
    test.equal(block.class().class().name(), 'Block class');
    test.equal(block.class().instanceSize(), 4);

    test.ok(Array.isArray(block.values().value()));
    test.equal(block.values().value().length, values.length);
    
    for (let k = 0; k < values.length; k++)
        test.equal(block.values().value()[k].value(), values[k]);
};

exports['method object'] = function (test) {
    const klass = objects.class('Person', null, [ 'name', 'age' ], [ 'count' ]);
    const args = [ 'x', 'y' ];
    const locals = [ 'a', 'b' ];
    const bytecodes = [ 1, 2, 3 ];
    const values = [ 1, 4, 9 ];
    
    const method = objects.method(klass, args, locals, bytecodes, values);
    
    test.ok(method);
    test.equal(typeof method, 'object');
    
    test.equal(method.methodClass(), klass);
    test.deepEqual(method.argumentNames().value(), args);
    test.deepEqual(method.localVarNames().value(), locals);
    test.equal(method.bytecodes().value(), bytecodes);
    test.ok(method.class());
    test.equal(method.class().name(), 'Method');
    test.equal(method.class().class().name(), 'Method class');
    test.equal(method.class().instanceSize(), 5);

    test.ok(Array.isArray(method.values().value()));
    test.equal(method.values().value().length, values.length);
    
    for (let k = 0; k < values.length; k++)
        test.equal(method.values().value()[k].value(), values[k]);
};

exports['define instance method in class object'] = function (test) {
    const klass = objects.class('Person', null, [ 'name', 'age' ], [ 'count' ]);
    const args = [ 'x', 'y' ];
    const locals = [ 'a', 'b' ];
    const bytecodes = [ 1, 2, 3 ];
    
    const method = objects.method(klass, args, locals, bytecodes);

    klass.method('foo:with:with:', method);
    
    const result = klass.method('foo:with:with:');
    
    test.ok(result);

    test.equal(result.methodClass(), klass);
    test.deepEqual(result.argumentNames().value(), args);
    test.deepEqual(result.localVarNames().value(), locals);
    test.equal(result.bytecodes().value(), bytecodes);
    test.ok(result.class());
    test.equal(result.class().name(), 'Method');
    test.equal(result.class().class().name(), 'Method class');
    
    const methods = klass.methods().value();
    
    test.ok(methods['foo:with:with:']);
    test.equal(methods['foo:with:with:'], result);
};

exports['define class method in metaclass object'] = function (test) {
    const klass = objects.class('Person', null, [ 'name', 'age' ], [ 'count' ]);
    const args = [ 'x', 'y' ];
    const locals = [ 'a', 'b' ];
    const bytecodes = [ 1, 2, 3 ];
    const metaclass = klass.class();
    
    const method = objects.method(metaclass, args, locals, bytecodes);

    metaclass.method('foo:with:with:', method);
    
    const result = metaclass.method('foo:with:with:');
    
    test.ok(result);

    test.equal(result.methodClass(), metaclass);
    test.deepEqual(result.argumentNames().value(), args);
    test.deepEqual(result.localVarNames().value(), locals);
    test.equal(result.bytecodes().value(), bytecodes);
    test.ok(result.class());
    test.equal(result.class().name(), 'Method');
    test.equal(result.class().class().name(), 'Method class');
    
    const methods = metaclass.methods().value();
    
    test.ok(methods['foo:with:with:']);
    test.equal(methods['foo:with:with:'], result);
};

exports['instance method in superclass object'] = function (test) {
    const superclass = objects.class('Animal', null, [ 'age' ], [ 'count' ]);
    const klass = objects.class('Person', superclass, [ 'name' ], [ ]);

    const args = [ 'x', 'y' ];
    const locals = [ 'a', 'b' ];
    const bytecodes = [ 1, 2, 3 ];
    
    const method = objects.method(superclass, args, locals, bytecodes);

    superclass.method('foo:with:with:', method);
    
    const result = klass.method('foo:with:with:');
    
    test.ok(result);

    test.equal(result.methodClass(), superclass);
    test.deepEqual(result.argumentNames().value(), args);
    test.deepEqual(result.localVarNames().value(), locals);
    test.equal(result.bytecodes().value(), bytecodes);
    test.ok(result.class());
    test.equal(result.class().name(), 'Method');
    test.equal(result.class().class().name(), 'Method class');
    
    const methods = klass.methods().value();
    
    test.deepEqual(methods, {});
    
    const supermethods = superclass.methods().value();
    
    test.ok(supermethods['foo:with:with:']);
    test.equal(supermethods['foo:with:with:'], result);
};

