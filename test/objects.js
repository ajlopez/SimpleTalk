
var objects = require('../lib/objects');

exports['create empty object'] = function (test) {
    var object = objects.object();
    
    test.ok(object);
    test.equal(typeof object, 'object');
    
    test.equal(object.get(0), null);
};

exports['put and get value'] = function (test) {
    var object = objects.object();
    
    object.put(0, 42);
    test.equal(object.get(0), 42);
};

