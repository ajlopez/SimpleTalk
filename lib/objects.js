
function BaseObject() {
    var values = [];
    
    this.get = function (n) { return values[n]; };
    this.put = function (n, v) { values[n] = v; };
}

function createObject() {
    return new BaseObject();
}

function ValueObject(value) {
    this.value = function () { return value; }
}

function createValueObject(value) {
    return new ValueObject(value);
}

module.exports = {
    object: createObject,
    value: createValueObject
};