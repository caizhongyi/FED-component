"use strict";
Object.defineProperties(module.exports, {
  Key: {get: function() {
      return Key;
    }},
  KeyRegistry: {get: function() {
      return KeyRegistry;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_collection__;
var MapWrapper = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}).MapWrapper;
var Key = function Key(token, id) {
  this.token = token;
  this.id = id;
  this.metadata = null;
};
var $Key = Key;
($traceurRuntime.createClass)(Key, {}, {
  get: function(token) {
    return _globalKeyRegistry.get(token);
  },
  get numberOfKeys() {
    return _globalKeyRegistry.numberOfKeys;
  }
});
var KeyRegistry = function KeyRegistry() {
  this._allKeys = MapWrapper.create();
};
($traceurRuntime.createClass)(KeyRegistry, {
  get: function(token) {
    if (token instanceof Key)
      return token;
    if (MapWrapper.contains(this._allKeys, token)) {
      return MapWrapper.get(this._allKeys, token);
    }
    var newKey = new Key(token, Key.numberOfKeys);
    MapWrapper.set(this._allKeys, token, newKey);
    return newKey;
  },
  get numberOfKeys() {
    return MapWrapper.size(this._allKeys);
  }
}, {});
var _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=key.js.map

//# sourceMappingURL=./key.map