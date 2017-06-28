"use strict";
Object.defineProperties(module.exports, {
  AsyncPipe: {get: function() {
      return AsyncPipe;
    }},
  AsyncPipeFactory: {get: function() {
      return AsyncPipeFactory;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_lang__,
    $__pipe__,
    $___46__46__47_change_95_detector_95_ref__;
var $__0 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Observable = $__0.Observable,
    ObservableWrapper = $__0.ObservableWrapper;
var $__1 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isBlank = $__1.isBlank,
    isPresent = $__1.isPresent;
var $__2 = ($__pipe__ = require("./pipe"), $__pipe__ && $__pipe__.__esModule && $__pipe__ || {default: $__pipe__}),
    Pipe = $__2.Pipe,
    NO_CHANGE = $__2.NO_CHANGE;
var ChangeDetectorRef = ($___46__46__47_change_95_detector_95_ref__ = require("../change_detector_ref"), $___46__46__47_change_95_detector_95_ref__ && $___46__46__47_change_95_detector_95_ref__.__esModule && $___46__46__47_change_95_detector_95_ref__ || {default: $___46__46__47_change_95_detector_95_ref__}).ChangeDetectorRef;
var AsyncPipe = function AsyncPipe(ref) {
  $traceurRuntime.superConstructor($AsyncPipe).call(this);
  this._ref = ref;
  this._latestValue = null;
  this._latestReturnedValue = null;
  this._subscription = null;
  this._observable = null;
};
var $AsyncPipe = AsyncPipe;
($traceurRuntime.createClass)(AsyncPipe, {
  supports: function(obs) {
    return ObservableWrapper.isObservable(obs);
  },
  onDestroy: function() {
    if (isPresent(this._subscription)) {
      this._dispose();
    }
    ;
  },
  transform: function(obs) {
    if (isBlank(this._subscription)) {
      this._subscribe(obs);
      return null;
    }
    if (obs !== this._observable) {
      this._dispose();
      return this.transform(obs);
    }
    if (this._latestValue === this._latestReturnedValue) {
      return NO_CHANGE;
    } else {
      this._latestReturnedValue = this._latestValue;
      return this._latestValue;
    }
  },
  _subscribe: function(obs) {
    var $__4 = this;
    this._observable = obs;
    this._subscription = ObservableWrapper.subscribe(obs, (function(value) {
      return $__4._updateLatestValue(value);
    }), (function(e) {
      throw e;
    }));
  },
  _dispose: function() {
    ObservableWrapper.dispose(this._subscription);
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._observable = null;
  },
  _updateLatestValue: function(value) {
    this._latestValue = value;
    this._ref.requestCheck();
  }
}, {}, Pipe);
Object.defineProperty(AsyncPipe, "parameters", {get: function() {
    return [[ChangeDetectorRef]];
  }});
Object.defineProperty(AsyncPipe.prototype.transform, "parameters", {get: function() {
    return [[Observable]];
  }});
Object.defineProperty(AsyncPipe.prototype._subscribe, "parameters", {get: function() {
    return [[Observable]];
  }});
Object.defineProperty(AsyncPipe.prototype._updateLatestValue, "parameters", {get: function() {
    return [[Object]];
  }});
var AsyncPipeFactory = function AsyncPipeFactory() {
  ;
};
($traceurRuntime.createClass)(AsyncPipeFactory, {
  supports: function(obs) {
    return ObservableWrapper.isObservable(obs);
  },
  create: function(cdRef) {
    return new AsyncPipe(cdRef);
  }
}, {});
//# sourceMappingURL=async_pipe.js.map

//# sourceMappingURL=./async_pipe.map