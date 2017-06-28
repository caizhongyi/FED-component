import {Injectable,
  Inject,
  OpaqueToken,
  Injector} from 'angular2/di';
import {ListWrapper,
  MapWrapper,
  Map,
  StringMapWrapper,
  List} from 'angular2/src/facade/collection';
import * as eli from './element_injector';
import {isPresent,
  isBlank,
  BaseException} from 'angular2/src/facade/lang';
import * as vcModule from './view_container';
import * as viewModule from './view';
import {BindingPropagationConfig,
  Locals} from 'angular2/change_detection';
import * as renderApi from 'angular2/src/render/api';
import {ViewFactory} from 'angular2/src/core/compiler/view_factory';
export class AppViewHydrator {
  constructor(renderer, viewFactory) {
    this._renderer = renderer;
    this._viewFactory = viewFactory;
  }
  hydrateDynamicComponentView(location, componentView, componentDirective, injector) {
    var hostView = location.hostView;
    var boundElementIndex = location.boundElementIndex;
    var binder = hostView.proto.elementBinders[boundElementIndex];
    if (!binder.hasDynamicComponent()) {
      throw new BaseException(`There is no dynamic component directive at element ${boundElementIndex}`);
    }
    if (isPresent(hostView.componentChildViews[boundElementIndex])) {
      throw new BaseException(`There already is a bound component at element ${boundElementIndex}`);
    }
    var hostElementInjector = hostView.elementInjectors[boundElementIndex];
    if (isBlank(injector)) {
      injector = hostElementInjector.getLightDomAppInjector();
    }
    var shadowDomAppInjector = this._createShadowDomAppInjector(componentDirective, injector);
    if (isBlank(shadowDomAppInjector)) {
      shadowDomAppInjector = null;
    }
    var component = hostElementInjector.dynamicallyCreateComponent(componentDirective, shadowDomAppInjector);
    hostView.componentChildViews[boundElementIndex] = componentView;
    hostView.changeDetector.addShadowDomChild(componentView.changeDetector);
    var renderViewRefs = this._renderer.createDynamicComponentView(hostView.render, boundElementIndex, componentView.proto.render);
    this._viewHydrateRecurse(componentView, renderViewRefs, 0, shadowDomAppInjector, hostElementInjector, component, null);
  }
  dehydrateDynamicComponentView(parentView, boundElementIndex) {
    throw new BaseException('Not yet implemented!');
  }
  hydrateInPlaceHostView(parentComponentLocation, hostElementSelector, hostView, injector) {
    var parentRenderViewRef = null;
    if (isPresent(parentComponentLocation)) {
      var parentView = parentComponentLocation.hostView.componentChildViews[parentComponentLocation.boundElementIndex];
      parentRenderViewRef = parentView.render;
      parentView.changeDetector.addChild(hostView.changeDetector);
      ListWrapper.push(parentView.imperativeHostViews, hostView);
      if (isBlank(injector)) {
        injector = parentComponentLocation.injector;
      }
    }
    var binder = hostView.proto.elementBinders[0];
    var shadowDomAppInjector = this._createShadowDomAppInjector(binder.componentDirective, injector);
    var renderViewRefs = this._renderer.createInPlaceHostView(parentRenderViewRef, hostElementSelector, hostView.proto.render);
    this._viewHydrateRecurse(hostView, renderViewRefs, 0, shadowDomAppInjector, null, new Object(), null);
  }
  dehydrateInPlaceHostView(parentComponentLocation, hostView) {
    var parentRenderViewRef = null;
    if (isPresent(parentComponentLocation)) {
      var parentView = parentComponentLocation.hostView.componentChildViews[parentComponentLocation.boundElementIndex];
      parentRenderViewRef = parentView.render;
      ListWrapper.remove(parentView.imperativeHostViews, hostView);
      parentView.changeDetector.removeChild(hostView.changeDetector);
    }
    var render = hostView.render;
    this._viewDehydrateRecurse(hostView);
    this._renderer.destroyInPlaceHostView(parentRenderViewRef, render);
  }
  hydrateViewInViewContainer(viewContainer, atIndex, view, injector = null) {
    if (!viewContainer.hydrated())
      throw new BaseException('Cannot create views on a dehydrated ViewContainer');
    if (isBlank(injector)) {
      injector = viewContainer.elementInjector.getLightDomAppInjector();
    }
    var renderViewRefs = this._renderer.createViewInContainer(viewContainer.getRender(), atIndex, view.proto.render);
    viewContainer.parentView.changeDetector.addChild(view.changeDetector);
    this._viewHydrateRecurse(view, renderViewRefs, 0, injector, viewContainer.elementInjector.getHost(), viewContainer.parentView.context, viewContainer.parentView.locals);
  }
  dehydrateViewInViewContainer(viewContainer, atIndex, view) {
    view.changeDetector.remove();
    this._viewDehydrateRecurse(view);
    this._renderer.destroyViewInContainer(viewContainer.getRender(), atIndex);
  }
  _viewHydrateRecurse(view, renderComponentViewRefs, renderComponentIndex, appInjector, hostElementInjector, context, locals) {
    if (view.hydrated())
      throw new BaseException('The view is already hydrated.');
    view.viewHydrator = this;
    view.render = renderComponentViewRefs[renderComponentIndex++];
    view.context = context;
    view.locals.parent = locals;
    var binders = view.proto.elementBinders;
    for (var i = 0; i < binders.length; ++i) {
      var componentDirective = binders[i].componentDirective;
      var shadowDomAppInjector = null;
      if (isPresent(componentDirective)) {
        shadowDomAppInjector = this._createShadowDomAppInjector(componentDirective, appInjector);
      } else {
        shadowDomAppInjector = null;
      }
      var elementInjector = view.elementInjectors[i];
      if (isPresent(elementInjector)) {
        elementInjector.instantiateDirectives(appInjector, hostElementInjector, shadowDomAppInjector, view.preBuiltObjects[i]);
        this._setUpEventEmitters(view, elementInjector, i);
        var exportImplicitName = elementInjector.getExportImplicitName();
        if (elementInjector.isExportingComponent()) {
          view.locals.set(exportImplicitName, elementInjector.getComponent());
        } else if (elementInjector.isExportingElement()) {
          view.locals.set(exportImplicitName, elementInjector.getNgElement().domElement);
        }
      }
      if (binders[i].hasStaticComponent()) {
        renderComponentIndex = this._viewHydrateRecurse(view.componentChildViews[i], renderComponentViewRefs, renderComponentIndex, shadowDomAppInjector, elementInjector, elementInjector.getComponent(), null);
      }
    }
    view.changeDetector.hydrate(view.context, view.locals, view);
    view.renderer.setEventDispatcher(view.render, view);
    return renderComponentIndex;
  }
  _setUpEventEmitters(view, elementInjector, boundElementIndex) {
    var emitters = elementInjector.getEventEmitterAccessors();
    for (var directiveIndex = 0; directiveIndex < emitters.length; ++directiveIndex) {
      var directiveEmitters = emitters[directiveIndex];
      var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
      for (var eventIndex = 0; eventIndex < directiveEmitters.length; ++eventIndex) {
        var eventEmitterAccessor = directiveEmitters[eventIndex];
        eventEmitterAccessor.subscribe(view, boundElementIndex, directive);
      }
    }
  }
  _viewDehydrateRecurse(view) {
    for (var i = 0; i < view.componentChildViews.length; i++) {
      var componentView = view.componentChildViews[i];
      if (isPresent(componentView)) {
        this._viewDehydrateRecurse(componentView);
        var binder = view.proto.elementBinders[i];
        if (binder.hasDynamicComponent()) {
          view.changeDetector.removeShadowDomChild(componentView.changeDetector);
          view.componentChildViews[i] = null;
          this._viewFactory.returnView(componentView);
        }
      }
    }
    for (var i = 0; i < view.imperativeHostViews.length; i++) {
      var hostView = view.imperativeHostViews[i];
      this._viewDehydrateRecurse(hostView);
      view.changeDetector.removeChild(hostView.changeDetector);
      this._viewFactory.returnView(hostView);
    }
    view.imperativeHostViews = [];
    for (var i = 0; i < view.elementInjectors.length; i++) {
      if (isPresent(view.elementInjectors[i])) {
        view.elementInjectors[i].clearDirectives();
      }
    }
    if (isPresent(view.viewContainers)) {
      for (var i = 0; i < view.viewContainers.length; i++) {
        var vc = view.viewContainers[i];
        if (isPresent(vc)) {
          this._viewContainerDehydrateRecurse(vc);
        }
      }
    }
    view.render = null;
    if (isPresent(view.locals)) {
      view.locals.clearValues();
    }
    view.context = null;
    view.changeDetector.dehydrate();
  }
  _createShadowDomAppInjector(componentDirective, appInjector) {
    var shadowDomAppInjector = null;
    var injectables = componentDirective.resolvedInjectables;
    if (isPresent(injectables)) {
      shadowDomAppInjector = appInjector.createChildFromResolved(injectables);
    } else {
      shadowDomAppInjector = appInjector;
    }
    return shadowDomAppInjector;
  }
  _viewContainerDehydrateRecurse(viewContainer) {
    for (var i = 0; i < viewContainer.length; i++) {
      var view = viewContainer.get(i);
      view.changeDetector.remove();
      this._viewDehydrateRecurse(view);
    }
    viewContainer.internalClearWithoutRender();
  }
}
Object.defineProperty(AppViewHydrator, "annotations", {get: function() {
    return [new Injectable()];
  }});
