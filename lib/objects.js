
function BaseObject() {
    var values = [];
    
    this.get = function (n) { return values[n]; };
    this.put = function (n, v) { values[n] = v; };
}

function createObject() {
    return new BaseObject();
}

function ValueObject(value) {
    BaseObject.call(this);
    
    this.put(0, value);
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

ValueObject.prototype = Object.create(BaseObject.prototype);
ValueObject.prototype.constructor = Object;
ValueObject.prototype.value = function () { return this.get(0); };

function createValueObject(value) {
    return new ValueObject(value);
}

module.exports = {
    object: createObject,
    value: createValueObject
};