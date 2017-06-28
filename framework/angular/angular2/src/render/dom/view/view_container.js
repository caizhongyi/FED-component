"use strict";
Object.defineProperties(module.exports, {
  ViewContainer: {get: function() {
      return ViewContainer;
    }},
  __esModule: {value: true}
});
var $__angular2_47_src_47_facade_47_lang__,
    $__angular2_47_src_47_facade_47_collection__,
    $__angular2_47_src_47_dom_47_dom_95_adapter__,
    $__view__;
var $__0 = ($__angular2_47_src_47_facade_47_lang__ = require("angular2/src/facade/lang"), $__angular2_47_src_47_facade_47_lang__ && $__angular2_47_src_47_facade_47_lang__.__esModule && $__angular2_47_src_47_facade_47_lang__ || {default: $__angular2_47_src_47_facade_47_lang__}),
    isPresent = $__0.isPresent,
    isBlank = $__0.isBlank,
    BaseException = $__0.BaseException;
var $__1 = ($__angular2_47_src_47_facade_47_collection__ = require("angular2/src/facade/collection"), $__angular2_47_src_47_facade_47_collection__ && $__angular2_47_src_47_facade_47_collection__.__esModule && $__angular2_47_src_47_facade_47_collection__ || {default: $__angular2_47_src_47_facade_47_collection__}),
    ListWrapper = $__1.ListWrapper,
    MapWrapper = $__1.MapWrapper,
    List = $__1.List;
var DOM = ($__angular2_47_src_47_dom_47_dom_95_adapter__ = require("angular2/src/dom/dom_adapter"), $__angular2_47_src_47_dom_47_dom_95_adapter__ && $__angular2_47_src_47_dom_47_dom_95_adapter__.__esModule && $__angular2_47_src_47_dom_47_dom_95_adapter__ || {default: $__angular2_47_src_47_dom_47_dom_95_adapter__}).DOM;
var viewModule = ($__view__ = require("./view"), $__view__ && $__view__.__esModule && $__view__ || {default: $__view__});
var ViewContainer = function ViewContainer(parentView, boundElementIndex) {
  this.parentView = parentView;
  this.boundElementIndex = boundElementIndex;
  this.views = [];
};
var $ViewContainer = ViewContainer;
($traceurRuntime.createClass)(ViewContainer, {
  get: function(index) {
    return this.views[index];
  },
  size: function() {
    return this.views.length;
  },
  _siblingToInsertAfter: function(index) {
    if (index == 0)
      return this.parentView.boundElements[this.boundElementIndex];
    return ListWrapper.last(this.views[index - 1].rootNodes);
  },
  _checkHydrated: function() {
    if (!this.parentView.hydrated)
      throw new BaseException('Cannot change dehydrated ViewContainer');
  },
  _getDirectParentLightDom: function() {
    return this.parentView.getDirectParentLightDom(this.boundElementIndex);
  },
  clear: function() {
    this._checkHydrated();
    for (var i = this.views.length - 1; i >= 0; i--) {
      this.detach(i);
    }
    if (isPresent(this._getDirectParentLightDom())) {
      this._getDirectParentLightDom().redistribute();
    }
  },
  insert: function(view) {
    var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
    this._checkHydrated();
    if (atIndex == -1)
      atIndex = this.views.length;
    ListWrapper.insert(this.views, atIndex, view);
    if (isBlank(this._getDirectParentLightDom())) {
      $ViewContainer.moveViewNodesAfterSibling(this._siblingToInsertAfter(atIndex), view);
    } else {
      this._getDirectParentLightDom().redistribute();
    }
    if (isPresent(this.parentView.hostLightDom)) {
      this.parentView.hostLightDom.redistribute();
    }
    return view;
  },
  detach: function(atIndex) {
    this._checkHydrated();
    var detachedView = this.get(atIndex);
    ListWrapper.removeAt(this.views, atIndex);
    if (isBlank(this._getDirectParentLightDom())) {
      $ViewContainer.removeViewNodes(detachedView);
    } else {
      this._getDirectParentLightDom().redistribute();
    }
    if (isPresent(this.parentView.hostLightDom)) {
      this.parentView.hostLightDom.redistribute();
    }
    return detachedView;
  },
  contentTagContainers: function() {
    return this.views;
  },
  nodes: function() {
    var r = [];
    for (var i = 0; i < this.views.length; ++i) {
      r = ListWrapper.concat(r, this.views[i].rootNodes);
    }
    return r;
  }
}, {
  moveViewNodesAfterSibling: function(sibling, view) {
    for (var i = view.rootNodes.length - 1; i >= 0; --i) {
      DOM.insertAfter(sibling, view.rootNodes[i]);
    }
  },
  removeViewNodes: function(view) {
    var len = view.rootNodes.length;
    if (len == 0)
      return ;
    var parent = view.rootNodes[0].parentNode;
    for (var i = len - 1; i >= 0; --i) {
      DOM.removeChild(parent, view.rootNodes[i]);
    }
  }
});
Object.defineProperty(ViewContainer, "parameters", {get: function() {
    return [[viewModule.RenderView], [$traceurRuntime.type.number]];
  }});
Object.defineProperty(ViewContainer.prototype.get, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(ViewContainer.prototype._siblingToInsertAfter, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
Object.defineProperty(ViewContainer.prototype.detach, "parameters", {get: function() {
    return [[$traceurRuntime.type.number]];
  }});
//# sourceMappingURL=view_container.js.map

//# sourceMappingURL=./view_container.map