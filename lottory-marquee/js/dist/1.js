(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by lenovo on 2017/7/12.
     */
    var aa = (function () {
        function aa() {
        }
        return aa;
    }());
    exports.default = aa;
});
//# sourceMappingURL=1.js.map