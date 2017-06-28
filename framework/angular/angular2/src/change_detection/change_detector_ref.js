"use strict";
Object.defineProperties(module.exports, {
  ChangeDetectorRef: {get: function() {
      return ChangeDetectorRef;
    }},
  __esModule: {value: true}
});
var $__interfaces__,
    $__constants__;
var ChangeDetector = ($__interfaces__ = require("./interfaces"), $__interfaces__ && $__interfaces__.__esModule && $__interfaces__ || {default: $__interfaces__}).ChangeDetector;
var $__1 = ($__constants__ = require("./constants"), $__constants__ && $__constants__.__esModule && $__constants__ || {default: $__constants__}),
    CHECK_ONCE = $__1.CHECK_ONCE,
    DETACHED = $__1.DETACHED,
    CHECK_ALWAYS = $__1.CHECK_ALWAYS;
var ChangeDetectorRef = function ChangeDetectorRef(cd) {
  this._cd = cd;
};
($traceurRuntime.createClass)(ChangeDetectorRef, {
  requestCheck: function() {
    this._cd.markPathToRootAsCheckOnce();
  },
  detach: function() {
    this._cd.mode = DETACHED;
  },
  reattach: function() {
    this._cd.mode = CHECK_ALWAYS;
    this.requestCheck();
  }
}, {});
Object.defineProperty(ChangeDetectorRef, "parameters", {get: function() {
    return [[ChangeDetector]];
  }});
//# sourceMappingURL=change_detector_ref.js.map

//# sourceMappingURL=./change_detector_ref.map