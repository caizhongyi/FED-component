!(function( $ ){
    Class = typeof Class == 'undefined' ?  function(){} : Class ;

    var d, c , g ;
    d = Class.defaults ;
    c = ["unbind", "bind", "trigger", "on", "off" ];
    $.each(c, function (f, e) {
        if ($.isFunction($.fn[e])) {
            d[e] = function () {
                $.fn[e].apply($(this), arguments);
                return this
            }
        }
    });

    g = ["eq" ,"end" ];
    $.each(g, function (f, e) {
        if ($.isFunction($.fn[e])) {
            if( e == 'end'){
                d[e] = function () {
                    this.$ = this.$.prevObject;
                    return this
                }
            }
            else{
                d[e] = function () {
                    this.$ = $.fn[e].apply($(this.$), arguments);
                    return this
                }
            }

        }
    });

})( window.jQuery );
