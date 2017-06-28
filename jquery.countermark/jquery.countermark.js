/**
 *
 * @depends
 * jquery.draggable.js
 * */

(function ($) {
    $.fn.outerHtml = function () {
        return $(this)[0].outerHTML;
    }
    $.fn.insertHtml = function (val) {
        var _ua = navigator.userAgent.toLowerCase(),
            _IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1;
        var res = false;
        try {
            if (_IE) {

                $(this).focus();
                var range = document.selection.createRange();
                res = range.pasteHTML(val) || false;
            }
            else {
                res = document.execCommand('insertHTML', false, val)
            }
        }
        catch (e) {
            res = true;
        }

        return res;
    }

    $.fn.countermark = function (setting) {
        var defaults = {
            container: '.alien.countermark-container',
            item: '.alien.countermark-item'
        }
        setting = $.extend(true, {}, defaults, setting);
        document.execCommand('2D-Position', 'false', 'true');
        var $container = $(setting.container);

        function remove(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().stop(true).fadeOut(function () {
                $(this).remove();
            })
        }

        $container.off('click.alien.countermark dblclick.countermark').on('click.countermark', '.delete',function (e) {
            remove.call(this, e);
        }).on('dblclick.countermark', setting.item, function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).stop(true).fadeOut(function () {
                    $(this).remove();
                })
            })


        $(this).off('mousedown.alien.countermark click.countermark').on('mousedown.countermark', setting.item,function (e) {
            e.preventDefault();
            var $tag = $(this).clone().appendTo('body').css({
                position: 'absolute',
                left: $(this).offset().left,
                top: $(this).offset().top
            }).jdraggable({
                    stop: function () {
                        if ($(this).offset().left + $(this).width() > $container.offset().left &&
                            $(this).offset().left < $container.offset().left + $container.width() &&
                            $(this).offset().top + $(this).height() > $container.offset().top &&
                            $(this).offset().top < $container.offset().top + $container.height()) {
                            var $newTag = $tag.clone().removeAttr('style'), offset;
                            $newTag.attr('data-add', true);

                            if (!$container.insertHtml($newTag.outerHtml())) {
                                console.log($container.html($container.html().replace('<br/>', ' ')))
                                $container.append($newTag.removeAttr('data-add'));
                                offset = $newTag.offset();
                            }
                            else {
                                $newTag = $container.find('[data-add]');
                                offset = $container.find('[data-add]').removeAttr('data-add').offset();
                            }

                            $newTag.hide().attr('contenteditable', false)
                            $tag.animate({ left: offset.left, top: offset.top }, function () {
                                $newTag.show();
                                $(this).remove();
                            });
                            $tag.unjdraggable();
                        }
                        else {
                            $tag.stop(true).fadeOut(function () {
                                $(this).remove();
                            })
                        }
                    }
                }).mousedown();
        }).on('click.countermark', '.delete', function (e) {
                remove.call(this, e);
            })
        return this;
    }
})(jQuery);