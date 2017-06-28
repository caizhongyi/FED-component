import {assert} from "rtts_assert/rtts_assert";
import {MapWrapper} from 'angular2/src/facade/collection';
export class Key {
  constructor(token, id) {
    this.token = token;
    this.id = id;
    this.metadata = null;
  }
  static get(token) {
    return assert.returnType((_globalKeyRegistry.get(token)), Key);
  }
  static get numberOfKeys() {
    return _globalKeyRegistry.numberOfKeys;
  }
}
export class KeyRegistry {
  constructor() {
    this._allKeys = MapWrapper.create();
  }
  get(token) {
    if (token instanceof Key)
      return assert.returnType((token), Key);
    if (MapWrapper.contains(this._allKeys, token)) {
      return assert.returnType((MapWrapper.get(this._allKeys, token)), Key);
    }
    var newKey = new Key(token, Key.numberOfKeys);
    MapWrapper.set(this._allKeys, token, newKey);
    return assert.returnType((newKey), Key);
  }
  get numberOfKeys() {
    return MapWrapper.size(this._allKeys);
  }
}
var _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=key.js.map

//# sourceMappingURL=./key.map