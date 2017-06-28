"use strict";
Object.defineProperties(module.exports, {
  keyValDiff: {get: function() {
      return keyValDiff;
    }},
  iterableDiff: {get: function() {
      return iterableDiff;
    }},
  async: {get: function() {
      return async;
    }},
  defaultPipes: {get: function() {
      return defaultPipes;
    }},
  DynamicChangeDetection: {get: function() {
      return DynamicChangeDetection;
    }},
  JitChangeDetection: {get: function() {
      return JitChangeDetection;
    }},
  defaultPipeRegistry: {get: function() {
      return defaultPipeRegistry;
    }},
  __esModule: {value: true}
});
var $__proto_95_change_95_detector__,
    $__pipes_47_pipe_95_registry__,
    $__pipes_47_iterable_95_changes__,
    $__pipes_47_keyvalue_95_changes__,
    $__pipes_47_async_95_pipe__,
    $__pipes_47_null_95_pipe__,
    $__constants__,
    $__interfaces__,
    $__angular2_47_di__;
var $__0 = ($__proto_95_change_95_detector__ = require("./proto_change_detector"), $__proto_95_change_95_detector__ && $__proto_95_change_95_detector__.__esModule && $__proto_95_change_95_detector__ || {default: $__proto_95_change_95_detector__}),
    DynamicProtoChangeDetector = $__0.DynamicProtoChangeDetector,
    JitProtoChangeDetector = $__0.JitProtoChangeDetector;
var PipeRegistry = ($__pipes_47_pipe_95_registry__ = require("./pipes/pipe_registry"), $__pipes_47_pipe_95_registry__ && $__pipes_47_pipe_95_registry__.__esModule && $__pipes_47_pipe_95_registry__ || {default: $__pipes_47_pipe_95_registry__}).PipeRegistry;
var IterableChangesFactory = ($__pipes_47_iterable_95_changes__ = require("./pipes/iterable_changes"), $__pipes_47_iterable_95_changes__ && $__pipes_47_iterable_95_changes__.__esModule && $__pipes_47_iterable_95_changes__ || {default: $__pipes_47_iterable_95_changes__}).IterableChangesFactory;
var KeyValueChangesFactory = ($__pipes_47_keyvalue_95_changes__ = require("./pipes/keyvalue_changes"), $__pipes_47_keyvalue_95_changes__ && $__pipes_47_keyvalue_95_changes__.__esModule && $__pipes_47_keyvalue_95_changes__ || {default: $__pipes_47_keyvalue_95_changes__}).KeyValueChangesFactory;
var AsyncPipeFactory = ($__pipes_47_async_95_pipe__ = require("./pipes/async_pipe"), $__pipes_47_async_95_pipe__ && $__pipes_47_async_95_pipe__.__esModule && $__pipes_47_async_95_pipe__ || {default: $__pipes_47_async_95_pipe__}).AsyncPipeFactory;
var NullPipeFactory = ($__pipes_47_null_95_pipe__ = require("./pipes/null_pipe"), $__pipes_47_null_95_pipe__ && $__pipes_47_null_95_pipe__.__esModule && $__pipes_47_null_95_pipe__ || {default: $__pipes_47_null_95_pipe__}).NullPipeFactory;
var DEFAULT = ($__constants__ = require("./constants"), $__constants__ && $__constants__.__esModule && $__constants__ || {default: $__constants__}).DEFAULT;
var $__7 = ($__interfaces__ = require("./interfaces"), $__interfaces__ && $__interfaces__.__esModule && $__interfaces__ || {default: $__interfaces__}),
    ChangeDetection = $__7.ChangeDetection,
    ProtoChangeDetector = $__7.ProtoChangeDetector;
var Injectable = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injectable;
var keyValDiff = [new KeyValueChangesFactory(), new NullPipeFactory()];
var iterableDiff = [new IterableChangesFactory(), new NullPipeFactory()];
var async = [new AsyncPipeFactory(), new NullPipeFactory()];
var defaultPipes = {
  "iterableDiff": iterableDiff,
  "keyValDiff": keyValDiff,
  "async": async
};
var DynamicChangeDetection = function DynamicChangeDetection(registry) {
  $traceurRuntime.superConstructor($DynamicChangeDetection).call(this);
  this.registry = registry;
};
var $DynamicChangeDetection = DynamicChangeDetection;
($traceurRuntime.createClass)(DynamicChangeDetection, {createProtoChangeDetector: function(name) {
    var changeControlStrategy = arguments[1] !== (void 0) ? arguments[1] : DEFAULT;
    return new DynamicProtoChangeDetector(this.registry, changeControlStrategy);
  }}, {}, ChangeDetection);
Object.defineProperty(DynamicChangeDetection, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(DynamicChangeDetection, "parameters", {get: function() {
    return [[PipeRegistry]];
  }});
Object.defineProperty(DynamicChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  }});
var JitChangeDetection = function JitChangeDetection(registry) {
  $traceurRuntime.superConstructor($JitChangeDetection).call(this);
  this.registry = registry;
};
var $JitChangeDetection = JitChangeDetection;
($traceurRuntime.createClass)(JitChangeDetection, {createProtoChangeDetector: function(name) {
    var changeControlStrategy = arguments[1] !== (void 0) ? arguments[1] : DEFAULT;
    return new JitProtoChangeDetector(this.registry, changeControlStrategy);
  }}, {}, ChangeDetection);
Object.defineProperty(JitChangeDetection, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(JitChangeDetection, "parameters", {get: function() {
    return [[PipeRegistry]];
  }});
Object.defineProperty(JitChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  }});
var defaultPipeRegistry = new PipeRegistry(defaultPipes);
//# sourceMappingURL=change_detection.js.map

//# sourceMappingURL=./change_detection.map