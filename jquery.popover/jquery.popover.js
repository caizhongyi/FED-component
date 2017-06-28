!(function ($) {
    $.fn.popover = function (options) {
        options = $.extend(true, {}, {
            target: '',
            event: 'click',
            axis: 'x',
            offset: { left: 0, top: 0}
        }, options);

        return $(this).each(function () {
            if ($(this).attr('data-popover')) options.target = $(this).attr('data-popover');

            var self = this , timer;
            if (options.event == 'hover' || options.event == 'mouseover' || options.event == 'mouseenter') {
                $(this).off('mouseenter.popover mouseleave.popover').on('mouseenter.popover',function (e) {
                    e.preventDefault();
                    $(self).trigger('show');
                }).on('mouseleave.popover', options.target, function (e) {
                        timer = setTimeout(function () {
                            $(self).hide();
                        }, 200);
                    });

                $(options.target).off('mouseenter.popover mouseleave.popover').on({
                    'mouseenter.popover': function (e) {
                        clearTimeout(timer);
                    },
                    'mouseleave.popover': function (e) {
                        $(self).hide();
                    }
                })
            }
            else {
                $(this).off('click.popover').on('click.popover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).trigger('show');
                })

            }

            $(options.target).off('click.popover').on('click.popover', function (e) {
                e.stopPropagation();
            });

            $(this).off('toLeftBottom toRightBottom toLeftTop toRightTop toBottomLeft toBottomRight toTopLeft toTopRight position show hide').on('toLeftBottom',function (e, target) {
                var pos = {} , $target = $(target);
                pos.left = $(this).offset().left + $(this).outerWidth();
                pos.top = $(this).offset().top - ($target.outerHeight() - $(this).outerHeight() );
                $target.css(pos);
            }).on('toRightBottom',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left - $target.outerWidth();
                    pos.top = $(this).offset().top - ($target.outerHeight() - $(this).outerHeight() );
                    $target.css(pos);
                }).on('toLeftTop',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left + $(this).outerWidth();
                    pos.top = $(this).offset().top;
                    $target.css(pos);
                }).on('toRightTop',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left - $target.outerWidth();
                    pos.top = $(this).offset().top;
                    $target.css(pos);
                }).on('toBottomLeft',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left;
                    pos.top = $(this).offset().top - $target.outerHeight()
                    $target.css(pos);
                }).on('toBottomRight',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left - ( $target.outerWidth() - $(this).outerWidth() );
                    pos.top = $(this).offset().top - $target.outerHeight();
                    $target.css(pos);
                }).on('toTopLeft',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left;
                    pos.top = $(this).offset().top + $(this).outerHeight();
                    $target.css(pos);
                }).on('toTopRight',function (e, target) {
                    var pos = {} , $target = $(target);
                    pos.left = $(this).offset().left - ($target.outerWidth() - $(this).outerWidth() );
                    pos.top = $(this).offset().top + $(this).outerHeight();
                    $target.css(pos);
                }).on('position',function (e, target) {
                    var elem = $(target || options.target);
                    var pos = { left: $(window).width() / 2 + $(window).scrollLeft(), top: $(window).height() / 2 + $(window).scrollTop()},
                        elemPos = { left: $(this).offset().left + $(this).outerWidth() / 2, top: $(this).offset().top + $(this).outerHeight() / 2 };

                    if (options.axis == 'x' || options.axis == 'X') {
                        if (pos.left < elemPos.left && pos.top < elemPos.top) {
                            return $(this).trigger('toRightBottom', elem);
                        }
                        else if (pos.left < elemPos.left && pos.top > elemPos.top) {
                            return  $(this).trigger('toRightTop', elem);
                        }
                        else if (pos.left > elemPos.left && pos.top < elemPos.top) {
                            return $(this).trigger('toLeftBottom', elem);
                        }
                        else {
                            return $(this).trigger('toLeftTop', elem);
                        }

                    }
                    else if (options.axis == 'y' || options.axis == 'Y') {
                        if (pos.left < elemPos.left && pos.top > elemPos.top) {
                            return $(this).trigger('toTopRight', elem);
                        }
                        else if (pos.left < elemPos.left && pos.top < elemPos.top) {
                            return $(this).trigger('toBottomRight', elem);
                        }
                        else if (pos.left > elemPos.left && pos.top > elemPos.top) {
                            return $(this).trigger('toTopLeft', elem);
                        }
                        else {
                            return $(this).trigger('toBottomLeft', elem);
                        }
                    }
                    else {
                    }
                }).on('show',function () {
                    var self = this , target = $(options.target).addClass('in') , id = Math.random() * 1000;
                    $(this).trigger('position', target).data('eventid', id).trigger('shown', target)
                    $(window).on('resize.popovers' + id, function () {
                        $(self).trigger('position', target);
                    });
                    $(document).on('click.popovers' + id, function () {
                        $(self).trigger('hide');
                    });
                }).on('hide', function () {
                    var target = $(options.target).removeClass('in');
                    $(this).trigger('hidden', target)
                    $(window).off('resize.popovers' + $(this).data('eventid'));
                    $(document).off('resize.popovers' + $(this).data('eventid'));
                })
        })
    }
})(jQuery);

