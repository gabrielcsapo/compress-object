require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"compress-object":[function(require,module,exports){
class Compress {
  constructor(Schema) {
    this.schema = Schema;
  }
  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
  serialize(object) {
    if (Array.isArray(object)) return object.map((obj) => this.clone(this._serialize(obj)));
    return this._serialize(object);
  }
  _serialize(object, _Schema) {
    // This is needed when serializing nested objects
    let Schema = _Schema || this.schema;

    return Object.keys(Schema).map((key) => {
      // If the object does contain the key use the value
      if (typeof Schema[key] == 'object' && !Array.isArray(Schema[key])) {
        if (object[key]) return this._serialize(object[key], Schema[key]);
        return this._serialize({}, Schema[key]);
      } else {
        if (object[key]) return object[key];
        // If the object does not contain the key use the defaults
        return Schema[key];
      }
    });
  }
  deserialize(flattened) {
    // this is crazy right (we are looking for arrays of arrays)
    if (Array.isArray(flattened[0]) && !Array.isArray(Object.keys(this.schema)[0])) {
      return flattened.map((flat) => this.clone(this._deserialize(flat)));
    } else {
      return this._deserialize(flattened);
    }
  }
  _deserialize(flattened, _Schema) {
    // This is needed when deserializing nested objects
    let __Schema = _Schema || this.schema;

    Object.keys(__Schema).forEach((key, index) => {
      if (typeof __Schema[key] == 'object' && !Array.isArray(__Schema[key])) {
        if (flattened && flattened[index]) {
          __Schema = this._deserialize(flattened[index], __Schema[key]);
        }
      } else {
        if (flattened && flattened[index]) {
          __Schema[key] = flattened[index];
        }
        // the else case is the Schema[key] already has a default value
      }
    });
    return this.schema;
  }
}

module.exports = Compress;

},{}]},{},[]);
