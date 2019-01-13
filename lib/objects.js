
function BaseObject() {
    var values = [];
    
    this.get = function (n) { return values[n]; };
    this.put = function (n, v) { values[n] = v; };
}

function createObject() {
    return new BaseObject();
}

module.exports = {
    object: createObject
};