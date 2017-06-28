import {assert} from "rtts_assert/rtts_assert";
import {Key,
  Injector,
  Injectable,
  ResolvedBinding} from 'angular2/di';
import {Compiler} from './compiler';
import {DirectiveMetadataReader} from './directive_metadata_reader';
import {Type,
  BaseException,
  stringify,
  isPresent} from 'angular2/src/facade/lang';
import {Promise} from 'angular2/src/facade/async';
import {Component} from 'angular2/src/core/annotations/annotations';
import {ViewFactory} from 'angular2/src/core/compiler/view_factory';
import {AppViewHydrator} from 'angular2/src/core/compiler/view_hydrator';
import {ElementRef,
  DirectiveBinding} from './element_injector';
import {AppView} from './view';
export class ComponentRef {
  constructor(location, instance, componentView, dispose) {
    assert.argumentTypes(location, ElementRef, instance, assert.type.any, componentView, AppView, dispose, Function);
    this.location = location;
    this.instance = instance;
    this.componentView = componentView;
    this._dispose = dispose;
  }
  get injector() {
    return this.location.injector;
  }
  get hostView() {
    return this.location.hostView;
  }
  dispose() {
    this._dispose();
  }
}
Object.defineProperty(ComponentRef, "parameters", {get: function() {
    return [[ElementRef], [assert.type.any], [AppView], [Function]];
  }});
export class DynamicComponentLoader {
  constructor(compiler, directiveMetadataReader, viewFactory, viewHydrator) {
    assert.argumentTypes(compiler, Compiler, directiveMetadataReader, DirectiveMetadataReader, viewFactory, ViewFactory, viewHydrator, AppViewHydrator);
    this._compiler = compiler;
    this._directiveMetadataReader = directiveMetadataReader;
    this._viewFactory = viewFactory;
    this._viewHydrator = viewHydrator;
  }
  loadIntoExistingLocation(type, location, injector = null) {
    assert.argumentTypes(type, Type, location, ElementRef, injector, Injector);
    this._assertTypeIsComponent(type);
    var annotation = this._directiveMetadataReader.read(type).annotation;
    var componentBinding = DirectiveBinding.createFromType(type, annotation);
    return assert.returnType((this._compiler.compile(type).then((componentProtoView) => {
      var componentView = this._viewFactory.getView(componentProtoView);
      this._viewHydrator.hydrateDynamicComponentView(location, componentView, componentBinding, injector);
      var dispose = () => {
        throw new BaseException("Not implemented");
      };
      return new ComponentRef(location, location.elementInjector.getDynamicallyLoadedComponent(), componentView, dispose);
    })), assert.genericType(Promise, ComponentRef));
  }
  loadIntoNewLocation(type, parentComponentLocation, elementOrSelector, injector = null) {
    assert.argumentTypes(type, Type, parentComponentLocation, ElementRef, elementOrSelector, assert.type.any, injector, Injector);
    this._assertTypeIsComponent(type);
    return assert.returnType((this._compiler.compileInHost(type).then((hostProtoView) => {
      var hostView = this._viewFactory.getView(hostProtoView);
      this._viewHydrator.hydrateInPlaceHostView(parentComponentLocation, elementOrSelector, hostView, injector);
      var newLocation = hostView.elementInjectors[0].getElementRef();
      var component = hostView.elementInjectors[0].getComponent();
      var dispose = () => {
        this._viewHydrator.dehydrateInPlaceHostView(parentComponentLocation, hostView);
        this._viewFactory.returnView(hostView);
      };
      return new ComponentRef(newLocation, component, hostView.componentChildViews[0], dispose);
    })), assert.genericType(Promise, ComponentRef));
  }
  loadNextToExistingLocation(type, location, injector = null) {
    assert.argumentTypes(type, Type, location, ElementRef, injector, Injector);
    this._assertTypeIsComponent(type);
    return assert.returnType((this._compiler.compileInHost(type).then((hostProtoView) => {
      var hostView = location.viewContainer.create(-1, hostProtoView, injector);
      var newLocation = hostView.elementInjectors[0].getElementRef();
      var component = hostView.elementInjectors[0].getComponent();
      var dispose = () => {
        var index = location.viewContainer.indexOf(hostView);
        location.viewContainer.remove(index);
      };
      return new ComponentRef(newLocation, component, hostView.componentChildViews[0], dispose);
    })), assert.genericType(Promise, ComponentRef));
  }
  _assertTypeIsComponent(type) {
    assert.argumentTypes(type, Type);
    var annotation = this._directiveMetadataReader.read(type).annotation;
    if (!(annotation instanceof Component)) {
      throw new BaseException(`Could not load '${stringify(type)}' because it is not a component.`);
    }
  }
}
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
    return [[Type], [ElementRef], [assert.type.any], [Injector]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype.loadNextToExistingLocation, "parameters", {get: function() {
    return [[Type], [ElementRef], [Injector]];
  }});
Object.defineProperty(DynamicComponentLoader.prototype._assertTypeIsComponent, "parameters", {get: function() {
    return [[Type]];
  }});
//# sourceMappingURL=dynamic_component_loader.js.map

//# sourceMappingURL=./dynamic_component_loader.map