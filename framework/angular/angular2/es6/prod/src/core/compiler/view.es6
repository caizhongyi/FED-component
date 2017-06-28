import {ListWrapper,
  MapWrapper,
  Map,
  StringMapWrapper,
  List} from 'angular2/src/facade/collection';
import {AST,
  Locals,
  ChangeDispatcher,
  ProtoChangeDetector,
  ChangeDetector,
  ChangeRecord,
  BindingRecord,
  DirectiveRecord,
  ChangeDetectorRef} from 'angular2/change_detection';
import {ProtoElementInjector,
  ElementInjector,
  PreBuiltObjects,
  DirectiveBinding} from './element_injector';
import {ElementBinder} from './element_binder';
import {SetterFn} from 'angular2/src/reflection/types';
import {IMPLEMENTS,
  int,
  isPresent,
  isBlank,
  BaseException} from 'angular2/src/facade/lang';
import {ViewContainer} from './view_container';
import * as renderApi from 'angular2/src/render/api';
import * as vfModule from './view_factory';
import * as vhModule from './view_hydrator';
export class AppView {
  constructor(renderer, viewFactory, proto, protoLocals) {
    this.render = null;
    this.proto = proto;
    this.changeDetector = null;
    this.elementInjectors = null;
    this.rootElementInjectors = null;
    this.componentChildViews = null;
    this.viewContainers = ListWrapper.createFixedSize(this.proto.elementBinders.length);
    this.preBuiltObjects = null;
    this.context = null;
    this.locals = new Locals(null, MapWrapper.clone(protoLocals));
    this.renderer = renderer;
    this.viewFactory = viewFactory;
    this.viewHydrator = null;
    this.imperativeHostViews = [];
  }
  init(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews) {
    this.changeDetector = changeDetector;
    this.elementInjectors = elementInjectors;
    this.rootElementInjectors = rootElementInjectors;
    this.preBuiltObjects = preBuiltObjects;
    this.componentChildViews = componentChildViews;
  }
  getOrCreateViewContainer(boundElementIndex) {
    var viewContainer = this.viewContainers[boundElementIndex];
    if (isBlank(viewContainer)) {
      viewContainer = new ViewContainer(this, this.proto.elementBinders[boundElementIndex].nestedProtoView, this.elementInjectors[boundElementIndex]);
      this.viewContainers[boundElementIndex] = viewContainer;
    }
    return viewContainer;
  }
  setLocal(contextName, value) {
    if (!this.hydrated())
      throw new BaseException('Cannot set locals on dehydrated view.');
    if (!MapWrapper.contains(this.proto.variableBindings, contextName)) {
      return ;
    }
    var templateName = MapWrapper.get(this.proto.variableBindings, contextName);
    this.locals.set(templateName, value);
  }
  hydrated() {
    return isPresent(this.context);
  }
  triggerEventHandlers(eventName, eventObj, binderIndex) {
    var locals = MapWrapper.create();
    MapWrapper.set(locals, '$event', eventObj);
    this.dispatchEvent(binderIndex, eventName, locals);
  }
  notifyOnBinding(b, currentValue) {
    if (b.isElement()) {
      this.renderer.setElementProperty(this.render, b.elementIndex, b.propertyName, currentValue);
    } else {
      this.renderer.setText(this.render, b.elementIndex, currentValue);
    }
  }
  getDirectiveFor(directive) {
    var elementInjector = this.elementInjectors[directive.elementIndex];
    return elementInjector.getDirectiveAtIndex(directive.directiveIndex);
  }
  getDetectorFor(directive) {
    var elementInjector = this.elementInjectors[directive.elementIndex];
    return elementInjector.getChangeDetector();
  }
  dispatchEvent(elementIndex, eventName, locals) {
    var allowDefaultBehavior = true;
    if (this.hydrated()) {
      var elBinder = this.proto.elementBinders[elementIndex];
      if (isBlank(elBinder.hostListeners))
        return allowDefaultBehavior;
      var eventMap = elBinder.hostListeners[eventName];
      if (isBlank(eventMap))
        return allowDefaultBehavior;
      MapWrapper.forEach(eventMap, (expr, directiveIndex) => {
        var context;
        if (directiveIndex === -1) {
          context = this.context;
        } else {
          context = this.elementInjectors[elementIndex].getDirectiveAtIndex(directiveIndex);
        }
        var result = expr.eval(context, new Locals(this.locals, locals));
        if (isPresent(result)) {
          allowDefaultBehavior = allowDefaultBehavior && result;
        }
      });
    }
    return allowDefaultBehavior;
  }
}
Object.defineProperty(AppView, "annotations", {get: function() {
    return [new IMPLEMENTS(ChangeDispatcher)];
  }});
