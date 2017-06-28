
;
/*
    jqueryƯ���������
    ���÷�����
    �ѹ���ڿգ���ͼƬ������div���棬��<div id="div_float">�����ǹ������</div>����ҳ����������·�������
    $(function() {
        $("#div_float").adsfloat({ width: 228, height: 88, top: 30, left: 20 });
    })
*/
(function($) {

    $.fn.adsfloat = function(options) {
        return new adsfloat(this, options);
    };

    var adsfloat = function(element, options) {
        this.element = $(element);
        this.options = $.extend({
            width: 100,         //��������Ŀ��
            height: 100,        //��������ĸ߶�
            top: 0,            //��ʼtopλ��
            left: 0,            //��ʼleftλ��
            delay: 30,          //�ӳ�
            step: 1             //ÿ���ƶ���
        }, options || {});

        this.interval = null;
        this.xPos = this.options.left;
        this.yPos = this.options.top;
        this.yon = 0;
        this.xon = 0;
        this.isPause = false;

        this.init();
    };
    adsfloat.prototype = {
        init: function() {
            var me = this;
            
            me.element.css("display", "block");
            me.element.css({ position: "absolute", left: me.options.left + "px", top: me.options.top + "px", width: me.options.width + "px", height: me.options.height + "px", overflow: "hidden" });
            me.element.hover(
                    function() { clearInterval(me.interval) },
                    function() { me.interval = setInterval(function() { me.changePos(); }, me.options.delay); }
            );
            $(document).ready(function() { me.start(); });
        },

        changePos: function() {
            var me = this;

            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            var Hoffset = me.element.attr("offsetHeight");
            var Woffset = me.element.attr("offsetWidth");

            me.element.css({ left: me.xPos + document.documentElement.scrollLeft, top: me.yPos + document.documentElement.scrollTop });

            if (me.yon)
                me.yPos = me.yPos + me.options.step;
            else
                me.yPos = me.yPos - me.options.step;

            if (me.yPos < 0) {
                me.yon = 1; me.yPos = 0;
            }
            if (me.yPos >= (clientHeight - Hoffset)) {
                me.yon = 0; me.yPos = (clientHeight - Hoffset);
            }
            if (me.xon)
                me.xPos = me.xPos + me.options.step;
            else
                me.xPos = me.xPos - me.options.step;

            if (me.xPos < 0) {
                me.xon = 1; me.xPos = 0;
            }
            if (me.xPos >= (clientWidth - Woffset)) {
                me.xon = 0; me.xPos = (clientWidth - Woffset);
            }
        },
        start: function() {
            var me = this;
            me.element.css("top", me.yPos);
            me.interval = setInterval(function() { me.changePos(); }, me.options.delay);
        }
    };
})(jQuery); 