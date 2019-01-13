
function BaseObject() {
    this.get = function () { return null; };
}

function createObject() {
    return new BaseObject();
}

module.exports = {
    object: createObject
};