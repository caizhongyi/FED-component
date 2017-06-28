"use strict";
Object.defineProperties(module.exports, {
  DirectiveRecord: {get: function() {
      return DirectiveRecord;
    }},
  __esModule: {value: true}
});
var $__constants__,
    $__angular2_47_src_47_facade_47_lang__;
var ON_PUSH = ($__constants__ = require("./constants"), $__constants__ && $__constants__.__esModule && $__constants__ || {default: $__constants__}).ON_PUSH;
var StringWrapper = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).StringWrapper;
var DirectiveRecord = function DirectiveRecord(elementIndex, directiveIndex, callOnAllChangesDone, callOnChange, changeDetection) {
  this.elementIndex = elementIndex;
  this.directiveIndex = directiveIndex;
  this.callOnAllChangesDone = callOnAllChangesDone;
  this.callOnChange = callOnChange;
  this.changeDetection = changeDetection;
};
($traceurRuntime.createClass)(DirectiveRecord, {
  isOnPushChangeDetection: function() {
    return StringWrapper.equals(this.changeDetection, ON_PUSH);
  },
  get name() {
    return (this.elementIndex + "_" + this.directiveIndex);
  }
}, {});
Object.defineProperty(DirectiveRecord, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [$traceurRuntime.type.number], [$traceurRuntime.type.boolean], [$traceurRuntime.type.boolean], [$traceurRuntime.type.string]];
  }});
//# sourceMappingURL=directive_record.js.map

//# sourceMappingURL=./directive_record.map