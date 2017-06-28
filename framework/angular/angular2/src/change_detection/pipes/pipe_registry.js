"use strict";
Object.defineProperties(module.exports, {
  PipeRegistry: {get: function() {
      return PipeRegistry;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__pipe__,
    $__angular2_47_di__,
    $___46__46__47_change_95_detector_95_ref__;
var $__0 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    List = $__0.List,
    ListWrapper = $__0.ListWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isBlank = $__1.isBlank,
    isPresent = $__1.isPresent,
    BaseException = $__1.BaseException,
    CONST = $__1.CONST;
var Pipe = ($__pipe__ = require("./pipe"), $__pipe__ && $__pipe__.__esModule && $__pipe__ || {default: $__pipe__}).Pipe;
var Injectable = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injectable;
var ChangeDetectorRef = ($___46__46__47_change_95_detector_95_ref__ = require("../change_detector_ref"), $___46__46__47_change_95_detector_95_ref__ && $___46__46__47_change_95_detector_95_ref__.__esModule && $___46__46__47_change_95_detector_95_ref__ || {default: $___46__46__47_change_95_detector_95_ref__}).ChangeDetectorRef;
var PipeRegistry = function PipeRegistry(config) {
  this.config = config;
};
($traceurRuntime.createClass)(PipeRegistry, {get: function(type, obj, cdRef) {
    var listOfConfigs = this.config[type];
    if (isBlank(listOfConfigs)) {
      throw new BaseException(("Cannot find a pipe for type '" + type + "' object '" + obj + "'"));
    }
    var matchingConfig = ListWrapper.find(listOfConfigs, (function(pipeConfig) {
      return pipeConfig.supports(obj);
    }));
    if (isBlank(matchingConfig)) {
      throw new BaseException(("Cannot find a pipe for type '" + type + "' object '" + obj + "'"));
    }
    return matchingConfig.create(cdRef);
  }}, {});
Object.defineProperty(PipeRegistry, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(PipeRegistry.prototype.get, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [], [ChangeDetectorRef]];
  }});
//# sourceMappingURL=pipe_registry.js.map

//# sourceMappingURL=./pipe_registry.map