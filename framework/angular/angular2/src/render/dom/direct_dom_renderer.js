"use strict";
Object.defineProperties(module.exports, {
  DirectDomProtoViewRef: {get: function() {
      return DirectDomProtoViewRef;
    }},
  DirectDomViewRef: {get: function() {
      return DirectDomViewRef;
    }},
  DirectDomRenderer: {get: function() {
      return DirectDomRenderer;
    }},
  __esModule: {value: true}
});
var $__angular2_47_di__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_facade_47_lang__,
    $___46__46__47_api__,
    $__view_47_view__,
    $__view_47_proto_95_view__,
    $__view_47_view_95_factory__,
    $__view_47_view_95_hydrator__,
    $__compiler_47_compiler__,
    $__shadow_95_dom_47_shadow_95_dom_95_strategy__,
    $__view_47_proto_95_view_95_builder__,
    $__angular2_47_src_47_dom_47_dom_95_adapter__,
    $__view_47_view_95_container__;
var Injectable = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}).Injectable;
var $__1 = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}),
    Promise = $__1.Promise,
    PromiseWrapper = $__1.PromiseWrapper;
var $__2 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    List = $__2.List,
    ListWrapper = $__2.ListWrapper;
var $__3 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isBlank = $__3.isBlank,
    isPresent = $__3.isPresent,
    BaseException = $__3.BaseException;
var api = ($___46__46__47_api__ = require("../api"), $___46__46__47_api__ && $___46__46__47_api__.__esModule && $___46__46__47_api__ || {default: $___46__46__47_api__});
var RenderView = ($__view_47_view__ = require("./view/view"), $__view_47_view__ && $__view_47_view__.__esModule && $__view_47_view__ || {default: $__view_47_view__}).RenderView;
var RenderProtoView = ($__view_47_proto_95_view__ = require("./view/proto_view"), $__view_47_proto_95_view__ && $__view_47_proto_95_view__.__esModule && $__view_47_proto_95_view__ || {default: $__view_47_proto_95_view__}).RenderProtoView;
var ViewFactory = ($__view_47_view_95_factory__ = require("./view/view_factory"), $__view_47_view_95_factory__ && $__view_47_view_95_factory__.__esModule && $__view_47_view_95_factory__ || {default: $__view_47_view_95_factory__}).ViewFactory;
var RenderViewHydrator = ($__view_47_view_95_hydrator__ = require("./view/view_hydrator"), $__view_47_view_95_hydrator__ && $__view_47_view_95_hydrator__.__esModule && $__view_47_view_95_hydrator__ || {default: $__view_47_view_95_hydrator__}).RenderViewHydrator;
var Compiler = ($__compiler_47_compiler__ = require("./compiler/compiler"), $__compiler_47_compiler__ && $__compiler_47_compiler__.__esModule && $__compiler_47_compiler__ || {default: $__compiler_47_compiler__}).Compiler;
var ShadowDomStrategy = ($__shadow_95_dom_47_shadow_95_dom_95_strategy__ = require("./shadow_dom/shadow_dom_strategy"), $__shadow_95_dom_47_shadow_95_dom_95_strategy__ && $__shadow_95_dom_47_shadow_95_dom_95_strategy__.__esModule && $__shadow_95_dom_47_shadow_95_dom_95_strategy__ || {default: $__shadow_95_dom_47_shadow_95_dom_95_strategy__}).ShadowDomStrategy;
var ProtoViewBuilder = ($__view_47_proto_95_view_95_builder__ = require("./view/proto_view_builder"), $__view_47_proto_95_view_95_builder__ && $__view_47_proto_95_view_95_builder__.__esModule && $__view_47_proto_95_view_95_builder__ || {default: $__view_47_proto_95_view_95_builder__}).ProtoViewBuilder;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var ViewContainer = ($__view_47_view_95_container__ = require("./view/view_container"), $__view_47_view_95_container__ && $__view_47_view_95_container__.__esModule && $__view_47_view_95_container__ || {default: $__view_47_view_95_container__}).ViewContainer;
function _resolveViewContainer(vc) {
  return _resolveView(vc.view).getOrCreateViewContainer(vc.elementIndex);
}
Object.defineProperty(_resolveViewContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef]];
  }});
