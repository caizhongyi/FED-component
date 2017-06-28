!(function ($) {
    /**
     * @depend  jquery.scrollTo.js
     * */
    $.fn.scrollspy = function (options) {
        options = $.extend(true, {}, {
            single: true,
            active: 'active'
        }, options);
        return $(this).each(function () {
            var self = this;
            $(window).off('scroll.spy').on('scroll.spy', function () {
                $(this).find('[href]').map(function () {
                    $(this).trigger('scrollTo', this, $(this).attr('href'), $(this).attr('data-callback'));
                });
            });

            $(this).off('click.spy scrollTo').on('click.spy', '[href]',function (e) {
                $(this).parent().addClass(options.active).siblings().removeClass(options.active)
                e.preventDefault();
                var href = $(this).attr('href');
                if ($(window).scrollTo)
                    $(window).scrollTo(href, 500, { easing: 'swing', queue: true, axis: 'xy' });
                else
                    $(window).scrollTop($(href).offset().top);
            }).on('scrollTo', function (source, target, callback) {
                    var $target = $(target), $source = $(source);
                    if ($(window).scrollTop() >= $target.offset().top && $(window).scrollTop() <= $target.offset().top + $target.outerHeight()) {
                        if (this.setting.single) {
                            $source.siblings().removeClass(this.setting.selected);
                        }
                        $source.addClass(this.setting.selected);
                        callback && callback.call(this);
                    }
                })

        })
    }
})(window.jQuery || Zepto);

