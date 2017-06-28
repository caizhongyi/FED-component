;(function( $ ){

// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================

    function transitionEnd() {
        var el = document.createElement('div')

        var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd'
            , 'MozTransition'    : 'transitionend'
            , 'OTransition'      : 'oTransitionEnd otransitionend'
            , 'transition'       : 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
    }

// http://blog.alexmaccaw.com/css-transitions

    $.fn.emulateTransitionEnd = function (duration) {
        var called = false, $el = this
        $(this).one($.support.transition.end, function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    /**
     * transition 动画结束
     * @class transitionEnd
     * @module jquery
     * @namespace jquery
     * @param callback {function} 回调
     * @example
     * $('#elem').transitionEnd()
     */
    $.fn.transitionEnd = function(callback){
        if( $.support.transition && $.support.transition.end){
            $(this).one($.support.transition.end, function () {callback && callback.call(this)})
        }
        else{
            callback.call(this);
        }
        return this;
    }

    /**
     * 判断是否支持transition
     * @class transition
     * @module jquery
     * @namespace jquery.support
     * @static
     * @example
     * $.support.transition
     */
    $.support.transition = transitionEnd();

    function animationEnd() {
        var el = document.createElement('div')

        var transEndEventNames = {
            'webkitAnimation' : 'webkitAnimationEnd'
            , 'MozAnimation'    : 'mozAnimationEnd animationend'
            , 'MSAnimation'    : 'MSAnimationEnd'
            , 'OAnimation'      : 'oanimationend'
            , 'animation'       : 'animationend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
    }

// http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateAnimationEnd = function (duration) {
        var called = false, $el = this
        $(this).one($.support.animation.end, function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.animation.end) }
        setTimeout(callback, duration)
        return this
    }

    /**
     * animation 动画结束
     * @class animationEnd
     * @module jquery
     * @namespace jquery
     * @param callback {function} 回调
     * @example
     * $('#elem').animationEnd()
     */
    $.fn.animationEnd = function(callback){
        if( $.support.animation && $.support.animation.end){
            $(this).one($.support.animation.end, function () {callback && callback.call(this)})
        }
        else{
            callback.call(this);
        }
        return this;
    }

    $.support.animation = animationEnd();

    if( typeof  module == 'object' && typeof module.exports == 'object'){
        module.exports = $;
    }
})(window.jQuery || require('jquery') );