"use strict";
Object.defineProperties(module.exports, {
  RenderViewHydrator: {get: function() {
      return RenderViewHydrator;
    }},
  __esModule: {value: true}
});
var $__angular2_47_di__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_collection__,
    $___46__46__47_shadow_95_dom_47_light_95_dom__,
    $___46__46__47_events_47_event_95_manager__,
    $__view_95_factory__,
    $__view_95_container__,
    $__view__,
    $___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__;
var Injectable = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injectable;
var $__1 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    int = $__1.int,
    isPresent = $__1.isPresent,
    isBlank = $__1.isBlank,
    BaseException = $__1.BaseException;
var $__2 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    ListWrapper = $__2.ListWrapper,
    MapWrapper = $__2.MapWrapper,
    Map = $__2.Map,
    StringMapWrapper = $__2.StringMapWrapper,
    List = $__2.List;
var ldModule = ($___46__46__47_shadow_95_dom_47_light_95_dom__ = require("../shadow_dom/light_dom"), $___46__46__47_shadow_95_dom_47_light_95_dom__ && $___46__46__47_shadow_95_dom_47_light_95_dom__.__esModule && $___46__46__47_shadow_95_dom_47_light_95_dom__ || {default: $___46__46__47_shadow_95_dom_47_light_95_dom__});
var EventManager = ($___46__46__47_events_47_event_95_manager__ = require("../events/event_manager"), $___46__46__47_events_47_event_95_manager__ && $___46__46__47_events_47_event_95_manager__.__esModule && $___46__46__47_events_47_event_95_manager__ || {default: $___46__46__47_events_47_event_95_manager__}).EventManager;
var ViewFactory = ($__view_95_factory__ = require("./view_factory"), $__view_95_factory__ && $__view_95_factory__.__esModule && $__view_95_factory__ || {default: $__view_95_factory__}).ViewFactory;
var vcModule = ($__view_95_container__ = require("./view_container"), $__view_95_container__ && $__view_95_container__.__esModule && $__view_95_container__ || {default: $__view_95_container__});
var viewModule = ($__view__ = require("./view"), $__view__ && $__view__.__esModule && $__view__ || {default: $__view__});
var ShadowDomStrategy = ($___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__ = require("../shadow_dom/shadow_dom_strategy"), $___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__ && $___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__.__esModule && $___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__ || {default: $___46__46__47_shadow_95_dom_47_shadow_95_dom_95_strategy__}).ShadowDomStrategy;
var RenderViewHydrator = function RenderViewHydrator(eventManager, viewFactory, shadowDomStrategy) {
  this._eventManager = eventManager;
  this._viewFactory = viewFactory;
  this._shadowDomStrategy = shadowDomStrategy;
};
($traceurRuntime.createClass)(RenderViewHydrator, {
  hydrateDynamicComponentView: function(hostView, boundElementIndex, componentView) {
    ViewFactory.setComponentView(this._shadowDomStrategy, hostView, boundElementIndex, componentView);
    var lightDom = hostView.lightDoms[boundElementIndex];
    this._viewHydrateRecurse(componentView, lightDom);
    if (isPresent(lightDom)) {
      lightDom.redistribute();
    }
  },
  dehydrateDynamicComponentView: function(parentView, boundElementIndex) {
    throw new BaseException('Not supported yet');
  },
  hydrateInPlaceHostView: function(parentView, hostView) {
    if (isPresent(parentView)) {
      ListWrapper.push(parentView.imperativeHostViews, hostView);
    }
    this._viewHydrateRecurse(hostView, null);
  },
  dehydrateInPlaceHostView: function(parentView, hostView) {
    if (isPresent(parentView)) {
      ListWrapper.remove(parentView.imperativeHostViews, hostView);
    }
    vcModule.ViewContainer.removeViewNodes(hostView);
    hostView.rootNodes = [];
    this._viewDehydrateRecurse(hostView);
  },
  hydrateViewInViewContainer: function(viewContainer, view) {
    this._viewHydrateRecurse(view, viewContainer.parentView.hostLightDom);
  },
  dehydrateViewInViewContainer: function(viewContainer, view) {
    this._viewDehydrateRecurse(view);
  },
  _viewHydrateRecurse: function(view, hostLightDom) {
    if (view.hydrated)
      throw new BaseException('The view is already hydrated.');
    view.hydrated = true;
    view.hostLightDom = hostLightDom;
    for (var i = 0; i < view.contentTags.length; i++) {
      var destLightDom = view.getDirectParentLightDom(i);
      var ct = view.contentTags[i];
      if (isPresent(ct)) {
        ct.hydrate(destLightDom);
      }
    }
    for (var i = 0; i < view.componentChildViews.length; i++) {
      var cv = view.componentChildViews[i];
      if (isPresent(cv)) {
        this._viewHydrateRecurse(cv, view.lightDoms[i]);
      }
    }
    for (var i = 0; i < view.lightDoms.length; ++i) {
      var lightDom = view.lightDoms[i];
      if (isPresent(lightDom)) {
        lightDom.redistribute();
      }
    }
    view.eventHandlerRemovers = ListWrapper.create();
    var binders = view.proto.elementBinders;
    for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
      var binder = binders[binderIdx];
      if (isPresent(binder.globalEvents)) {
        for (var i = 0; i < binder.globalEvents.length; i++) {
          var globalEvent = binder.globalEvents[i];
          var remover = this._createGlobalEventListener(view, binderIdx, globalEvent.name, globalEvent.target, globalEvent.fullName);
          ListWrapper.push(view.eventHandlerRemovers, remover);
        }
      }
    }
  },
  _createGlobalEventListener: function(view, elementIndex, eventName, eventTarget, fullName) {
    return this._eventManager.addGlobalEventListener(eventTarget, eventName, (function(event) {
      view.dispatchEvent(elementIndex, fullName, event);
    }));
  },
  _viewDehydrateRecurse: function(view) {
    for (var i = 0; i < view.componentChildViews.length; i++) {
      var cv = view.componentChildViews[i];
      if (isPresent(cv)) {
        this._viewDehydrateRecurse(cv);
        if (view.proto.elementBinders[i].hasDynamicComponent()) {
          vcModule.ViewContainer.removeViewNodes(cv);
          this._viewFactory.returnView(cv);
          view.lightDoms[i] = null;
          view.componentChildViews[i] = null;
        }
      }
    }
    for (var i = 0; i < view.imperativeHostViews.length; i++) {
      var hostView = view.imperativeHostViews[i];
      this._viewDehydrateRecurse(hostView);
      vcModule.ViewContainer.removeViewNodes(hostView);
      hostView.rootNodes = [];
      this._viewFactory.returnView(hostView);
    }
    view.imperativeHostViews = [];
    if (isPresent(view.viewContainers)) {
      for (var i = 0; i < view.viewContainers.length; i++) {
        var vc = view.viewContainers[i];
        if (isPresent(vc)) {
          this._viewContainerDehydrateRecurse(vc);
        }
        var ct = view.contentTags[i];
        if (isPresent(ct)) {
          ct.dehydrate();
        }
      }
    }
    for (var i = 0; i < view.eventHandlerRemovers.length; i++) {
      view.eventHandlerRemovers[i]();
    }
    view.hostLightDom = null;
    view.eventHandlerRemovers = null;
    view.setEventDispatcher(null);
    view.hydrated = false;
  },
  _viewContainerDehydrateRecurse: function(viewContainer) {
    for (var i = 0; i < viewContainer.views.length; i++) {
      this._viewDehydrateRecurse(viewContainer.views[i]);
    }
    viewContainer.clear();
  }
}, {});
Object.defineProperty(RenderViewHydrator, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(RenderViewHydrator, "parameters", {get: function() {
    return [[EventManager], [ViewFactory], [ShadowDomStrategy]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.hydrateDynamicComponentView, "parameters", {get: function() {
    return [[viewModule.RenderView], [$traceurRuntime.type.number], [viewModule.RenderView]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.dehydrateDynamicComponentView, "parameters", {get: function() {
    return [[viewModule.RenderView], [$traceurRuntime.type.number]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.hydrateInPlaceHostView, "parameters", {get: function() {
    return [[viewModule.RenderView], [viewModule.RenderView]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.dehydrateInPlaceHostView, "parameters", {get: function() {
    return [[viewModule.RenderView], [viewModule.RenderView]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.hydrateViewInViewContainer, "parameters", {get: function() {
    return [[vcModule.ViewContainer], [viewModule.RenderView]];
  }});
Object.defineProperty(RenderViewHydrator.prototype.dehydrateViewInViewContainer, "parameters", {get: function() {
    return [[vcModule.ViewContainer], [viewModule.RenderView]];
  }});
Object.defineProperty(RenderViewHydrator.prototype._viewHydrateRecurse, "parameters", {get: function() {
    return [[], [ldModule.LightDom]];
  }});
//# sourceMappingURL=view_hydrator.js.map

//# sourceMappingURL=./view_hydrator.map