Object.defineProperty(AppView, "parameters", {get: function() {
    return [[renderApi.Renderer], [vfModule.ViewFactory], [AppProtoView], [Map]];
  }});
Object.defineProperty(AppView.prototype.init, "parameters", {get: function() {
    return [[ChangeDetector], [List], [List], [List], [List]];
  }});
Object.defineProperty(AppView.prototype.getOrCreateViewContainer, "parameters", {get: function() {
    return [[assert.type.number]];
  }});
Object.defineProperty(AppView.prototype.setLocal, "parameters", {get: function() {
    return [[assert.type.string], []];
  }});
Object.defineProperty(AppView.prototype.triggerEventHandlers, "parameters", {get: function() {
    return [[assert.type.string], [], [int]];
  }});
Object.defineProperty(AppView.prototype.notifyOnBinding, "parameters", {get: function() {
    return [[BindingRecord], [assert.type.any]];
  }});
Object.defineProperty(AppView.prototype.getDirectiveFor, "parameters", {get: function() {
    return [[DirectiveRecord]];
  }});
Object.defineProperty(AppView.prototype.getDetectorFor, "parameters", {get: function() {
    return [[DirectiveRecord]];
  }});
Object.defineProperty(AppView.prototype.dispatchEvent, "parameters", {get: function() {
    return [[assert.type.number], [assert.type.string], [assert.genericType(Map, assert.type.string, assert.type.any)]];
  }});
