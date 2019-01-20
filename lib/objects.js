
var initialized = false;

function BaseObject() {
    var klass;
    var values = [];
    
    this.get = function (n) { return values[n]; };
    this.put = function (n, v) { values[n] = v; };
    
    this.class = function (value) {
        if (value)
            klass = value;
        else
            return klass;
    }
}

function createObject() {
    var object = new BaseObject();
    
    object.class(ObjectClass);
        
    return object;
}

function ClassObject(name, superclass, instanceVarNames, classVarNames, indexed) {
    BaseObject.call(this);

    if (classVarNames)
        this.class(createClassObject(name + ' class', superclass ? superclass.class() : null, classVarNames, null, false));
    else if (initialized)
        this.class(MetaclassClass);
    
    this.put(0, name);
    this.put(1, superclass);
    this.put(2, createValueObject(instanceVarNames));
    this.put(3, indexed ? true : false);
    this.put(4, createValueObject({}));
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

ClassObject.prototype = Object.create(BaseObject.prototype);
ClassObject.prototype.constructor = BaseObject;
ClassObject.prototype.name = function () { return this.get(0); };
ClassObject.prototype.superclass = function () { return this.get(1); };
ClassObject.prototype.instanceSize = function () { return (this.superclass() ? this.superclass().instanceSize() : 0) + this.get(2).value().length; };
ClassObject.prototype.instanceVarNames = function () { return this.get(2); };
ClassObject.prototype.classVarNames = function () { return this.class().instanceVarNames(); };
ClassObject.prototype.indexed = function () { return this.get(3); };
ClassObject.prototype.methods = function () { return this.get(4); };

ClassObject.prototype.method = function (name, method) {
    const methods = this.methods().value();
    
    if (method)
        methods[name] = method;
    else
        return methods[name];
}

ClassObject.prototype.newInstance = function () {
    var instance = new BaseObject();
    
    instance.class(this);
    
    return instance;
}

const ObjectClass = new ClassObject('Object', null, [], [], false);
const MetaclassClass = new ClassObject('Metaclass', null, [ 'name', 'superclass', 'instanceVarNames', 'indexed' ], [], false);

ObjectClass.class().class(MetaclassClass);

const BlockClass = new ClassObject('Block', null, [ 'argumentNames', 'localVarNames', 'bytecodes' ], [], false);
const MethodClass = new ClassObject('Method', BlockClass, [ 'methodClass' ], [], false);

initialized = true;

function createClassObject(name, superclass, instanceVarNames, classVarNames, indexed) {
    var klass = new ClassObject(name, superclass, instanceVarNames, classVarNames, indexed);    
    
    return klass;
}

function ValueObject(value) {
    BaseObject.call(this);
    
    this.put(0, value);
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

ValueObject.prototype = Object.create(BaseObject.prototype);
ValueObject.prototype.constructor = BaseObject;
ValueObject.prototype.value = function () { return this.get(0); };

function createValueObject(value) {
    return new ValueObject(value);
}

function BlockObject(args, locals, bytecodes) {
    BaseObject.call(this);
    
    this.class(BlockClass);
    
    this.put(0, createValueObject(args));
    this.put(1, createValueObject(locals));
    this.put(2, createValueObject(bytecodes));
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

BlockObject.prototype = Object.create(BaseObject.prototype);
BlockObject.prototype.constructor = BaseObject;
BlockObject.prototype.argumentNames = function () { return this.get(0); };
BlockObject.prototype.localVarNames = function () { return this.get(1); };
BlockObject.prototype.bytecodes = function () { return this.get(2); };

function createBlockObject(args, locals, bytecodes) {
    return new BlockObject(args, locals, bytecodes);
}

function MethodObject(klass, args, locals, bytecodes) {
    BlockObject.call(this, args, locals, bytecodes);
    
    this.class(MethodClass);
    
    this.put(3, klass);
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

MethodObject.prototype = Object.create(BlockObject.prototype);
MethodObject.prototype.constructor = BlockObject;
MethodObject.prototype.methodClass = function () { return this.get(3); };

function createMethodObject(klass, args, locals, bytecodes) {
    return new MethodObject(klass, args, locals, bytecodes);
}

module.exports = {
    object: createObject,
    class: createClassObject,
    
    value: createValueObject,
    block: createBlockObject,
    method: createMethodObject
};

