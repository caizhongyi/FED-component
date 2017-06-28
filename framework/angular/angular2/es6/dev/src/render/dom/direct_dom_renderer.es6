import {assert} from "rtts_assert/rtts_assert";
import {Injectable} from 'angular2/di';
import {Promise,
  PromiseWrapper} from 'angular2/src/facade/async';
import {List,
  ListWrapper} from 'angular2/src/facade/collection';
import {isBlank,
  isPresent,
  BaseException} from 'angular2/src/facade/lang';
import * as api from '../api';
import {RenderView} from './view/view';
import {RenderProtoView} from './view/proto_view';
import {ViewFactory} from './view/view_factory';
import {RenderViewHydrator} from './view/view_hydrator';
import {Compiler} from './compiler/compiler';
import {ShadowDomStrategy} from './shadow_dom/shadow_dom_strategy';
import {ProtoViewBuilder} from './view/proto_view_builder';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {ViewContainer} from './view/view_container';
function _resolveViewContainer(vc) {
  assert.argumentTypes(vc, api.ViewContainerRef);
  return _resolveView(vc.view).getOrCreateViewContainer(vc.elementIndex);
}
Object.defineProperty(_resolveViewContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef]];
  }});
function _resolveView(viewRef) {
  assert.argumentTypes(viewRef, DirectDomViewRef);
  return isPresent(viewRef) ? viewRef.delegate : null;
}
Object.defineProperty(_resolveView, "parameters", {get: function() {
    return [[DirectDomViewRef]];
  }});
function _resolveProtoView(protoViewRef) {
  assert.argumentTypes(protoViewRef, DirectDomProtoViewRef);
  return isPresent(protoViewRef) ? protoViewRef.delegate : null;
}
Object.defineProperty(_resolveProtoView, "parameters", {get: function() {
    return [[DirectDomProtoViewRef]];
  }});
function _wrapView(view) {
  assert.argumentTypes(view, RenderView);
  return new DirectDomViewRef(view);
}
Object.defineProperty(_wrapView, "parameters", {get: function() {
    return [[RenderView]];
  }});
function _collectComponentChildViewRefs(view, target = null) {
  if (isBlank(target)) {
    target = [];
  }
  ListWrapper.push(target, _wrapView(view));
  ListWrapper.forEach(view.componentChildViews, (view) => {
    if (isPresent(view)) {
      _collectComponentChildViewRefs(view, target);
    }
  });
  return target;
}
export class DirectDomProtoViewRef extends api.ProtoViewRef {
  constructor(delegate) {
    assert.argumentTypes(delegate, RenderProtoView);
    super();
    this.delegate = delegate;
  }
}
Object.defineProperty(DirectDomProtoViewRef, "parameters", {get: function() {
    return [[RenderProtoView]];
  }});
export class DirectDomViewRef extends api.ViewRef {
  constructor(delegate) {
    assert.argumentTypes(delegate, RenderView);
    super();
    this.delegate = delegate;
  }
}
Object.defineProperty(DirectDomViewRef, "parameters", {get: function() {
    return [[RenderView]];
  }});