export class AppProtoView {
  constructor(render, protoChangeDetector) {
    this.render = render;
    this.elementBinders = [];
    this.variableBindings = MapWrapper.create();
    this.protoLocals = MapWrapper.create();
    this.protoChangeDetector = protoChangeDetector;
    this.parentProtoView = null;
    this.textNodesWithBindingCount = 0;
    this.bindings = [];
    this._directiveRecordsMap = MapWrapper.create();
    this._variableBindings = null;
    this._directiveRecords = null;
  }
  getVariableBindings() {
    if (isPresent(this._variableBindings)) {
      return this._variableBindings;
    }
    this._variableBindings = isPresent(this.parentProtoView) ? ListWrapper.clone(this.parentProtoView.getVariableBindings()) : [];
    MapWrapper.forEach(this.protoLocals, (v, local) => {
      ListWrapper.push(this._variableBindings, local);
    });
    return this._variableBindings;
  }
  getdirectiveRecords() {
    if (isPresent(this._directiveRecords)) {
      return this._directiveRecords;
    }
    this._directiveRecords = [];
    for (var injectorIndex = 0; injectorIndex < this.elementBinders.length; ++injectorIndex) {
      var pei = this.elementBinders[injectorIndex].protoElementInjector;
      if (isPresent(pei)) {
        for (var directiveIndex = 0; directiveIndex < pei.numberOfDirectives; ++directiveIndex) {
          ListWrapper.push(this._directiveRecords, this._getDirectiveRecord(injectorIndex, directiveIndex));
        }
      }
    }
    return this._directiveRecords;
  }
  bindVariable(contextName, templateName) {
    MapWrapper.set(this.variableBindings, contextName, templateName);
    MapWrapper.set(this.protoLocals, templateName, null);
  }
  bindElement(parent, distanceToParent, protoElementInjector, componentDirective = null, viewportDirective = null) {
    var elBinder = new ElementBinder(this.elementBinders.length, parent, distanceToParent, protoElementInjector, componentDirective, viewportDirective);
    ListWrapper.push(this.elementBinders, elBinder);
    return elBinder;
  }
  bindTextNode(expression) {
    var textNodeIndex = this.textNodesWithBindingCount++;
    var b = BindingRecord.createForTextNode(expression, textNodeIndex);
    ListWrapper.push(this.bindings, b);
  }
  bindElementProperty(expression, setterName) {
    var elementIndex = this.elementBinders.length - 1;
    var b = BindingRecord.createForElement(expression, elementIndex, setterName);
    ListWrapper.push(this.bindings, b);
  }
  bindEvent(eventBindings, directiveIndex = -1) {
    var elBinder = this.elementBinders[this.elementBinders.length - 1];
    var events = elBinder.hostListeners;
    if (isBlank(events)) {
      events = StringMapWrapper.create();
      elBinder.hostListeners = events;
    }
    for (var i = 0; i < eventBindings.length; i++) {
      var eventBinding = eventBindings[i];
      var eventName = eventBinding.fullName;
      var event = StringMapWrapper.get(events, eventName);
      if (isBlank(event)) {
        event = MapWrapper.create();
        StringMapWrapper.set(events, eventName, event);
      }
      MapWrapper.set(event, directiveIndex, eventBinding.source);
    }
  }
  bindDirectiveProperty(directiveIndex, expression, setterName, setter) {
    var elementIndex = this.elementBinders.length - 1;
    var directiveRecord = this._getDirectiveRecord(elementIndex, directiveIndex);
    var b = BindingRecord.createForDirective(expression, setterName, setter, directiveRecord);
    ListWrapper.push(this.bindings, b);
  }
  _getDirectiveRecord(elementInjectorIndex, directiveIndex) {
    var id = elementInjectorIndex * 100 + directiveIndex;
    var protoElementInjector = this.elementBinders[elementInjectorIndex].protoElementInjector;
    if (!MapWrapper.contains(this._directiveRecordsMap, id)) {
      var binding = protoElementInjector.getDirectiveBindingAtIndex(directiveIndex);
      var changeDetection = binding.changeDetection;
      MapWrapper.set(this._directiveRecordsMap, id, new DirectiveRecord(elementInjectorIndex, directiveIndex, binding.callOnAllChangesDone, binding.callOnChange, changeDetection));
    }
    return MapWrapper.get(this._directiveRecordsMap, id);
  }
}
Object.defineProperty(AppProtoView, "parameters", {get: function() {
    return [[renderApi.ProtoViewRef], [ProtoChangeDetector]];
  }});
Object.defineProperty(AppProtoView.prototype.bindVariable, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(AppProtoView.prototype.bindElement, "parameters", {get: function() {
    return [[ElementBinder], [int], [ProtoElementInjector], [DirectiveBinding], [DirectiveBinding]];
  }});
Object.defineProperty(AppProtoView.prototype.bindTextNode, "parameters", {get: function() {
    return [[AST]];
  }});
Object.defineProperty(AppProtoView.prototype.bindElementProperty, "parameters", {get: function() {
    return [[AST], [assert.type.string]];
  }});
Object.defineProperty(AppProtoView.prototype.bindEvent, "parameters", {get: function() {
    return [[assert.genericType(List, renderApi.EventBinding)], [int]];
  }});
Object.defineProperty(AppProtoView.prototype.bindDirectiveProperty, "parameters", {get: function() {
    return [[assert.type.number], [AST], [assert.type.string], [SetterFn]];
  }});
Object.defineProperty(AppProtoView.prototype._getDirectiveRecord, "parameters", {get: function() {
    return [[assert.type.number], [assert.type.number]];
  }});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=./view.map