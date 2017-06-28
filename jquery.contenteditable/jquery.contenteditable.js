!(function ($) {
    /**
     * need update
     * */
    $.fn.contenteditable = function (options) {
        options = $.extend(true, {}, {
            editbox       : '.contenteditable-box',
            block         : '.contenteditable-block',
            delegateTarget: ''  // .accordion
        }, options);

        return $(this).each(function () {
            var self = this;
            $(this).off('click.contenteditable').on('click.contenteditable', options.block ,function(){
                var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);
                me.find( options.block ).removeClass('in');
                $(this).addClass('in');

                if( $( options.editbox ).length ){
                    $( options.editbox).removeClass('in');
                    $($(this).data('bind')).addClass('in');
                }
                else{
                    me.find( options.block ).prop('contenteditable' ,false);
                    $(this).prop('contenteditable' , true );
                }
            })
        })
    }
})(window.jQuery || Zepto);