function _resolveView(viewRef) {
  return isPresent(viewRef) ? viewRef.delegate : null;
}
Object.defineProperty(_resolveView, "parameters", {get: function() {
    return [[DirectDomViewRef]];
  }});
function _resolveProtoView(protoViewRef) {
  return isPresent(protoViewRef) ? protoViewRef.delegate : null;
}
Object.defineProperty(_resolveProtoView, "parameters", {get: function() {
    return [[DirectDomProtoViewRef]];
  }});
function _wrapView(view) {
  return new DirectDomViewRef(view);
}
Object.defineProperty(_wrapView, "parameters", {get: function() {
    return [[RenderView]];
  }});
function _collectComponentChildViewRefs(view) {
  var target = arguments[1] !== (void 0) ? arguments[1] : null;
  if (isBlank(target)) {
    target = [];
  }
  ListWrapper.push(target, _wrapView(view));
  ListWrapper.forEach(view.componentChildViews, (function(view) {
    if (isPresent(view)) {
      _collectComponentChildViewRefs(view, target);
    }
  }));
  return target;
}
var DirectDomProtoViewRef = function DirectDomProtoViewRef(delegate) {
  $traceurRuntime.superConstructor($DirectDomProtoViewRef).call(this);
  this.delegate = delegate;
};
var $DirectDomProtoViewRef = DirectDomProtoViewRef;
($traceurRuntime.createClass)(DirectDomProtoViewRef, {}, {}, api.ProtoViewRef);
Object.defineProperty(DirectDomProtoViewRef, "parameters", {get: function() {
    return [[RenderProtoView]];
  }});
var DirectDomViewRef = function DirectDomViewRef(delegate) {
  $traceurRuntime.superConstructor($DirectDomViewRef).call(this);
  this.delegate = delegate;
};
var $DirectDomViewRef = DirectDomViewRef;
($traceurRuntime.createClass)(DirectDomViewRef, {}, {}, api.ViewRef);
Object.defineProperty(DirectDomViewRef, "parameters", {get: function() {
    return [[RenderView]];
  }});
