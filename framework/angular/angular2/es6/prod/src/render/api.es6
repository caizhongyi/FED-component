import {isPresent} from 'angular2/src/facade/lang';
import {Promise} from 'angular2/src/facade/async';
import {List,
  Map} from 'angular2/src/facade/collection';
import {ASTWithSource} from 'angular2/change_detection';
export class EventBinding {
  constructor(fullName, source) {
    this.fullName = fullName;
    this.source = source;
  }
}
Object.defineProperty(EventBinding, "parameters", {get: function() {
    return [[assert.type.string], [ASTWithSource]];
  }});
export class ElementBinder {
  constructor({index,
    parentIndex,
    distanceToParent,
    directives,
    nestedProtoView,
    propertyBindings,
    variableBindings,
    eventBindings,
    textBindings,
    readAttributes}) {
    this.index = index;
    this.parentIndex = parentIndex;
    this.distanceToParent = distanceToParent;
    this.directives = directives;
    this.nestedProtoView = nestedProtoView;
    this.propertyBindings = propertyBindings;
    this.variableBindings = variableBindings;
    this.eventBindings = eventBindings;
    this.textBindings = textBindings;
    this.readAttributes = readAttributes;
  }
}
export class DirectiveBinder {
  constructor({directiveIndex,
    propertyBindings,
    eventBindings}) {
    this.directiveIndex = directiveIndex;
    this.propertyBindings = propertyBindings;
    this.eventBindings = eventBindings;
  }
}
export class ProtoViewDto {
  static get HOST_VIEW_TYPE() {
    return 0;
  }
  static get COMPONENT_VIEW_TYPE() {
    return 1;
  }
  static get EMBEDDED_VIEW_TYPE() {
    return 1;
  }
  constructor({render,
    elementBinders,
    variableBindings,
    type} = {}) {
    this.render = render;
    this.elementBinders = elementBinders;
    this.variableBindings = variableBindings;
    this.type = type;
  }
}
export class DirectiveMetadata {
  static get DECORATOR_TYPE() {
    return 0;
  }
  static get COMPONENT_TYPE() {
    return 1;
  }
  static get VIEWPORT_TYPE() {
    return 2;
  }
  constructor({id,
    selector,
    compileChildren,
    hostListeners,
    properties,
    setters,
    readAttributes,
    type}) {
    this.id = id;
    this.selector = selector;
    this.compileChildren = isPresent(compileChildren) ? compileChildren : true;
    this.hostListeners = hostListeners;
    this.properties = properties;
    this.setters = setters;
    this.readAttributes = readAttributes;
    this.type = type;
  }
}
export class ProtoViewRef {}
export class ViewRef {}
export class ViewContainerRef {
  constructor(view, elementIndex) {
    this.view = view;
    this.elementIndex = elementIndex;
  }
}
Object.defineProperty(ViewContainerRef, "parameters", {get: function() {
    return [[ViewRef], [assert.type.number]];
  }});
export class ViewDefinition {
  constructor({componentId,
    absUrl,
    template,
    directives}) {
    this.componentId = componentId;
    this.absUrl = absUrl;
    this.template = template;
    this.directives = directives;
  }
}
export class Renderer {
  createHostProtoView(componentId) {
    return null;
  }
  createImperativeComponentProtoView(rendererId) {
    return null;
  }
  compile(template) {
    return null;
  }
  mergeChildComponentProtoViews(protoViewRef, componentProtoViewRefs) {
    return null;
  }
  createViewInContainer(vcRef, atIndex, protoViewRef) {
    return null;
  }
  destroyViewInContainer(vcRef, atIndex) {}
  insertViewIntoContainer(vcRef, atIndex, view) {}
  detachViewFromContainer(vcRef, atIndex) {}
  createDynamicComponentView(hostViewRef, elementIndex, componentProtoViewRef) {
    return null;
  }
  destroyDynamicComponentView(hostViewRef, elementIndex) {}
  createInPlaceHostView(parentViewRef, hostElementSelector, hostProtoViewRef) {
    return null;
  }
  destroyInPlaceHostView(parentViewRef, hostViewRef) {}
  setElementProperty(view, elementIndex, propertyName, propertyValue) {}
  setText(view, textNodeIndex, text) {}
  setEventDispatcher(viewRef, dispatcher) {}
  flush() {}
}
Object.defineProperty(Renderer.prototype.compile, "parameters", {get: function() {
    return [[ViewDefinition]];
  }});
Object.defineProperty(Renderer.prototype.mergeChildComponentProtoViews, "parameters", {get: function() {
    return [[ProtoViewRef], [assert.genericType(List, ProtoViewRef)]];
  }});
Object.defineProperty(Renderer.prototype.createViewInContainer, "parameters", {get: function() {
    return [[ViewContainerRef], [assert.type.number], [ProtoViewRef]];
  }});
Object.defineProperty(Renderer.prototype.destroyViewInContainer, "parameters", {get: function() {
    return [[ViewContainerRef], [assert.type.number]];
  }});
Object.defineProperty(Renderer.prototype.insertViewIntoContainer, "parameters", {get: function() {
    return [[ViewContainerRef], [assert.type.number], [ViewRef]];
  }});
Object.defineProperty(Renderer.prototype.detachViewFromContainer, "parameters", {get: function() {
    return [[ViewContainerRef], [assert.type.number]];
  }});
Object.defineProperty(Renderer.prototype.createDynamicComponentView, "parameters", {get: function() {
    return [[ViewRef], [assert.type.number], [ProtoViewRef]];
  }});
Object.defineProperty(Renderer.prototype.destroyDynamicComponentView, "parameters", {get: function() {
    return [[ViewRef], [assert.type.number]];
  }});
Object.defineProperty(Renderer.prototype.createInPlaceHostView, "parameters", {get: function() {
    return [[ViewRef], [], [ProtoViewRef]];
  }});
Object.defineProperty(Renderer.prototype.destroyInPlaceHostView, "parameters", {get: function() {
    return [[ViewRef], [ViewRef]];
  }});
Object.defineProperty(Renderer.prototype.setElementProperty, "parameters", {get: function() {
    return [[ViewRef], [assert.type.number], [assert.type.string], [assert.type.any]];
  }});
Object.defineProperty(Renderer.prototype.setText, "parameters", {get: function() {
    return [[ViewRef], [assert.type.number], [assert.type.string]];
  }});
Object.defineProperty(Renderer.prototype.setEventDispatcher, "parameters", {get: function() {
    return [[ViewRef], [assert.type.any]];
  }});
export class EventDispatcher {
  dispatchEvent(elementIndex, eventName, locals) {}
}
Object.defineProperty(EventDispatcher.prototype.dispatchEvent, "parameters", {get: function() {
    return [[assert.type.number], [assert.type.string], [assert.genericType(Map, assert.type.string, assert.type.any)]];
  }});
//# sourceMappingURL=api.js.map

//# sourceMappingURL=./api.map