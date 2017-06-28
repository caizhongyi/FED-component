$.fn.marquee = function (options) {
    options = $.extend(true, {}, {
        interval: 100
    }, options);
    return $(this).css('overflow', 'hidden').each(function () {
        var list = $(this).find('.marquee-list');
        var timer , isvertical = $(this).hasClass('marquee-vertical') || $(this).hasClass('vertical'), offset = isvertical ? list.children().outerHeight() : list.children().outerWidth(), self = this;

        $(this).off('mouseenter.marquee mouseleave.marquee start stop').on('mouseenter.marquee', function () {
                $(this).trigger('stop')
            })
            .on('mouseleave.marquee', function () {
                $(this).trigger('start')
            })
            .on('start',function () {
                timer = setInterval(function () {
                    var items = list.children();
                    if (isvertical) {

                        if (items.length * offset <= $(self).height()) return;

                        $(list).stop(true).animate({ 'margin-top': -offset }, 1000 , function () {
                            $(this).children().first().insertAfter($(this).children().last());
                            $(this).css('margin-top', 0);
                        });
                    }
                    else {

                        if (items.length * offset <= $(self).width()) return;

                        var $list = $(list).css({ 'margin-left': -(offset+=10) });
                        if(offset >= list.children().outerWidth() * 2){
                            $list.children().first().insertAfter($list.children().last());
                            $list.css('margin-left', 0);
                            offset = list.children().outerWidth();
                        }
                    }

                }, $(this).data('interval') || options.interval);
            }).on('stop',function () {
            clearInterval(timer)
        }).trigger('start');


    })
}