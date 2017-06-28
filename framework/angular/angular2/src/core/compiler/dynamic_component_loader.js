"use strict";
Object.defineProperties(module.exports, {
  ComponentRef: {get: function() {
      return ComponentRef;
    }},
  DynamicComponentLoader: {get: function() {
      return DynamicComponentLoader;
    }},
  __esModule: {value: true}
});
var $__angular2_47_di__,
    $__compiler__,
    $__directive_95_metadata_95_reader__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_core_47_annotations_47_annotations__,
    $__angular2_47_src_47_core_47_compiler_47_view_95_factory__,
    $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__,
    $__element_95_injector__,
    $__view__;
var $__0 = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}),
    Key = $__0.Key,
    Injector = $__0.Injector,
    Injectable = $__0.Injectable,
    ResolvedBinding = $__0.ResolvedBinding;
var Compiler = ($__compiler__ = require("./compiler"), $__compiler__ && $__compiler__.__esModule && $__compiler__ || {default: $__compiler__}).Compiler;
var DirectiveMetadataReader = ($__directive_95_metadata_95_reader__ = require("./directive_metadata_reader"), $__directive_95_metadata_95_reader__ && $__directive_95_metadata_95_reader__.__esModule && $__directive_95_metadata_95_reader__ || {default: $__directive_95_metadata_95_reader__}).DirectiveMetadataReader;
var $__3 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    Type = $__3.Type,
    BaseException = $__3.BaseException,
    stringify = $__3.stringify,
    isPresent = $__3.isPresent;
var Promise = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}).Promise;
var Component = ($__angular2_47_src_47_core_47_annotations_47_annotations__ = require("angular2/src/core/annotations/annotations"), $__angular2_47_src_47_core_47_annotations_47_annotations__ && $__angular2_47_src_47_core_47_annotations_47_annotations__.__esModule && $__angular2_47_src_47_core_47_annotations_47_annotations__ || {default: $__angular2_47_src_47_core_47_annotations_47_annotations__}).Component;
var ViewFactory = ($__angular2_47_src_47_core_47_compiler_47_view_95_factory__ = require("angular2/src/core/compiler/view_factory"), $__angular2_47_src_47_core_47_compiler_47_view_95_factory__ && $__angular2_47_src_47_core_47_compiler_47_view_95_factory__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view_95_factory__ || {default: $__angular2_47_src_47_core_47_compiler_47_view_95_factory__}).ViewFactory;
var AppViewHydrator = ($__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ = require("angular2/src/core/compiler/view_hydrator"), $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ && $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ || {default: $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__}).AppViewHydrator;
var $__8 = ($__element_95_injector__ = require("./element_injector"), $__element_95_injector__ && $__element_95_injector__.__esModule && $__element_95_injector__ || {default: $__element_95_injector__}),
    ElementRef = $__8.ElementRef,
    DirectiveBinding = $__8.DirectiveBinding;
var AppView = ($__view__ = require("./view"), $__view__ && $__view__.__esModule && $__view__ || {default: $__view__}).AppView;
var ComponentRef = function ComponentRef(location, instance, componentView, dispose) {
  this.location = location;
  this.instance = instance;
  this.componentView = componentView;
  this._dispose = dispose;
};
($traceurRuntime.createClass)(ComponentRef, {
  get injector() {
    return this.location.injector;
  },
  get hostView() {
    return this.location.hostView;
  },
  dispose: function() {
    this._dispose();
  }
}, {});
Object.defineProperty(ComponentRef, "parameters", {get: function() {
    return [[ElementRef], [$traceurRuntime.type.any], [AppView], [Function]];
  }});
var DynamicComponentLoader = function DynamicComponentLoader(compiler, directiveMetadataReader, viewFactory, viewHydrator) {
  this._compiler = compiler;
  this._directiveMetadataReader = directiveMetadataReader;
  this._viewFactory = viewFactory;
  this._viewHydrator = viewHydrator;
};
($traceurRuntime.createClass)(DynamicComponentLoader, {
  loadIntoExistingLocation: function(type, location) {
    var injector = arguments[2] !== (void 0) ? arguments[2] : null;
    var $__10 = this;
    this._assertTypeIsComponent(type);
    var annotation = this._directiveMetadataReader.read(type).annotation;
    var componentBinding = DirectiveBinding.createFromType(type, annotation);
    return this._compiler.compile(type).then((function(componentProtoView) {
      var componentView = $__10._viewFactory.getView(componentProtoView);
      $__10._viewHydrator.hydrateDynamicComponentView(location, componentView, componentBinding, injector);
      var dispose = (function() {
        throw new BaseException("Not implemented");
      });
      return new ComponentRef(location, location.elementInjector.getDynamicallyLoadedComponent(), componentView, dispose);
    }));
  },
  loadIntoNewLocation: function(type, parentComponentLocation, elementOrSelector) {
    var injector = arguments[3] !== (void 0) ? arguments[3] : null;
    var $__10 = this;
    this._assertTypeIsComponent(type);
    return this._compiler.compileInHost(type).then((function(hostProtoView) {
      var hostView = $__10._viewFactory.getView(hostProtoView);
      $__10._viewHydrator.hydrateInPlaceHostView(parentComponentLocation, elementOrSelector, hostView, injector);
      var newLocation = hostView.elementInjectors[0].getElementRef();
      var component = hostView.elementInjectors[0].getComponent();
      var dispose = (function() {
        $__10._viewHydrator.dehydrateInPlaceHostView(parentComponentLocation, hostView);
        $__10._viewFactory.returnView(hostView);
      });
      return new ComponentRef(newLocation, component, hostView.componentChildViews[0], dispose);
    }));
  },
  loadNextToExistingLocation: function(type, location) {
    var injector = arguments[2] !== (void 0) ? arguments[2] : null;
    this._assertTypeIsComponent(type);
    return this._compiler.compileInHost(type).then((function(hostProtoView) {
      var hostView = location.viewContainer.create(-1, hostProtoView, injector);
      var newLocation = hostView.elementInjectors[0].getElementRef();
      var component = hostView.elementInjectors[0].getComponent();
      var dispose = (function() {
        var index = location.viewContainer.indexOf(hostView);
        location.viewContainer.remove(index);
      });
      return new ComponentRef(newLocation, component, hostView.componentChildViews[0], dispose);
    }));
  },
  _assertTypeIsComponent: function(type) {
    var annotation = this._directiveMetadataReader.read(type).annotation;
    if (!(annotation instanceof Component)) {
      throw new BaseException(("Could not load '" + stringify(type) + "' because it is not a component."));
    }
  }
}, {});
Object.defineProperty(DynamicComponentLoader, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(DynamicComponentLoader, "parameters", {get: function() {
    return [[Compiler], [DirectiveMetadataReader], [ViewFactory], [AppViewHydrator]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype.loadIntoExistingLocation, "parameters", {get: function() {
    return [[Type], [ElementRef], [Injector]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype.loadIntoNewLocation, "parameters", {get: function() {
    return [[Type], [ElementRef], [$traceurRuntime.type.any], [Injector]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype.loadNextToExistingLocation, "parameters", {get: function() {
    return [[Type], [ElementRef], [Injector]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype._assertTypeIsComponent, "parameters", {get: function() {
    return [[Type]];
  }});
//# sourceMappingURL=dynamic_component_loader.js.map

//# sourceMappingURL=./dynamic_component_loader.map