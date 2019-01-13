
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
    return new BaseObject();
}

function ClassObject(name, superclass, instanceVarNames, classVarNames, indexed) {
    BaseObject.call(this);
    
    this.put(0, name);
    this.put(1, superclass);
    this.put(2, createValueObject(instanceVarNames));
    this.put(3, createValueObject(classVarNames));
    this.put(4, indexed ? true : false);
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

ClassObject.prototype = Object.create(BaseObject.prototype);
ClassObject.prototype.constructor = BaseObject;
ClassObject.prototype.name = function () { return this.get(0); };
ClassObject.prototype.superclass = function () { return this.get(1); };
ClassObject.prototype.instanceSize = function () { return this.get(2).value().length; };
ClassObject.prototype.instanceVarNames = function () { return this.get(2); };
ClassObject.prototype.classVarNames = function () { return this.get(3); };
ClassObject.prototype.indexed = function () { return this.get(4); };
ClassObject.prototype.newInstance = function () {
    var instance = new BaseObject();
    instance.class(this);
    
    return instance;
}

function createClassObject(name, superclass, instanceVarNames, classVarNames, indexed) {
    return new ClassObject(name, superclass, instanceVarNames, classVarNames, indexed);
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

module.exports = {
    object: createObject,
    value: createValueObject,
    class: createClassObject
};

