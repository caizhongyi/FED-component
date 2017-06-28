"use strict";
Object.defineProperties(module.exports, {
  RenderView: {get: function() {
      return RenderView;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_dom_47_dom_95_adapter__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__view_95_container__,
    $__proto_95_view__,
    $___46__46__47_shadow_95_dom_47_light_95_dom__,
    $___46__46__47_shadow_95_dom_47_content_95_tag__;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var $__1 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    ListWrapper = $__1.ListWrapper,
    MapWrapper = $__1.MapWrapper,
    Map = $__1.Map,
    StringMapWrapper = $__1.StringMapWrapper,
    List = $__1.List;
var $__2 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    int = $__2.int,
    isPresent = $__2.isPresent,
    isBlank = $__2.isBlank,
    BaseException = $__2.BaseException;
var ViewContainer = ($__view_95_container__ = require("./view_container"), $__view_95_container__ && $__view_95_container__.__esModule && $__view_95_container__ || {default: $__view_95_container__}).ViewContainer;
var RenderProtoView = ($__proto_95_view__ = require("./proto_view"), $__proto_95_view__ && $__proto_95_view__.__esModule && $__proto_95_view__ || {default: $__proto_95_view__}).RenderProtoView;
var LightDom = ($___46__46__47_shadow_95_dom_47_light_95_dom__ = require("../shadow_dom/light_dom"), $___46__46__47_shadow_95_dom_47_light_95_dom__ && $___46__46__47_shadow_95_dom_47_light_95_dom__.__esModule && $___46__46__47_shadow_95_dom_47_light_95_dom__ || {default: $___46__46__47_shadow_95_dom_47_light_95_dom__}).LightDom;
var Content = ($___46__46__47_shadow_95_dom_47_content_95_tag__ = require("../shadow_dom/content_tag"), $___46__46__47_shadow_95_dom_47_content_95_tag__ && $___46__46__47_shadow_95_dom_47_content_95_tag__.__esModule && $___46__46__47_shadow_95_dom_47_content_95_tag__ || {default: $___46__46__47_shadow_95_dom_47_content_95_tag__}).Content;
var NG_BINDING_CLASS = 'ng-binding';
var RenderView = function RenderView(proto, rootNodes, boundTextNodes, boundElements, contentTags) {
  this.proto = proto;
  this.rootNodes = rootNodes;
  this.boundTextNodes = boundTextNodes;
  this.boundElements = boundElements;
  this.viewContainers = ListWrapper.createFixedSize(boundElements.length);
  this.contentTags = contentTags;
  this.lightDoms = ListWrapper.createFixedSize(boundElements.length);
  ListWrapper.fill(this.lightDoms, null);
  this.componentChildViews = ListWrapper.createFixedSize(boundElements.length);
  this.hostLightDom = null;
  this.hydrated = false;
  this.eventHandlerRemovers = [];
  this.imperativeHostViews = [];
};
var $RenderView = RenderView;
($traceurRuntime.createClass)(RenderView, {
  getDirectParentLightDom: function(boundElementIndex) {
    var binder = this.proto.elementBinders[boundElementIndex];
    var destLightDom = null;
    if (binder.parentIndex !== -1 && binder.distanceToParent === 1) {
      destLightDom = this.lightDoms[binder.parentIndex];
    }
    return destLightDom;
  },
  getOrCreateViewContainer: function(binderIndex) {
    var vc = this.viewContainers[binderIndex];
    if (isBlank(vc)) {
      vc = new ViewContainer(this, binderIndex);
      this.viewContainers[binderIndex] = vc;
    }
    return vc;
  },
  setElementProperty: function(elementIndex, propertyName, value) {
    var setter = MapWrapper.get(this.proto.elementBinders[elementIndex].propertySetters, propertyName);
    setter(this.boundElements[elementIndex], value);
  },
  setText: function(textIndex, value) {
    DOM.setText(this.boundTextNodes[textIndex], value);
  },
  getViewContainer: function(index) {
    return this.viewContainers[index];
  },
  setEventDispatcher: function(dispatcher) {
    this._eventDispatcher = dispatcher;
  },
  dispatchEvent: function(elementIndex, eventName, event) {
    var allowDefaultBehavior = true;
    if (isPresent(this._eventDispatcher)) {
      var evalLocals = MapWrapper.create();
      MapWrapper.set(evalLocals, '$event', event);
      allowDefaultBehavior = this._eventDispatcher.dispatchEvent(elementIndex, eventName, evalLocals);
      if (!allowDefaultBehavior) {
        event.preventDefault();
      }
    }
    return allowDefaultBehavior;
  }
}, {});
Object.defineProperty(RenderView, "parameters", {get: function() {
    return [[RenderProtoView], [List], [List], [List], [List]];
  }});
Object.defineProperty(RenderView.prototype.getDirectParentLightDom, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(RenderView.prototype.setElementProperty, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [$traceurRuntime.type.string], [$traceurRuntime.type.any]];
  }});
Object.defineProperty(RenderView.prototype.setText, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(RenderView.prototype.getViewContainer, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(RenderView.prototype.setEventDispatcher, "parameters", {get: function() {
    return [[$traceurRuntime.type.any]];
  }});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=./view.map