var DirectDomRenderer = function DirectDomRenderer(compiler, viewFactory, viewHydrator, shadowDomStrategy) {
  $traceurRuntime.superConstructor($DirectDomRenderer).call(this);
  this._compiler = compiler;
  this._viewFactory = viewFactory;
  this._viewHydrator = viewHydrator;
  this._shadowDomStrategy = shadowDomStrategy;
};
var $DirectDomRenderer = DirectDomRenderer;
($traceurRuntime.createClass)(DirectDomRenderer, {
  createHostProtoView: function(componentId) {
    var rootElement = DOM.createElement('div');
    var hostProtoViewBuilder = new ProtoViewBuilder(rootElement);
    var elBinder = hostProtoViewBuilder.bindElement(rootElement, 'root element');
    elBinder.setComponentId(componentId);
    elBinder.bindDirective(0);
    this._shadowDomStrategy.processElement(null, componentId, rootElement);
    return PromiseWrapper.resolve(hostProtoViewBuilder.build());
  },
  createImperativeComponentProtoView: function(rendererId) {
    var protoViewBuilder = new ProtoViewBuilder(null);
    protoViewBuilder.setImperativeRendererId(rendererId);
    return PromiseWrapper.resolve(protoViewBuilder.build());
  },
  compile: function(template) {
    return this._compiler.compile(template);
  },
  mergeChildComponentProtoViews: function(protoViewRef, protoViewRefs) {
    _resolveProtoView(protoViewRef).mergeChildComponentProtoViews(ListWrapper.map(protoViewRefs, _resolveProtoView));
  },
  createViewInContainer: function(vcRef, atIndex, protoViewRef) {
    var view = this._viewFactory.getView(_resolveProtoView(protoViewRef));
    var vc = _resolveViewContainer(vcRef);
    this._viewHydrator.hydrateViewInViewContainer(vc, view);
    vc.insert(view, atIndex);
    return _collectComponentChildViewRefs(view);
  },
  destroyViewInContainer: function(vcRef, atIndex) {
    var vc = _resolveViewContainer(vcRef);
    var view = vc.detach(atIndex);
    this._viewHydrator.dehydrateViewInViewContainer(vc, view);
    this._viewFactory.returnView(view);
  },
  insertViewIntoContainer: function(vcRef) {
    var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
    var viewRef = arguments[2];
    _resolveViewContainer(vcRef).insert(_resolveView(viewRef), atIndex);
  },
  detachViewFromContainer: function(vcRef, atIndex) {
    _resolveViewContainer(vcRef).detach(atIndex);
  },
  createDynamicComponentView: function(hostViewRef, elementIndex, componentViewRef) {
    var hostView = _resolveView(hostViewRef);
    var componentView = this._viewFactory.getView(_resolveProtoView(componentViewRef));
    this._viewHydrator.hydrateDynamicComponentView(hostView, elementIndex, componentView);
    return _collectComponentChildViewRefs(componentView);
  },
  destroyDynamicComponentView: function(hostViewRef, elementIndex) {
    throw new BaseException('Not supported yet');
  },
  createInPlaceHostView: function(parentViewRef, hostElementSelector, hostProtoViewRef) {
    var parentView = _resolveView(parentViewRef);
    var hostView = this._viewFactory.createInPlaceHostView(hostElementSelector, _resolveProtoView(hostProtoViewRef));
    this._viewHydrator.hydrateInPlaceHostView(parentView, hostView);
    return _collectComponentChildViewRefs(hostView);
  },
  destroyInPlaceHostView: function(parentViewRef, hostViewRef) {
    var parentView = _resolveView(parentViewRef);
    var hostView = _resolveView(hostViewRef);
    this._viewHydrator.dehydrateInPlaceHostView(parentView, hostView);
  },
  setImperativeComponentRootNodes: function(parentViewRef, elementIndex, nodes) {
    var parentView = _resolveView(parentViewRef);
    var hostElement = parentView.boundElements[elementIndex];
    var componentView = parentView.componentChildViews[elementIndex];
    if (isBlank(componentView)) {
      throw new BaseException(("There is no componentChildView at index " + elementIndex));
    }
    if (isBlank(componentView.proto.imperativeRendererId)) {
      throw new BaseException("This component view has no imperative renderer");
    }
    ViewContainer.removeViewNodes(componentView);
    componentView.rootNodes = nodes;
    this._shadowDomStrategy.attachTemplate(hostElement, componentView);
  },
  setElementProperty: function(viewRef, elementIndex, propertyName, propertyValue) {
    _resolveView(viewRef).setElementProperty(elementIndex, propertyName, propertyValue);
  },
  setText: function(viewRef, textNodeIndex, text) {
    _resolveView(viewRef).setText(textNodeIndex, text);
  },
  setEventDispatcher: function(viewRef, dispatcher) {
    _resolveView(viewRef).setEventDispatcher(dispatcher);
  }
}, {}, api.Renderer);
Object.defineProperty(DirectDomRenderer, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(DirectDomRenderer, "parameters", {get: function() {
    return [[Compiler], [ViewFactory], [RenderViewHydrator], [ShadowDomStrategy]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.compile, "parameters", {get: function() {
    return [[api.ViewDefinition]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.mergeChildComponentProtoViews, "parameters", {get: function() {
    return [[api.ProtoViewRef], [$traceurRuntime.genericType(List, api.ProtoViewRef)]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createViewInContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [$traceurRuntime.type.number], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyViewInContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [$traceurRuntime.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.insertViewIntoContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [], [api.ViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.detachViewFromContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [$traceurRuntime.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createDynamicComponentView, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.number], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyDynamicComponentView, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createInPlaceHostView, "parameters", {get: function() {
    return [[api.ViewRef], [], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyInPlaceHostView, "parameters", {get: function() {
    return [[api.ViewRef], [api.ViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setImperativeComponentRootNodes, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.number], [List]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setElementProperty, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.number], [$traceurRuntime.type.string], [$traceurRuntime.type.any]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setText, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.number], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setEventDispatcher, "parameters", {get: function() {
    return [[api.ViewRef], [$traceurRuntime.type.any]];
  }});
//# sourceMappingURL=direct_dom_renderer.js.map

//# sourceMappingURL=./direct_dom_renderer.map