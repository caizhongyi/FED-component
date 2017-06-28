!(function( $ ){
    $.fn.initslimscroll = function(){
        function initScrollPanel (){
            var maxHeight =  parseFloat($(this).css('max-height'));
            if( maxHeight && $(this).height() >=  maxHeight){
                maxHeight = maxHeight + parseFloat($(this).css('padding-top')) * 2;
                $( this ).slimscroll({ height: maxHeight });
            }
        }

        $.fn.slimscroll && initScrollPanel.call( this );
    }
})( jQuery );