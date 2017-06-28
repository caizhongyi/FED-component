"use strict";
Object.defineProperties(module.exports, {
  AppView: {get: function() {
      return AppView;
    }},
  AppProtoView: {get: function() {
      return AppProtoView;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_change_95_detection__,
    $__element_95_injector__,
    $__element_95_binder__,
    $__angular2_47_src_47_reflection_47_types__,
    $__angular2_47_src_47_facade_47_lang__,
    $__view_95_container__,
    $__angular2_47_src_47_render_47_api__,
    $__view_95_factory__,
    $__view_95_hydrator__;
var $__0 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    ListWrapper = $__0.ListWrapper,
    MapWrapper = $__0.MapWrapper,
    Map = $__0.Map,
    StringMapWrapper = $__0.StringMapWrapper,
    List = $__0.List;
var $__1 = ($__angular2_47_change_95_detection__ = require("angular2/change_detection"), $__angular2_47_change_95_detection__ && $__angular2_47_change_95_detection__.__esModule && $__angular2_47_change_95_detection__ || {default: $__angular2_47_change_95_detection__}),
    AST = $__1.AST,
    Locals = $__1.Locals,
    ChangeDispatcher = $__1.ChangeDispatcher,
    ProtoChangeDetector = $__1.ProtoChangeDetector,
    ChangeDetector = $__1.ChangeDetector,
    ChangeRecord = $__1.ChangeRecord,
    BindingRecord = $__1.BindingRecord,
    DirectiveRecord = $__1.DirectiveRecord,
    ChangeDetectorRef = $__1.ChangeDetectorRef;
var $__2 = ($__element_95_injector__ = require("./element_injector"), $__element_95_injector__ && $__element_95_injector__.__esModule && $__element_95_injector__ || {default: $__element_95_injector__}),
    ProtoElementInjector = $__2.ProtoElementInjector,
    ElementInjector = $__2.ElementInjector,
    PreBuiltObjects = $__2.PreBuiltObjects,
    DirectiveBinding = $__2.DirectiveBinding;
var ElementBinder = ($__element_95_binder__ = require("./element_binder"), $__element_95_binder__ && $__element_95_binder__.__esModule && $__element_95_binder__ || {default: $__element_95_binder__}).ElementBinder;
var SetterFn = ($__angular2_47_src_47_reflection_47_types__ = require("angular2/src/reflection/types"), $__angular2_47_src_47_reflection_47_types__ && $__angular2_47_src_47_reflection_47_types__.__esModule && $__angular2_47_src_47_reflection_47_types__ || {default: $__angular2_47_src_47_reflection_47_types__}).SetterFn;
var $__5 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    IMPLEMENTS = $__5.IMPLEMENTS,
    int = $__5.int,
    isPresent = $__5.isPresent,
    isBlank = $__5.isBlank,
    BaseException = $__5.BaseException;
var ViewContainer = ($__view_95_container__ = require("./view_container"), $__view_95_container__ && $__view_95_container__.__esModule && $__view_95_container__ || {default: $__view_95_container__}).ViewContainer;
var renderApi = ($__angular2_47_src_47_render_47_api__ = require("angular2/src/render/api"), $__angular2_47_src_47_render_47_api__ && $__angular2_47_src_47_render_47_api__.__esModule && $__angular2_47_src_47_render_47_api__ || {default: $__angular2_47_src_47_render_47_api__});
var vfModule = ($__view_95_factory__ = require("./view_factory"), $__view_95_factory__ && $__view_95_factory__.__esModule && $__view_95_factory__ || {default: $__view_95_factory__});
var vhModule = ($__view_95_hydrator__ = require("./view_hydrator"), $__view_95_hydrator__ && $__view_95_hydrator__.__esModule && $__view_95_hydrator__ || {default: $__view_95_hydrator__});
var AppView = function AppView(renderer, viewFactory, proto, protoLocals) {
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
};
var $AppView = AppView;
($traceurRuntime.createClass)(AppView, {
  init: function(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews) {
    this.changeDetector = changeDetector;
    this.elementInjectors = elementInjectors;
    this.rootElementInjectors = rootElementInjectors;
    this.preBuiltObjects = preBuiltObjects;
    this.componentChildViews = componentChildViews;
  },
  getOrCreateViewContainer: function(boundElementIndex) {
    var viewContainer = this.viewContainers[boundElementIndex];
    if (isBlank(viewContainer)) {
      viewContainer = new ViewContainer(this, this.proto.elementBinders[boundElementIndex].nestedProtoView, this.elementInjectors[boundElementIndex]);
      this.viewContainers[boundElementIndex] = viewContainer;
    }
    return viewContainer;
  },
  setLocal: function(contextName, value) {
    if (!this.hydrated())
      throw new BaseException('Cannot set locals on dehydrated view.');
    if (!MapWrapper.contains(this.proto.variableBindings, contextName)) {
      return ;
    }
    var templateName = MapWrapper.get(this.proto.variableBindings, contextName);
    this.locals.set(templateName, value);
  },
  hydrated: function() {
    return isPresent(this.context);
  },
  triggerEventHandlers: function(eventName, eventObj, binderIndex) {
    var locals = MapWrapper.create();
    MapWrapper.set(locals, '$event', eventObj);
    this.dispatchEvent(binderIndex, eventName, locals);
  },
  notifyOnBinding: function(b, currentValue) {
    if (b.isElement()) {
      this.renderer.setElementProperty(this.render, b.elementIndex, b.propertyName, currentValue);
    } else {
      this.renderer.setText(this.render, b.elementIndex, currentValue);
    }
  },
  getDirectiveFor: function(directive) {
    var elementInjector = this.elementInjectors[directive.elementIndex];
    return elementInjector.getDirectiveAtIndex(directive.directiveIndex);
  },
  getDetectorFor: function(directive) {
    var elementInjector = this.elementInjectors[directive.elementIndex];
    return elementInjector.getChangeDetector();
  },
  dispatchEvent: function(elementIndex, eventName, locals) {
    var $__7 = this;
    var allowDefaultBehavior = true;
    if (this.hydrated()) {
      var elBinder = this.proto.elementBinders[elementIndex];
      if (isBlank(elBinder.hostListeners))
        return allowDefaultBehavior;
      var eventMap = elBinder.hostListeners[eventName];
      if (isBlank(eventMap))
        return allowDefaultBehavior;
      MapWrapper.forEach(eventMap, (function(expr, directiveIndex) {
        var context;
        if (directiveIndex === -1) {
          context = $__7.context;
        } else {
          context = $__7.elementInjectors[elementIndex].getDirectiveAtIndex(directiveIndex);
        }
        var result = expr.eval(context, new Locals($__7.locals, locals));
        if (isPresent(result)) {
          allowDefaultBehavior = allowDefaultBehavior && result;
        }
      }));
    }
    return allowDefaultBehavior;
  }
}, {});
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
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(AppView.prototype.setLocal, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], []];
  }});
