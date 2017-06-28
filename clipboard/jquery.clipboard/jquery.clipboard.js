(function($) {
    var flashMinVersion = [8, 0, 0];
    var flashMaxVersion = [9, 999, 999];
    var flashDetectedVersion = [0, 0, 0];
    var swfpath;
    var debugging;
    var flashdetect = function(minVersion, maxVersion) {
        var d = null;
        var minVersionOk = false;
        var maxVersionOk = false;
        if (typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") {
            d = navigator.plugins["Shockwave Flash"].description;
            if (d) {
                d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                flashDetectedVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                flashDetectedVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                if (/r/.test(d)) {
                    flashDetectedVersion[2] = parseInt(d.replace(/^.*r(.*)$/, "$1"), 10);
                } else {
                    flashDetectedVersion[2] = 0;
                }
                if (flashDetectedVersion[0] > minVersion[0] || (flashDetectedVersion[0] == minVersion[0] && flashDetectedVersion[1] > minVersion[1]) || (flashDetectedVersion[0] == minVersion[0] && flashDetectedVersion[1] == minVersion[1] && flashDetectedVersion[2] >= minVersion[2])) {
                    minVersionOk = true;
                }
                if (flashDetectedVersion[0] < maxVersion[0] || (flashDetectedVersion[0] == maxVersion[0] && flashDetectedVersion[1] < maxVersion[1]) || (flashDetectedVersion[0] == maxVersion[0] && flashDetectedVersion[1] == maxVersion[1] && flashDetectedVersion[2] <= maxVersion[2])) {
                    maxVersionOk = true;
                }
                if (minVersionOk && maxVersionOk) {
                    return true;
                }
                return false;
            }
        }
        return false;
    };
    var iecopydetect = function() {
        if (typeof window.clipboardData != "undefined") {
            return true;
        }
    };
    var debug = function(string) {
        if (debugging && typeof console != "undefined" && typeof console.log == "function") {
            console.log(string);
        }
    };
    var swfready = function() {
        if ($.clipboardReady.done) {
            return false;
        }
        if (typeof $.clipboardReady.counter == 'undefined') {
            $.clipboardReady.counter = 0;
        }
        $.clipboardReady.counter++;
        if ($.clipboardReady.counter > 599) {
            clearInterval($.clipboardReady.timer);
            debug("Waited " + $.clipboardReady.counter / 10 + " seconds for Flash object to load, terminating.");
            return false;
        }
        if (($.clipboardReady.counter % 100) == 0) {
            debug("Waited " + $.clipboardReady.counter / 10 + " seconds for Flash object to load so far...");
        }
        var swf = $("#jquery_clipboard_swf:first");
        var swfdom = $(swf).get(0);
        if (typeof swfdom.jqueryClipboardCopy == "function" && swfdom.jqueryClipboardAvailable) {
            clearInterval($.clipboardReady.timer);
            $.clipboardReady.timer = null;
            $.fn.clipboard.method = 'flash';
            for (var i = 0; i < $.clipboardReady.ready.length; i++) {
                $.clipboardReady.ready[i]();
            }
            $.clipboardReady.ready = null;
            $.clipboardReady.done = true;
            debug("jQuery.clipboard: OK. Initialized and ready to copy using Flash method.");
        }
    };
    $.clipboardReady = function(f, options) {
		
        options = jQuery.extend({
            swfpath: "$.fn.clipboard.swf",
            debug: false
        },
        options);
		
        swfpath = options.swfpath;
        debugging = options.debug;
        if (iecopydetect()) {
            $.fn.clipboard.method = 'ie';
            debug("jQuery.clipboard: OK. Initialized and ready to copy using native IE method.");
            return f();
        }
        if ($.clipboardReady.done) {
            return f();
        }
        if ($.clipboardReady.timer) {
            $.clipboardReady.ready.push(f);
        } else {
            if (flashdetect(flashMinVersion, flashMaxVersion)) {
                $("#jquery_clipboard_swf").remove();
                $("#jquery_clipboard_div").remove();
                var div;
                div = $("<div/>").attr("id", "jquery_clipboard_div").css("width", "0").css("height", "0").appendTo("body").html("");
                var swf;
                swf = $('<embed id="jquery_clipboard_swf" name="jquery_clipboard_swf" src="../plugins/' + swfpath + '" type="application/x-shockwave-flash"></embed>');
                $(swf).css("width", "0").css("height", "0").appendTo(div);
				
                $.clipboardReady.ready = [f];
                $.clipboardReady.timer = setInterval(swfready, 100);
                debug("jQuery.clipboard: INFO. Waiting for Flash object to become ready. Detected Flash version: " + flashDetectedVersion[0] + "." + flashDetectedVersion[1] + "." + flashDetectedVersion[2]);
            } else if (flashDetectedVersion[0] === 0) {
                debug("jQuery.clipboard: ERROR. Flash plugin not detected.");
                return false;
            } else {
                debug("jQuery.clipboard: ERROR. Flash version not supported. Minimum: " + flashMinVersion[0] + "." + flashMinVersion[1] + "." + flashMinVersion[2] + " Maximum: " + flashMaxVersion[0] + "." + flashMaxVersion[1] + "." + flashMaxVersion[2] + " Detected: " + flashDetectedVersion[0] + "." + flashDetectedVersion[1] + "." + flashDetectedVersion[2]);
				return f();
            }
			
        }
    };
	/*
		在firefox中测试的是很需要放到tomcat下或者apache下 
		@clipboard		 	 : 剪切函数
		@text   [string]	 : 复制到剪切板的值 
		@return [object]	 : { status : [bool : 剪切是状态] , msg : [string : 反回的信息值]}
	*/
    $.fn.clipboard = function(text) {
		text = text || $(this).val() || $(this).html() ;
		text = $.trim(text);
		var msg = null;
        if (typeof text != "string") {
			msg = "jQuery.clipboard: ERROR. Nothing to copy. You must specify a string as the first parameter.";
			//if(callback)callback(false,msg);
            debug(msg);
            return { status : false , msg : msg };
        }
		
        if ($.fn.clipboard.method == 'ie') {
            try {
                window.clipboardData.setData("Text", text);
				msg = "jQuery.clipboard: OK. Copied " + text.length + " bytes to clipboard using native IE method."
                debug(msg);
				//if(callback)callback(true,msg);
                return { status : true , msg : msg };
            } catch(e) {
				msg = "jQuery.clipboard: ERROR. Tried to copy using native IE method but an unknown error occurred."
                debug(msg);
				//if(callback)callback(false,msg);
                return { status : false , msg : msg };
            }
        }
        if ($.fn.clipboard.method == 'flash') {
            var swf = $("#jquery_clipboard_swf:first");
            var swfdom = $(swf).get(0);
			
            if (swfdom.jqueryClipboardCopy(text)) {
				msg = "jQuery.clipboard: OK. Copied " + text.length + " bytes to clipboard using Flash method."
                debug(msg);
				//if(callback)callback(true,msg);
                return  { status : true , msg : msg };
            } else {
				msg = "jQuery.clipboard: ERROR. Tried to copy using Flash method but an unknown error occurred."
                debug(msg);
				//if(callback)callback(false,msg);
                return { status : false , msg : msg };
            }
        }
		msg = "jQuery.clipboard: ERROR. You must use $.clipboardReady() in conjunction with $.fn.clipboard().";
		//if(callback)callback(false,msg);
        debug(msg);
        return { status : false , msg : msg };
    };
})(jQuery);