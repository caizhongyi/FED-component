"use strict";
Object.defineProperties(module.exports, {
  ViewContainer: {get: function() {
      return ViewContainer;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_di__,
    $__angular2_47_src_47_core_47_compiler_47_element_95_injector__,
    $__angular2_47_src_47_facade_47_lang__,
    $__view__,
    $__angular2_47_src_47_render_47_api__;
var $__0 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    ListWrapper = $__0.ListWrapper,
    MapWrapper = $__0.MapWrapper,
    List = $__0.List;
var BaseException = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).BaseException;
var Injector = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injector;
var eiModule = ($__angular2_47_src_47_core_47_compiler_47_element_95_injector__ = require("angular2/src/core/compiler/element_injector"), $__angular2_47_src_47_core_47_compiler_47_element_95_injector__ && $__angular2_47_src_47_core_47_compiler_47_element_95_injector__.__esModule && $__angular2_47_src_47_core_47_compiler_47_element_95_injector__ || {default: $__angular2_47_src_47_core_47_compiler_47_element_95_injector__});
var $__3 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isPresent = $__3.isPresent,
    isBlank = $__3.isBlank;
var viewModule = ($__view__ = require("./view"), $__view__ && $__view__.__esModule && $__view__ || {default: $__view__});
var ViewContainerRef = ($__angular2_47_src_47_render_47_api__ = require("angular2/src/render/api"), $__angular2_47_src_47_render_47_api__ && $__angular2_47_src_47_render_47_api__.__esModule && $__angular2_47_src_47_render_47_api__ || {default: $__angular2_47_src_47_render_47_api__}).ViewContainerRef;
var ViewContainer = function ViewContainer(parentView, defaultProtoView, elementInjector) {
  this.parentView = parentView;
  this.defaultProtoView = defaultProtoView;
  this.elementInjector = elementInjector;
  this._views = [];
};
($traceurRuntime.createClass)(ViewContainer, {
  getRender: function() {
    return new ViewContainerRef(this.parentView.render, this.elementInjector.getBoundElementIndex());
  },
  internalClearWithoutRender: function() {
    for (var i = this._views.length - 1; i >= 0; i--) {
      this._detachInjectors(i);
    }
  },
  clear: function() {
    for (var i = this._views.length - 1; i >= 0; i--) {
      this.remove(i);
    }
  },
  get: function(index) {
    return this._views[index];
  },
  get length() {
    return this._views.length;
  },
  _siblingInjectorToLinkAfter: function(index) {
    if (index == 0)
      return null;
    return ListWrapper.last(this._views[index - 1].rootElementInjectors);
  },
  hydrated: function() {
    return this.parentView.hydrated();
  },
  create: function() {
    var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
    var protoView = arguments[1] !== (void 0) ? arguments[1] : null;
    var injector = arguments[2] !== (void 0) ? arguments[2] : null;
    if (atIndex == -1)
      atIndex = this._views.length;
    if (!this.hydrated())
      throw new BaseException('Cannot create views on a dehydrated ViewContainer');
    if (isBlank(protoView)) {
      protoView = this.defaultProtoView;
    }
    var newView = this.parentView.viewFactory.getView(protoView);
    this._insertInjectors(newView, atIndex);
    this.parentView.viewHydrator.hydrateViewInViewContainer(this, atIndex, newView, injector);
    return newView;
  },
  insert: function(view) {
    var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
    if (atIndex == -1)
      atIndex = this._views.length;
    this._insertInjectors(view, atIndex);
    this.parentView.changeDetector.addChild(view.changeDetector);
    this.parentView.renderer.insertViewIntoContainer(this.getRender(), atIndex, view.render);
    return view;
  },
  _insertInjectors: function(view, atIndex) {
    ListWrapper.insert(this._views, atIndex, view);
    this._linkElementInjectors(this._siblingInjectorToLinkAfter(atIndex), view);
    return view;
  },
  indexOf: function(view) {
    return ListWrapper.indexOf(this._views, view);
  },
  remove: function() {
    var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
    if (atIndex == -1)
      atIndex = this._views.length - 1;
    var view = this._views[atIndex];
    this.parentView.viewHydrator.dehydrateViewInViewContainer(this, atIndex, view);
    this._detachInjectors(atIndex);
    this.parentView.viewFactory.returnView(view);
  },
  detach: function() {
    var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
    if (atIndex == -1)
      atIndex = this._views.length - 1;
    var detachedView = this._detachInjectors(atIndex);
    detachedView.changeDetector.remove();
    this.parentView.renderer.detachViewFromContainer(this.getRender(), atIndex);
    return detachedView;
  },
  _detachInjectors: function(atIndex) {
    var detachedView = this.get(atIndex);
    ListWrapper.removeAt(this._views, atIndex);
    this._unlinkElementInjectors(detachedView);
    return detachedView;
  },
  _linkElementInjectors: function(sibling, view) {
    for (var i = view.rootElementInjectors.length - 1; i >= 0; i--) {
      view.rootElementInjectors[i].linkAfter(this.elementInjector, sibling);
    }
  },
  _unlinkElementInjectors: function(view) {
    for (var i = 0; i < view.rootElementInjectors.length; ++i) {
      view.rootElementInjectors[i].unlink();
    }
  }
}, {});
Object.defineProperty(ViewContainer, "parameters", {get: function() {
    return [[viewModule.AppView], [viewModule.AppProtoView], [eiModule.ElementInjector]];
  }});
Object.defineProperty(ViewContainer.prototype.get, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(ViewContainer.prototype._siblingInjectorToLinkAfter, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(ViewContainer.prototype.create, "parameters", {get: function() {
    return [[], [viewModule.AppProtoView], [Injector]];
  }});
Object.defineProperty(ViewContainer.prototype.indexOf, "parameters", {get: function() {
    return [[viewModule.AppView]];
  }});
//# sourceMappingURL=view_container.js.map

//# sourceMappingURL=./view_container.map