Object.defineProperty(AppView.prototype.triggerEventHandlers, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [], [int]];
  }});
Object.defineProperty(AppView.prototype.notifyOnBinding, "parameters", {get: function() {
    return [[BindingRecord], [$traceurRuntime.type.any]];
  }});
Object.defineProperty(AppView.prototype.getDirectiveFor, "parameters", {get: function() {
    return [[DirectiveRecord]];
  }});
Object.defineProperty(AppView.prototype.getDetectorFor, "parameters", {get: function() {
    return [[DirectiveRecord]];
  }});
Object.defineProperty(AppView.prototype.dispatchEvent, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [$traceurRuntime.type.string], [$traceurRuntime.genericType(Map, $traceurRuntime.type.string, $traceurRuntime.type.any)]];
  }});
var AppProtoView = function AppProtoView(render, protoChangeDetector) {
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
};
var $AppProtoView = AppProtoView;
($traceurRuntime.createClass)(AppProtoView, {
  getVariableBindings: function() {
    var $__7 = this;
    if (isPresent(this._variableBindings)) {
      return this._variableBindings;
    }
    this._variableBindings = isPresent(this.parentProtoView) ? ListWrapper.clone(this.parentProtoView.getVariableBindings()) : [];
    MapWrapper.forEach(this.protoLocals, (function(v, local) {
      ListWrapper.push($__7._variableBindings, local);
    }));
    return this._variableBindings;
  },
  getdirectiveRecords: function() {
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
  },
  bindVariable: function(contextName, templateName) {
    MapWrapper.set(this.variableBindings, contextName, templateName);
    MapWrapper.set(this.protoLocals, templateName, null);
  },
  bindElement: function(parent, distanceToParent, protoElementInjector) {
    var componentDirective = arguments[3] !== (void 0) ? arguments[3] : null;
    var viewportDirective = arguments[4] !== (void 0) ? arguments[4] : null;
    var elBinder = new ElementBinder(this.elementBinders.length, parent, distanceToParent, protoElementInjector, componentDirective, viewportDirective);
    ListWrapper.push(this.elementBinders, elBinder);
    return elBinder;
  },
  bindTextNode: function(expression) {
    var textNodeIndex = this.textNodesWithBindingCount++;
    var b = BindingRecord.createForTextNode(expression, textNodeIndex);
    ListWrapper.push(this.bindings, b);
  },
  bindElementProperty: function(expression, setterName) {
    var elementIndex = this.elementBinders.length - 1;
    var b = BindingRecord.createForElement(expression, elementIndex, setterName);
    ListWrapper.push(this.bindings, b);
  },
  bindEvent: function(eventBindings) {
    var directiveIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
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
  },
  bindDirectiveProperty: function(directiveIndex, expression, setterName, setter) {
    var elementIndex = this.elementBinders.length - 1;
    var directiveRecord = this._getDirectiveRecord(elementIndex, directiveIndex);
    var b = BindingRecord.createForDirective(expression, setterName, setter, directiveRecord);
    ListWrapper.push(this.bindings, b);
  },
  _getDirectiveRecord: function(elementInjectorIndex, directiveIndex) {
    var id = elementInjectorIndex * 100 + directiveIndex;
    var protoElementInjector = this.elementBinders[elementInjectorIndex].protoElementInjector;
    if (!MapWrapper.contains(this._directiveRecordsMap, id)) {
      var binding = protoElementInjector.getDirectiveBindingAtIndex(directiveIndex);
      var changeDetection = binding.changeDetection;
      MapWrapper.set(this._directiveRecordsMap, id, new DirectiveRecord(elementInjectorIndex, directiveIndex, binding.callOnAllChangesDone, binding.callOnChange, changeDetection));
    }
    return MapWrapper.get(this._directiveRecordsMap, id);
  }
}, {});
Object.defineProperty(AppProtoView, "parameters", {get: function() {
    return [[renderApi.ProtoViewRef], [ProtoChangeDetector]];
  }});
Object.defineProperty(AppProtoView.prototype.bindVariable, "parameters", {get: function() {
    return [[$traceurRuntime.type.string], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(AppProtoView.prototype.bindElement, "parameters", {get: function() {
    return [[ElementBinder], [int], [ProtoElementInjector], [DirectiveBinding], [DirectiveBinding]];
  }});
Object.defineProperty(AppProtoView.prototype.bindTextNode, "parameters", {get: function() {
    return [[AST]];
  }});
Object.defineProperty(AppProtoView.prototype.bindElementProperty, "parameters", {get: function() {
    return [[AST], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(AppProtoView.prototype.bindEvent, "parameters", {get: function() {
    return [[$traceurRuntime.genericType(List, renderApi.EventBinding)], [int]];
  }});
Object.defineProperty(AppProtoView.prototype.bindDirectiveProperty, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [AST], [$traceurRuntime.type.string], [SetterFn]];
  }});
Object.defineProperty(AppProtoView.prototype._getDirectiveRecord, "parameters", {get: function() {
    return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
  }});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=./view.map