export class DirectDomRenderer extends api.Renderer {
  constructor(compiler, viewFactory, viewHydrator, shadowDomStrategy) {
    assert.argumentTypes(compiler, Compiler, viewFactory, ViewFactory, viewHydrator, RenderViewHydrator, shadowDomStrategy, ShadowDomStrategy);
    super();
    this._compiler = compiler;
    this._viewFactory = viewFactory;
    this._viewHydrator = viewHydrator;
    this._shadowDomStrategy = shadowDomStrategy;
  }
  createHostProtoView(componentId) {
    var rootElement = DOM.createElement('div');
    var hostProtoViewBuilder = new ProtoViewBuilder(rootElement);
    var elBinder = hostProtoViewBuilder.bindElement(rootElement, 'root element');
    elBinder.setComponentId(componentId);
    elBinder.bindDirective(0);
    this._shadowDomStrategy.processElement(null, componentId, rootElement);
    return assert.returnType((PromiseWrapper.resolve(hostProtoViewBuilder.build())), assert.genericType(Promise, api.ProtoViewDto));
  }
  createImperativeComponentProtoView(rendererId) {
    var protoViewBuilder = new ProtoViewBuilder(null);
    protoViewBuilder.setImperativeRendererId(rendererId);
    return assert.returnType((PromiseWrapper.resolve(protoViewBuilder.build())), assert.genericType(Promise, api.ProtoViewDto));
  }
  compile(template) {
    assert.argumentTypes(template, api.ViewDefinition);
    return assert.returnType((this._compiler.compile(template)), assert.genericType(Promise, api.ProtoViewDto));
  }
  mergeChildComponentProtoViews(protoViewRef, protoViewRefs) {
    assert.argumentTypes(protoViewRef, api.ProtoViewRef, protoViewRefs, assert.genericType(List, api.ProtoViewRef));
    _resolveProtoView(protoViewRef).mergeChildComponentProtoViews(ListWrapper.map(protoViewRefs, _resolveProtoView));
  }
  createViewInContainer(vcRef, atIndex, protoViewRef) {
    assert.argumentTypes(vcRef, api.ViewContainerRef, atIndex, assert.type.number, protoViewRef, api.ProtoViewRef);
    var view = this._viewFactory.getView(_resolveProtoView(protoViewRef));
    var vc = _resolveViewContainer(vcRef);
    this._viewHydrator.hydrateViewInViewContainer(vc, view);
    vc.insert(view, atIndex);
    return assert.returnType((_collectComponentChildViewRefs(view)), assert.genericType(List, api.ViewRef));
  }
  destroyViewInContainer(vcRef, atIndex) {
    assert.argumentTypes(vcRef, api.ViewContainerRef, atIndex, assert.type.number);
    var vc = _resolveViewContainer(vcRef);
    var view = vc.detach(atIndex);
    this._viewHydrator.dehydrateViewInViewContainer(vc, view);
    this._viewFactory.returnView(view);
  }
  insertViewIntoContainer(vcRef, atIndex = -1, viewRef) {
    assert.argumentTypes(vcRef, api.ViewContainerRef, atIndex, assert.type.any, viewRef, api.ViewRef);
    _resolveViewContainer(vcRef).insert(_resolveView(viewRef), atIndex);
  }
  detachViewFromContainer(vcRef, atIndex) {
    assert.argumentTypes(vcRef, api.ViewContainerRef, atIndex, assert.type.number);
    _resolveViewContainer(vcRef).detach(atIndex);
  }
  createDynamicComponentView(hostViewRef, elementIndex, componentViewRef) {
    assert.argumentTypes(hostViewRef, api.ViewRef, elementIndex, assert.type.number, componentViewRef, api.ProtoViewRef);
    var hostView = _resolveView(hostViewRef);
    var componentView = this._viewFactory.getView(_resolveProtoView(componentViewRef));
    this._viewHydrator.hydrateDynamicComponentView(hostView, elementIndex, componentView);
    return assert.returnType((_collectComponentChildViewRefs(componentView)), assert.genericType(List, api.ViewRef));
  }
  destroyDynamicComponentView(hostViewRef, elementIndex) {
    assert.argumentTypes(hostViewRef, api.ViewRef, elementIndex, assert.type.number);
    throw new BaseException('Not supported yet');
  }
  createInPlaceHostView(parentViewRef, hostElementSelector, hostProtoViewRef) {
    assert.argumentTypes(parentViewRef, api.ViewRef, hostElementSelector, assert.type.any, hostProtoViewRef, api.ProtoViewRef);
    var parentView = _resolveView(parentViewRef);
    var hostView = this._viewFactory.createInPlaceHostView(hostElementSelector, _resolveProtoView(hostProtoViewRef));
    this._viewHydrator.hydrateInPlaceHostView(parentView, hostView);
    return assert.returnType((_collectComponentChildViewRefs(hostView)), assert.genericType(List, api.ViewRef));
  }
  destroyInPlaceHostView(parentViewRef, hostViewRef) {
    assert.argumentTypes(parentViewRef, api.ViewRef, hostViewRef, api.ViewRef);
    var parentView = _resolveView(parentViewRef);
    var hostView = _resolveView(hostViewRef);
    this._viewHydrator.dehydrateInPlaceHostView(parentView, hostView);
  }
  setImperativeComponentRootNodes(parentViewRef, elementIndex, nodes) {
    assert.argumentTypes(parentViewRef, api.ViewRef, elementIndex, assert.type.number, nodes, List);
    var parentView = _resolveView(parentViewRef);
    var hostElement = parentView.boundElements[elementIndex];
    var componentView = parentView.componentChildViews[elementIndex];
    if (isBlank(componentView)) {
      throw new BaseException(`There is no componentChildView at index ${elementIndex}`);
    }
    if (isBlank(componentView.proto.imperativeRendererId)) {
      throw new BaseException(`This component view has no imperative renderer`);
    }
    ViewContainer.removeViewNodes(componentView);
    componentView.rootNodes = nodes;
    this._shadowDomStrategy.attachTemplate(hostElement, componentView);
  }
  setElementProperty(viewRef, elementIndex, propertyName, propertyValue) {
    assert.argumentTypes(viewRef, api.ViewRef, elementIndex, assert.type.number, propertyName, assert.type.string, propertyValue, assert.type.any);
    _resolveView(viewRef).setElementProperty(elementIndex, propertyName, propertyValue);
  }
  setText(viewRef, textNodeIndex, text) {
    assert.argumentTypes(viewRef, api.ViewRef, textNodeIndex, assert.type.number, text, assert.type.string);
    _resolveView(viewRef).setText(textNodeIndex, text);
  }
  setEventDispatcher(viewRef, dispatcher) {
    assert.argumentTypes(viewRef, api.ViewRef, dispatcher, assert.type.any);
    _resolveView(viewRef).setEventDispatcher(dispatcher);
  }
}
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
    return [[api.ProtoViewRef], [assert.genericType(List, api.ProtoViewRef)]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createViewInContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [assert.type.number], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyViewInContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [assert.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.insertViewIntoContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [], [api.ViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.detachViewFromContainer, "parameters", {get: function() {
    return [[api.ViewContainerRef], [assert.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createDynamicComponentView, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.number], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyDynamicComponentView, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.number]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.createInPlaceHostView, "parameters", {get: function() {
    return [[api.ViewRef], [], [api.ProtoViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.destroyInPlaceHostView, "parameters", {get: function() {
    return [[api.ViewRef], [api.ViewRef]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setImperativeComponentRootNodes, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.number], [List]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setElementProperty, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.number], [assert.type.string], [assert.type.any]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setText, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.number], [assert.type.string]];
  }});
Object.defineProperty(DirectDomRenderer.prototype.setEventDispatcher, "parameters", {get: function() {
    return [[api.ViewRef], [assert.type.any]];
  }});
//# sourceMappingURL=direct_dom_renderer.js.map

//# sourceMappingURL=./direct_dom_renderer.map