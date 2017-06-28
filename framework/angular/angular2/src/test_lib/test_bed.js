"use strict";
Object.defineProperties(module.exports, {
  TestBed: {get: function() {
      return TestBed;
    }},
  ViewProxy: {get: function() {
      return ViewProxy;
    }},
  __esModule: {value: true}
});
var $__angular2_47_di__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_async__,
    $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_core_47_annotations_47_view__,
    $__angular2_47_src_47_core_47_compiler_47_template_95_resolver__,
    $__angular2_47_src_47_core_47_compiler_47_compiler__,
    $__angular2_47_src_47_core_47_compiler_47_view__,
    $__angular2_47_src_47_core_47_compiler_47_view_95_factory__,
    $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__,
    $__angular2_47_src_47_core_47_compiler_47_element_95_injector__,
    $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__,
    $__utils__,
    $__lang_95_utils__;
var $__0 = ($__angular2_47_di__ = require("angular2/di"), $__angular2_47_di__ && $__angular2_47_di__.__esModule && $__angular2_47_di__ || {default: $__angular2_47_di__}),
    Injector = $__0.Injector,
    bind = $__0.bind;
var $__1 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    Type = $__1.Type,
    isPresent = $__1.isPresent,
    BaseException = $__1.BaseException;
var Promise = ($__angular2_47_src_47_facade_47_async__ = require("angular2/src/facade/async"), $__angular2_47_src_47_facade_47_async__ && $__angular2_47_src_47_facade_47_async__.__esModule && $__angular2_47_src_47_facade_47_async__ || {default: $__angular2_47_src_47_facade_47_async__}).Promise;
var isBlank = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}).isBlank;
var List = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}).List;
var View = ($__angular2_47_src_47_core_47_annotations_47_view__ = require("angular2/src/core/annotations/view"), $__angular2_47_src_47_core_47_annotations_47_view__ && $__angular2_47_src_47_core_47_annotations_47_view__.__esModule && $__angular2_47_src_47_core_47_annotations_47_view__ || {default: $__angular2_47_src_47_core_47_annotations_47_view__}).View;
var TemplateResolver = ($__angular2_47_src_47_core_47_compiler_47_template_95_resolver__ = require("angular2/src/core/compiler/template_resolver"), $__angular2_47_src_47_core_47_compiler_47_template_95_resolver__ && $__angular2_47_src_47_core_47_compiler_47_template_95_resolver__.__esModule && $__angular2_47_src_47_core_47_compiler_47_template_95_resolver__ || {default: $__angular2_47_src_47_core_47_compiler_47_template_95_resolver__}).TemplateResolver;
var Compiler = ($__angular2_47_src_47_core_47_compiler_47_compiler__ = require("angular2/src/core/compiler/compiler"), $__angular2_47_src_47_core_47_compiler_47_compiler__ && $__angular2_47_src_47_core_47_compiler_47_compiler__.__esModule && $__angular2_47_src_47_core_47_compiler_47_compiler__ || {default: $__angular2_47_src_47_core_47_compiler_47_compiler__}).Compiler;
var AppView = ($__angular2_47_src_47_core_47_compiler_47_view__ = require("angular2/src/core/compiler/view"), $__angular2_47_src_47_core_47_compiler_47_view__ && $__angular2_47_src_47_core_47_compiler_47_view__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view__ || {default: $__angular2_47_src_47_core_47_compiler_47_view__}).AppView;
var ViewFactory = ($__angular2_47_src_47_core_47_compiler_47_view_95_factory__ = require("angular2/src/core/compiler/view_factory"), $__angular2_47_src_47_core_47_compiler_47_view_95_factory__ && $__angular2_47_src_47_core_47_compiler_47_view_95_factory__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view_95_factory__ || {default: $__angular2_47_src_47_core_47_compiler_47_view_95_factory__}).ViewFactory;
var AppViewHydrator = ($__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ = require("angular2/src/core/compiler/view_hydrator"), $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ && $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__.__esModule && $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__ || {default: $__angular2_47_src_47_core_47_compiler_47_view_95_hydrator__}).AppViewHydrator;
var DirectiveBinding = ($__angular2_47_src_47_core_47_compiler_47_element_95_injector__ = require("angular2/src/core/compiler/element_injector"), $__angular2_47_src_47_core_47_compiler_47_element_95_injector__ && $__angular2_47_src_47_core_47_compiler_47_element_95_injector__.__esModule && $__angular2_47_src_47_core_47_compiler_47_element_95_injector__ || {default: $__angular2_47_src_47_core_47_compiler_47_element_95_injector__}).DirectiveBinding;
var DirectiveMetadataReader = ($__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ = require("angular2/src/core/compiler/directive_metadata_reader"), $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ && $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__.__esModule && $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__ || {default: $__angular2_47_src_47_core_47_compiler_47_directive_95_metadata_95_reader__}).DirectiveMetadataReader;
var $__13 = ($__utils__ = require("./utils"), $__utils__ && $__utils__.__esModule && $__utils__ || {default: $__utils__}),
    queryView = $__13.queryView,
    viewRootNodes = $__13.viewRootNodes,
    el = $__13.el;
