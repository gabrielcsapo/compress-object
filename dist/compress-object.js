require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"compress-object":[function(require,module,exports){
module.exports = function(Schema) {

    var serialize = function(object) {
        if(Array.isArray(object)) {
            var ret = [];
            object.forEach(function(obj) {
                ret.push(JSON.parse(JSON.stringify(_serialize(obj))));
            });
            return ret;
        } else {
            return _serialize(object);
        }
    }

    var _serialize = function(object, _Schema) {
        // This is needed when serializing nested objects
        var __Schema = _Schema || Schema;

        var flat = [];
        Object.keys(__Schema).forEach(function(key) {
            // If the object does contain the key use the value
            if(typeof __Schema[key] == 'object' && !Array.isArray(__Schema[key])) {
                if(object[key]) {
                    flat.push(_serialize(object[key], __Schema[key]));
                } else {
                    flat.push(_serialize({}, __Schema[key]));
                }
            } else {
                if(object[key]) {
                    flat.push(object[key]);
                } else {
                    // If the object does not contain the key use the defaults
                    flat.push(__Schema[key]);
                }
            }
        });
        return flat;
    }

    var deserialize = function(flattened) {
        // this is crazy right
        if(Array.isArray(flattened[0]) && !Array.isArray(Object.keys(Schema)[0])){
            var ret = [];
            flattened.forEach(function(flat) {
                // gots to clone this 🐑
                ret.push(JSON.parse(JSON.stringify(_deserialize(flat))));
            });
            return ret;
        } else {
            return _deserialize(flattened);
        }
    }

    var _deserialize = function(flattened, _Schema) {
        // This is needed when deserializing nested objects
        var __Schema = _Schema || Schema;

        Object.keys(__Schema).forEach(function(key, index) {
            if(typeof __Schema[key] == 'object' && !Array.isArray(__Schema[key])) {
                if(flattened && flattened[index]) {
                    __Schema = _deserialize(flattened[index], __Schema[key]);
                }
            } else {
                if(flattened && flattened[index]) {
                    __Schema[key] = flattened[index];
                }
                // the else case is the Schema[key] already has a default value
            }
        });
        return Schema;
    }

    return {
        serialize: serialize,
        deserialize: deserialize
    }
}

},{}]},{},[]);
