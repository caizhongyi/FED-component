/*
 * json2select 1.0.1
 *
 * Copyright (c) 2008 Shawphy (shawphy.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

; (function($) {
	$.fn.json2select = function(json, dft, name, deep) {
		var _this = this,
		name = name || "sel",
		deep = deep || 0,
		dft = dft || [];
		$("[name=" + name + deep + "]", _this).nextAll().remove();
		if (json[0]) {
			var slct = $("<select name='" + name + $("select", _this).length + "'></select>");
			$("<option value=''>请选择</option>").appendTo(slct);
			$.each(json,
			function(i, sd) {
				$("<option value='" + (sd.v || sd.t) + "'>" + sd.t + "</option>").appendTo(slct).data("s", sd.s || []);
			});
			slct.change(function(e, dftFlag) {
				$(this).val() && _this.json2select($(":selected", this).data("s"), dftFlag ? dft.slice(1) : [], name, $(this).attr("name").match(/\d+/)[0]);
			}).appendTo(_this).val(dft[0] || 0).trigger("change", [true]);
		}
		return _this;
	};
})(jQuery);