var $__14 = ($__lang_95_utils__ = require("./lang_utils"), $__lang_95_utils__ && $__lang_95_utils__.__esModule && $__lang_95_utils__ || {default: $__lang_95_utils__}),
    instantiateType = $__14.instantiateType,
    getTypeOf = $__14.getTypeOf;
var TestBed = function TestBed(injector) {
  this._injector = injector;
};
($traceurRuntime.createClass)(TestBed, {
  overrideView: function(component, template) {
    this._injector.get(TemplateResolver).setView(component, template);
  },
  setInlineTemplate: function(component, html) {
    this._injector.get(TemplateResolver).setInlineTemplate(component, html);
  },
  overrideDirective: function(component, from, to) {
    this._injector.get(TemplateResolver).overrideTemplateDirective(component, from, to);
  },
  createView: function(component) {
    var $__18,
        $__19;
    var $__17 = arguments[1] !== (void 0) ? arguments[1] : {},
        context = ($__18 = $__17.context) === void 0 ? null : $__18,
        html = ($__19 = $__17.html) === void 0 ? null : $__19;
    var $__15 = this;
    if (isBlank(component) && isBlank(context)) {
      throw new BaseException('You must specified at least a component or a context');
    }
    if (isBlank(component)) {
      component = getTypeOf(context);
    } else if (isBlank(context)) {
      context = instantiateType(component);
    }
    if (isPresent(html)) {
      this.setInlineTemplate(component, html);
    }
    var rootEl = el('<div></div>');
    var metadataReader = this._injector.get(DirectiveMetadataReader);
    var componentBinding = DirectiveBinding.createFromBinding(bind(component).toValue(context), metadataReader.read(component).annotation);
    return this._injector.get(Compiler).compileInHost(componentBinding).then((function(pv) {
      var viewFactory = $__15._injector.get(ViewFactory);
      var viewHydrator = $__15._injector.get(AppViewHydrator);
      var hostView = viewFactory.getView(pv);
      viewHydrator.hydrateInPlaceHostView(null, rootEl, hostView, $__15._injector);
      return new ViewProxy($__15._injector, hostView.componentChildViews[0]);
    }));
  }
}, {});
Object.defineProperty(TestBed, "parameters", {get: function() {
    return [[Injector]];
  }});
Object.defineProperty(TestBed.prototype.overrideView, "parameters", {get: function() {
    return [[Type], [View]];
  }});
Object.defineProperty(TestBed.prototype.setInlineTemplate, "parameters", {get: function() {
    return [[Type], [$traceurRuntime.type.string]];
  }});
Object.defineProperty(TestBed.prototype.overrideDirective, "parameters", {get: function() {
    return [[Type], [Type], [Type]];
  }});
Object.defineProperty(TestBed.prototype.createView, "parameters", {get: function() {
    return [[Type], []];
  }});
var ViewProxy = function ViewProxy(injector, view) {
  this._view = view;
  this._injector = injector;
};
($traceurRuntime.createClass)(ViewProxy, {
  get context() {
    return this._view.context;
  },
  get rootNodes() {
    return viewRootNodes(this._view);
  },
  detectChanges: function() {
    this._view.changeDetector.detectChanges();
  },
  querySelector: function(selector) {
    return queryView(this._view, selector);
  },
  destroy: function() {
    var viewHydrator = this._injector.get(AppViewHydrator);
    viewHydrator.dehydrateInPlaceHostView(null, this._view);
  },
  get rawView() {
    return this._view;
  }
}, {});
Object.defineProperty(ViewProxy, "parameters", {get: function() {
    return [[Injector], [AppView]];
  }});
//# sourceMappingURL=test_bed.js.map

//# sourceMappingURL=./test_bed.map