Object.defineProperty(AppViewHydrator, "parameters", {get: function() {
    return [[renderApi.Renderer], [ViewFactory]];
  }});
Object.defineProperty(AppViewHydrator.prototype.hydrateDynamicComponentView, "parameters", {get: function() {
    return [[eli.ElementRef], [viewModule.AppView], [eli.DirectiveBinding], [Injector]];
  }});
Object.defineProperty(AppViewHydrator.prototype.dehydrateDynamicComponentView, "parameters", {get: function() {
    return [[viewModule.AppView], [assert.type.number]];
  }});
Object.defineProperty(AppViewHydrator.prototype.hydrateInPlaceHostView, "parameters", {get: function() {
    return [[eli.ElementRef], [], [viewModule.AppView], [Injector]];
  }});
Object.defineProperty(AppViewHydrator.prototype.dehydrateInPlaceHostView, "parameters", {get: function() {
    return [[eli.ElementRef], [viewModule.AppView]];
  }});
Object.defineProperty(AppViewHydrator.prototype.hydrateViewInViewContainer, "parameters", {get: function() {
    return [[vcModule.ViewContainer], [assert.type.number], [viewModule.AppView], [Injector]];
  }});
Object.defineProperty(AppViewHydrator.prototype.dehydrateViewInViewContainer, "parameters", {get: function() {
    return [[vcModule.ViewContainer], [assert.type.number], [viewModule.AppView]];
  }});
Object.defineProperty(AppViewHydrator.prototype._viewHydrateRecurse, "parameters", {get: function() {
    return [[viewModule.AppView], [assert.genericType(List, renderApi.ViewRef)], [assert.type.number], [Injector], [eli.ElementInjector], [Object], [Locals]];
  }});
Object.defineProperty(AppViewHydrator.prototype._setUpEventEmitters, "parameters", {get: function() {
    return [[viewModule.AppView], [eli.ElementInjector], [assert.type.number]];
  }});
Object.defineProperty(AppViewHydrator.prototype._viewDehydrateRecurse, "parameters", {get: function() {
    return [[viewModule.AppView]];
  }});
Object.defineProperty(AppViewHydrator.prototype._viewContainerDehydrateRecurse, "parameters", {get: function() {
    return [[vcModule.ViewContainer]];
  }});
//# sourceMappingURL=view_hydrator.js.map

//# sourceMappingURL=./view_hydrator.map