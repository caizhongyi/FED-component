/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-10-10
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 * author : czy
 * depends : jquery.1.7.2.js +
 *          jquery.class.js
 */

;
(function ($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 弹出窗口
     * @requires  jquery.1.7.2
     * @class  dataPager
     * @return {object} dataPager对象
     * @example new Class.dataPager('.dataPager');
     * */
    var pagination = function (selector, setting) {
        var fn = Class.create({
            EVENT_CHANGE: 'change',
            setting: {
                viewCount: 5,
                count: 1000,
                size: 10,
                index: 0,
                prevTarget: '.pagination-prev',
                nextTarget: '.pagination-next',
                firstTarget: '.pagination-first',
                lastTarget: '.pagination-last',
                numsTarget: '.pagination-nums',
                init: window['paginationInit']
            },
            init: function (selector, setting) {
                var that = this;

                this.setting.count = parseInt(this.setting.count);
                this.setting.viewCount = parseInt(this.setting.viewCount);
                this.setting.size = parseInt(this.setting.size);

                this.$prev = this.$.find(this.setting.prevTarget);
                this.$next = this.$.find(this.setting.nextTarget);
                this.$first = this.$.find(this.setting.firstTarget);
                this.$last = this.$.find(this.setting.lastTarget);
                this.$nums = this.$.find(this.setting.numsTarget);

                this.$nums.off('click.pagination').on('click.pagination', 'a', function () {
                    var index = parseInt($(this).attr('data-index'));
                    that.index(index);
                });
                this.$prev.off('click.pagination').on('click.pagination', function () {
                    that.pagePrev()
                });
                this.$first.off('click.pagination').on('click.pagination', function () {
                    that.pageFirst()
                });
                this.$last.off('click.pagination').on('click.pagination', function () {
                    that.pageLast()
                });
                this.$next.off('click.pagination').on('click.pagination', function () {
                    that.pageNext()
                });

                this.index(this.setting.index);
            },
            length: function () {
                return  this.setting.count;
            },
            index: function (index) {
                /* page index header */
                if (index == undefined) return this._index();
                var target = this.getTarget(index, function () {
                    return this.$.find(this.setting.numsTarget).children(':eq(' + index + ')');
                });
                if (target.index == this._index())  return this;
                //   if( this.animated() ) return this;
                //   this.animated( true );
                /* page index header */
                this.render(target.index);

                this.trigger(this.EVENT_CHANGE, { target: target.$elem, index: target.index   });
                this._index(target.index);
                this.setDisabled(this.$prev, this.$next, this.$first, this.$last, true);
                return this;
            },
            /**
             @param {number}   pageIndex    返回第一页和最后一页
             @param {number}   count       当前页
             @param {number}   pageCount    总显示的页码数 /2 -1
             @return {object}
             {first : [int : 第一页] , last : [int : 最后一页]}
             */
            range: function (pageIndex, count, pageCount) {
                var result = { first: (pageIndex - count), last: (pageIndex + count) > pageCount ? pageCount : (pageIndex + count)};
                if (pageCount > count * 2 + 1) {
                    if (pageIndex - count <= 0) {
                        result.last = result.last - (pageIndex - count) + 1;
                        result.first = 1;
                    }
                    else if (pageIndex + count >= pageCount) {
                        result.first -= (pageIndex + count - pageCount);
                    }
                    ;
                }
                else {
                    result.first = 1;
                    result.last = pageCount;
                }
                ;

                return result;
            },
            render: function (index) {
                var _this = this, evt = 'click.datapage', pageCount = this.pageCount();
                var range = this.range(index, parseInt(this.setting.viewCount), pageCount);

                this.$nums.empty();
                if (range.first != 1) {
                    this.$nums.append(
                        $('<a href="javascript:;" data-index="' + 0 + '">' + 1 + '</a>')
                            .unbind(evt).bind(evt, function (e) {
                                e.preventDefault();
                            })
                    ).append('<span>...</span>');
                }
                ;

                for (var i = range.first; i <= range.last; i++) {
                    if (i == (index + 1)) {
                        var a = '<span href="javascript:;" data-index="' + (i - 1) + '">' + i + '</span>';
                        var $number = $(a);
                        $number.addClass('selected');
                    }
                    else {
                        var a = '<a href="javascript:;" data-index="' + (i - 1) + '">' + i + '</a>';
                        var $number = $(a);
                        $number.removeClass('selected');
                    }
                    ;

                    this.$nums.append($number);
                }
                ;

                if (range.last < pageCount - 1) {
                    this.$nums.append('<span>...</span>').append(
                        $('<a href="javascript:;" data-index="' + (pageCount - 1) + '">' + pageCount + '</a>')
                            .unbind(evt)
                            .bind(evt, function (e) {
                                e.preventDefault();
                            })
                    );
                }
                ;
                return this;
            }
        });
        return fn;
    }




})(jQuery);