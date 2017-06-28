if (!AmCharts) var AmCharts = {};
AmCharts.inheriting = {};
AmCharts.Class = function(a) {
    var b = function() {
        arguments[0] !== AmCharts.inheriting && (this.events = {},
        this.construct.apply(this, arguments))
    };
    a.inherits ? (b.prototype = new a.inherits(AmCharts.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents = function() {
        for (var a = 0,
        b = arguments.length; a < b; a++) this.events[arguments[a]] = []
    },
    b.prototype.listenTo = function(a, b, d) {
        a.events[b].push({
            handler: d,
            scope: this
        })
    },
    b.prototype.addListener = function(a, b, d) {
        this.events[a].push({
            handler: b,
            scope: d
        })
    },
    b.prototype.removeListener = function(a, b, d) {
        a = a.events[b];
        for (b = a.length - 1; 0 <= b; b--) a[b].handler === d && a.splice(b, 1)
    },
    b.prototype.fire = function(a, b) {
        for (var d = this.events[a], h = 0, j = d.length; h < j; h++) {
            var k = d[h];
            k.handler.call(k.scope, b)
        }
    });
    for (var d in a) b.prototype[d] = a[d];
    return b
};
AmCharts.charts = [];
AmCharts.addChart = function(a) {
    AmCharts.charts.push(a)
};
AmCharts.removeChart = function(a) {
    for (var b = AmCharts.charts,
    d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1)
};
AmCharts.IEversion = 0; - 1 != navigator.appVersion.indexOf("MSIE") && document.documentMode && (AmCharts.IEversion = Number(document.documentMode));
if (document.addEventListener || window.opera) AmCharts.isNN = !0,
AmCharts.isIE = !1,
AmCharts.dx = 0.5,
AmCharts.dy = 0.5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, 9 > AmCharts.IEversion && (AmCharts.dx = 0, AmCharts.dy = 0));
window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function() {
    for (var a = AmCharts.charts,
    b = 0; b < a.length; b++) {
        var d = a[b];
        d && d.div && d.handleResize()
    }
};
AmCharts.handleMouseUp = function(a) {
    for (var b = AmCharts.charts,
    d = 0; d < b.length; d++) {
        var e = b[d];
        e && e.handleReleaseOutside(a)
    }
};
AmCharts.handleMouseMove = function(a) {
    for (var b = AmCharts.charts,
    d = 0; d < b.length; d++) {
        var e = b[d];
        e && e.handleMouseMove(a)
    }
};
AmCharts.resetMouseOver = function() {
    for (var a = AmCharts.charts,
    b = 0; b < a.length; b++) {
        var d = a[b];
        d && (d.mouseIsOver = !1)
    }
};
AmCharts.onReadyArray = [];
AmCharts.ready = function(a) {
    AmCharts.onReadyArray.push(a)
};
AmCharts.handleLoad = function() {
    for (var a = AmCharts.onReadyArray,
    b = 0; b < a.length; b++)(0, a[b])()
};
AmCharts.useUTC = !1;
AmCharts.updateRate = 40;
AmCharts.uid = 0;
AmCharts.getUniqueId = function() {
    AmCharts.uid++;
    return "AmChartsEl-" + AmCharts.uid
};
AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));
AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));
AmCharts.clear = function() {
    var a = AmCharts.charts;
    if (a) for (var b = 0; b < a.length; b++) a[b].clear();
    AmCharts.charts = null;
    AmCharts.isNN && (document.removeEventListener("mousemove", AmCharts.handleMouseMove, !0), window.removeEventListener("resize", AmCharts.handleResize, !0), document.removeEventListener("mouseup", AmCharts.handleMouseUp, !0), window.removeEventListener("load", AmCharts.handleLoad, !0));
    AmCharts.isIE && (document.detachEvent("onmousemove", AmCharts.handleMouseMove), window.detachEvent("onresize", AmCharts.handleResize), document.detachEvent("onmouseup", AmCharts.handleMouseUp), window.detachEvent("onload", AmCharts.handleLoad))
};
AmCharts.AmChart = AmCharts.Class({
    construct: function() {
        this.version = "2.9.3";
        AmCharts.addChart(this);
        this.createEvents("dataUpdated", "init");
        this.height = this.width = "100%";
        this.dataChanged = !0;
        this.chartCreated = !1;
        this.previousWidth = this.previousHeight = 0;
        this.backgroundColor = "#FFFFFF";
        this.borderAlpha = this.backgroundAlpha = 0;
        this.color = this.borderColor = "#000000";
        this.fontFamily = "Verdana";
        this.fontSize = 11;
        this.numberFormatter = {
            precision: -1,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.percentFormatter = {
            precision: 2,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.labels = [];
        this.allLabels = [];
        this.titles = [];
        this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
        this.timeOuts = [];
        var a = document.createElement("div"),
        b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        b.textAlign = "left";
        this.chartDiv = a;
        a = document.createElement("div");
        b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        b.textAlign = "left";
        this.legendDiv = a;
        this.balloon = new AmCharts.AmBalloon;
        this.balloon.chart = this;
        this.titleHeight = 0;
        this.prefixesOfBigNumbers = [{
            number: 1E3,
            prefix: "k"
        },
        {
            number: 1E6,
            prefix: "M"
        },
        {
            number: 1E9,
            prefix: "G"
        },
        {
            number: 1E12,
            prefix: "T"
        },
        {
            number: 1E15,
            prefix: "P"
        },
        {
            number: 1E18,
            prefix: "E"
        },
        {
            number: 1E21,
            prefix: "Z"
        },
        {
            number: 1E24,
            prefix: "Y"
        }];
        this.prefixesOfSmallNumbers = [{
            number: 1E-24,
            prefix: "y"
        },
        {
            number: 1E-21,
            prefix: "z"
        },
        {
            number: 1E-18,
            prefix: "a"
        },
        {
            number: 1E-15,
            prefix: "f"
        },
        {
            number: 1E-12,
            prefix: "p"
        },
        {
            number: 1E-9,
            prefix: "n"
        },
        {
            number: 1E-6,
            prefix: "\u03bc"
        },
        {
            number: 0.001,
            prefix: "m"
        }];
        this.panEventsEnabled = !1;
        AmCharts.bezierX = 3;
        AmCharts.bezierY = 6;
        this.product = "amcharts"
    },
    drawChart: function() {
        this.drawBackground();
        this.redrawLabels();
        this.drawTitles()
    },
    drawBackground: function() {
        AmCharts.remove(this.background);
        var a = this.container,
        b = this.backgroundColor,
        d = this.backgroundAlpha,
        e = this.set,
        f = this.updateWidth();
        this.realWidth = f;
        var g = this.updateHeight();
        this.realHeight = g;
        this.background = b = AmCharts.polygon(a, [0, f - 1, f - 1, 0], [0, 0, g - 1, g - 1], b, d, 1, this.borderColor, this.borderAlpha);
        e.push(b);
        if (b = this.backgroundImage) this.path && (b = this.path + b),
        this.bgImg = a = a.image(b, 0, 0, f, g),
        e.push(a)
    },
    drawTitles: function() {
        var a = this.titles;
        if (AmCharts.ifArray(a)) {
            var b = 20,
            d;
            for (d = 0; d < a.length; d++) {
                var e = a[d],
                f = e.color;
                void 0 === f && (f = this.color);
                var g = e.size;
                isNaN(e.alpha);
                var h = this.marginLeft,
                f = AmCharts.text(this.container, e.text, f, this.fontFamily, g);
                f.translate(h + (this.realWidth - this.marginRight - h) / 2, b);
                h = !0;
                void 0 !== e.bold && (h = e.bold);
                h && f.attr({
                    "font-weight": "bold"
                });
                b += g + 6;
                this.freeLabelsSet.push(f)
            }
        }
    },
    write: function(a) {
        var b = this.balloon;
        b && !b.chart && (b.chart = this);
        a = "object" != typeof a ? document.getElementById(a) : a;
        a.innerHTML = "";
        this.div = a;
        a.style.overflow = "hidden";
        a.style.textAlign = "left";
        var b = this.chartDiv,
        d = this.legendDiv,
        e = this.legend,
        f = d.style,
        g = b.style;
        this.measure();
        var h, j;
        if (e) switch (e.position) {
        case "bottom":
            a.appendChild(b);
            a.appendChild(d);
            break;
        case "top":
            a.appendChild(d);
            a.appendChild(b);
            break;
        case "absolute":
            h = document.createElement("div");
            j = h.style;
            j.position = "relative";
            j.width = a.style.width;
            j.height = a.style.height;
            a.appendChild(h);
            f.position = "absolute";
            g.position = "absolute";
            void 0 !== e.left && (f.left = e.left + "px");
            void 0 !== e.right && (f.right = e.right + "px");
            void 0 !== e.top && (f.top = e.top + "px");
            void 0 !== e.bottom && (f.bottom = e.bottom + "px");
            e.marginLeft = 0;
            e.marginRight = 0;
            h.appendChild(b);
            h.appendChild(d);
            break;
        case "right":
            h = document.createElement("div");
            j = h.style;
            j.position = "relative";
            j.width = a.style.width;
            j.height = a.style.height;
            a.appendChild(h);
            f.position = "relative";
            g.position = "absolute";
            h.appendChild(b);
            h.appendChild(d);
            break;
        case "left":
            h = document.createElement("div");
            j = h.style;
            j.position = "relative";
            j.width = a.style.width;
            j.height = a.style.height;
            a.appendChild(h);
            f.position = "absolute";
            g.position = "relative";
            h.appendChild(b);
            h.appendChild(d);
            break;
        case "outside":
            a.appendChild(b)
        } else a.appendChild(b);
        this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
        this.initChart()
    },
    createLabelsSet: function() {
        AmCharts.remove(this.labelsSet);
        this.labelsSet = this.container.set();
        this.freeLabelsSet.push(this.labelsSet)
    },
    initChart: function() {
        this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
        this.previousHeight = this.realHeight;
        this.previousWidth = this.realWidth;
        this.destroy();
        var a = 0;
        document.attachEvent && !window.opera && (a = 1);
        this.dmouseX = this.dmouseY = 0;
        var b = document.getElementsByTagName("html")[0];
        if (b && window.getComputedStyle && (b = window.getComputedStyle(b, null))) this.dmouseY = AmCharts.removePx(b.getPropertyValue("margin-top")),
        this.dmouseX = AmCharts.removePx(b.getPropertyValue("margin-left"));
        this.mouseMode = a;
        this.container = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight);
        if (AmCharts.VML || AmCharts.SVG) a = this.container,
        this.set = a.set(),
        this.gridSet = a.set(),
        this.graphsBehindSet = a.set(),
        this.bulletBehindSet = a.set(),
        this.columnSet = a.set(),
        this.graphsSet = a.set(),
        this.trendLinesSet = a.set(),
        this.axesLabelsSet = a.set(),
        this.axesSet = a.set(),
        this.cursorSet = a.set(),
        this.scrollbarsSet = a.set(),
        this.bulletSet = a.set(),
        this.freeLabelsSet = a.set(),
        this.balloonsSet = a.set(),
        this.balloonsSet.setAttr("id", "balloons"),
        this.zoomButtonSet = a.set(),
        this.linkSet = a.set(),
        this.drb(),
        this.renderFix()
    },
    measure: function() {
        var a = this.div,
        b = this.chartDiv,
        d = a.offsetWidth,
        e = a.offsetHeight,
        f = this.container;
        a.clientHeight && (d = a.clientWidth, e = a.clientHeight);
        var g = AmCharts.removePx(AmCharts.getStyle(a, "padding-left")),
        h = AmCharts.removePx(AmCharts.getStyle(a, "padding-right")),
        j = AmCharts.removePx(AmCharts.getStyle(a, "padding-top")),
        k = AmCharts.removePx(AmCharts.getStyle(a, "padding-bottom"));
        isNaN(g) || (d -= g);
        isNaN(h) || (d -= h);
        isNaN(j) || (e -= j);
        isNaN(k) || (e -= k);
        g = a.style;
        a = g.width;
        g = g.height; - 1 != a.indexOf("px") && (d = AmCharts.removePx(a)); - 1 != g.indexOf("px") && (e = AmCharts.removePx(g));
        a = AmCharts.toCoordinate(this.width, d);
        g = AmCharts.toCoordinate(this.height, e);
        if (a != this.previousWidth || g != this.previousHeight) b.style.width = a + "px",
        b.style.height = g + "px",
        f && f.setSize(a, g),
        this.balloon.setBounds(2, 2, a - 2, g);
        this.realWidth = a;
        this.realHeight = g;
        this.divRealWidth = d;
        this.divRealHeight = e
    },
    destroy: function() {
        this.chartDiv.innerHTML = "";
        this.clearTimeOuts()
    },
    clearTimeOuts: function() {
        var a = this.timeOuts;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) clearTimeout(a[b])
        }
        this.timeOuts = []
    },
    clear: function(a) {
        AmCharts.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
        this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
        this.clearTimeOuts();
        this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
        a || AmCharts.removeChart(this)
    },
    setMouseCursor: function(a) {
        "auto" == a && AmCharts.isNN && (a = "default");
        this.chartDiv.style.cursor = a;
        this.legendDiv.style.cursor = a
    },
    redrawLabels: function() {
        this.labels = [];
        var a = this.allLabels;
        this.createLabelsSet();
        var b;
        for (b = 0; b < a.length; b++) this.drawLabel(a[b])
    },
    drawLabel: function(a) {
        if (this.container) {
            var b = a.y,
            d = a.text,
            e = a.align,
            f = a.size,
            g = a.color,
            h = a.rotation,
            j = a.alpha,
            k = a.bold,
            l = AmCharts.toCoordinate(a.x, this.realWidth),
            b = AmCharts.toCoordinate(b, this.realHeight);
            l || (l = 0);
            b || (b = 0);
            void 0 === g && (g = this.color);
            isNaN(f) && (f = this.fontSize);
            e || (e = "start");
            "left" == e && (e = "start");
            "right" == e && (e = "end");
            "center" == e && (e = "middle", h ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);
            void 0 === j && (j = 1);
            void 0 === h && (h = 0);
            b += f / 2;
            d = AmCharts.text(this.container, d, g, this.fontFamily, f, e, k, j);
            d.translate(l, b);
            0 !== h && d.rotate(h);
            a.url && (d.setAttr("cursor", "pointer"), d.click(function() {
                AmCharts.getURL(a.url)
            }));
            this.labelsSet.push(d);
            this.labels.push(d)
        }
    },
    addLabel: function(a, b, d, e, f, g, h, j, k, l) {
        a = {
            x: a,
            y: b,
            text: d,
            align: e,
            size: f,
            color: g,
            alpha: j,
            rotation: h,
            bold: k,
            url: l
        };
        this.container && this.drawLabel(a);
        this.allLabels.push(a)
    },
    clearLabels: function() {
        var a = this.labels,
        b;
        for (b = a.length - 1; 0 <= b; b--) a[b].remove();
        this.labels = [];
        this.allLabels = []
    },
    updateHeight: function() {
        var a = this.divRealHeight,
        b = this.legend;
        if (b) {
            var d = this.legendDiv.offsetHeight,
            b = b.position;
            if ("top" == b || "bottom" == b) a -= d,
            0 > a && (a = 0),
            this.chartDiv.style.height = a + "px"
        }
        return a
    },
    updateWidth: function() {
        var a = this.divRealWidth,
        b = this.divRealHeight,
        d = this.legend;
        if (d) {
            var e = this.legendDiv,
            f = e.offsetWidth,
            g = e.offsetHeight,
            e = e.style,
            h = this.chartDiv.style,
            d = d.position;
            if ("right" == d || "left" == d) a -= f,
            0 > a && (a = 0),
            h.width = a + "px",
            "left" == d ? h.left = f + "px": e.left = a + "px",
            e.top = (b - g) / 2 + "px"
        }
        return a
    },
    getTitleHeight: function() {
        var a = 0,
        b = this.titles;
        if (0 < b.length) {
            var a = 15,
            d;
            for (d = 0; d < b.length; d++) a += b[d].size + 6
        }
        return a
    },
    addTitle: function(a, b, d, e, f) {
        isNaN(b) && (b = this.fontSize + 2);
        a = {
            text: a,
            size: b,
            color: d,
            alpha: e,
            bold: f
        };
        this.titles.push(a);
        return a
    },
    addListeners: function() {
        var a = this,
        b = a.chartDiv;
        AmCharts.isNN && (a.panEventsEnabled && "ontouchstart" in document.documentElement && (b.addEventListener("touchstart",
        function(b) {
            a.handleTouchMove.call(a, b);
            a.handleTouchStart.call(a, b)
        },
        !0), b.addEventListener("touchmove",
        function(b) {
            a.handleTouchMove.call(a, b)
        },
        !0), b.addEventListener("touchend",
        function(b) {
            a.handleTouchEnd.call(a, b)
        },
        !0)), b.addEventListener("mousedown",
        function(b) {
            a.handleMouseDown.call(a, b)
        },
        !0), b.addEventListener("mouseover",
        function(b) {
            a.handleMouseOver.call(a, b)
        },
        !0), b.addEventListener("mouseout",
        function(b) {
            a.handleMouseOut.call(a, b)
        },
        !0));
        AmCharts.isIE && (b.attachEvent("onmousedown",
        function(b) {
            a.handleMouseDown.call(a, b)
        }), b.attachEvent("onmouseover",
        function(b) {
            a.handleMouseOver.call(a, b)
        }), b.attachEvent("onmouseout",
        function(b) {
            a.handleMouseOut.call(a, b)
        }))
    },
    dispDUpd: function() {
        var a;
        this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {
            type: a,
            chart: this
        }));
        this.chartCreated || (a = "init", this.fire(a, {
            type: a,
            chart: this
        }))
    },
    drb: function() {
        var a = this.product,
        b = a + ".com",
        d = window.location.hostname.split("."),
        e;
        2 <= d.length && (e = d[d.length - 2] + "." + d[d.length - 1]);
        AmCharts.remove(this.bbset);
        if (e != b) {
            var b = b + "/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo" + a,
            f = "chart by ",
            d = 145;
            "ammap" == a && (f = "tool by ", d = 125);
            e = AmCharts.rect(this.container, d, 20, "#FFFFFF", 1);
            f = AmCharts.text(this.container, f + a + ".com", "#000000", "Verdana", 11, "start");
            f.translate(7, 9);
            e = this.container.set([e, f]);
            "ammap" == a && e.translate(this.realWidth - d, 0);
            this.bbset = e;
            this.linkSet.push(e);
            e.setAttr("cursor", "pointer");
            e.click(function() {
                window.location.href = "http://" + b
            });
            for (a = 0; a < e.length; a++) e[a].attr({
                cursor: "pointer"
            })
        }
    },
    validateSize: function() {
        var a = this;
        a.measure();
        var b = a.legend;
        if ((a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) && 0 < a.realWidth && 0 < a.realHeight) {
            a.sizeChanged = !0;
            if (b) {
                clearTimeout(a.legendInitTO);
                var d = setTimeout(function() {
                    b.invalidateSize()
                },
                100);
                a.timeOuts.push(d);
                a.legendInitTO = d
            }
            a.marginsUpdated = !1;
            clearTimeout(a.initTO);
            d = setTimeout(function() {
                a.initChart()
            },
            150);
            a.timeOuts.push(d);
            a.initTO = d
        }
        a.renderFix();
        b && b.renderFix()
    },
    invalidateSize: function() {
        var a = this;
        a.previousWidth = NaN;
        a.previousHeight = NaN;
        a.marginsUpdated = !1;
        clearTimeout(a.validateTO);
        var b = setTimeout(function() {
            a.validateSize()
        },
        5);
        a.timeOuts.push(b);
        a.validateTO = b
    },
    validateData: function(a) {
        this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a))
    },
    validateNow: function() {
        this.listenersAdded = !1;
        this.write(this.div)
    },
    showItem: function(a) {
        a.hidden = !1;
        this.initChart()
    },
    hideItem: function(a) {
        a.hidden = !0;
        this.initChart()
    },
    hideBalloon: function() {
        var a = this;
        a.hoverInt = setTimeout(function() {
            a.hideBalloonReal.call(a)
        },
        80)
    },
    cleanChart: function() {},
    hideBalloonReal: function() {
        var a = this.balloon;
        a && a.hide()
    },
    showBalloon: function(a, b, d, e, f) {
        var g = this;
        clearTimeout(g.balloonTO);
        g.balloonTO = setTimeout(function() {
            g.showBalloonReal.call(g, a, b, d, e, f)
        },
        1)
    },
    showBalloonReal: function(a, b, d, e, f) {
        this.handleMouseMove();
        var g = this.balloon;
        g.enabled && (g.followCursor(!1), g.changeColor(b), d || g.setPosition(e, f), g.followCursor(d), a && g.showBalloon(a))
    },
    handleTouchMove: function(a) {
        this.hideBalloon();
        var b = this.chartDiv;
        a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - AmCharts.findPosX(b), this.mouseY = a.pageY - AmCharts.findPosY(b))
    },
    handleMouseOver: function() {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0
    },
    handleMouseOut: function() {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !1
    },
    handleMouseMove: function(a) {
        if (this.mouseIsOver) {
            var b = this.chartDiv;
            a || (a = window.event);
            var d, e;
            if (a) {
                this.posX = AmCharts.findPosX(b);
                this.posY = AmCharts.findPosY(b);
                switch (this.mouseMode) {
                case 1:
                    d = a.clientX - this.posX;
                    e = a.clientY - this.posY;
                    if (!this.divIsFixed) {
                        a = document.body;
                        var f, g;
                        a && (f = a.scrollLeft, y1 = a.scrollTop);
                        if (a = document.documentElement) g = a.scrollLeft,
                        y2 = a.scrollTop;
                        f = Math.max(f, g);
                        g = Math.max(y1, y2);
                        d += f;
                        e += g
                    }
                    break;
                case 0:
                    this.divIsFixed ? (d = a.clientX - this.posX, e = a.clientY - this.posY) : (d = a.pageX - this.posX, e = a.pageY - this.posY)
                }
                this.mouseX = d - this.dmouseX;
                this.mouseY = e - this.dmouseY
            }
        }
    },
    handleTouchStart: function(a) {
        this.handleMouseDown(a)
    },
    handleTouchEnd: function(a) {
        AmCharts.resetMouseOver();
        this.handleReleaseOutside(a)
    },
    handleReleaseOutside: function() {},
    handleMouseDown: function(a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        a && a.preventDefault && a.preventDefault()
    },
    addLegend: function(a, b) {
        AmCharts.extend(a, new AmCharts.AmLegend);
        var d;
        d = "object" != typeof b ? document.getElementById(b) : b;
        this.legend = a;
        a.chart = this;
        d ? (a.div = d, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
        d = this.handleLegendEvent;
        this.listenTo(a, "showItem", d);
        this.listenTo(a, "hideItem", d);
        this.listenTo(a, "clickMarker", d);
        this.listenTo(a, "rollOverItem", d);
        this.listenTo(a, "rollOutItem", d);
        this.listenTo(a, "rollOverMarker", d);
        this.listenTo(a, "rollOutMarker", d);
        this.listenTo(a, "clickLabel", d)
    },
    removeLegend: function() {
        this.legend = void 0;
        this.legendDiv.innerHTML = ""
    },
    handleResize: function() { (AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSize();
        this.renderFix()
    },
    renderFix: function() {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    getSVG: function() {
        if (AmCharts.hasSVG) return this.container
    }
});
AmCharts.Slice = AmCharts.Class({
    construct: function() {}
});
AmCharts.SerialDataItem = AmCharts.Class({
    construct: function() {}
});
AmCharts.GraphDataItem = AmCharts.Class({
    construct: function() {}
});
AmCharts.Guide = AmCharts.Class({
    construct: function() {}
});
AmCharts.toBoolean = function(a, b) {
    if (void 0 === a) return b;
    switch (String(a).toLowerCase()) {
    case "true":
    case "yes":
    case "1":
        return ! 0;
    case "false":
    case "no":
    case "0":
    case null:
        return ! 1;
    default:
        return Boolean(a)
    }
};
AmCharts.removeFromArray = function(a, b) {
    var d;
    for (d = a.length - 1; 0 <= d; d--) a[d] == b && a.splice(d, 1)
};
AmCharts.getStyle = function(a, b) {
    var d = "";
    document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g,
    function(a, b) {
        return b.toUpperCase()
    }), d = a.currentStyle[b]);
    return d
};
AmCharts.removePx = function(a) {
    return Number(a.substring(0, a.length - 2))
};
AmCharts.getURL = function(a, b) {
    if (a) if ("_self" == b || !b) window.location.href = a;
    else if ("_top" == b && window.top) window.top.location.href = a;
    else if ("_parent" == b && window.parent) window.parent.location.href = a;
    else {
        var d = document.getElementsByName(b)[0];
        d ? d.src = a: window.open(a)
    }
};
AmCharts.formatMilliseconds = function(a, b) {
    if ( - 1 != a.indexOf("fff")) {
        var d = b.getMilliseconds(),
        e = String(d);
        10 > d && (e = "00" + d);
        10 <= d && 100 > d && (e = "0" + d);
        a = a.replace(/fff/g, e)
    }
    return a
};
AmCharts.ifArray = function(a) {
    return a && 0 < a.length ? !0 : !1
};
AmCharts.callMethod = function(a, b) {
    var d;
    for (d = 0; d < b.length; d++) {
        var e = b[d];
        if (e) {
            if (e[a]) e[a]();
            var f = e.length;
            if (0 < f) {
                var g;
                for (g = 0; g < f; g++) {
                    var h = e[g];
                    if (h && h[a]) h[a]()
                }
            }
        }
    }
};
AmCharts.toNumber = function(a) {
    return "number" == typeof a ? a: Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function(a) {
    if ("" !== a && void 0 !== a) if ( - 1 != a.indexOf(",")) {
        a = a.split(",");
        var b;
        for (b = 0; b < a.length; b++) {
            var d = a[b].substring(a[b].length - 6, a[b].length);
            a[b] = "#" + d
        }
    } else a = a.substring(a.length - 6, a.length),
    a = "#" + a;
    return a
};
AmCharts.toCoordinate = function(a, b, d) {
    var e;
    void 0 !== a && (a = String(a), d && d < b && (b = d), e = Number(a), -1 != a.indexOf("!") && (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
    return e
};
AmCharts.fitToBounds = function(a, b, d) {
    a < b && (a = b);
    a > d && (a = d);
    return a
};
AmCharts.isDefined = function(a) {
    return void 0 === a ? !1 : !0
};
AmCharts.stripNumbers = function(a) {
    return a.replace(/[0-9]+/g, "")
};
AmCharts.extractPeriod = function(a) {
    var b = AmCharts.stripNumbers(a),
    d = 1;
    b != a && (d = Number(a.slice(0, a.indexOf(b))));
    return {
        period: b,
        count: d
    }
};
AmCharts.resetDateToMin = function(a, b, d, e) {
    void 0 === e && (e = 1);
    var f = a.getFullYear(),
    g = a.getMonth(),
    h = a.getDate(),
    j = a.getHours(),
    k = a.getMinutes(),
    l = a.getSeconds(),
    m = a.getMilliseconds();
    a = a.getDay();
    switch (b) {
    case "YYYY":
        f = Math.floor(f / d) * d;
        g = 0;
        h = 1;
        m = l = k = j = 0;
        break;
    case "MM":
        g = Math.floor(g / d) * d;
        h = 1;
        m = l = k = j = 0;
        break;
    case "WW":
        0 === a && 0 < e && (a = 7);
        h = h - a + e;
        m = l = k = j = 0;
        break;
    case "DD":
        h = Math.floor(h / d) * d;
        m = l = k = j = 0;
        break;
    case "hh":
        j = Math.floor(j / d) * d;
        m = l = k = 0;
        break;
    case "mm":
        k = Math.floor(k / d) * d;
        m = l = 0;
        break;
    case "ss":
        l = Math.floor(l / d) * d;
        m = 0;
        break;
    case "fff":
        m = Math.floor(m / d) * d
    }
    return a = new Date(f, g, h, j, k, l, m)
};
AmCharts.getPeriodDuration = function(a, b) {
    void 0 === b && (b = 1);
    var d;
    switch (a) {
    case "YYYY":
        d = 316224E5;
        break;
    case "MM":
        d = 26784E5;
        break;
    case "WW":
        d = 6048E5;
        break;
    case "DD":
        d = 864E5;
        break;
    case "hh":
        d = 36E5;
        break;
    case "mm":
        d = 6E4;
        break;
    case "ss":
        d = 1E3;
        break;
    case "fff":
        d = 1
    }
    return d * b
};
AmCharts.roundTo = function(a, b) {
    if (0 > b) return a;
    var d = Math.pow(10, b);
    return Math.round(a * d) / d
};
AmCharts.toFixed = function(a, b) {
    var d = String(Math.round(a * Math.pow(10, b)));
    if (0 < b) {
        var e = d.length;
        if (e < b) {
            var f;
            for (f = 0; f < b - e; f++) d = "0" + d
        }
        e = d.substring(0, d.length - b);
        "" === e && (e = 0);
        return e + "." + d.substring(d.length - b, d.length)
    }
    return String(d)
};
AmCharts.intervals = {
    s: {
        nextInterval: "ss",
        contains: 1E3
    },
    ss: {
        nextInterval: "mm",
        contains: 60,
        count: 0
    },
    mm: {
        nextInterval: "hh",
        contains: 60,
        count: 1
    },
    hh: {
        nextInterval: "DD",
        contains: 24,
        count: 2
    },
    DD: {
        nextInterval: "",
        contains: Infinity,
        count: 3
    }
};
AmCharts.getMaxInterval = function(a, b) {
    var d = AmCharts.intervals;
    return a >= d[b].contains ? (a = Math.round(a / d[b].contains), b = d[b].nextInterval, AmCharts.getMaxInterval(a, b)) : "ss" == b ? d[b].nextInterval: b
};
AmCharts.formatDuration = function(a, b, d, e, f, g) {
    var h = AmCharts.intervals,
    j = g.decimalSeparator;
    if (a >= h[b].contains) {
        var k = a - Math.floor(a / h[b].contains) * h[b].contains;
        "ss" == b && (k = AmCharts.formatNumber(k, g), 1 == k.split(j)[0].length && (k = "0" + k));
        if (("mm" == b || "hh" == b) && 10 > k) k = "0" + k;
        d = k + "" + e[b] + "" + d;
        a = Math.floor(a / h[b].contains);
        b = h[b].nextInterval;
        return AmCharts.formatDuration(a, b, d, e, f, g)
    }
    "ss" == b && (a = AmCharts.formatNumber(a, g), 1 == a.split(j)[0].length && (a = "0" + a));
    if (("mm" == b || "hh" == b) && 10 > a) a = "0" + a;
    d = a + "" + e[b] + "" + d;
    if (h[f].count > h[b].count) for (a = h[b].count; a < h[f].count; a++) b = h[b].nextInterval,
    "ss" == b || "mm" == b || "hh" == b ? d = "00" + e[b] + "" + d: "DD" == b && (d = "0" + e[b] + "" + d);
    ":" == d.charAt(d.length - 1) && (d = d.substring(0, d.length - 1));
    return d
};
AmCharts.formatNumber = function(a, b, d, e, f) {
    a = AmCharts.roundTo(a, b.precision);
    isNaN(d) && (d = b.precision);
    var g = b.decimalSeparator;
    b = b.thousandsSeparator;
    var h;
    h = 0 > a ? "-": "";
    a = Math.abs(a);
    var j = String(a),
    k = !1; - 1 != j.indexOf("e") && (k = !0);
    0 <= d && (0 !== a && !k) && (j = AmCharts.toFixed(a, d));
    var l = "";
    if (k) l = j;
    else {
        var j = j.split("."),
        k = String(j[0]),
        m;
        for (m = k.length; 0 <= m; m -= 3) l = m != k.length ? 0 !== m ? k.substring(m - 3, m) + b + l: k.substring(m - 3, m) + l: k.substring(m - 3, m);
        void 0 !== j[1] && (l = l + g + j[1]);
        void 0 !== d && (0 < d && "0" != l) && (l = AmCharts.addZeroes(l, g, d))
    }
    l = h + l;
    "" === h && (!0 === e && 0 !== a) && (l = "+" + l); ! 0 === f && (l += "%");
    return l
};
AmCharts.addZeroes = function(a, b, d) {
    a = a.split(b);
    void 0 === a[1] && 0 < d && (a[1] = "0");
    return a[1].length < d ? (a[1] += "0", AmCharts.addZeroes(a[0] + b + a[1], b, d)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
};
AmCharts.scientificToNormal = function(a) {
    var b;
    a = String(a).split("e");
    var d;
    if ("-" == a[1].substr(0, 1)) {
        b = "0.";
        for (d = 0; d < Math.abs(Number(a[1])) - 1; d++) b += "0";
        b += a[0].split(".").join("")
    } else {
        var e = 0;
        b = a[0].split(".");
        b[1] && (e = b[1].length);
        b = a[0].split(".").join("");
        for (d = 0; d < Math.abs(Number(a[1])) - e; d++) b += "0"
    }
    return b
};
AmCharts.toScientific = function(a, b) {
    if (0 === a) return "0";
    var d = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
    Math.pow(10, d);
    mantissa = String(mantissa).split(".").join(b);
    return String(mantissa) + "e" + d
};
AmCharts.randomColor = function() {
    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr( - 6)
};
AmCharts.hitTest = function(a, b, d) {
    var e = !1,
    f = a.x,
    g = a.x + a.width,
    h = a.y,
    j = a.y + a.height,
    k = AmCharts.isInRectangle;
    e || (e = k(f, h, b));
    e || (e = k(f, j, b));
    e || (e = k(g, h, b));
    e || (e = k(g, j, b)); ! e && !0 !== d && (e = AmCharts.hitTest(b, a, !0));
    return e
};
AmCharts.isInRectangle = function(a, b, d) {
    return a >= d.x - 5 && a <= d.x + d.width + 5 && b >= d.y - 5 && b <= d.y + d.height + 5 ? !0 : !1
};
AmCharts.isPercents = function(a) {
    if ( - 1 != String(a).indexOf("%")) return ! 0
};
AmCharts.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
AmCharts.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
AmCharts.monthNames = "January February March April May June July August September October November December".split(" ");
AmCharts.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.formatDate = function(a, b) {
    var d, e, f, g, h, j, k, l;
    AmCharts.useUTC ? (d = a.getUTCFullYear(), e = a.getUTCMonth(), f = a.getUTCDate(), g = a.getUTCDay(), h = a.getUTCHours(), j = a.getUTCMinutes(), k = a.getUTCSeconds(), l = a.getUTCMilliseconds()) : (d = a.getFullYear(), e = a.getMonth(), f = a.getDate(), g = a.getDay(), h = a.getHours(), j = a.getMinutes(), k = a.getSeconds(), l = a.getMilliseconds());
    var m = String(d).substr(2, 2),
    n = e + 1;
    9 > e && (n = "0" + n);
    var s = f;
    10 > f && (s = "0" + f);
    var p = "0" + g,
    r = h;
    24 == r && (r = 0);
    var q = r;
    10 > q && (q = "0" + q);
    b = b.replace(/JJ/g, q);
    b = b.replace(/J/g, r);
    r = h;
    0 === r && (r = 24);
    q = r;
    10 > q && (q = "0" + q);
    b = b.replace(/HH/g, q);
    b = b.replace(/H/g, r);
    r = h;
    11 < r && (r -= 12);
    q = r;
    10 > q && (q = "0" + q);
    b = b.replace(/KK/g, q);
    b = b.replace(/K/g, r);
    r = h;
    0 === r && (r = 12);
    12 < r && (r -= 12);
    q = r;
    10 > q && (q = "0" + q);
    b = b.replace(/LL/g, q);
    b = b.replace(/L/g, r);
    r = j;
    10 > r && (r = "0" + r);
    b = b.replace(/NN/g, r);
    b = b.replace(/N/g, j);
    j = k;
    10 > j && (j = "0" + j);
    b = b.replace(/SS/g, j);
    b = b.replace(/S/g, k);
    k = l;
    10 > k && (k = "00" + k);
    100 > k && (k = "0" + k);
    j = l;
    10 > j && (j = "00" + j);
    b = b.replace(/QQQ/g, k);
    b = b.replace(/QQ/g, j);
    b = b.replace(/Q/g, l);
    b = 12 > h ? b.replace(/A/g, "am") : b.replace(/A/g, "pm");
    b = b.replace(/YYYY/g, "@IIII@");
    b = b.replace(/YY/g, "@II@");
    b = b.replace(/MMMM/g, "@XXXX@");
    b = b.replace(/MMM/g, "@XXX@");
    b = b.replace(/MM/g, "@XX@");
    b = b.replace(/M/g, "@X@");
    b = b.replace(/DD/g, "@RR@");
    b = b.replace(/D/g, "@R@");
    b = b.replace(/EEEE/g, "@PPPP@");
    b = b.replace(/EEE/g, "@PPP@");
    b = b.replace(/EE/g, "@PP@");
    b = b.replace(/E/g, "@P@");
    b = b.replace(/@IIII@/g, d);
    b = b.replace(/@II@/g, m);
    b = b.replace(/@XXXX@/g, AmCharts.monthNames[e]);
    b = b.replace(/@XXX@/g, AmCharts.shortMonthNames[e]);
    b = b.replace(/@XX@/g, n);
    b = b.replace(/@X@/g, e + 1);
    b = b.replace(/@RR@/g, s);
    b = b.replace(/@R@/g, f);
    b = b.replace(/@PPPP@/g, AmCharts.dayNames[g]);
    b = b.replace(/@PPP@/g, AmCharts.shortDayNames[g]);
    b = b.replace(/@PP@/g, p);
    return b = b.replace(/@P@/g, g)
};
AmCharts.findPosX = function(a) {
    var b = a,
    d = a.offsetLeft;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) d += a.offsetLeft;
        for (; (b = b.parentNode) && b != document.body;) d -= b.scrollLeft || 0
    }
    return d
};
AmCharts.findPosY = function(a) {
    var b = a,
    d = a.offsetTop;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) d += a.offsetTop;
        for (; (b = b.parentNode) && b != document.body;) d -= b.scrollTop || 0
    }
    return d
};
AmCharts.findIfFixed = function(a) {
    if (a.offsetParent) for (; a = a.offsetParent;) if ("fixed" == AmCharts.getStyle(a, "position")) return ! 0;
    return ! 1
};
AmCharts.findIfAuto = function(a) {
    return a.style && "auto" == AmCharts.getStyle(a, "overflow") ? !0 : a.parentNode ? AmCharts.findIfAuto(a.parentNode) : !1
};
AmCharts.findScrollLeft = function(a, b) {
    a.scrollLeft && (b += a.scrollLeft);
    return a.parentNode ? AmCharts.findScrollLeft(a.parentNode, b) : b
};
AmCharts.findScrollTop = function(a, b) {
    a.scrollTop && (b += a.scrollTop);
    return a.parentNode ? AmCharts.findScrollTop(a.parentNode, b) : b
};
AmCharts.formatValue = function(a, b, d, e, f, g, h, j) {
    if (b) {
        void 0 === f && (f = "");
        var k;
        for (k = 0; k < d.length; k++) {
            var l = d[k],
            m = b[l];
            void 0 !== m && (m = g ? AmCharts.addPrefix(m, j, h, e) : AmCharts.formatNumber(m, e), a = a.replace(RegExp("\\[\\[" + f + "" + l + "\\]\\]", "g"), m))
        }
    }
    return a
};
AmCharts.formatDataContextValue = function(a, b) {
    if (a) {
        var d = a.match(/\[\[.*?\]\]/g),
        e;
        for (e = 0; e < d.length; e++) {
            var f = d[e],
            f = f.substr(2, f.length - 4);
            void 0 !== b[f] && (a = a.replace(RegExp("\\[\\[" + f + "\\]\\]", "g"), b[f]))
        }
    }
    return a
};
AmCharts.massReplace = function(a, b) {
    for (var d in b) if (b.hasOwnProperty(d)) {
        var e = b[d];
        void 0 === e && (e = "");
        a = a.replace(d, e)
    }
    return a
};
AmCharts.cleanFromEmpty = function(a) {
    return a.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function(a, b, d, e) {
    var f = AmCharts.formatNumber(a, e),
    g = "",
    h;
    if (0 === a) return "0";
    0 > a && (g = "-");
    a = Math.abs(a);
    if (1 < a) for (h = b.length - 1; - 1 < h; h--) {
        if (a >= b[h].number) {
            a /= b[h].number;
            e = Number(e.precision);
            1 > e && (e = 1);
            a = AmCharts.roundTo(a, e);
            f = g + "" + a + "" + b[h].prefix;
            break
        }
    } else for (h = 0; h < d.length; h++) if (a <= d[h].number) {
        a /= d[h].number;
        e = Math.abs(Math.round(Math.log(a) * Math.LOG10E));
        a = AmCharts.roundTo(a, e);
        f = g + "" + a + "" + d[h].prefix;
        break
    }
    return f
};
AmCharts.remove = function(a) {
    a && a.remove()
};
AmCharts.copyProperties = function(a, b) {
    for (var d in a) a.hasOwnProperty(d) && "events" != d && (void 0 !== a[d] && "function" != typeof a[d]) && (b[d] = a[d])
};
AmCharts.recommended = function() {
    var a = "js";
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");
    return a
};
AmCharts.getEffect = function(a) {
    ">" == a && (a = "easeOutSine");
    "<" == a && (a = "easeInSine");
    "elastic" == a && (a = "easeOutElastic");
    return a
};
AmCharts.extend = function(a, b) {
    for (var d in b) void 0 !== b[d] && void 0 === a[d] && (a[d] = b[d])
};
AmCharts.fixNewLines = function(a) {
    9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (a = AmCharts.massReplace(a, {
        "\n": "\r"
    }));
    return a
};
AmCharts.deleteObject = function(a, b) {
    if (a) {
        if (void 0 === b || null === b) b = 20;
        if (0 != b) if ("[object Array]" === Object.prototype.toString.call(a)) for (var d = 0; d < a.length; d++) AmCharts.deleteObject(a[d], b - 1),
        a[d] = null;
        else try {
            for (d in a) a[d] && ("object" == typeof a[d] && AmCharts.deleteObject(a[d], b - 1), "function" != typeof a[d] && (a[d] = null))
        } catch(e) {}
    }
};
AmCharts.changeDate = function(a, b, d, e, f) {
    var g = -1;
    void 0 === e && (e = !0);
    void 0 === f && (f = !1); ! 0 === e && (g = 1);
    switch (b) {
    case "YYYY":
        a.setFullYear(a.getFullYear() + d * g); ! e && !f && a.setDate(a.getDate() + 1);
        break;
    case "MM":
        a.setMonth(a.getMonth() + d * g); ! e && !f && a.setDate(a.getDate() + 1);
        break;
    case "DD":
        a.setDate(a.getDate() + d * g);
        break;
    case "WW":
        a.setDate(a.getDate() + 7 * d * g + 1);
        break;
    case "hh":
        a.setHours(a.getHours() + d * g);
        break;
    case "mm":
        a.setMinutes(a.getMinutes() + d * g);
        break;
    case "ss":
        a.setSeconds(a.getSeconds() + d * g);
        break;
    case "fff":
        a.setMilliseconds(a.getMilliseconds() + d * g)
    }
    return a
};
AmCharts.Bezier = AmCharts.Class({
    construct: function(a, b, d, e, f, g, h, j, k, l) {
        "object" == typeof h && (h = h[0]);
        "object" == typeof j && (j = j[0]);
        g = {
            fill: h,
            "fill-opacity": j,
            "stroke-width": g
        };
        void 0 !== k && 0 < k && (g["stroke-dasharray"] = k);
        isNaN(f) || (g["stroke-opacity"] = f);
        e && (g.stroke = e);
        e = "M" + Math.round(b[0]) + "," + Math.round(d[0]);
        f = [];
        for (k = 0; k < b.length; k++) f.push({
            x: Number(b[k]),
            y: Number(d[k])
        });
        1 < f.length && (b = this.interpolate(f), e += this.drawBeziers(b));
        l ? e += l: AmCharts.VML || (e += "M0,0 L0,0");
        this.path = a.path(e).attr(g)
    },
    interpolate: function(a) {
        var b = [];
        b.push({
            x: a[0].x,
            y: a[0].y
        });
        var d = a[1].x - a[0].x,
        e = a[1].y - a[0].y,
        f = AmCharts.bezierX,
        g = AmCharts.bezierY;
        b.push({
            x: a[0].x + d / f,
            y: a[0].y + e / g
        });
        var h;
        for (h = 1; h < a.length - 1; h++) {
            var j = a[h - 1],
            k = a[h],
            e = a[h + 1],
            d = e.x - k.x,
            e = e.y - j.y,
            j = k.x - j.x;
            j > d && (j = d);
            b.push({
                x: k.x - j / f,
                y: k.y - e / g
            });
            b.push({
                x: k.x,
                y: k.y
            });
            b.push({
                x: k.x + j / f,
                y: k.y + e / g
            })
        }
        e = a[a.length - 1].y - a[a.length - 2].y;
        d = a[a.length - 1].x - a[a.length - 2].x;
        b.push({
            x: a[a.length - 1].x - d / f,
            y: a[a.length - 1].y - e / g
        });
        b.push({
            x: a[a.length - 1].x,
            y: a[a.length - 1].y
        });
        return b
    },
    drawBeziers: function(a) {
        var b = "",
        d;
        for (d = 0; d < (a.length - 1) / 3; d++) b += this.drawBezierMidpoint(a[3 * d], a[3 * d + 1], a[3 * d + 2], a[3 * d + 3]);
        return b
    },
    drawBezierMidpoint: function(a, b, d, e) {
        var f = Math.round,
        g = this.getPointOnSegment(a, b, 0.75),
        h = this.getPointOnSegment(e, d, 0.75),
        j = (e.x - a.x) / 16,
        k = (e.y - a.y) / 16,
        l = this.getPointOnSegment(a, b, 0.375);
        a = this.getPointOnSegment(g, h, 0.375);
        a.x -= j;
        a.y -= k;
        b = this.getPointOnSegment(h, g, 0.375);
        b.x += j;
        b.y += k;
        d = this.getPointOnSegment(e, d, 0.375);
        j = this.getMiddle(l, a);
        g = this.getMiddle(g, h);
        h = this.getMiddle(b, d);
        l = " Q" + f(l.x) + "," + f(l.y) + "," + f(j.x) + "," + f(j.y);
        l += " Q" + f(a.x) + "," + f(a.y) + "," + f(g.x) + "," + f(g.y);
        l += " Q" + f(b.x) + "," + f(b.y) + "," + f(h.x) + "," + f(h.y);
        return l += " Q" + f(d.x) + "," + f(d.y) + "," + f(e.x) + "," + f(e.y)
    },
    getMiddle: function(a, b) {
        return {
            x: (a.x + b.x) / 2,
            y: (a.y + b.y) / 2
        }
    },
    getPointOnSegment: function(a, b, d) {
        return {
            x: a.x + (b.x - a.x) * d,
            y: a.y + (b.y - a.y) * d
        }
    }
});
AmCharts.Cuboid = AmCharts.Class({
    construct: function(a, b, d, e, f, g, h, j, k, l, m, n, s) {
        this.set = a.set();
        this.container = a;
        this.h = Math.round(d);
        this.w = Math.round(b);
        this.dx = e;
        this.dy = f;
        this.colors = g;
        this.alpha = h;
        this.bwidth = j;
        this.bcolor = k;
        this.balpha = l;
        this.colors = g;
        s ? 0 > b && 0 === m && (m = 180) : 0 > d && 270 == m && (m = 90);
        this.gradientRotation = m;
        0 === e && 0 === f && (this.cornerRadius = n);
        this.draw()
    },
    draw: function() {
        var a = this.set;
        a.clear();
        var b = this.container,
        d = this.w,
        e = this.h,
        f = this.dx,
        g = this.dy,
        h = this.colors,
        j = this.alpha,
        k = this.bwidth,
        l = this.bcolor,
        m = this.balpha,
        n = this.gradientRotation,
        s = this.cornerRadius,
        p = h,
        r = h;
        "object" == typeof h && (p = h[0], r = h[h.length - 1]);
        var q, u, t, v, w, y, x, z, C;
        if (0 < f || 0 < g) x = r,
        r = AmCharts.adjustLuminosity(p, -0.2),
        r = AmCharts.adjustLuminosity(p, -0.2),
        q = AmCharts.polygon(b, [0, f, d + f, d, 0], [0, g, g, 0, 0], r, j, 0, 0, 0, n),
        0 < m && (C = AmCharts.line(b, [0, f, d + f], [0, g, g], l, m, k)),
        u = AmCharts.polygon(b, [0, 0, d, d, 0], [0, e, e, 0, 0], r, j, 0, 0, 0, 0, n),
        u.translate(f, g),
        0 < m && (t = AmCharts.line(b, [f, f], [g, g + e], l, 1, k)),
        v = AmCharts.polygon(b, [0, 0, f, f, 0], [0, e, e + g, g, 0], r, j, 0, 0, 0, n),
        w = AmCharts.polygon(b, [d, d, d + f, d + f, d], [0, e, e + g, g, 0], r, j, 0, 0, 0, n),
        0 < m && (y = AmCharts.line(b, [d, d + f, d + f, d], [0, g, e + g, e], l, m, k)),
        r = AmCharts.adjustLuminosity(x, 0.2),
        x = AmCharts.polygon(b, [0, f, d + f, d, 0], [e, e + g, e + g, e, e], r, j, 0, 0, 0, n),
        0 < m && (z = AmCharts.line(b, [0, f, d + f], [e, e + g, e + g], l, m, k));
        1 > Math.abs(e) && (e = 0);
        1 > Math.abs(d) && (d = 0);
        b = 0 === e ? AmCharts.line(b, [0, d], [0, 0], p, m, k) : 0 === d ? AmCharts.line(b, [0, 0], [0, e], p, m, k) : 0 < s ? AmCharts.rect(b, d, e, h, j, k, l, m, s, n) : AmCharts.polygon(b, [0, 0, d, d, 0], [0, e, e, 0, 0], h, j, k, l, m, n);
        e = 0 > e ? [q, C, u, t, v, w, y, x, z, b] : [x, z, u, t, v, w, q, C, y, b];
        for (q = 0; q < e.length; q++)(u = e[q]) && a.push(u)
    },
    width: function(a) {
        this.w = a;
        this.draw()
    },
    height: function(a) {
        this.h = a;
        this.draw()
    },
    animateHeight: function(a, b) {
        var d = this;
        d.easing = b;
        d.totalFrames = 1E3 * a / AmCharts.updateRate;
        d.rh = d.h;
        d.frame = 0;
        d.height(1);
        setTimeout(function() {
            d.updateHeight.call(d)
        },
        AmCharts.updateRate)
    },
    updateHeight: function() {
        var a = this;
        a.frame++;
        var b = a.totalFrames;
        a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), setTimeout(function() {
            a.updateHeight.call(a)
        },
        AmCharts.updateRate))
    },
    animateWidth: function(a, b) {
        var d = this;
        d.easing = b;
        d.totalFrames = 1E3 * a / AmCharts.updateRate;
        d.rw = d.w;
        d.frame = 0;
        d.width(1);
        setTimeout(function() {
            d.updateWidth.call(d)
        },
        AmCharts.updateRate)
    },
    updateWidth: function() {
        var a = this;
        a.frame++;
        var b = a.totalFrames;
        a.frame <= b && (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function() {
            a.updateWidth.call(a)
        },
        AmCharts.updateRate))
    }
});
AmCharts.AmLegend = AmCharts.Class({
    construct: function() {
        this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
        this.position = "bottom";
        this.borderColor = this.color = "#000000";
        this.borderAlpha = 0;
        this.markerLabelGap = 5;
        this.verticalGap = 10;
        this.align = "left";
        this.horizontalGap = 0;
        this.spacing = 10;
        this.markerDisabledColor = "#AAB3B3";
        this.markerType = "square";
        this.markerSize = 16;
        this.markerBorderThickness = 1;
        this.marginBottom = this.marginTop = 0;
        this.marginLeft = this.marginRight = 20;
        this.autoMargins = !0;
        this.valueWidth = 50;
        this.switchable = !0;
        this.switchType = "x";
        this.switchColor = "#FFFFFF";
        this.rollOverColor = "#CC0000";
        this.reversedOrder = !1;
        this.labelText = "[[title]]";
        this.valueText = "[[value]]";
        this.useMarkerColorForLabels = !1;
        this.rollOverGraphAlpha = 1;
        this.textClickEnabled = !1;
        this.equalWidths = !0;
        this.dateFormat = "DD-MM-YYYY";
        this.backgroundColor = "#FFFFFF";
        this.backgroundAlpha = 0;
        this.showEntries = !0
    },
    setData: function(a) {
        this.data = a;
        this.invalidateSize()
    },
    invalidateSize: function() {
        this.destroy();
        this.entries = [];
        this.valueLabels = [];
        AmCharts.ifArray(this.data) && this.drawLegend()
    },
    drawLegend: function() {
        var a = this.chart,
        b = this.position,
        d = this.width,
        e = a.divRealWidth,
        f = a.divRealHeight,
        g = this.div,
        h = this.data;
        isNaN(this.fontSize) && (this.fontSize = a.fontSize);
        if ("right" == b || "left" == b) this.maxColumns = 1,
        this.marginLeft = this.marginRight = 10;
        else if (this.autoMargins) {
            this.marginRight = a.marginRight;
            this.marginLeft = a.marginLeft;
            var j = a.autoMarginOffset;
            "bottom" == b ? (this.marginBottom = j, this.marginTop = 0) : (this.marginTop = j, this.marginBottom = 0)
        }
        d = void 0 !== d ? AmCharts.toCoordinate(d, e) : a.realWidth;
        "outside" == b ? (d = g.offsetWidth, f = g.offsetHeight, g.clientHeight && (d = g.clientWidth, f = g.clientHeight)) : (g.style.width = d + "px", g.className = "amChartsLegend");
        this.divWidth = d;
        this.container = new AmCharts.AmDraw(g, d, f);
        this.lx = 0;
        this.ly = 8;
        b = this.markerSize;
        b > this.fontSize && (this.ly = b / 2 - 1);
        0 < b && (this.lx += b + this.markerLabelGap);
        this.titleWidth = 0;
        if (b = this.title) a = AmCharts.text(this.container, b, this.color, a.fontFamily, this.fontSize, "start", !0),
        a.translate(0, this.marginTop + this.verticalGap + this.ly + 1),
        a = a.getBBox(),
        this.titleWidth = a.width + 15,
        this.titleHeight = a.height + 6;
        this.index = this.maxLabelWidth = 0;
        if (this.showEntries) {
            for (a = 0; a < h.length; a++) this.createEntry(h[a]);
            for (a = this.index = 0; a < h.length; a++) this.createValue(h[a])
        }
        this.arrangeEntries();
        this.updateValues()
    },
    arrangeEntries: function() {
        var a = this.position,
        b = this.marginLeft + this.titleWidth,
        d = this.marginRight,
        e = this.marginTop,
        f = this.marginBottom,
        g = this.horizontalGap,
        h = this.div,
        j = this.divWidth,
        k = this.maxColumns,
        l = this.verticalGap,
        m = this.spacing,
        n = j - d - b,
        s = 0,
        p = 0,
        r = this.container,
        q = r.set();
        this.set = q;
        r = r.set();
        q.push(r);
        var u = this.entries,
        t, v;
        for (v = 0; v < u.length; v++) {
            t = u[v].getBBox();
            var w = t.width;
            w > s && (s = w);
            t = t.height;
            t > p && (p = t)
        }
        var y = w = 0,
        x = g;
        for (v = 0; v < u.length; v++) {
            var z = u[v];
            this.reversedOrder && (z = u[u.length - v - 1]);
            t = z.getBBox();
            var C;
            this.equalWidths ? C = g + y * (s + m + this.markerLabelGap) : (C = x, x = x + t.width + g + m);
            C + t.width > n && 0 < v && (w++, y = 0, C = g, x = C + t.width + g + m);
            z.translate(C, (p + l) * w);
            y++; ! isNaN(k) && y >= k && (y = 0, w++);
            r.push(z)
        }
        t = r.getBBox();
        k = t.height + 2 * l - 1;
        "left" == a || "right" == a ? (j = t.width + 2 * g, h.style.width = j + b + d + "px") : j = j - b - d - 1;
        d = AmCharts.polygon(this.container, [0, j, j, 0], [0, 0, k, k], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
        q.push(d);
        q.translate(b, e);
        d.toBack();
        b = g;
        if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a)"center" == this.align ? b = g + (j - t.width) / 2 : "right" == this.align && (b = g + j - t.width);
        r.translate(b, l + 1);
        this.titleHeight > k && (k = this.titleHeight);
        a = k + e + f + 1;
        0 > a && (a = 0);
        h.style.height = Math.round(a) + "px"
    },
    createEntry: function(a) {
        if (!1 !== a.visibleInLegend) {
            var b = this.chart,
            d = a.markerType;
            d || (d = this.markerType);
            var e = a.color,
            f = a.alpha;
            a.legendKeyColor && (e = a.legendKeyColor());
            a.legendKeyAlpha && (f = a.legendKeyAlpha()); ! 0 === a.hidden && (e = this.markerDisabledColor);
            var g = this.createMarker(d, e, f);
            this.addListeners(g, a);
            f = this.container.set([g]);
            this.switchable && f.setAttr("cursor", "pointer");
            var h = this.switchType;
            if (h) {
                var j;
                j = "x" == h ? this.createX() : this.createV();
                j.dItem = a; ! 0 !== a.hidden ? "x" == h ? j.hide() : j.show() : "x" != h && j.hide();
                this.switchable || j.hide();
                this.addListeners(j, a);
                a.legendSwitch = j;
                f.push(j)
            }
            h = this.color;
            a.showBalloon && (this.textClickEnabled && void 0 !== this.selectedColor) && (h = this.selectedColor);
            this.useMarkerColorForLabels && (h = e); ! 0 === a.hidden && (h = this.markerDisabledColor);
            var e = AmCharts.massReplace(this.labelText, {
                "[[title]]": a.title
            }),
            k = this.fontSize,
            l = this.markerSize;
            if (g && l <= k) {
                var m = 0;
                if ("bubble" == d || "circle" == d) m = l / 2;
                d = m + this.ly - k / 2 + (k + 2 - l) / 2;
                g.translate(m, d);
                j && j.translate(m, d)
            }
            var n;
            e && (n = AmCharts.text(this.container, e, h, b.fontFamily, k, "start"), n.translate(this.lx, this.ly), f.push(n), b = n.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b));
            this.entries[this.index] = f;
            a.legendEntry = this.entries[this.index];
            a.legendLabel = n;
            this.index++
        }
    },
    addListeners: function(a, b) {
        var d = this;
        a && a.mouseover(function() {
            d.rollOverMarker(b)
        }).mouseout(function() {
            d.rollOutMarker(b)
        }).click(function() {
            d.clickMarker(b)
        })
    },
    rollOverMarker: function(a) {
        this.switchable && this.dispatch("rollOverMarker", a);
        this.dispatch("rollOverItem", a)
    },
    rollOutMarker: function(a) {
        this.switchable && this.dispatch("rollOutMarker", a);
        this.dispatch("rollOutItem", a)
    },
    clickMarker: function(a) {
        this.switchable ? !0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a) : this.textClickEnabled && this.dispatch("clickMarker", a)
    },
    rollOverLabel: function(a) {
        a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
            fill: this.rollOverColor
        }), this.dispatch("rollOverItem", a))
    },
    rollOutLabel: function(a) {
        if (!a.hidden) {
            if (this.textClickEnabled && a.legendLabel) {
                var b = this.color;
                void 0 !== this.selectedColor && a.showBalloon && (b = this.selectedColor);
                this.useMarkerColorForLabels && (b = a.lineColor, void 0 === b && (b = a.color));
                a.legendLabel.attr({
                    fill: b
                })
            }
            this.dispatch("rollOutItem", a)
        }
    },
    clickLabel: function(a) {
        this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a))
    },
    dispatch: function(a, b) {
        this.fire(a, {
            type: a,
            dataItem: b,
            target: this,
            chart: this.chart
        })
    },
    createValue: function(a) {
        var b = this,
        d = b.fontSize;
        if (!1 !== a.visibleInLegend) {
            var e = b.maxLabelWidth;
            b.equalWidths || (b.valueAlign = "left");
            "left" == b.valueAlign && (e = a.legendEntry.getBBox().width);
            var f = e;
            if (b.valueText) {
                var g = b.color;
                b.useMarkerColorForLabels && (g = a.color); ! 0 === a.hidden && (g = b.markerDisabledColor);
                var h = b.valueText,
                e = e + b.lx + b.markerLabelGap + b.valueWidth,
                j = "end";
                "left" == b.valueAlign && (e -= b.valueWidth, j = "start");
                g = AmCharts.text(b.container, h, g, b.chart.fontFamily, d, j);
                g.translate(e, b.ly);
                b.entries[b.index].push(g);
                f += b.valueWidth + b.markerLabelGap;
                g.dItem = a;
                b.valueLabels.push(g)
            }
            b.index++;
            g = b.markerSize;
            g < d + 7 && (g = d + 7, AmCharts.VML && (g += 3));
            d = b.container.rect(b.markerSize + b.markerLabelGap, 0, f, g, 0, 0).attr({
                stroke: "none",
                fill: "#FFFFFF",
                "fill-opacity": 0.005
            });
            d.dItem = a;
            b.entries[b.index - 1].push(d);
            d.mouseover(function() {
                b.rollOverLabel(a)
            }).mouseout(function() {
                b.rollOutLabel(a)
            }).click(function() {
                b.clickLabel(a)
            })
        }
    },
    createV: function() {
        var a = this.markerSize;
        return AmCharts.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
    },
    createX: function() {
        var a = this.markerSize - 3,
        b = {
            stroke: this.switchColor,
            "stroke-width": 3
        },
        d = this.container,
        e = AmCharts.line(d, [3, a], [3, a]).attr(b),
        a = AmCharts.line(d, [3, a], [a, 3]).attr(b);
        return this.container.set([e, a])
    },
    createMarker: function(a, b, d) {
        var e = this.markerSize,
        f = this.container,
        g, h = this.markerBorderColor;
        h || (h = b);
        var j = this.markerBorderThickness,
        k = this.markerBorderAlpha;
        switch (a) {
        case "square":
            g = AmCharts.polygon(f, [0, e, e, 0], [0, 0, e, e], b, d, j, h, k);
            break;
        case "circle":
            g = AmCharts.circle(f, e / 2, b, d, j, h, k);
            g.translate(e / 2, e / 2);
            break;
        case "line":
            g = AmCharts.line(f, [0, e], [e / 2, e / 2], b, d, j);
            break;
        case "dashedLine":
            g = AmCharts.line(f, [0, e], [e / 2, e / 2], b, d, j, 3);
            break;
        case "triangleUp":
            g = AmCharts.polygon(f, [0, e / 2, e, e], [e, 0, e, e], b, d, j, h, k);
            break;
        case "triangleDown":
            g = AmCharts.polygon(f, [0, e / 2, e, e], [0, e, 0, 0], b, d, j, h, k);
            break;
        case "bubble":
            g = AmCharts.circle(f, e / 2, b, d, j, h, k, !0),
            g.translate(e / 2, e / 2)
        }
        return g
    },
    validateNow: function() {
        this.invalidateSize()
    },
    updateValues: function() {
        var a = this.valueLabels,
        b = this.chart,
        d;
        for (d = 0; d < a.length; d++) {
            var e = a[d],
            f = e.dItem;
            if (void 0 !== f.type) {
                var g = f.currentDataItem;
                if (g) {
                    var h = this.valueText;
                    f.legendValueText && (h = f.legendValueText);
                    f = h;
                    f = b.formatString(f, g);
                    e.text(f)
                } else e.text(" ")
            } else g = b.formatString(this.valueText, f),
            e.text(g)
        }
    },
    renderFix: function() {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    destroy: function() {
        this.div.innerHTML = "";
        AmCharts.remove(this.set)
    }
});
AmCharts.AmBalloon = AmCharts.Class({
    construct: function() {
        this.enabled = !0;
        this.fillColor = "#CC0000";
        this.fillAlpha = 1;
        this.borderThickness = 2;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = 1;
        this.cornerRadius = 6;
        this.maximumWidth = 220;
        this.horizontalPadding = 8;
        this.verticalPadding = 5;
        this.pointerWidth = 10;
        this.pointerOrientation = "V";
        this.color = "#FFFFFF";
        this.textShadowColor = "#000000";
        this.adjustBorderColor = !1;
        this.showBullet = !0;
        this.show = this.follow = !1;
        this.bulletSize = 3;
        this.textAlign = "middle"
    },
    draw: function() {
        var a = this.pointToX,
        b = this.pointToY,
        d = this.textAlign;
        if (!isNaN(a)) {
            var e = this.chart,
            f = e.container,
            g = this.set;
            AmCharts.remove(g);
            AmCharts.remove(this.pointer);
            this.set = g = f.set();
            e.balloonsSet.push(g);
            if (this.show) {
                var h = this.l,
                j = this.t,
                k = this.r,
                l = this.b,
                m = this.textShadowColor;
                this.color == m && (m = void 0);
                var n = this.balloonColor,
                s = this.fillColor,
                p = this.borderColor;
                void 0 != n && (this.adjustBorderColor ? p = n: s = n);
                var r = this.horizontalPadding,
                n = this.verticalPadding,
                q = this.pointerWidth,
                u = this.pointerOrientation,
                t = this.cornerRadius,
                v = e.fontFamily,
                w = this.fontSize;
                void 0 == w && (w = e.fontSize);
                e = AmCharts.text(f, this.text, this.color, v, w, d);
                g.push(e);
                var y;
                void 0 != m && (y = AmCharts.text(f, this.text, m, v, w, d, !1, 0.4), g.push(y));
                v = e.getBBox();
                m = v.height + 2 * n;
                v = v.width + 2 * r;
                window.opera && (m += 2);
                var x, w = w / 2 + n;
                switch (d) {
                case "middle":
                    x = v / 2;
                    break;
                case "left":
                    x = r;
                    break;
                case "right":
                    x = v - r
                }
                e.translate(x, w);
                y && y.translate(x + 1, w + 1);
                "H" != u ? (x = a - v / 2, d = b < j + m + 10 && "down" != u ? b + q: b - m - q) : (2 * q > m && (q = m / 2), d = b - m / 2, x = a < h + (k - h) / 2 ? a + q: a - v - q);
                d + m >= l && (d = l - m);
                d < j && (d = j);
                x < h && (x = h);
                x + v > k && (x = k - v);
                0 < t || 0 === q ? (p = AmCharts.rect(f, v, m, s, this.fillAlpha, this.borderThickness, p, this.borderAlpha, this.cornerRadius), this.showBullet && (f = AmCharts.circle(f, this.bulletSize, s, this.fillAlpha), f.translate(a, b), this.pointer = f)) : (l = [], t = [], "H" != u ? (h = a - x, h > v - q && (h = v - q), h < q && (h = q), l = [0, h - q, a - x, h + q, v, v, 0, 0], t = b < j + m + 10 && "down" != u ? [0, 0, b - d, 0, 0, m, m, 0] : [m, m, b - d, m, m, 0, 0, m]) : (j = b - d, j > m - q && (j = m - q), j < q && (j = q), t = [0, j - q, b - d, j + q, m, m, 0, 0], l = a < h + (k - h) / 2 ? [0, 0, x < a ? 0 : a - x, 0, 0, v, v, 0] : [v, v, x + v > a ? v: a - x, v, v, 0, 0, v]), p = AmCharts.polygon(f, l, t, s, this.fillAlpha, this.borderThickness, p, this.borderAlpha));
                g.push(p);
                p.toFront();
                y && y.toFront();
                e.toFront();
                a = 1;
                9 > AmCharts.IEversion && this.follow && (a = 6);
                g.translate(x - a, d);
                g = e.getBBox();
                this.bottom = d + g.y + g.height + 2 * n + 2;
                this.yPos = g.y + d
            }
        }
    },
    followMouse: function() {
        if (this.follow && this.show) {
            var a = this.chart.mouseX,
            b = this.chart.mouseY - 3;
            this.pointToX = a;
            this.pointToY = b;
            if (a != this.previousX || b != this.previousY) if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw();
            else {
                var d = this.set;
                if (d) {
                    var e = d.getBBox(),
                    a = a - e.width / 2,
                    f = b - e.height - 10;
                    a < this.l && (a = this.l);
                    a > this.r - e.width && (a = this.r - e.width);
                    f < this.t && (f = b + 10);
                    d.translate(a, f)
                }
            }
        }
    },
    changeColor: function(a) {
        this.balloonColor = a
    },
    setBounds: function(a, b, d, e) {
        this.l = a;
        this.t = b;
        this.r = d;
        this.b = e
    },
    showBalloon: function(a) {
        this.text = a;
        this.show = !0;
        this.draw()
    },
    hide: function() {
        this.follow = this.show = !1;
        this.destroy()
    },
    setPosition: function(a, b, d) {
        this.pointToX = a;
        this.pointToY = b;
        d && (a != this.previousX || b != this.previousY) && this.draw();
        this.previousX = a;
        this.previousY = b
    },
    followCursor: function(a) {
        var b = this; (b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 !== b.pShowBullet && (b.showBullet = b.pShowBullet);
        clearInterval(b.interval);
        var d = b.chart.mouseX,
        e = b.chart.mouseY; ! isNaN(d) && a && (b.pointToX = d, b.pointToY = e - 3, b.interval = setInterval(function() {
            b.followMouse.call(b)
        },
        40))
    },
    destroy: function() {
        clearInterval(this.interval);
        AmCharts.remove(this.set);
        this.set = null;
        AmCharts.remove(this.pointer);
        this.pointer = null
    }
});
AmCharts.AmCoordinateChart = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function() {
        AmCharts.AmCoordinateChart.base.construct.call(this);
        this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem");
        this.plotAreaFillColors = "#FFFFFF";
        this.plotAreaFillAlphas = 0;
        this.plotAreaBorderColor = "#000000";
        this.plotAreaBorderAlpha = 0;
        this.startAlpha = 1;
        this.startDuration = 0;
        this.startEffect = "elastic";
        this.sequencedAnimation = !0;
        this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
        this.balloonDateFormat = "MMM DD, YYYY";
        this.valueAxes = [];
        this.graphs = []
    },
    initChart: function() {
        AmCharts.AmCoordinateChart.base.initChart.call(this);
        this.createValueAxes();
        AmCharts.VML && (this.startAlpha = 1);
        var a = this.legend;
        a && a.setData(this.graphs)
    },
    createValueAxes: function() {
        if (0 === this.valueAxes.length) {
            var a = new AmCharts.ValueAxis;
            this.addValueAxis(a)
        }
    },
    parseData: function() {
        this.processValueAxes();
        this.processGraphs()
    },
    parseSerialData: function() {
        AmCharts.AmSerialChart.base.parseData.call(this);
        var a = this.graphs,
        b, d = {},
        e = this.seriesIdField;
        e || (e = this.categoryField);
        this.chartData = [];
        var f = this.dataProvider;
        if (f) {
            var g = !1;
            if (b = this.categoryAxis) var g = b.parseDates,
            h = b.forceShowField;
            var j, k;
            g && (j = AmCharts.extractPeriod(b.minPeriod), k = j.period, j = j.count);
            var l = {};
            this.lookupTable = l;
            var m;
            for (m = 0; m < f.length; m++) {
                var n = {},
                s = f[m];
                b = s[this.categoryField];
                n.category = String(b);
                h && (n.forceShow = s[h]);
                l[s[e]] = n;
                g && (b = isNaN(b) ? new Date(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds()) : new Date(b), b = AmCharts.resetDateToMin(b, k, j), n.category = b, n.time = b.getTime());
                var p = this.valueAxes;
                n.axes = {};
                n.x = {};
                var r;
                for (r = 0; r < p.length; r++) {
                    var q = p[r].id;
                    n.axes[q] = {};
                    n.axes[q].graphs = {};
                    var u;
                    for (u = 0; u < a.length; u++) {
                        b = a[u];
                        var t = b.id,
                        v = b.periodValue;
                        if (b.valueAxis.id == q) {
                            n.axes[q].graphs[t] = {};
                            var w = {};
                            w.index = m;
                            b.dataProvider && (s = d);
                            w.values = this.processValues(s, b, v);
                            this.processFields(b, w, s);
                            w.category = n.category;
                            w.serialDataItem = n;
                            w.graph = b;
                            n.axes[q].graphs[t] = w
                        }
                    }
                }
                this.chartData[m] = n
            }
        }
        for (d = 0; d < a.length; d++) b = a[d],
        b.dataProvider && this.parseGraphData(b)
    },
    processValues: function(a, b, d) {
        var e = {},
        f, g = !1;
        if (("candlestick" == b.type || "ohlc" == b.type) && "" !== d) g = !0;
        f = Number(a[b.valueField + d]);
        isNaN(f) || (e.value = f);
        g && (d = "Open");
        f = Number(a[b.openField + d]);
        isNaN(f) || (e.open = f);
        g && (d = "Close");
        f = Number(a[b.closeField + d]);
        isNaN(f) || (e.close = f);
        g && (d = "Low");
        f = Number(a[b.lowField + d]);
        isNaN(f) || (e.low = f);
        g && (d = "High");
        f = Number(a[b.highField + d]);
        isNaN(f) || (e.high = f);
        return e
    },
    parseGraphData: function(a) {
        var b = a.dataProvider,
        d = a.seriesIdField;
        d || (d = this.seriesIdField);
        d || (d = this.categoryField);
        var e;
        for (e = 0; e < b.length; e++) {
            var f = b[e],
            g = this.lookupTable[String(f[d])],
            h = a.valueAxis.id;
            g && (h = g.axes[h].graphs[a.id], h.serialDataItem = g, h.values = this.processValues(f, a, a.periodValue), this.processFields(a, h, f))
        }
    },
    addValueAxis: function(a) {
        a.chart = this;
        this.valueAxes.push(a);
        this.validateData()
    },
    removeValueAxesAndGraphs: function() {
        var a = this.valueAxes,
        b;
        for (b = a.length - 1; - 1 < b; b--) this.removeValueAxis(a[b])
    },
    removeValueAxis: function(a) {
        var b = this.graphs,
        d;
        for (d = b.length - 1; 0 <= d; d--) {
            var e = b[d];
            e && e.valueAxis == a && this.removeGraph(e)
        }
        b = this.valueAxes;
        for (d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1);
        this.validateData()
    },
    addGraph: function(a) {
        this.graphs.push(a);
        this.chooseGraphColor(a, this.graphs.length - 1);
        this.validateData()
    },
    removeGraph: function(a) {
        var b = this.graphs,
        d;
        for (d = b.length - 1; 0 <= d; d--) b[d] == a && (b.splice(d, 1), a.destroy());
        this.validateData()
    },
    processValueAxes: function() {
        var a = this.valueAxes,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.chart = this;
            d.id || (d.id = "valueAxis" + b + "_" + (new Date).getTime());
            if (!0 === this.usePrefixes || !1 === this.usePrefixes) d.usePrefixes = this.usePrefixes
        }
    },
    processGraphs: function() {
        var a = this.graphs,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.chart = this;
            d.valueAxis || (d.valueAxis = this.valueAxes[0]);
            d.id || (d.id = "graph" + b + "_" + (new Date).getTime())
        }
    },
    formatString: function(a, b) {
        var d = b.graph,
        e = d.valueAxis;
        e.duration && b.values.value && (e = AmCharts.formatDuration(b.values.value, e.duration, "", e.durationUnits, e.maxInterval, e.numberFormatter), a = a.split("[[value]]").join(e));
        a = AmCharts.massReplace(a, {
            "[[title]]": d.title,
            "[[description]]": b.description,
            "<br>": "\n"
        });
        a = AmCharts.fixNewLines(a);
        return a = AmCharts.cleanFromEmpty(a)
    },
    getBalloonColor: function(a, b) {
        var d = a.lineColor,
        e = a.balloonColor,
        f = a.fillColors;
        "object" == typeof f ? d = f[0] : void 0 !== f && (d = f);
        if (b.isNegative) {
            var f = a.negativeLineColor,
            g = a.negativeFillColors;
            "object" == typeof g ? f = g[0] : void 0 !== g && (f = g);
            void 0 !== f && (d = f)
        }
        void 0 !== b.color && (d = b.color);
        void 0 === e && (e = d);
        return e
    },
    getGraphById: function(a) {
        return this.getObjById(this.graphs, a)
    },
    getValueAxisById: function(a) {
        return this.getObjById(this.valueAxes, a)
    },
    getObjById: function(a, b) {
        var d, e;
        for (e = 0; e < a.length; e++) {
            var f = a[e];
            f.id == b && (d = f)
        }
        return d
    },
    processFields: function(a, b, d) {
        if (a.itemColors) {
            var e = a.itemColors,
            f = b.index;
            b.color = f < e.length ? e[f] : AmCharts.randomColor()
        }
        e = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor".split(" ");
        for (f = 0; f < e.length; f++) {
            var g = e[f],
            h = a[g + "Field"];
            h && (h = d[h], AmCharts.isDefined(h) && (b[g] = h))
        }
        b.dataContext = d
    },
    chooseGraphColor: function(a, b) {
        if (void 0 == a.lineColor) {
            var d;
            d = this.colors.length > b ? this.colors[b] : AmCharts.randomColor();
            a.lineColor = d
        }
    },
    handleLegendEvent: function(a) {
        var b = a.type;
        if (a = a.dataItem) {
            var d = a.hidden,
            e = a.showBalloon;
            switch (b) {
            case "clickMarker":
                e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
                break;
            case "clickLabel":
                e ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
                break;
            case "rollOverItem":
                d || this.highlightGraph(a);
                break;
            case "rollOutItem":
                d || this.unhighlightGraph();
                break;
            case "hideItem":
                this.hideGraph(a);
                break;
            case "showItem":
                this.showGraph(a)
            }
        }
    },
    highlightGraph: function(a) {
        var b = this.graphs,
        d, e = 0.2;
        this.legend && (e = this.legend.rollOverGraphAlpha);
        if (1 != e) for (d = 0; d < b.length; d++) {
            var f = b[d];
            f != a && f.changeOpacity(e)
        }
    },
    unhighlightGraph: function() {
        this.legend && (alpha = this.legend.rollOverGraphAlpha);
        if (1 != alpha) {
            var a = this.graphs,
            b;
            for (b = 0; b < a.length; b++) a[b].changeOpacity(1)
        }
    },
    showGraph: function(a) {
        a.hidden = !1;
        this.dataChanged = !0;
        this.marginsUpdated = !1;
        this.chartCreated && this.initChart()
    },
    hideGraph: function(a) {
        this.dataChanged = !0;
        this.marginsUpdated = !1;
        a.hidden = !0;
        this.chartCreated && this.initChart()
    },
    hideGraphsBalloon: function(a) {
        a.showBalloon = !1;
        this.updateLegend()
    },
    showGraphsBalloon: function(a) {
        a.showBalloon = !0;
        this.updateLegend()
    },
    updateLegend: function() {
        this.legend && this.legend.invalidateSize()
    },
    resetAnimation: function() {
        var a = this.graphs;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) a[b].animationPlayed = !1
        }
    },
    animateAgain: function() {
        this.resetAnimation();
        this.validateNow()
    }
});
AmCharts.AmRectangularChart = AmCharts.Class({
    inherits: AmCharts.AmCoordinateChart,
    construct: function() {
        AmCharts.AmRectangularChart.base.construct.call(this);
        this.createEvents("zoomed");
        this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
        this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0;
        this.heightMultiplier = this.widthMultiplier = 1;
        this.zoomOutText = "Show all";
        this.zoomOutButton = {
            backgroundColor: "#b2e1ff",
            backgroundAlpha: 1
        };
        this.trendLines = [];
        this.autoMargins = !0;
        this.marginsUpdated = !1;
        this.autoMarginOffset = 10
    },
    initChart: function() {
        AmCharts.AmRectangularChart.base.initChart.call(this);
        this.updateDxy();
        var a = !0; ! this.marginsUpdated && this.autoMargins && (this.resetMargins(), a = !1);
        this.updateMargins();
        this.updatePlotArea();
        this.updateScrollbars();
        this.updateTrendLines();
        this.updateChartCursor();
        this.updateValueAxes();
        a && (this.scrollbarOnly || this.updateGraphs())
    },
    drawChart: function() {
        AmCharts.AmRectangularChart.base.drawChart.call(this);
        this.drawPlotArea();
        if (AmCharts.ifArray(this.chartData)) {
            var a = this.chartCursor;
            a && a.draw();
            a = this.zoomOutText;
            "" !== a && a && this.drawZoomOutButton()
        }
    },
    resetMargins: function() {
        var a = {},
        b;
        if ("serial" == this.chartType) {
            var d = this.valueAxes;
            for (b = 0; b < d.length; b++) {
                var e = d[b];
                e.ignoreAxisWidth || (e.setOrientation(this.rotate), e.fixAxisPosition(), a[e.position] = !0)
            }
            if ((b = this.categoryAxis) && !b.ignoreAxisWidth) b.setOrientation(!this.rotate),
            b.fixAxisPosition(),
            b.fixAxisPosition(),
            a[b.position] = !0
        } else {
            e = this.xAxes;
            d = this.yAxes;
            for (b = 0; b < e.length; b++) {
                var f = e[b];
                f.ignoreAxisWidth || (f.setOrientation(!0), f.fixAxisPosition(), a[f.position] = !0)
            }
            for (b = 0; b < d.length; b++) e = d[b],
            e.ignoreAxisWidth || (e.setOrientation(!1), e.fixAxisPosition(), a[e.position] = !0)
        }
        a.left && (this.marginLeft = 0);
        a.right && (this.marginRight = 0);
        a.top && (this.marginTop = 0);
        a.bottom && (this.marginBottom = 0);
        this.fixMargins = a
    },
    measureMargins: function() {
        var a = this.valueAxes,
        b, d = this.autoMarginOffset,
        e = this.fixMargins,
        f = this.realWidth,
        g = this.realHeight,
        h = d,
        j = d,
        k = f - d;
        b = g - d;
        var l;
        for (l = 0; l < a.length; l++) b = this.getAxisBounds(a[l], h, k, j, b),
        h = b.l,
        k = b.r,
        j = b.t,
        b = b.b;
        if (a = this.categoryAxis) b = this.getAxisBounds(a, h, k, j, b),
        h = b.l,
        k = b.r,
        j = b.t,
        b = b.b;
        e.left && h < d && (this.marginLeft = Math.round( - h + d));
        e.right && k > f - d && (this.marginRight = Math.round(k - f + d));
        e.top && j < d + this.titleHeight && (this.marginTop = Math.round(this.marginTop - j + d + this.titleHeight));
        e.bottom && b > g - d && (this.marginBottom = Math.round(b - g + d));
        this.resetAnimation();
        this.initChart()
    },
    getAxisBounds: function(a, b, d, e, f) {
        if (!a.ignoreAxisWidth) {
            var g = a.labelsSet,
            h = a.tickLength;
            a.inside && (h = 0);
            if (g) switch (g = a.getBBox(), a.position) {
            case "top":
                a = g.y;
                e > a && (e = a);
                break;
            case "bottom":
                a = g.y + g.height;
                f < a && (f = a);
                break;
            case "right":
                a = g.x + g.width + h + 3;
                d < a && (d = a);
                break;
            case "left":
                a = g.x - h,
                b > a && (b = a)
            }
        }
        return {
            l: b,
            t: e,
            r: d,
            b: f
        }
    },
    drawZoomOutButton: function() {
        var a = this,
        b = a.container.set();
        a.zoomButtonSet.push(b);
        var d = a.color,
        e = a.fontSize,
        f = a.zoomOutButton;
        f && (f.fontSize && (e = f.fontSize), f.color && (d = f.color));
        d = AmCharts.text(a.container, a.zoomOutText, d, a.fontFamily, e, "start");
        e = d.getBBox();
        d.translate(29, 6 + e.height / 2);
        f = AmCharts.rect(a.container, e.width + 40, e.height + 15, f.backgroundColor, f.backgroundAlpha);
        b.push(f);
        a.zbBG = f;
        void 0 !== a.pathToImages && (f = a.container.image(a.pathToImages + "lens.png", 0, 0, 16, 16), f.translate(7, e.height / 2 - 1), f.toFront(), b.push(f));
        d.toFront();
        b.push(d);
        f = b.getBBox();
        b.translate(a.marginLeftReal + a.plotAreaWidth - f.width, a.marginTopReal);
        b.hide();
        b.mouseover(function() {
            a.rollOverZB()
        }).mouseout(function() {
            a.rollOutZB()
        }).click(function() {
            a.clickZB()
        }).touchstart(function() {
            a.rollOverZB()
        }).touchend(function() {
            a.rollOutZB();
            a.clickZB()
        });
        for (f = 0; f < b.length; f++) b[f].attr({
            cursor: "pointer"
        });
        a.zbSet = b
    },
    rollOverZB: function() {
        this.zbBG.show()
    },
    rollOutZB: function() {
        this.zbBG.hide()
    },
    clickZB: function() {
        this.zoomOut()
    },
    zoomOut: function() {
        this.updateScrollbar = !0;
        this.zoom()
    },
    drawPlotArea: function() {
        var a = this.dx,
        b = this.dy,
        d = this.marginLeftReal,
        e = this.marginTopReal,
        f = this.plotAreaWidth - 1,
        g = this.plotAreaHeight - 1,
        h = this.plotAreaFillColors,
        j = this.plotAreaFillAlphas,
        k = this.plotAreaBorderColor,
        l = this.plotAreaBorderAlpha;
        this.trendLinesSet.clipRect(d, e, f, g);
        "object" == typeof j && (j = j[0]);
        h = AmCharts.polygon(this.container, [0, f, f, 0], [0, 0, g, g], h, j, 1, k, l, this.plotAreaGradientAngle);
        h.translate(d + a, e + b);
        this.set.push(h);
        0 !== a && 0 !== b && (h = this.plotAreaFillColors, "object" == typeof h && (h = h[0]), h = AmCharts.adjustLuminosity(h, -0.15), f = AmCharts.polygon(this.container, [0, a, f + a, f, 0], [0, b, b, 0, 0], h, j, 1, k, l), f.translate(d, e + g), this.set.push(f), a = AmCharts.polygon(this.container, [0, 0, a, a, 0], [0, g, g + b, b, 0], h, j, 1, k, l), a.translate(d, e), this.set.push(a))
    },
    updatePlotArea: function() {
        var a = this.updateWidth(),
        b = this.updateHeight(),
        d = this.container;
        this.realWidth = a;
        this.realWidth = b;
        d && this.container.setSize(a, b);
        a = a - this.marginLeftReal - this.marginRightReal - this.dx;
        b = b - this.marginTopReal - this.marginBottomReal;
        1 > a && (a = 1);
        1 > b && (b = 1);
        this.plotAreaWidth = Math.round(a);
        this.plotAreaHeight = Math.round(b)
    },
    updateDxy: function() {
        this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180));
        this.dy = Math.round( - this.depth3D * Math.sin(this.angle * Math.PI / 180))
    },
    updateMargins: function() {
        var a = this.getTitleHeight();
        this.titleHeight = a;
        this.marginTopReal = this.marginTop - this.dy + a;
        this.marginBottomReal = this.marginBottom;
        this.marginLeftReal = this.marginLeft;
        this.marginRightReal = this.marginRight
    },
    updateValueAxes: function() {
        var a = this.valueAxes,
        b = this.marginLeftReal,
        d = this.marginTopReal,
        e = this.plotAreaHeight,
        f = this.plotAreaWidth,
        g;
        for (g = 0; g < a.length; g++) {
            var h = a[g];
            h.axisRenderer = AmCharts.RecAxis;
            h.guideFillRenderer = AmCharts.RecFill;
            h.axisItemRenderer = AmCharts.RecItem;
            h.dx = this.dx;
            h.dy = this.dy;
            h.viW = f - 1;
            h.viH = e - 1;
            h.marginsChanged = !0;
            h.viX = b;
            h.viY = d;
            this.updateObjectSize(h)
        }
    },
    updateObjectSize: function(a) {
        a.width = (this.plotAreaWidth - 1) * this.widthMultiplier;
        a.height = (this.plotAreaHeight - 1) * this.heightMultiplier;
        a.x = this.marginLeftReal + this.horizontalPosition;
        a.y = this.marginTopReal + this.verticalPosition
    },
    updateGraphs: function() {
        var a = this.graphs,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.x = this.marginLeftReal + this.horizontalPosition;
            d.y = this.marginTopReal + this.verticalPosition;
            d.width = this.plotAreaWidth * this.widthMultiplier;
            d.height = this.plotAreaHeight * this.heightMultiplier;
            d.index = b;
            d.dx = this.dx;
            d.dy = this.dy;
            d.rotate = this.rotate;
            d.chartType = this.chartType
        }
    },
    updateChartCursor: function() {
        var a = this.chartCursor;
        a && (a.x = this.marginLeftReal, a.y = this.marginTopReal, a.width = this.plotAreaWidth - 1, a.height = this.plotAreaHeight - 1, a.chart = this)
    },
    updateScrollbars: function() {},
    addChartCursor: function(a) {
        AmCharts.callMethod("destroy", [this.chartCursor]);
        a && (this.listenTo(a, "changed", this.handleCursorChange), this.listenTo(a, "zoomed", this.handleCursorZoom));
        this.chartCursor = a
    },
    removeChartCursor: function() {
        AmCharts.callMethod("destroy", [this.chartCursor]);
        this.chartCursor = null
    },
    zoomTrendLines: function() {
        var a = this.trendLines,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.valueAxis.recalculateToPercents ? d.set && d.set.hide() : (d.x = this.marginLeftReal + this.horizontalPosition, d.y = this.marginTopReal + this.verticalPosition, d.draw())
        }
    },
    addTrendLine: function(a) {
        this.trendLines.push(a)
    },
    removeTrendLine: function(a) {
        var b = this.trendLines,
        d;
        for (d = b.length - 1; 0 <= d; d--) b[d] == a && b.splice(d, 1)
    },
    adjustMargins: function(a, b) {
        var d = a.scrollbarHeight;
        "top" == a.position ? b ? this.marginLeftReal += d: this.marginTopReal += d: b ? this.marginRightReal += d: this.marginBottomReal += d
    },
    getScrollbarPosition: function(a, b, d) {
        a.position = b ? "bottom" == d || "left" == d ? "bottom": "top": "top" == d || "right" == d ? "bottom": "top"
    },
    updateChartScrollbar: function(a, b) {
        if (a) {
            a.rotate = b;
            var d = this.marginTopReal,
            e = this.marginLeftReal,
            f = a.scrollbarHeight,
            g = this.dx,
            h = this.dy;
            "top" == a.position ? b ? (a.y = d, a.x = e - f) : (a.y = d - f + h, a.x = e + g) : b ? (a.y = d + h, a.x = e + this.plotAreaWidth + g) : (a.y = d + this.plotAreaHeight + 1, a.x = this.marginLeftReal)
        }
    },
    showZB: function(a) {
        var b = this.zbSet;
        b && (a ? b.show() : b.hide(), this.zbBG.hide())
    },
    handleReleaseOutside: function(a) {
        AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this, a); (a = this.chartCursor) && a.handleReleaseOutside()
    },
    handleMouseDown: function(a) {
        AmCharts.AmRectangularChart.base.handleMouseDown.call(this, a);
        var b = this.chartCursor;
        b && b.handleMouseDown(a)
    },
    handleCursorChange: function() {}
});
AmCharts.TrendLine = AmCharts.Class({
    construct: function() {
        this.createEvents("click");
        this.isProtected = !1;
        this.dashLength = 0;
        this.lineColor = "#00CC00";
        this.lineThickness = this.lineAlpha = 1
    },
    draw: function() {
        var a = this;
        a.destroy();
        var b = a.chart,
        d = b.container,
        e, f, g, h, j = a.categoryAxis,
        k = a.initialDate,
        l = a.initialCategory,
        m = a.finalDate,
        n = a.finalCategory,
        s = a.valueAxis,
        p = a.valueAxisX,
        r = a.initialXValue,
        q = a.finalXValue,
        u = a.initialValue,
        t = a.finalValue,
        v = s.recalculateToPercents;
        j && (k && (e = j.dateToCoordinate(k)), l && (e = j.categoryToCoordinate(l)), m && (f = j.dateToCoordinate(m)), n && (f = j.categoryToCoordinate(n)));
        p && !v && (isNaN(r) || (e = p.getCoordinate(r)), isNaN(q) || (f = p.getCoordinate(q)));
        s && !v && (isNaN(u) || (g = s.getCoordinate(u)), isNaN(t) || (h = s.getCoordinate(t))); ! isNaN(e) && (!isNaN(f) && !isNaN(g) && !isNaN(g)) && (b.rotate ? (j = [g, h], f = [e, f]) : (j = [e, f], f = [g, h]), g = a.lineColor, e = AmCharts.line(d, j, f, g, a.lineAlpha, a.lineThickness, a.dashLength), f = AmCharts.line(d, j, f, g, 0.005, 5), d = d.set([e, f]), d.translate(b.marginLeftReal, b.marginTopReal), b.trendLinesSet.push(d), a.line = e, a.set = d, f.mouseup(function() {
            a.handleLineClick()
        }).mouseover(function() {
            a.handleLineOver()
        }).mouseout(function() {
            a.handleLineOut()
        }), f.touchend && f.touchend(function() {
            a.handleLineClick()
        }))
    },
    handleLineClick: function() {
        var a = {
            type: "click",
            trendLine: this,
            chart: this.chart
        };
        this.fire(a.type, a)
    },
    handleLineOver: function() {
        var a = this.rollOverColor;
        void 0 !== a && this.line.attr({
            stroke: a
        })
    },
    handleLineOut: function() {
        this.line.attr({
            stroke: this.lineColor
        })
    },
    destroy: function() {
        AmCharts.remove(this.set)
    }
});
AmCharts.AmSerialChart = AmCharts.Class({
    inherits: AmCharts.AmRectangularChart,
    construct: function() {
        AmCharts.AmSerialChart.base.construct.call(this);
        this.createEvents("changed");
        this.columnSpacing = 5;
        this.columnWidth = 0.8;
        this.updateScrollbar = !0;
        var a = new AmCharts.CategoryAxis;
        a.chart = this;
        this.categoryAxis = a;
        this.chartType = "serial";
        this.zoomOutOnDataUpdate = !0;
        this.skipZoom = !1;
        this.minSelectedTime = 0
    },
    initChart: function() {
        AmCharts.AmSerialChart.base.initChart.call(this);
        this.updateCategoryAxis();
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        var a = this.chartCursor;
        a && a.updateData();
        var a = this.countColumns(),
        b = this.graphs,
        d;
        for (d = 0; d < b.length; d++) b[d].columnCount = a;
        this.updateScrollbar = !0;
        this.drawChart();
        this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
    },
    validateData: function(a) {
        this.marginsUpdated = !1;
        this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
        AmCharts.AmSerialChart.base.validateData.call(this)
    },
    drawChart: function() {
        AmCharts.AmSerialChart.base.drawChart.call(this);
        var a = this.chartData;
        if (AmCharts.ifArray(a)) {
            var b = this.chartScrollbar;
            b && b.draw();
            if (0 < this.realWidth && 0 < this.realHeight) {
                var a = a.length - 1,
                d, b = this.categoryAxis;
                if (b.parseDates && !b.equalSpacing) {
                    if (b = this.startTime, d = this.endTime, isNaN(b) || isNaN(d)) b = this.firstTime,
                    d = this.lastTime
                } else if (b = this.start, d = this.end, isNaN(b) || isNaN(d)) b = 0,
                d = a;
                this.endTime = this.startTime = this.end = this.start = void 0;
                this.zoom(b, d)
            }
        } else this.cleanChart();
        this.dispDUpd();
        this.chartCreated = !0
    },
    cleanChart: function() {
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
    },
    updateCategoryAxis: function() {
        var a = this.categoryAxis;
        a.id = "categoryAxis";
        a.rotate = this.rotate;
        a.axisRenderer = AmCharts.RecAxis;
        a.guideFillRenderer = AmCharts.RecFill;
        a.axisItemRenderer = AmCharts.RecItem;
        a.setOrientation(!this.rotate);
        a.x = this.marginLeftReal;
        a.y = this.marginTopReal;
        a.dx = this.dx;
        a.dy = this.dy;
        a.width = this.plotAreaWidth - 1;
        a.height = this.plotAreaHeight - 1;
        a.viW = this.plotAreaWidth - 1;
        a.viH = this.plotAreaHeight - 1;
        a.viX = this.marginLeftReal;
        a.viY = this.marginTopReal;
        a.marginsChanged = !0
    },
    updateValueAxes: function() {
        AmCharts.AmSerialChart.base.updateValueAxes.call(this);
        var a = this.valueAxes,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b],
            e = this.rotate;
            d.rotate = e;
            d.setOrientation(e);
            e = this.categoryAxis;
            if (!e.startOnAxis || e.parseDates) d.expandMinMax = !0
        }
    },
    updateData: function() {
        this.parseData();
        var a = this.graphs,
        b, d = this.chartData;
        for (b = 0; b < a.length; b++) a[b].data = d;
        0 < d.length && (this.firstTime = this.getStartTime(d[0].time), this.lastTime = this.getEndTime(d[d.length - 1].time))
    },
    getStartTime: function(a) {
        var b = this.categoryAxis;
        return AmCharts.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
    },
    getEndTime: function(a) {
        var b = this.categoryAxis;
        b.minDuration();
        return AmCharts.changeDate(new Date(a), b.minPeriod, 1, !0).getTime() - 1
    },
    updateMargins: function() {
        AmCharts.AmSerialChart.base.updateMargins.call(this);
        var a = this.chartScrollbar;
        a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
    },
    updateScrollbars: function() {
        this.updateChartScrollbar(this.chartScrollbar, this.rotate)
    },
    zoom: function(a, b) {
        var d = this.categoryAxis;
        d.parseDates && !d.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b)
    },
    timeZoom: function(a, b) {
        var d = this.maxSelectedTime;
        isNaN(d) || (b != this.endTime && b - a > d && (a = b - d, this.updateScrollbar = !0), a != this.startTime && b - a > d && (b = a + d, this.updateScrollbar = !0));
        var e = this.minSelectedTime;
        if (0 < e && b - a < e) {
            var f = Math.round(a + (b - a) / 2),
            e = Math.round(e / 2);
            a = f - e;
            b = f + e
        }
        var g = this.chartData,
        f = this.categoryAxis;
        if (AmCharts.ifArray(g) && (a != this.startTime || b != this.endTime)) {
            var h = f.minDuration(),
            e = this.firstTime,
            j = this.lastTime;
            a || (a = e, isNaN(d) || (a = j - d));
            b || (b = j);
            a > j && (a = j);
            b < e && (b = e);
            a < e && (a = e);
            b > j && (b = j);
            b < a && (b = a + h);
            b - a < h / 5 && (b < j ? b = a + h / 5 : a = b - h / 5);
            this.startTime = a;
            this.endTime = b;
            d = g.length - 1;
            h = this.getClosestIndex(g, "time", a, !0, 0, d);
            g = this.getClosestIndex(g, "time", b, !1, h, d);
            f.timeZoom(a, b);
            f.zoom(h, g);
            this.start = AmCharts.fitToBounds(h, 0, d);
            this.end = AmCharts.fitToBounds(g, 0, d);
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            a != e || b != j ? this.showZB(!0) : this.showZB(!1);
            this.updateColumnsDepth();
            this.dispatchTimeZoomEvent()
        }
    },
    indexZoom: function(a, b) {
        var d = this.maxSelectedSeries;
        isNaN(d) || (b != this.end && b - a > d && (a = b - d, this.updateScrollbar = !0), a != this.start && b - a > d && (b = a + d, this.updateScrollbar = !0));
        if (a != this.start || b != this.end) {
            var e = this.chartData.length - 1;
            isNaN(a) && (a = 0, isNaN(d) || (a = e - d));
            isNaN(b) && (b = e);
            b < a && (b = a);
            b > e && (b = e);
            a > e && (a = e - 1);
            0 > a && (a = 0);
            this.start = a;
            this.end = b;
            this.categoryAxis.zoom(a, b);
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);
            this.updateColumnsDepth();
            this.dispatchIndexZoomEvent()
        }
    },
    updateGraphs: function() {
        AmCharts.AmSerialChart.base.updateGraphs.call(this);
        var a = this.graphs,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.columnWidth = this.columnWidth;
            d.categoryAxis = this.categoryAxis
        }
    },
    updateColumnsDepth: function() {
        var a, b = this.graphs,
        d;
        AmCharts.remove(this.columnsSet);
        this.columnsArray = [];
        for (a = 0; a < b.length; a++) {
            d = b[a];
            var e = d.columnsArray;
            if (e) {
                var f;
                for (f = 0; f < e.length; f++) this.columnsArray.push(e[f])
            }
        }
        this.columnsArray.sort(this.compareDepth);
        if (0 < this.columnsArray.length) {
            b = this.container.set();
            this.columnSet.push(b);
            for (a = 0; a < this.columnsArray.length; a++) b.push(this.columnsArray[a].column.set);
            d && b.translate(d.x, d.y);
            this.columnsSet = b
        }
    },
    compareDepth: function(a, b) {
        return a.depth > b.depth ? 1 : -1
    },
    zoomScrollbar: function() {
        var a = this.chartScrollbar,
        b = this.categoryAxis;
        a && this.updateScrollbar && (b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
    },
    updateTrendLines: function() {
        var a = this.trendLines,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.chart = this;
            d.valueAxis || (d.valueAxis = this.valueAxes[0]);
            d.categoryAxis = this.categoryAxis
        }
    },
    zoomAxesAndGraphs: function() {
        if (!this.scrollbarOnly) {
            var a = this.valueAxes,
            b;
            for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
            a = this.graphs;
            for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
            this.zoomTrendLines(); (b = this.chartCursor) && b.zoom(this.start, this.end, this.startTime, this.endTime)
        }
    },
    countColumns: function() {
        var a = 0,
        b = this.valueAxes.length,
        d = this.graphs.length,
        e, f, g = !1,
        h, j;
        for (j = 0; j < b; j++) {
            f = this.valueAxes[j];
            var k = f.stackType;
            if ("100%" == k || "regular" == k) {
                g = !1;
                for (h = 0; h < d; h++) e = this.graphs[h],
                !e.hidden && (e.valueAxis == f && "column" == e.type) && (!g && e.stackable && (a++, g = !0), e.stackable || a++, e.columnIndex = a - 1)
            }
            if ("none" == k || "3d" == k) for (h = 0; h < d; h++) e = this.graphs[h],
            !e.hidden && (e.valueAxis == f && "column" == e.type) && (e.columnIndex = a, a++);
            if ("3d" == k) {
                for (j = 0; j < d; j++) e = this.graphs[j],
                e.depthCount = a;
                a = 1
            }
        }
        return a
    },
    parseData: function() {
        AmCharts.AmSerialChart.base.parseData.call(this);
        this.parseSerialData()
    },
    getCategoryIndexByValue: function(a) {
        var b = this.chartData,
        d, e;
        for (e = 0; e < b.length; e++) b[e].category == a && (d = e);
        return d
    },
    handleCursorChange: function(a) {
        this.updateLegendValues(a.index)
    },
    handleCursorZoom: function(a) {
        this.updateScrollbar = !0;
        this.zoom(a.start, a.end)
    },
    handleScrollbarZoom: function(a) {
        this.updateScrollbar = !1;
        this.zoom(a.start, a.end)
    },
    dispatchTimeZoomEvent: function() {
        if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
            var a = {
                type: "zoomed"
            };
            a.startDate = new Date(this.startTime);
            a.endDate = new Date(this.endTime);
            a.startIndex = this.start;
            a.endIndex = this.end;
            this.startIndex = this.start;
            this.endIndex = this.end;
            this.startDate = a.startDate;
            this.endDate = a.endDate;
            this.prevStartTime = this.startTime;
            this.prevEndTime = this.endTime;
            var b = this.categoryAxis,
            d = AmCharts.extractPeriod(b.minPeriod).period,
            b = b.dateFormatsObject[d];
            a.startValue = AmCharts.formatDate(a.startDate, b);
            a.endValue = AmCharts.formatDate(a.endDate, b);
            a.chart = this;
            a.target = this;
            this.fire(a.type, a)
        }
    },
    dispatchIndexZoomEvent: function() {
        if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
            this.startIndex = this.start;
            this.endIndex = this.end;
            var a = this.chartData;
            if (AmCharts.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                var b = {
                    chart: this,
                    target: this,
                    type: "zoomed"
                };
                b.startIndex = this.start;
                b.endIndex = this.end;
                b.startValue = a[this.start].category;
                b.endValue = a[this.end].category;
                this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
                this.prevStartIndex = this.start;
                this.prevEndIndex = this.end;
                this.fire(b.type, b)
            }
        }
    },
    updateLegendValues: function(a) {
        var b = this.graphs,
        d;
        for (d = 0; d < b.length; d++) {
            var e = b[d];
            e.currentDataItem = isNaN(a) ? void 0 : this.chartData[a].axes[e.valueAxis.id].graphs[e.id]
        }
        this.legend && this.legend.updateValues()
    },
    getClosestIndex: function(a, b, d, e, f, g) {
        0 > f && (f = 0);
        g > a.length - 1 && (g = a.length - 1);
        var h = f + Math.round((g - f) / 2),
        j = a[h][b];
        if (1 >= g - f) {
            if (e) return f;
            e = a[g][b];
            return Math.abs(a[f][b] - d) < Math.abs(e - d) ? f: g
        }
        return d == j ? h: d < j ? this.getClosestIndex(a, b, d, e, f, h) : this.getClosestIndex(a, b, d, e, h, g)
    },
    zoomToIndexes: function(a, b) {
        this.updateScrollbar = !0;
        var d = this.chartData;
        if (d) {
            var e = d.length;
            0 < e && (0 > a && (a = 0), b > e - 1 && (b = e - 1), e = this.categoryAxis, e.parseDates && !e.equalSpacing ? this.zoom(d[a].time, this.getEndTime(d[b].time)) : this.zoom(a, b))
        }
    },
    zoomToDates: function(a, b) {
        this.updateScrollbar = !0;
        var d = this.chartData;
        if (this.categoryAxis.equalSpacing) {
            var e = this.getClosestIndex(d, "time", a.getTime(), !0, 0, d.length),
            d = this.getClosestIndex(d, "time", b.getTime(), !1, 0, d.length);
            this.zoom(e, d)
        } else this.zoom(a.getTime(), b.getTime())
    },
    zoomToCategoryValues: function(a, b) {
        this.updateScrollbar = !0;
        this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
    },
    formatString: function(a, b) {
        var d = b.graph;
        if ( - 1 != a.indexOf("[[category]]")) {
            var e = b.serialDataItem.category;
            if (this.categoryAxis.parseDates) {
                var f = this.balloonDateFormat,
                g = this.chartCursor;
                g && (f = g.categoryBalloonDateFormat); - 1 != a.indexOf("[[category]]") && (f = AmCharts.formatDate(e, f), -1 != f.indexOf("fff") && (f = AmCharts.formatMilliseconds(f, e)), e = f)
            }
            a = a.replace(/\[\[category\]\]/g, String(e))
        }
        d = d.numberFormatter;
        d || (d = this.numberFormatter);
        e = b.graph.valueAxis;
        if ((f = e.duration) && !isNaN(b.values.value)) e = AmCharts.formatDuration(b.values.value, f, "", e.durationUnits, e.maxInterval, d),
        a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), e);
        e = "value open low high close total".split(" ");
        f = this.percentFormatter;
        a = AmCharts.formatValue(a, b.percents, e, f, "percents\\.");
        a = AmCharts.formatValue(a, b.values, e, d, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        a = AmCharts.formatValue(a, b.values, ["percents"], f); - 1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));
        return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
    },
    addChartScrollbar: function(a) {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
        this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
        this.chartScrollbar = a
    },
    removeChartScrollbar: function() {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        this.chartScrollbar = null
    },
    handleReleaseOutside: function(a) {
        AmCharts.AmSerialChart.base.handleReleaseOutside.call(this, a);
        AmCharts.callMethod("handleReleaseOutside", [this.chartScrollbar])
    }
});
AmCharts.AmRadarChart = AmCharts.Class({
    inherits: AmCharts.AmCoordinateChart,
    construct: function() {
        AmCharts.AmRadarChart.base.construct.call(this);
        this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 0;
        this.chartType = "radar";
        this.radius = "35%"
    },
    initChart: function() {
        AmCharts.AmRadarChart.base.initChart.call(this);
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        this.drawChart()
    },
    updateData: function() {
        this.parseData();
        var a = this.graphs,
        b;
        for (b = 0; b < a.length; b++) a[b].data = this.chartData
    },
    updateGraphs: function() {
        var a = this.graphs,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.index = b;
            d.width = this.realRadius;
            d.height = this.realRadius;
            d.x = this.marginLeftReal;
            d.y = this.marginTopReal;
            d.chartType = this.chartType
        }
    },
    parseData: function() {
        AmCharts.AmRadarChart.base.parseData.call(this);
        this.parseSerialData()
    },
    updateValueAxes: function() {
        var a = this.valueAxes,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.axisRenderer = AmCharts.RadAxis;
            d.guideFillRenderer = AmCharts.RadarFill;
            d.axisItemRenderer = AmCharts.RadItem;
            d.autoGridCount = !1;
            d.x = this.marginLeftReal;
            d.y = this.marginTopReal;
            d.width = this.realRadius;
            d.height = this.realRadius
        }
    },
    drawChart: function() {
        AmCharts.AmRadarChart.base.drawChart.call(this);
        var a = this.updateWidth(),
        b = this.updateHeight(),
        d = this.marginTop + this.getTitleHeight(),
        e = this.marginLeft,
        b = b - d - this.marginBottom;
        this.marginLeftReal = e + (a - e - this.marginRight) / 2;
        this.marginTopReal = d + b / 2;
        this.realRadius = AmCharts.toCoordinate(this.radius, a, b);
        this.updateValueAxes();
        this.updateGraphs();
        a = this.chartData;
        if (AmCharts.ifArray(a)) {
            if (0 < this.realWidth && 0 < this.realHeight) {
                a = a.length - 1;
                e = this.valueAxes;
                for (d = 0; d < e.length; d++) e[d].zoom(0, a);
                e = this.graphs;
                for (d = 0; d < e.length; d++) e[d].zoom(0, a); (a = this.legend) && a.invalidateSize()
            }
        } else this.cleanChart();
        this.dispDUpd();
        this.chartCreated = !0
    },
    formatString: function(a, b) {
        var d = b.graph; - 1 != a.indexOf("[[category]]") && (a = a.replace(/\[\[category\]\]/g, String(b.serialDataItem.category)));
        d = d.numberFormatter;
        d || (d = this.numberFormatter);
        a = AmCharts.formatValue(a, b.values, ["value"], d, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        return a = AmCharts.AmRadarChart.base.formatString.call(this, a, b)
    },
    cleanChart: function() {
        this.callMethod("destroy", [this.valueAxes, this.graphs])
    }
});
AmCharts.AxisBase = AmCharts.Class({
    construct: function() {
        this.viY = this.viX = this.y = this.x = this.dy = this.dx = 0;
        this.axisThickness = 1;
        this.axisColor = "#000000";
        this.axisAlpha = 1;
        this.gridCount = this.tickLength = 5;
        this.gridAlpha = 0.15;
        this.gridThickness = 1;
        this.gridColor = "#000000";
        this.dashLength = 0;
        this.labelFrequency = 1;
        this.showLastLabel = this.showFirstLabel = !0;
        this.fillColor = "#FFFFFF";
        this.fillAlpha = 0;
        this.labelsEnabled = !0;
        this.labelRotation = 0;
        this.autoGridCount = !0;
        this.valueRollOverColor = "#CC0000";
        this.offset = 0;
        this.guides = [];
        this.visible = !0;
        this.counter = 0;
        this.guides = [];
        this.ignoreAxisWidth = this.inside = !1;
        this.minGap = 75;
        this.titleBold = !0
    },
    zoom: function(a, b) {
        this.start = a;
        this.end = b;
        this.dataChanged = !0;
        this.draw()
    },
    fixAxisPosition: function() {
        var a = this.position;
        "H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) : ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
        this.position = a
    },
    draw: function() {
        var a = this.chart;
        void 0 === this.titleColor && (this.titleColor = a.color);
        isNaN(this.titleFontSize) && (this.titleFontSize = a.fontSize + 1);
        this.allLabels = [];
        this.counter = 0;
        this.destroy();
        this.fixAxisPosition();
        this.labels = [];
        var b = a.container,
        d = b.set();
        a.gridSet.push(d);
        this.set = d;
        b = b.set();
        a.axesLabelsSet.push(b);
        this.labelsSet = b;
        this.axisLine = new this.axisRenderer(this);
        this.autoGridCount && ("V" == this.orientation ? (a = this.height / 35, 3 > a && (a = 3)) : a = this.width / this.minGap, this.gridCount = Math.max(a, 1));
        this.axisWidth = this.axisLine.axisWidth;
        this.addTitle()
    },
    setOrientation: function(a) {
        this.orientation = a ? "H": "V"
    },
    addTitle: function() {
        var a = this.title;
        if (a) {
            var b = this.chart;
            this.titleLabel = AmCharts.text(b.container, a, this.titleColor, b.fontFamily, this.titleFontSize, "middle", this.titleBold)
        }
    },
    positionTitle: function() {
        var a = this.titleLabel;
        if (a) {
            var b, d, e = this.labelsSet,
            f = {};
            0 < e.length() ? f = e.getBBox() : (f.x = 0, f.y = 0, f.width = this.viW, f.height = this.viH);
            e.push(a);
            var e = f.x,
            g = f.y;
            AmCharts.VML && (this.rotate ? e -= this.x: g -= this.y);
            var h = f.width,
            f = f.height,
            j = this.viW,
            k = this.viH;
            a.getBBox();
            var l = 0,
            m = this.titleFontSize / 2,
            n = this.inside;
            switch (this.position) {
            case "top":
                b = j / 2;
                d = g - 10 - m;
                break;
            case "bottom":
                b = j / 2;
                d = g + f + 10 + m;
                break;
            case "left":
                b = e - 10 - m;
                n && (b -= 5);
                d = k / 2;
                l = -90;
                break;
            case "right":
                b = e + h + 10 + m - 3,
                n && (b += 7),
                d = k / 2,
                l = -90
            }
            this.marginsChanged ? (a.translate(b, d), this.tx = b, this.ty = d) : a.translate(this.tx, this.ty);
            this.marginsChanged = !1;
            0 !== l && a.rotate(l)
        }
    },
    pushAxisItem: function(a, b) {
        var d = a.graphics();
        0 < d.length() && (b ? this.labelsSet.push(d) : this.set.push(d)); (d = a.getLabel()) && this.labelsSet.push(d)
    },
    addGuide: function(a) {
        this.guides.push(a)
    },
    removeGuide: function(a) {
        var b = this.guides,
        d;
        for (d = 0; d < b.length; d++) b[d] == a && b.splice(d, 1)
    },
    handleGuideOver: function(a) {
        clearTimeout(this.chart.hoverInt);
        var b = a.graphics.getBBox(),
        d = b.x + b.width / 2,
        b = b.y + b.height / 2,
        e = a.fillColor;
        void 0 === e && (e = a.lineColor);
        this.chart.showBalloon(a.balloonText, e, !0, d, b)
    },
    handleGuideOut: function() {
        this.chart.hideBalloon()
    },
    addEventListeners: function(a, b) {
        var d = this;
        a.mouseover(function() {
            d.handleGuideOver(b)
        });
        a.mouseout(function() {
            d.handleGuideOut(b)
        })
    },
    getBBox: function() {
        var a = this.labelsSet.getBBox();
        AmCharts.VML || (a = {
            x: a.x + this.x,
            y: a.y + this.y,
            width: a.width,
            height: a.height
        });
        return a
    },
    destroy: function() {
        AmCharts.remove(this.set);
        AmCharts.remove(this.labelsSet);
        var a = this.axisLine;
        a && AmCharts.remove(a.set);
        AmCharts.remove(this.grid0)
    }
});
AmCharts.ValueAxis = AmCharts.Class({
    inherits: AmCharts.AxisBase,
    construct: function() {
        this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed");
        AmCharts.ValueAxis.base.construct.call(this);
        this.dataChanged = !0;
        this.gridCount = 8;
        this.stackType = "none";
        this.position = "left";
        this.unitPosition = "right";
        this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
        this.durationUnits = {
            DD: "d. ",
            hh: ":",
            mm: ":",
            ss: ""
        };
        this.scrollbar = !1;
        this.baseValue = 0;
        this.radarCategoriesEnabled = !0;
        this.gridType = "polygons";
        this.useScientificNotation = !1;
        this.axisTitleOffset = 10;
        this.minMaxMultiplier = 1
    },
    updateData: function() {
        0 >= this.gridCount && (this.gridCount = 1);
        this.totals = [];
        this.data = this.chart.chartData;
        "xy" != this.chart.chartType && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));
        this.recalculateToPercents && this.recalculate();
        this.synchronizationMultiplier && this.synchronizeWithAxis ? this.foundGraphs = !0 : (this.foundGraphs = !1, this.getMinMax())
    },
    draw: function() {
        AmCharts.ValueAxis.base.draw.call(this);
        var a = this.chart,
        b = this.set;
        "duration" == this.type && (this.duration = "ss"); ! 0 === this.dataChanged && (this.updateData(), this.dataChanged = !1);
        if (this.logarithmic && (0 >= this.getMin(0, this.data.length - 1) || 0 >= this.minimum)) this.fire("logarithmicAxisFailed", {
            type: "logarithmicAxisFailed",
            chart: a
        });
        else {
            this.grid0 = null;
            var d, e, f = a.dx,
            g = a.dy,
            h = !1,
            j = this.logarithmic,
            k = a.chartType;
            if (!isNaN(this.min) && !isNaN(this.max) && this.foundGraphs && Infinity != this.min && -Infinity != this.max) {
                var l = this.labelFrequency,
                m = this.showFirstLabel,
                n = this.showLastLabel,
                s = 1,
                p = 0,
                r = Math.round((this.max - this.min) / this.step) + 1,
                q; ! 0 === j ? (q = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / q, 2 < q && (r = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, p = Math.round(Math.log(this.minReal) * Math.LOG10E), r > this.gridCount && (s = Math.ceil(r / this.gridCount)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
                d = 0;
                1 > this.step && -1 < this.step && (d = this.getDecimals(this.step));
                this.integersOnly && (d = 0);
                d > this.maxDecCount && (d = this.maxDecCount);
                isNaN(this.precision) || (d = this.precision);
                this.max = AmCharts.roundTo(this.max, this.maxDecCount);
                this.min = AmCharts.roundTo(this.min, this.maxDecCount);
                var u = {};
                u.precision = d;
                u.decimalSeparator = a.numberFormatter.decimalSeparator;
                u.thousandsSeparator = a.numberFormatter.thousandsSeparator;
                this.numberFormatter = u;
                var t, v = this.guides,
                w = v.length;
                if (0 < w) {
                    var y = this.fillAlpha;
                    for (e = this.fillAlpha = 0; e < w; e++) {
                        var x = v[e],
                        z = NaN,
                        C = x.above;
                        isNaN(x.toValue) || (z = this.getCoordinate(x.toValue), t = new this.axisItemRenderer(this, z, "", !0, NaN, NaN, x), this.pushAxisItem(t, C));
                        var I = NaN;
                        isNaN(x.value) || (I = this.getCoordinate(x.value), t = new this.axisItemRenderer(this, I, x.label, !0, NaN, (z - I) / 2, x), this.pushAxisItem(t, C));
                        isNaN(z - I) || (t = new this.guideFillRenderer(this, I, z, x), this.pushAxisItem(t, C), t = t.graphics(), x.graphics = t, x.balloonText && this.addEventListeners(t, x))
                    }
                    this.fillAlpha = y
                }
                v = !1;
                for (e = p; e < r; e += s) t = AmCharts.roundTo(this.step * e + this.min, d),
                -1 != String(t).indexOf("e") && (v = !0, String(t).split("e"));
                this.duration && (this.maxInterval = AmCharts.getMaxInterval(this.max, this.duration));
                for (e = p; e < r; e += s) if (p = this.step * e + this.min, p = AmCharts.roundTo(p, this.maxDecCount + 1), !(this.integersOnly && Math.round(p) != p)) { ! 0 === j && (0 === p && (p = this.minReal), 2 < q && (p = Math.pow(10, e)), v = -1 != String(p).indexOf("e") ? !0 : !1);
                    this.useScientificNotation && (v = !0);
                    this.usePrefixes && (v = !1);
                    v ? (t = -1 == String(p).indexOf("e") ? p.toExponential(15) : String(p), t = t.split("e"), d = Number(t[0]), t = Number(t[1]), d = AmCharts.roundTo(d, 14), 10 == d && (d = 1, t += 1), t = d + "e" + t, 0 === p && (t = "0"), 1 == p && (t = "1")) : (j && (d = String(p).split("."), u.precision = d[1] ? d[1].length: -1), t = this.usePrefixes ? AmCharts.addPrefix(p, a.prefixesOfBigNumbers, a.prefixesOfSmallNumbers, u) : AmCharts.formatNumber(p, u, u.precision));
                    this.duration && (t = AmCharts.formatDuration(p, this.duration, "", this.durationUnits, this.maxInterval, u));
                    this.recalculateToPercents ? t += "%": (d = this.unit) && (t = "left" == this.unitPosition ? d + t: t + d);
                    Math.round(e / l) != e / l && (t = void 0);
                    if (0 === e && !m || e == r - 1 && !n) t = " ";
                    d = this.getCoordinate(p);
                    t = new this.axisItemRenderer(this, d, t);
                    this.pushAxisItem(t);
                    if (p == this.baseValue && "radar" != k) {
                        var G, O, w = this.viW,
                        y = this.viH,
                        p = this.viX;
                        t = this.viY;
                        "H" == this.orientation ? 0 <= d && d <= w + 1 && (G = [d, d, d + f], O = [y, 0, g]) : 0 <= d && d <= y + 1 && (G = [0, w, w + f], O = [d, d, d + g]);
                        G && (d = AmCharts.fitToBounds(2 * this.gridAlpha, 0, 1), d = AmCharts.line(a.container, G, O, this.gridColor, d, 1, this.dashLength), d.translate(p, t), this.grid0 = d, a.axesSet.push(d), d.toBack())
                    }
                }
                e = this.baseValue;
                this.min > this.baseValue && this.max > this.baseValue && (e = this.min);
                this.min < this.baseValue && this.max < this.baseValue && (e = this.max);
                j && e < this.minReal && (e = this.minReal);
                this.baseCoord = this.getCoordinate(e);
                a = {
                    type: "axisChanged",
                    target: this,
                    chart: a
                };
                a.min = j ? this.minReal: this.min;
                a.max = this.max;
                this.fire("axisChanged", a);
                this.axisCreated = !0
            } else h = !0;
            j = this.axisLine.set;
            a = this.labelsSet;
            this.positionTitle();
            "radar" != k ? (k = this.viX, e = this.viY, b.translate(k, e), a.translate(k, e)) : j.toFront(); ! this.visible || h ? (b.hide(), j.hide(), a.hide()) : (b.show(), j.show(), a.show())
        }
    },
    getDecimals: function(a) {
        var b = 0;
        isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
        return b
    },
    stackGraphs: function(a) {
        var b = this.stackType;
        "stacked" == b && (b = "regular");
        "line" == b && (b = "none");
        "100% stacked" == b && (b = "100%");
        this.stackType = b;
        var d = [],
        e = [],
        f = [],
        g = [],
        h,
        j = this.chart.graphs,
        k,
        l,
        m,
        n,
        s = this.baseValue,
        p = !1;
        if ("line" == a || "step" == a || "smoothedLine" == a) p = !0;
        if (p && ("regular" == b || "100%" == b)) for (n = 0; n < j.length; n++) m = j[n],
        m.hidden || (l = m.type, m.chart == this.chart && (m.valueAxis == this && a == l && m.stackable) && (k && (m.stackGraph = k), k = m));
        for (k = this.start; k <= this.end; k++) {
            var r = 0;
            for (n = 0; n < j.length; n++) if (m = j[n], !m.hidden && (l = m.type, m.chart == this.chart && (m.valueAxis == this && a == l && m.stackable) && (l = this.data[k].axes[this.id].graphs[m.id], h = l.values.value, !isNaN(h)))) {
                var q = this.getDecimals(h);
                r < q && (r = q);
                g[k] = isNaN(g[k]) ? Math.abs(h) : g[k] + Math.abs(h);
                g[k] = AmCharts.roundTo(g[k], r);
                m = m.fillToGraph;
                if (p && m && (m = this.data[k].axes[this.id].graphs[m.id])) l.values.open = m.values.value;
                "regular" == b && (p && (isNaN(d[k]) ? (d[k] = h, l.values.close = h, l.values.open = this.baseValue) : (l.values.close = isNaN(h) ? d[k] : h + d[k], l.values.open = d[k], d[k] = l.values.close)), "column" == a && !isNaN(h) && (l.values.close = h, 0 > h ? (l.values.close = h, isNaN(e[k]) ? l.values.open = s: (l.values.close += e[k], l.values.open = e[k]), e[k] = l.values.close) : (l.values.close = h, isNaN(f[k]) ? l.values.open = s: (l.values.close += f[k], l.values.open = f[k]), f[k] = l.values.close)))
            }
        }
        for (k = this.start; k <= this.end; k++) for (n = 0; n < j.length; n++) m = j[n],
        m.hidden || (l = m.type, m.chart == this.chart && (m.valueAxis == this && a == l && m.stackable) && (l = this.data[k].axes[this.id].graphs[m.id], h = l.values.value, isNaN(h) || (d = 100 * (h / g[k]), l.values.percents = d, l.values.total = g[k], "100%" == b && (isNaN(e[k]) && (e[k] = 0), isNaN(f[k]) && (f[k] = 0), 0 > d ? (l.values.close = AmCharts.fitToBounds(d + e[k], -100, 100), l.values.open = e[k], e[k] = l.values.close) : (l.values.close = AmCharts.fitToBounds(d + f[k], -100, 100), l.values.open = f[k], f[k] = l.values.close)))))
    },
    recalculate: function() {
        var a = this.chart.graphs,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            if (d.valueAxis == this) {
                var e = "value";
                if ("candlestick" == d.type || "ohlc" == d.type) e = "open";
                var f, g, h = this.end + 2,
                h = AmCharts.fitToBounds(this.end + 1, 0, this.data.length - 1),
                j = this.start;
                0 < j && j--;
                var k;
                for (k = this.start; k <= h && !(g = this.data[k].axes[this.id].graphs[d.id], f = g.values[e], !isNaN(f)); k++);
                for (e = j; e <= h; e++) {
                    g = this.data[e].axes[this.id].graphs[d.id];
                    g.percents = {};
                    var j = g.values,
                    l;
                    for (l in j) g.percents[l] = "percents" != l ? 100 * (j[l] / f) - 100 : j[l]
                }
            }
        }
    },
    getMinMax: function() {
        var a = !1,
        b = this.chart,
        d = b.graphs,
        e;
        for (e = 0; e < d.length; e++) {
            var f = d[e].type;
            if ("line" == f || "step" == f || "smoothedLine" == f) this.expandMinMax && (a = !0)
        }
        a && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++);
        "serial" == b.chartType && !0 === b.categoryAxis.parseDates && !a && this.end < this.data.length - 1 && this.end++;
        a = this.minMaxMultiplier;
        this.min = this.getMin(this.start, this.end);
        this.max = this.getMax();
        a = (this.max - this.min) * (a - 1);
        this.min -= a;
        this.max += a;
        a = this.guides.length;
        if (this.includeGuidesInMinMax && 0 < a) for (b = 0; b < a; b++) d = this.guides[b],
        d.toValue < this.min && (this.min = d.toValue),
        d.value < this.min && (this.min = d.value),
        d.toValue > this.max && (this.max = d.toValue),
        d.value > this.max && (this.max = d.value);
        isNaN(this.minimum) || (this.min = this.minimum);
        isNaN(this.maximum) || (this.max = this.maximum);
        this.min > this.max && (a = this.max, this.max = this.min, this.min = a);
        isNaN(this.minTemp) || (this.min = this.minTemp);
        isNaN(this.maxTemp) || (this.max = this.maxTemp);
        this.minReal = this.min;
        this.maxReal = this.max;
        0 === this.min && 0 === this.max && (this.max = 9);
        this.min > this.max && (this.min = this.max - 1);
        a = this.min;
        b = this.max;
        d = this.max - this.min;
        e = 0 === d ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(d)) * Math.LOG10E)) / 10;
        isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / e) * e + e);
        isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / e) * e - e);
        0 > this.min && 0 <= a && (this.min = 0);
        0 < this.max && 0 >= b && (this.max = 0);
        "100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
        d = this.max - this.min;
        e = Math.pow(10, Math.floor(Math.log(Math.abs(d)) * Math.LOG10E)) / 10;
        this.step = Math.ceil(d / this.gridCount / e) * e;
        d = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
        d = d.toExponential(0).split("e");
        e = Number(d[1]);
        9 == Number(d[0]) && e++;
        d = this.generateNumber(1, e);
        e = Math.ceil(this.step / d);
        5 < e && (e = 10);
        5 >= e && 2 < e && (e = 5);
        this.step = Math.ceil(this.step / (d * e)) * d * e;
        1 > d ? (this.maxDecCount = Math.abs(Math.log(Math.abs(d)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = AmCharts.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
        this.min = this.step * Math.floor(this.min / this.step);
        this.max = this.step * Math.ceil(this.max / this.step);
        0 > this.min && 0 <= a && (this.min = 0);
        0 < this.max && 0 >= b && (this.max = 0);
        1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
        d = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E));
        0 === this.min && (this.minReal = d);
        0 === this.min && 1 < this.minReal && (this.minReal = 1);
        0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step: this.min);
        d = Math.log(b) * Math.LOG10E - Math.log(a) * Math.LOG10E;
        this.logarithmic && (2 < d ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(b)) * Math.LOG10E))) : (b = Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10, a = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, b < a && (this.minReal = this.min = 10 * a)))
    },
    generateNumber: function(a, b) {
        var d = "",
        e;
        e = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
        var f;
        for (f = 0; f < e; f++) d += "0";
        return 0 > b ? Number("0." + d + String(a)) : Number(String(a) + d)
    },
    getMin: function(a, b) {
        var d, e;
        for (e = a; e <= b; e++) {
            var f = this.data[e].axes[this.id].graphs,
            g;
            for (g in f) if (f.hasOwnProperty(g)) {
                var h = this.chart.getGraphById(g);
                if (h.includeInMinMax && (!h.hidden || this.includeHidden)) {
                    isNaN(d) && (d = Infinity);
                    this.foundGraphs = !0;
                    h = f[g].values;
                    this.recalculateToPercents && (h = f[g].percents);
                    var j;
                    if (this.minMaxField) j = h[this.minMaxField],
                    j < d && (d = j);
                    else for (var k in h) h.hasOwnProperty(k) && ("percents" != k && "total" != k) && (j = h[k], j < d && (d = j))
                }
            }
        }
        return d
    },
    getMax: function() {
        var a, b;
        for (b = this.start; b <= this.end; b++) {
            var d = this.data[b].axes[this.id].graphs,
            e;
            for (e in d) if (d.hasOwnProperty(e)) {
                var f = this.chart.getGraphById(e);
                if (f.includeInMinMax && (!f.hidden || this.includeHidden)) {
                    isNaN(a) && (a = -Infinity);
                    this.foundGraphs = !0;
                    f = d[e].values;
                    this.recalculateToPercents && (f = d[e].percents);
                    var g;
                    if (this.minMaxField) g = f[this.minMaxField],
                    g > a && (a = g);
                    else for (var h in f) f.hasOwnProperty(h) && ("percents" != h && "total" != h) && (g = f[h], g > a && (a = g))
                }
            }
        }
        return a
    },
    dispatchZoomEvent: function(a, b) {
        var d = {
            type: "axisZoomed",
            startValue: a,
            endValue: b,
            target: this,
            chart: this.chart
        };
        this.fire(d.type, d)
    },
    zoomToValues: function(a, b) {
        if (b < a) {
            var d = b;
            b = a;
            a = d
        }
        a < this.min && (a = this.min);
        b > this.max && (b = this.max);
        d = {
            type: "axisSelfZoomed"
        };
        d.chart = this.chart;
        d.valueAxis = this;
        d.multiplier = this.axisWidth / Math.abs(this.getCoordinate(b) - this.getCoordinate(a));
        d.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(a) : this.getCoordinate(b) : this.reversed ? this.getCoordinate(b) : this.getCoordinate(a);
        this.fire(d.type, d)
    },
    coordinateToValue: function(a) {
        if (isNaN(a)) return NaN;
        var b = this.axisWidth,
        d = this.stepWidth,
        e = this.reversed,
        f = this.rotate,
        g = this.min,
        h = this.minReal;
        return ! 0 === this.logarithmic ? Math.pow(10, (f ? !0 === e ? (b - a) / d: a / d: !0 === e ? a / d: (b - a) / d) + Math.log(h) * Math.LOG10E) : !0 === e ? f ? g - (a - b) / d: a / d + g: f ? a / d + g: g - (a - b) / d
    },
    getCoordinate: function(a) {
        if (isNaN(a)) return NaN;
        var b = this.rotate,
        d = this.reversed,
        e = this.axisWidth,
        f = this.stepWidth,
        g = this.min,
        h = this.minReal; ! 0 === this.logarithmic ? (a = Math.log(a) * Math.LOG10E - Math.log(h) * Math.LOG10E, b = b ? !0 === d ? e - f * a: f * a: !0 === d ? f * a: e - f * a) : b = !0 === d ? b ? e - f * (a - g) : f * (a - g) : b ? f * (a - g) : e - f * (a - g);
        b = this.rotate ? b + (this.x - this.viX) : b + (this.y - this.viY);
        return Math.round(b)
    },
    synchronizeWithAxis: function(a) {
        this.synchronizeWithAxis = a;
        this.removeListener(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization);
        this.listenTo(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization)
    },
    handleSynchronization: function() {
        var a = this.synchronizeWithAxis,
        b = a.min,
        d = a.max,
        a = a.step,
        e = this.synchronizationMultiplier;
        e && (this.min = b * e, this.max = d * e, this.step = a * e, b = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), b = Math.abs(Math.log(Math.abs(b)) * Math.LOG10E), this.maxDecCount = b = Math.round(b), this.draw())
    }
});
AmCharts.CategoryAxis = AmCharts.Class({
    inherits: AmCharts.AxisBase,
    construct: function() {
        AmCharts.CategoryAxis.base.construct.call(this);
        this.minPeriod = "DD";
        this.equalSpacing = this.parseDates = !1;
        this.position = "bottom";
        this.startOnAxis = !1;
        this.firstDayOfWeek = 1;
        this.gridPosition = "middle";
        this.boldPeriodBeginning = !0;
        this.periods = [{
            period: "ss",
            count: 1
        },
        {
            period: "ss",
            count: 5
        },
        {
            period: "ss",
            count: 10
        },
        {
            period: "ss",
            count: 30
        },
        {
            period: "mm",
            count: 1
        },
        {
            period: "mm",
            count: 5
        },
        {
            period: "mm",
            count: 10
        },
        {
            period: "mm",
            count: 30
        },
        {
            period: "hh",
            count: 1
        },
        {
            period: "hh",
            count: 3
        },
        {
            period: "hh",
            count: 6
        },
        {
            period: "hh",
            count: 12
        },
        {
            period: "DD",
            count: 1
        },
        {
            period: "DD",
            count: 2
        },
        {
            period: "DD",
            count: 3
        },
        {
            period: "DD",
            count: 4
        },
        {
            period: "DD",
            count: 5
        },
        {
            period: "WW",
            count: 1
        },
        {
            period: "MM",
            count: 1
        },
        {
            period: "MM",
            count: 2
        },
        {
            period: "MM",
            count: 3
        },
        {
            period: "MM",
            count: 6
        },
        {
            period: "YYYY",
            count: 1
        },
        {
            period: "YYYY",
            count: 2
        },
        {
            period: "YYYY",
            count: 5
        },
        {
            period: "YYYY",
            count: 10
        },
        {
            period: "YYYY",
            count: 50
        },
        {
            period: "YYYY",
            count: 100
        }];
        this.dateFormats = [{
            period: "fff",
            format: "JJ:NN:SS"
        },
        {
            period: "ss",
            format: "JJ:NN:SS"
        },
        {
            period: "mm",
            format: "JJ:NN"
        },
        {
            period: "hh",
            format: "JJ:NN"
        },
        {
            period: "DD",
            format: "MMM DD"
        },
        {
            period: "WW",
            format: "MMM DD"
        },
        {
            period: "MM",
            format: "MMM"
        },
        {
            period: "YYYY",
            format: "YYYY"
        }];
        this.nextPeriod = {};
        this.nextPeriod.fff = "ss";
        this.nextPeriod.ss = "mm";
        this.nextPeriod.mm = "hh";
        this.nextPeriod.hh = "DD";
        this.nextPeriod.DD = "MM";
        this.nextPeriod.MM = "YYYY"
    },
    draw: function() {
        AmCharts.CategoryAxis.base.draw.call(this);
        this.generateDFObject();
        var a = this.chart.chartData;
        this.data = a;
        if (AmCharts.ifArray(a)) {
            var b, d = this.chart,
            e = this.start,
            f = this.labelFrequency,
            g = 0;
            b = this.end - e + 1;
            var h = this.gridCount,
            j = this.showFirstLabel,
            k = this.showLastLabel,
            l, m = "",
            m = AmCharts.extractPeriod(this.minPeriod);
            l = AmCharts.getPeriodDuration(m.period, m.count);
            var n, s, p, r, q;
            n = this.rotate;
            var u = this.firstDayOfWeek,
            t = this.boldPeriodBeginning,
            a = AmCharts.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * l), this.minPeriod, 1, u).getTime(),
            v;
            this.endTime > a && (this.endTime = a);
            if (this.parseDates && !this.equalSpacing) {
                if (this.timeDifference = this.endTime - this.startTime, e = this.choosePeriod(0), f = e.period, n = e.count, a = AmCharts.getPeriodDuration(f, n), a < l && (f = m.period, n = m.count, a = l), s = f, "WW" == s && (s = "DD"), this.stepWidth = this.getStepWidth(this.timeDifference), h = Math.ceil(this.timeDifference / a) + 1, m = AmCharts.resetDateToMin(new Date(this.startTime - a), f, n, u).getTime(), s == f && 1 == n && (p = a * this.stepWidth), this.cellWidth = l * this.stepWidth, b = Math.round(m / a), e = -1, b / 2 == Math.round(b / 2) && (e = -2, m -= a), 0 < this.gridCount) for (b = e; b <= h; b++) {
                    r = m + 1.5 * a;
                    r = AmCharts.resetDateToMin(new Date(r), f, n, u).getTime();
                    l = (r - this.startTime) * this.stepWidth;
                    q = !1;
                    this.nextPeriod[s] && (q = this.checkPeriodChange(this.nextPeriod[s], 1, r, m));
                    v = !1;
                    q ? (m = this.dateFormatsObject[this.nextPeriod[s]], v = !0) : m = this.dateFormatsObject[s];
                    t || (v = !1);
                    m = AmCharts.formatDate(new Date(r), m);
                    if (b == e && !j || b == h && !k) m = " ";
                    l = new this.axisItemRenderer(this, l, m, !1, p, 0, !1, v);
                    this.pushAxisItem(l);
                    m = r
                }
            } else if (this.parseDates) {
                if (this.parseDates && this.equalSpacing) {
                    g = this.start;
                    this.startTime = this.data[this.start].time;
                    this.endTime = this.data[this.end].time;
                    this.timeDifference = this.endTime - this.startTime;
                    e = this.choosePeriod(0);
                    f = e.period;
                    n = e.count;
                    a = AmCharts.getPeriodDuration(f, n);
                    a < l && (f = m.period, n = m.count, a = l);
                    s = f;
                    "WW" == s && (s = "DD");
                    this.stepWidth = this.getStepWidth(b);
                    h = Math.ceil(this.timeDifference / a) + 1;
                    m = AmCharts.resetDateToMin(new Date(this.startTime - a), f, n, u).getTime();
                    this.cellWidth = this.getStepWidth(b);
                    b = Math.round(m / a);
                    e = -1;
                    b / 2 == Math.round(b / 2) && (e = -2, m -= a);
                    b = this.start;
                    b / 2 == Math.round(b / 2) && b--;
                    0 > b && (b = 0);
                    p = this.end + 2;
                    p >= this.data.length && (p = this.data.length);
                    u = !1;
                    for (this.end - this.start > this.gridCount && (u = !0); b < p; b++) if (r = this.data[b].time, this.checkPeriodChange(f, n, r, m)) {
                        l = this.getCoordinate(b - this.start);
                        q = !1;
                        this.nextPeriod[s] && (q = this.checkPeriodChange(this.nextPeriod[s], 1, r, m));
                        v = !1;
                        q ? (m = this.dateFormatsObject[this.nextPeriod[s]], v = !0) : m = this.dateFormatsObject[s];
                        m = AmCharts.formatDate(new Date(r), m);
                        if (b == e && !j || b == h && !k) m = " ";
                        u ? u = !1 : (t || (v = !1), l = new this.axisItemRenderer(this, l, m, void 0, void 0, void 0, void 0, v), l.graphics(), this.pushAxisItem(l));
                        m = r
                    }
                }
            } else if (this.cellWidth = this.getStepWidth(b), b < h && (h = b), g += this.start, this.stepWidth = this.getStepWidth(b), 0 < h) {
                t = Math.floor(b / h);
                b = g;
                b / 2 == Math.round(b / 2) && b--;
                0 > b && (b = 0);
                for (h = 0; b <= this.end + 2; b++) if (0 <= b && b < this.data.length ? (s = this.data[b], m = s.category) : m = "", b / t == Math.round(b / t) || s.forceShow) {
                    l = this.getCoordinate(b - g);
                    p = 0;
                    "start" == this.gridPosition && (l -= this.cellWidth / 2, p = this.cellWidth / 2);
                    if (b == e && !j || b == this.end && !k) m = void 0;
                    Math.round(h / f) != h / f && (m = void 0);
                    h++;
                    u = this.cellWidth;
                    n && (u = NaN);
                    l = new this.axisItemRenderer(this, l, m, !0, u, p, void 0, !1, p);
                    this.pushAxisItem(l)
                }
            }
            for (b = 0; b < this.data.length; b++) if (j = this.data[b]) k = this.parseDates && !this.equalSpacing ? Math.round((j.time - this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(b - g),
            j.x[this.id] = k;
            j = this.guides.length;
            for (b = 0; b < j; b++) k = this.guides[b],
            p = p = p = h = t = NaN,
            e = k.above,
            k.toCategory && (p = d.getCategoryIndexByValue(k.toCategory), isNaN(p) || (t = this.getCoordinate(p - g), l = new this.axisItemRenderer(this, t, "", !0, NaN, NaN, k), this.pushAxisItem(l, e))),
            k.category && (p = d.getCategoryIndexByValue(k.category), isNaN(p) || (h = this.getCoordinate(p - g), p = (t - h) / 2, l = new this.axisItemRenderer(this, h, k.label, !0, NaN, p, k), this.pushAxisItem(l, e))),
            k.toDate && (this.equalSpacing ? (p = d.getClosestIndex(this.data, "time", k.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(p) || (t = this.getCoordinate(p - g))) : t = (k.toDate.getTime() - this.startTime) * this.stepWidth, l = new this.axisItemRenderer(this, t, "", !0, NaN, NaN, k), this.pushAxisItem(l, e)),
            k.date && (this.equalSpacing ? (p = d.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(p) || (h = this.getCoordinate(p - g))) : h = (k.date.getTime() - this.startTime) * this.stepWidth, p = (t - h) / 2, l = "H" == this.orientation ? new this.axisItemRenderer(this, h, k.label, !1, 2 * p, NaN, k) : new this.axisItemRenderer(this, h, k.label, !1, NaN, p, k), this.pushAxisItem(l, e)),
            t = new this.guideFillRenderer(this, h, t, k),
            h = t.graphics(),
            this.pushAxisItem(t, e),
            k.graphics = h,
            h.index = b,
            k.balloonText && this.addEventListeners(h, k)
        }
        this.axisCreated = !0;
        d = this.x;
        g = this.y;
        this.set.translate(d, g);
        this.labelsSet.translate(d, g);
        this.positionTitle(); (d = this.axisLine.set) && d.toFront()
    },
    choosePeriod: function(a) {
        var b = AmCharts.getPeriodDuration(this.periods[a].period, this.periods[a].count),
        d = Math.ceil(this.timeDifference / b),
        e = this.periods;
        return this.timeDifference < b && 0 < a ? e[a - 1] : d <= this.gridCount ? e[a] : a + 1 < e.length ? this.choosePeriod(a + 1) : e[a]
    },
    getStepWidth: function(a) {
        var b;
        this.startOnAxis ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;
        return b
    },
    getCoordinate: function(a) {
        a *= this.stepWidth;
        this.startOnAxis || (a += this.stepWidth / 2);
        return Math.round(a)
    },
    timeZoom: function(a, b) {
        this.startTime = a;
        this.endTime = b
    },
    minDuration: function() {
        var a = AmCharts.extractPeriod(this.minPeriod);
        return AmCharts.getPeriodDuration(a.period, a.count)
    },
    checkPeriodChange: function(a, b, d, e) {
        e = new Date(e);
        var f = this.firstDayOfWeek;
        d = AmCharts.resetDateToMin(new Date(d), a, b, f).getTime();
        a = AmCharts.resetDateToMin(e, a, b, f).getTime();
        return d != a ? !0 : !1
    },
    generateDFObject: function() {
        this.dateFormatsObject = {};
        var a;
        for (a = 0; a < this.dateFormats.length; a++) {
            var b = this.dateFormats[a];
            this.dateFormatsObject[b.period] = b.format
        }
    },
    xToIndex: function(a) {
        var b = this.data,
        d = this.chart,
        e = d.rotate,
        f = this.stepWidth;
        this.parseDates && !this.equalSpacing ? (a = this.startTime + Math.round(a / f) - this.minDuration() / 2, d = d.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= f / 2), d = this.start + Math.round(a / f));
        var d = AmCharts.fitToBounds(d, 0, b.length - 1),
        g;
        b[d] && (g = b[d].x[this.id]);
        e ? g > this.height + 1 && d--:g > this.width + 1 && d--;
        0 > g && d++;
        return d = AmCharts.fitToBounds(d, 0, b.length - 1)
    },
    dateToCoordinate: function(a) {
        return this.parseDates && !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth: this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
    },
    categoryToCoordinate: function(a) {
        return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
    },
    coordinateToDate: function(a) {
        return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
    }
});
AmCharts.RecAxis = AmCharts.Class({
    construct: function(a) {
        var b = a.chart,
        d = a.axisThickness,
        e = a.axisColor,
        f = a.axisAlpha,
        g = a.offset,
        h = a.dx,
        j = a.dy,
        k = a.viX,
        l = a.viY,
        m = a.viH,
        n = a.viW,
        s = b.container;
        "H" == a.orientation ? (e = AmCharts.line(s, [0, n], [0, 0], e, f, d), this.axisWidth = a.width, "bottom" == a.position ? (a = d / 2 + g + m + l - 1, d = k) : (a = -d / 2 - g + l + j, d = h + k)) : (this.axisWidth = a.height, "right" == a.position ? (e = AmCharts.line(s, [0, 0, -h], [0, m, m - j], e, f, d), a = l + j, d = d / 2 + g + h + n + k - 1) : (e = AmCharts.line(s, [0, 0], [0, m], e, f, d), a = l, d = -d / 2 - g + k));
        e.translate(d, a);
        b.axesSet.push(e);
        this.set = e
    }
});
AmCharts.RecItem = AmCharts.Class({
    construct: function(a, b, d, e, f, g, h, j, k) {
        b = Math.round(b);
        void 0 == d && (d = "");
        k || (k = 0);
        void 0 == e && (e = !0);
        var l = a.chart.fontFamily,
        m = a.fontSize;
        void 0 == m && (m = a.chart.fontSize);
        var n = a.color;
        void 0 == n && (n = a.chart.color);
        var s = a.chart.container,
        p = s.set();
        this.set = p;
        var r = a.axisThickness,
        q = a.axisColor,
        u = a.axisAlpha,
        t = a.tickLength,
        v = a.gridAlpha,
        w = a.gridThickness,
        y = a.gridColor,
        x = a.dashLength,
        z = a.fillColor,
        C = a.fillAlpha,
        I = a.labelsEnabled,
        G = a.labelRotation,
        O = a.counter,
        R = a.inside,
        U = a.dx,
        T = a.dy,
        ea = a.orientation,
        N = a.position,
        V = a.previousCoord,
        fa = a.viH,
        ca = a.viW,
        da = a.offset,
        ma, W;
        h ? (I = !0, isNaN(h.tickLength) || (t = h.tickLength), void 0 != h.lineColor && (y = h.lineColor), isNaN(h.lineAlpha) || (v = h.lineAlpha), isNaN(h.dashLength) || (x = h.dashLength), isNaN(h.lineThickness) || (w = h.lineThickness), !0 === h.inside && (R = !0), isNaN(h.labelRotation) || (G = h.labelRotation)) : "" === d && (t = 0);
        W = "start";
        f && (W = "middle");
        var P = G * Math.PI / 180,
        aa, F = 0,
        E = 0,
        A = 0,
        ga = aa = 0;
        "V" == ea && (G = 0);
        var X;
        I && (X = AmCharts.text(s, d, n, l, m, W, j), ga = X.getBBox().width);
        if ("H" == ea) {
            if (0 <= b && b <= ca + 1 && (0 < t && (0 < u && b + k <= ca + 1) && (ma = AmCharts.line(s, [b + k, b + k], [0, t], q, u, w), p.push(ma)), 0 < v && (W = AmCharts.line(s, [b, b + U, b + U], [fa, fa + T, T], y, v, w, x), p.push(W))), E = 0, F = b, h && 90 == G && (F -= m), !1 === e ? (W = "start", E = "bottom" == N ? R ? E + t: E - t: R ? E - t: E + t, F += 3, f && (F += f / 2, W = "middle"), 0 < G && (W = "middle")) : W = "middle", 1 == O && (0 < C && !h && V < ca) && (e = AmCharts.fitToBounds(b, 0, ca), V = AmCharts.fitToBounds(V, 0, ca), aa = e - V, 0 < aa && (fill = AmCharts.rect(s, aa, a.height, z, C), fill.translate(e - aa + U, T), p.push(fill))), "bottom" == N ? (E += fa + m / 2 + da, R ? 0 < G ? (E = fa - ga / 2 * Math.sin(P) - t - 3, F += ga / 2 * Math.cos(P)) : E -= t + m + 3 + 3 : 0 < G ? (E = fa + ga / 2 * Math.sin(P) + t + 3, F -= ga / 2 * Math.cos(P)) : E += t + r + 3 + 3) : (E += T + m / 2 - da, F += U, R ? 0 < G ? (E = ga / 2 * Math.sin(P) + t + 3, F -= ga / 2 * Math.cos(P)) : E += t + 3 : 0 < G ? (E = -(ga / 2) * Math.sin(P) - t - 6, F += ga / 2 * Math.cos(P)) : E -= t + m + 3 + r + 3), "bottom" == N ? aa = (R ? fa - t - 1 : fa + r - 1) + da: (A = U, aa = (R ? T: T - t - r + 1) - da), g && (F += g), T = F, 0 < G && (T += ga / 2 * Math.cos(P)), X && (N = 0, R && (N = ga / 2 * Math.cos(P)), T + N > ca + 1 || 0 > T)) X.remove(),
            X = null
        } else {
            0 <= b && b <= fa + 1 && (0 < t && (0 < u && b + k <= fa + 1) && (ma = AmCharts.line(s, [0, t], [b + k, b + k], q, u, w), p.push(ma)), 0 < v && (W = AmCharts.line(s, [0, U, ca + U], [b, b + T, b + T], y, v, w, x), p.push(W)));
            W = "end";
            if (!0 === R && "left" == N || !1 === R && "right" == N) W = "start";
            E = b - m / 2;
            1 == O && (0 < C && !h) && (e = AmCharts.fitToBounds(b, 0, fa), V = AmCharts.fitToBounds(V, 0, fa), P = e - V, fill = AmCharts.polygon(s, [0, a.width, a.width, 0], [0, 0, P, P], z, C), fill.translate(U, e - P + T), p.push(fill));
            E += m / 2;
            "right" == N ? (F += U + ca + da, E += T, R ? (F -= t + 4, g || (E -= m / 2 + 3)) : (F += t + 4 + r, E -= 2)) : R ? (F += t + 4 - da, g || (E -= m / 2 + 3), h && (F += U, E += T)) : (F += -t - r - 4 - 2 - da, E -= 2);
            ma && ("right" == N ? (A += U + da + ca, aa += T, A = R ? A - r: A + r) : (A -= da, R || (A -= t + r)));
            g && (E += g);
            R = -3;
            "right" == N && (R += T);
            if (X && (E > fa + 1 || E < R)) X.remove(),
            X = null
        }
        ma && ma.translate(A, aa); ! 1 === a.visible && (ma && ma.remove(), X && (X.remove(), X = null));
        X && (X.attr({
            "text-anchor": W
        }), X.translate(F, E), 0 !== G && X.rotate( - G), a.allLabels.push(X), " " != d && (this.label = X));
        a.counter = 0 === O ? 1 : 0;
        a.previousCoord = b;
        0 === this.set.node.childNodes.length && this.set.remove()
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {
        return this.label
    }
});
AmCharts.RecFill = AmCharts.Class({
    construct: function(a, b, d, e) {
        var f = a.dx,
        g = a.dy,
        h = a.orientation,
        j = 0;
        if (d < b) {
            var k = b;
            b = d;
            d = k
        }
        var l = e.fillAlpha;
        isNaN(l) && (l = 0);
        k = a.chart.container;
        e = e.fillColor;
        "V" == h ? (b = AmCharts.fitToBounds(b, 0, a.viH), d = AmCharts.fitToBounds(d, 0, a.viH)) : (b = AmCharts.fitToBounds(b, 0, a.viW), d = AmCharts.fitToBounds(d, 0, a.viW));
        d -= b;
        isNaN(d) && (d = 4, j = 2, l = 0);
        0 > d && "object" == typeof e && (e = e.join(",").split(",").reverse());
        "V" == h ? (a = AmCharts.rect(k, a.width, d, e, l), a.translate(f, b - j + g)) : (a = AmCharts.rect(k, d, a.height, e, l), a.translate(b - j + f, g));
        this.set = k.set([a])
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {}
});
AmCharts.RadAxis = AmCharts.Class({
    construct: function(a) {
        var b = a.chart,
        d = a.axisThickness,
        e = a.axisColor,
        f = a.axisAlpha,
        g = a.x,
        h = a.y;
        this.set = b.container.set();
        b.axesSet.push(this.set);
        var j = a.axisTitleOffset,
        k = a.radarCategoriesEnabled,
        l = a.chart.fontFamily,
        m = a.fontSize;
        void 0 === m && (m = a.chart.fontSize);
        var n = a.color;
        void 0 === n && (n = a.chart.color);
        if (b) {
            this.axisWidth = a.height;
            a = b.chartData;
            var s = a.length,
            p;
            for (p = 0; p < s; p++) {
                var r = 180 - 360 / s * p,
                q = g + this.axisWidth * Math.sin(r / 180 * Math.PI),
                u = h + this.axisWidth * Math.cos(r / 180 * Math.PI);
                0 < f && (q = AmCharts.line(b.container, [g, q], [h, u], e, f, d), this.set.push(q));
                if (k) {
                    var t = "start",
                    q = g + (this.axisWidth + j) * Math.sin(r / 180 * Math.PI),
                    u = h + (this.axisWidth + j) * Math.cos(r / 180 * Math.PI);
                    if (180 == r || 0 === r) t = "middle",
                    q -= 5;
                    0 > r && (t = "end", q -= 10);
                    180 == r && (u -= 5);
                    0 === r && (u += 5);
                    r = AmCharts.text(b.container, a[p].category, n, l, m, t);
                    r.translate(q + 5, u);
                    this.set.push(r);
                    r.getBBox()
                }
            }
        }
    }
});
AmCharts.RadItem = AmCharts.Class({
    construct: function(a, b, d, e, f, g, h) {
        void 0 === d && (d = "");
        var j = a.chart.fontFamily,
        k = a.fontSize;
        void 0 === k && (k = a.chart.fontSize);
        var l = a.color;
        void 0 === l && (l = a.chart.color);
        var m = a.chart.container;
        this.set = e = m.set();
        var n = a.axisColor,
        s = a.axisAlpha,
        p = a.tickLength,
        r = a.gridAlpha,
        q = a.gridThickness,
        u = a.gridColor,
        t = a.dashLength,
        v = a.fillColor,
        w = a.fillAlpha,
        y = a.labelsEnabled;
        f = a.counter;
        var x = a.inside,
        z = a.gridType,
        C;
        b -= a.height;
        var I;
        g = a.x;
        var G = a.y;
        h ? (y = !0, isNaN(h.tickLength) || (p = h.tickLength), void 0 != h.lineColor && (u = h.lineColor), isNaN(h.lineAlpha) || (r = h.lineAlpha), isNaN(h.dashLength) || (t = h.dashLength), isNaN(h.lineThickness) || (q = h.lineThickness), !0 === h.inside && (x = !0)) : d || (r /= 3, p /= 2);
        var O = "end",
        R = -1;
        x && (O = "start", R = 1);
        var U;
        y && (U = AmCharts.text(m, d, l, j, k, O), U.translate(g + (p + 3) * R, b), e.push(U), this.label = U, I = AmCharts.line(m, [g, g + p * R], [b, b], n, s, q), e.push(I));
        b = a.y - b;
        d = [];
        j = [];
        if (0 < r) {
            if ("polygons" == z) {
                C = a.data.length;
                for (k = 0; k < C; k++) l = 180 - 360 / C * k,
                d.push(b * Math.sin(l / 180 * Math.PI)),
                j.push(b * Math.cos(l / 180 * Math.PI));
                d.push(d[0]);
                j.push(j[0]);
                r = AmCharts.line(m, d, j, u, r, q, t)
            } else r = AmCharts.circle(m, b, "#FFFFFF", 0, q, u, r);
            r.translate(g, G);
            e.push(r)
        }
        if (1 == f && 0 < w && !h) {
            h = a.previousCoord;
            if ("polygons" == z) {
                for (k = C; 0 <= k; k--) l = 180 - 360 / C * k,
                d.push(h * Math.sin(l / 180 * Math.PI)),
                j.push(h * Math.cos(l / 180 * Math.PI));
                C = AmCharts.polygon(m, d, j, v, w)
            } else C = AmCharts.wedge(m, 0, 0, 0, -360, b, b, h, 0, {
                fill: v,
                "fill-opacity": w,
                stroke: 0,
                "stroke-opacity": 0,
                "stroke-width": 0
            });
            e.push(C);
            C.translate(g, G)
        } ! 1 === a.visible && (I && I.hide(), U && U.hide());
        a.counter = 0 === f ? 1 : 0;
        a.previousCoord = b
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {
        return this.label
    }
});
AmCharts.RadarFill = AmCharts.Class({
    construct: function(a, b, d, e) {
        b -= a.axisWidth;
        d -= a.axisWidth;
        var f = Math.max(b, d);
        b = d = Math.min(b, d);
        d = a.chart.container;
        var g = e.fillAlpha,
        h = e.fillColor,
        f = Math.abs(f - a.y);
        b = Math.abs(b - a.y);
        var j = Math.max(f, b);
        b = Math.min(f, b);
        f = j;
        j = -e.angle;
        e = -e.toAngle;
        isNaN(j) && (j = 0);
        isNaN(e) && (e = -360);
        this.set = d.set();
        void 0 === h && (h = "#000000");
        isNaN(g) && (g = 0);
        if ("polygons" == a.gridType) {
            e = [];
            var k = [],
            l = a.data.length,
            m;
            for (m = 0; m < l; m++) j = 180 - 360 / l * m,
            e.push(f * Math.sin(j / 180 * Math.PI)),
            k.push(f * Math.cos(j / 180 * Math.PI));
            e.push(e[0]);
            k.push(k[0]);
            for (m = l; 0 <= m; m--) j = 180 - 360 / l * m,
            e.push(b * Math.sin(j / 180 * Math.PI)),
            k.push(b * Math.cos(j / 180 * Math.PI));
            this.fill = AmCharts.polygon(d, e, k, h, g)
        } else this.fill = AmCharts.wedge(d, 0, 0, j, e - j, f, f, b, 0, {
            fill: h,
            "fill-opacity": g,
            stroke: 0,
            "stroke-opacity": 0,
            "stroke-width": 0
        });
        this.set.push(this.fill);
        this.fill.translate(a.x, a.y)
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {}
});
AmCharts.AmGraph = AmCharts.Class({
    construct: function() {
        this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem");
        this.type = "line";
        this.stackable = !0;
        this.columnCount = 1;
        this.columnIndex = 0;
        this.centerCustomBullets = this.showBalloon = !0;
        this.maxBulletSize = 50;
        this.minBulletSize = 0;
        this.balloonText = "[[value]]";
        this.hidden = this.scrollbar = this.animationPlayed = !1;
        this.columnWidth = 0.8;
        this.pointPosition = "middle";
        this.depthCount = 1;
        this.includeInMinMax = !0;
        this.negativeBase = 0;
        this.visibleInLegend = !0;
        this.showAllValueLabels = !1;
        this.showBalloonAt = "close";
        this.lineThickness = 1;
        this.dashLength = 0;
        this.connect = !0;
        this.lineAlpha = 1;
        this.bullet = "none";
        this.bulletBorderThickness = 2;
        this.bulletAlpha = this.bulletBorderAlpha = 1;
        this.bulletSize = 8;
        this.hideBulletsCount = this.bulletOffset = 0;
        this.labelPosition = "top";
        this.cornerRadiusTop = 0;
        this.cursorBulletAlpha = 1;
        this.gradientOrientation = "vertical";
        this.dy = this.dx = 0;
        this.periodValue = "";
        this.y = this.x = 0
    },
    draw: function() {
        var a = this.chart,
        b = a.container;
        this.container = b;
        this.destroy();
        var d = b.set(),
        e = b.set();
        this.behindColumns ? (a.graphsBehindSet.push(d), a.bulletBehindSet.push(e)) : (a.graphsSet.push(d), a.bulletSet.push(e));
        this.bulletSet = e;
        if (!this.scrollbar) {
            var f = a.marginLeftReal,
            a = a.marginTopReal;
            d.translate(f, a);
            e.translate(f, a)
        }
        b = b.set();
        AmCharts.remove(this.columnsSet);
        d.push(b);
        this.set = d;
        this.columnsSet = b;
        this.columnsArray = [];
        this.ownColumns = [];
        this.allBullets = [];
        this.animationArray = [];
        AmCharts.ifArray(this.data) && (d = !1, "xy" == this.chartType ? this.xAxis.axisCreated && this.yAxis.axisCreated && (d = !0) : this.valueAxis.axisCreated && (d = !0), !this.hidden && d && this.createGraph())
    },
    createGraph: function() {
        var a = this.chart;
        "inside" == this.labelPosition && (this.labelPosition = "bottom");
        this.startAlpha = a.startAlpha;
        this.seqAn = a.sequencedAnimation;
        this.baseCoord = this.valueAxis.baseCoord;
        this.fillColors || (this.fillColors = this.lineColor);
        void 0 === this.fillAlphas && (this.fillAlphas = 0);
        void 0 === this.bulletColor && (this.bulletColor = this.lineColor, this.bulletColorNegative = this.negativeLineColor);
        void 0 === this.bulletAlpha && (this.bulletAlpha = this.lineAlpha);
        this.bulletBorderColor || (this.bulletBorderAlpha = 0);
        if (!isNaN(this.valueAxis.min) && !isNaN(this.valueAxis.max)) {
            switch (this.chartType) {
            case "serial":
                this.createSerialGraph();
                "candlestick" == this.type && 1 > this.valueAxis.minMaxMultiplier && this.positiveClip(this.set);
                break;
            case "radar":
                this.createRadarGraph();
                break;
            case "xy":
                this.createXYGraph(),
                this.positiveClip(this.set)
            }
            this.animationPlayed = !0
        }
    },
    createXYGraph: function() {
        var a = [],
        b = [],
        d = this.xAxis,
        e = this.yAxis;
        this.pmh = e.viH + 1;
        this.pmw = d.viW + 1;
        this.pmy = this.pmx = 0;
        var f;
        for (f = this.start; f <= this.end; f++) {
            var g = this.data[f].axes[d.id].graphs[this.id],
            h = g.values,
            j = h.x,
            k = h.y,
            h = d.getCoordinate(j),
            l = e.getCoordinate(k);
            if (!isNaN(j) && !isNaN(k) && (a.push(h), b.push(l), (j = this.createBullet(g, h, l, f)) || (j = 0), k = this.labelText)) g = this.createLabel(g, h, l, k),
            this.allBullets.push(g),
            this.positionLabel(h, l, g, this.labelPosition, j)
        }
        this.drawLineGraph(a, b);
        this.launchAnimation()
    },
    createRadarGraph: function() {
        var a = this.valueAxis.stackType,
        b = [],
        d = [],
        e,
        f,
        g;
        for (g = this.start; g <= this.end; g++) {
            var h = this.data[g].axes[this.valueAxis.id].graphs[this.id],
            j;
            j = "none" == a || "3d" == a ? h.values.value: h.values.close;
            if (isNaN(j)) this.drawLineGraph(b, d),
            b = [],
            d = [];
            else {
                var k = this.y - (this.valueAxis.getCoordinate(j) - this.height),
                l = 180 - 360 / (this.end - this.start + 1) * g;
                j = k * Math.sin(l / 180 * Math.PI);
                k *= Math.cos(l / 180 * Math.PI);
                b.push(j);
                d.push(k); (l = this.createBullet(h, j, k, g)) || (l = 0);
                var m = this.labelText;
                m && (h = this.createLabel(h, j, k, m), this.allBullets.push(h), this.positionLabel(j, k, h, this.labelPosition, l));
                isNaN(e) && (e = j);
                isNaN(f) && (f = k)
            }
        }
        b.push(e);
        d.push(f);
        this.drawLineGraph(b, d);
        this.launchAnimation()
    },
    positionLabel: function(a, b, d, e, f) {
        var g = d.getBBox();
        switch (e) {
        case "left":
            a -= (g.width + f) / 2 + 2;
            break;
        case "top":
            b -= (f + g.height) / 2 + 1;
            break;
        case "right":
            a += (g.width + f) / 2 + 2;
            break;
        case "bottom":
            b += (f + g.height) / 2 + 1
        }
        d.translate(a, b)
    },
    createSerialGraph: function() {
        var a = this.id,
        b = this.index,
        d = this.data,
        e = this.chart.container,
        f = this.valueAxis,
        g = this.type,
        h = this.columnWidth,
        j = this.width,
        k = this.height,
        l = this.y,
        m = this.rotate,
        n = this.columnCount,
        s = AmCharts.toCoordinate(this.cornerRadiusTop, h / 2),
        p = this.connect,
        r = [],
        q = [],
        u,
        t,
        v = this.chart.graphs.length,
        w,
        y = this.dx / this.depthCount,
        x = this.dy / this.depthCount,
        z = f.stackType,
        C = this.labelPosition,
        I = this.start,
        G = this.end,
        O = this.scrollbar,
        R = this.categoryAxis,
        U = this.baseCoord,
        T = this.negativeBase,
        ea = this.columnIndex,
        N = this.lineThickness,
        V = this.lineAlpha,
        fa = this.lineColor,
        ca = this.dashLength,
        da = this.set;
        "above" == C && (C = "top");
        "below" == C && (C = "bottom");
        var ma = C,
        W = 270;
        "horizontal" == this.gradientOrientation && (W = 0);
        this.gradientRotation = W;
        var P = this.chart.columnSpacing,
        aa = R.cellWidth,
        F = (aa * h - n) / n;
        P > F && (P = F);
        var E, A, ga, X = k + 1,
        Ya = j + 1,
        Na = 0,
        Za = 0,
        $a, ab, Oa, Pa, Bb = this.fillColors,
        Fa = this.negativeFillColors,
        ya = this.negativeLineColor,
        Ga = this.fillAlphas,
        Ha = this.negativeFillAlphas;
        "object" == typeof Ga && (Ga = Ga[0]);
        "object" == typeof Ha && (Ha = Ha[0]);
        var Qa = f.getCoordinate(f.min);
        f.logarithmic && (Qa = f.getCoordinate(f.minReal));
        this.minCoord = Qa;
        this.resetBullet && (this.bullet = "none");
        if (!O && ("line" == g || "smoothedLine" == g || "step" == g)) if (1 == d.length && ("step" != g && "none" == this.bullet) && (this.bullet = "round", this.resetBullet = !0), Fa || void 0 != ya) {
            var Aa = T;
            Aa > f.max && (Aa = f.max);
            Aa < f.min && (Aa = f.min);
            f.logarithmic && (Aa = f.minReal);
            var ta = f.getCoordinate(Aa),
            nb = f.getCoordinate(f.max);
            m ? (X = k, Ya = Math.abs(nb - ta), $a = k, ab = Math.abs(Qa - ta), Pa = Za = 0, f.reversed ? (Na = 0, Oa = ta) : (Na = ta, Oa = 0)) : (Ya = j, X = Math.abs(nb - ta), ab = j, $a = Math.abs(Qa - ta), Oa = Na = 0, f.reversed ? (Pa = l, Za = ta) : Pa = ta + 1)
        }
        var ua = Math.round;
        this.pmx = ua(Na);
        this.pmy = ua(Za);
        this.pmh = ua(X);
        this.pmw = ua(Ya);
        this.nmx = ua(Oa);
        this.nmy = ua(Pa);
        this.nmh = ua($a);
        this.nmw = ua(ab);
        h = "column" == g ? (aa * h - P * (n - 1)) / n: aa * h;
        1 > h && (h = 1);
        var L;
        if ("line" == g || "step" == g || "smoothedLine" == g) {
            if (0 < I) for (L = I - 1; - 1 < L; L--) if (E = d[L], A = E.axes[f.id].graphs[a], ga = A.values.value) {
                I = L;
                break
            }
            if (G < d.length - 1) for (L = G + 1; L < d.length; L++) if (E = d[L], A = E.axes[f.id].graphs[a], ga = A.values.value) {
                G = L;
                break
            }
        }
        G < d.length - 1 && G++;
        var ha = [],
        ia = [],
        Ia = !1;
        if ("line" == g || "step" == g || "smoothedLine" == g) if (this.stackable && "regular" == z || "100%" == z || this.fillToGraph) Ia = !0;
        for (L = I; L <= G; L++) {
            E = d[L];
            A = E.axes[f.id].graphs[a];
            A.index = L;
            var J, K, H, Z, oa = NaN,
            D = NaN,
            B = NaN,
            Q = NaN,
            M = NaN,
            Ra = NaN,
            Ba = NaN,
            Sa = NaN,
            Ca = NaN,
            Y = NaN,
            ba = NaN,
            pa = NaN,
            qa = NaN,
            S = NaN,
            Ta = NaN,
            Ua = NaN,
            ja = NaN,
            ka = void 0,
            va = Bb,
            Ja = Ga,
            na = fa,
            la, ra;
            void 0 != A.color && (va = A.color);
            A.fillColors && (va = A.fillColors);
            isNaN(A.alpha) || (Ja = A.alpha);
            var sa = A.values;
            f.recalculateToPercents && (sa = A.percents);
            if (sa) {
                S = !this.stackable || "none" == z || "3d" == z ? sa.value: sa.close;
                if ("candlestick" == g || "ohlc" == g) S = sa.close,
                Ua = sa.low,
                Ba = f.getCoordinate(Ua),
                Ta = sa.high,
                Ca = f.getCoordinate(Ta);
                ja = sa.open;
                B = f.getCoordinate(S);
                isNaN(ja) || (M = f.getCoordinate(ja));
                if (!O) switch (this.showBalloonAt) {
                case "close":
                    A.y = B;
                    break;
                case "open":
                    A.y = M;
                    break;
                case "high":
                    A.y = Ca;
                    break;
                case "low":
                    A.y = Ba
                }
                var oa = E.x[R.id],
                wa = Math.floor(aa / 2),
                Ka = wa;
                "start" == this.pointPosition && (oa -= aa / 2, wa = 0, Ka = aa);
                O || (A.x = oa); - 1E5 > oa && (oa = -1E5);
                oa > j + 1E5 && (oa = j + 1E5);
                m ? (D = B, Q = M, M = B = oa, isNaN(ja) && !this.fillToGraph && (Q = U), Ra = Ba, Sa = Ca) : (Q = D = oa, isNaN(ja) && !this.fillToGraph && (M = U));
                switch (g) {
                case "line":
                    isNaN(S) ? p || (this.drawLineGraph(r, q, ha, ia), r = [], q = [], ha = [], ia = []) : (A.isNegative = S < T ? !0 : !1, r.push(D), q.push(B), Y = D, ba = B, pa = D, qa = B, Ia && (!isNaN(M) && !isNaN(Q)) && (ha.push(Q), ia.push(M)));
                    break;
                case "smoothedLine":
                    isNaN(S) ? p || (this.drawSmoothedGraph(r, q, ha, ia), r = [], q = [], ha = [], ia = []) : (A.isNegative = S < T ? !0 : !1, r.push(D), q.push(B), Y = D, ba = B, pa = D, qa = B, Ia && (!isNaN(M) && !isNaN(Q)) && (ha.push(Q), ia.push(M)));
                    break;
                case "step":
                    isNaN(S) ? p || (t = NaN, this.drawLineGraph(r, q, ha, ia), r = [], q = [], ha = [], ia = []) : (A.isNegative = S < T ? !0 : !1, m ? (isNaN(u) || (r.push(u), q.push(B - wa)), q.push(B - wa), r.push(D), q.push(B + Ka), r.push(D), Ia && (!isNaN(M) && !isNaN(Q)) && (ha.push(Q), ia.push(M - wa), ha.push(Q), ia.push(M + Ka))) : (isNaN(t) || (q.push(t), r.push(D - wa)), r.push(D - wa), q.push(B), r.push(D + Ka), q.push(B), Ia && (!isNaN(M) && !isNaN(Q)) && (ha.push(Q - wa), ia.push(M), ha.push(Q + Ka), ia.push(M))), u = D, t = B, Y = D, ba = B, pa = D, qa = B);
                    break;
                case "column":
                    la = na;
                    void 0 != A.lineColor && (la = A.lineColor);
                    if (!isNaN(S)) {
                        S < T ? (A.isNegative = !0, Fa && (va = Fa), void 0 != ya && (na = ya)) : A.isNegative = !1;
                        var ob = f.min,
                        pb = f.max;
                        if (! (S < ob && ja < ob || S > pb && ja > pb)) if (m) {
                            "3d" == z ? (K = B - 0.5 * (h + P) + P / 2 + x * ea, J = Q + y * ea) : (K = B - (n / 2 - ea) * (h + P) + P / 2, J = Q);
                            H = h;
                            Y = D;
                            ba = K + h / 2;
                            pa = D;
                            qa = K + h / 2;
                            K + H > k && (H = k - K);
                            0 > K && (H += K, K = 0);
                            Z = D - Q;
                            var Cb = J;
                            J = AmCharts.fitToBounds(J, 0, j);
                            Z += Cb - J;
                            Z = AmCharts.fitToBounds(Z, -J, j - J + y * ea);
                            if (K < k && 0 < H && (ka = new AmCharts.Cuboid(e, Z, H, y, x, va, Ja, N, la, V, W, s, m), "bottom" != C)) if (C = f.reversed ? "left": "right", 0 > S) C = f.reversed ? "right": "left";
                            else if ("regular" == z || "100%" == z) Y += this.dx
                        } else {
                            "3d" == z ? (J = D - 0.5 * (h + P) + P / 2 + y * ea, K = M + x * ea) : (J = D - (n / 2 - ea) * (h + P) + P / 2, K = M);
                            H = h;
                            Y = J + h / 2;
                            ba = B;
                            pa = J + h / 2;
                            qa = B;
                            J + H > j + ea * y && (H = j - J + ea * y);
                            0 > J && (H += J, J = 0);
                            Z = B - M;
                            var Db = K;
                            K = AmCharts.fitToBounds(K, this.dy, k);
                            Z += Db - K;
                            Z = AmCharts.fitToBounds(Z, -K + x * ea, k - K);
                            if (J < j + ea * y && 0 < H) if (ka = new AmCharts.Cuboid(e, H, Z, y, x, va, Ja, N, la, this.lineAlpha, W, s, m), 0 > S && "middle" != C) C = "bottom";
                            else if (C = ma, "regular" == z || "100%" == z) ba += this.dy
                        }
                        if (ka && (ra = ka.set, ra.translate(J, K), this.columnsSet.push(ra), A.url && ra.setAttr("cursor", "pointer"), !O)) {
                            "none" == z && (w = m ? (this.end + 1 - L) * v - b: v * L + b);
                            "3d" == z && (m ? (w = (v - b) * (this.end + 1 - L), Y += y * this.columnIndex, pa += y * this.columnIndex, A.y += y * this.columnIndex) : (w = (v - b) * (L + 1), Y += 3, ba += x * this.columnIndex + 7, qa += x * this.columnIndex, A.y += x * this.columnIndex));
                            if ("regular" == z || "100%" == z) C = "middle",
                            w = m ? 0 < sa.value ? (this.end + 1 - L) * v + b: (this.end + 1 - L) * v - b: 0 < sa.value ? v * L + b: v * L - b;
                            this.columnsArray.push({
                                column: ka,
                                depth: w
                            });
                            A.x = m ? K + H / 2 : J + H / 2;
                            this.ownColumns.push(ka);
                            this.animateColumns(ka, L, D, Q, B, M);
                            this.addListeners(ra, A)
                        }
                    }
                    break;
                case "candlestick":
                    if (!isNaN(ja) && !isNaN(Ta) && !isNaN(Ua) && !isNaN(S)) {
                        var Va, bb;
                        S < ja && (A.isNegative = !0, Fa && (va = Fa), Ha && (Ja = Ha), void 0 != ya && (na = ya));
                        la = na;
                        void 0 != A.lineColor && (la = A.lineColor);
                        if (m) {
                            if (K = B - h / 2, J = Q, H = h, K + H > k && (H = k - K), 0 > K && (H += K, K = 0), K < k && 0 < H) {
                                var cb, db;
                                S > ja ? (cb = [D, Sa], db = [Q, Ra]) : (cb = [Q, Sa], db = [D, Ra]);
                                B < k && 0 < B && (Va = AmCharts.line(e, cb, [B, B], la, V, N), bb = AmCharts.line(e, db, [B, B], la, V, N));
                                Z = D - Q;
                                ka = new AmCharts.Cuboid(e, Z, H, y, x, va, Ga, N, la, V, W, s, m)
                            }
                        } else if (J = D - h / 2, K = M + N / 2, H = h, J + H > j && (H = j - J), 0 > J && (H += J, J = 0), Z = B - M, J < j && 0 < H) {
                            var ka = new AmCharts.Cuboid(e, H, Z, y, x, va, Ja, N, la, V, W, s, m),
                            eb,
                            fb;
                            S > ja ? (eb = [B, Ca], fb = [M, Ba]) : (eb = [M, Ca], fb = [B, Ba]);
                            D < j && 0 < D && (Va = AmCharts.line(e, [D, D], eb, la, V, N), bb = AmCharts.line(e, [D, D], fb, la, V, N))
                        }
                        ka && (ra = ka.set, da.push(ra), ra.translate(J, K), A.url && ra.setAttr("cursor", "pointer"), Va && (da.push(Va), da.push(bb)), Y = D, ba = B, pa = D, qa = B, O || (A.x = m ? K + H / 2 : J + H / 2, this.animateColumns(ka, L, D, Q, B, M), this.addListeners(ra, A)))
                    }
                    break;
                case "ohlc":
                    if (!isNaN(ja) && !isNaN(Ta) && !isNaN(Ua) && !isNaN(S)) {
                        S < ja && (A.isNegative = !0, void 0 != ya && (na = ya));
                        var gb, hb, ib;
                        if (m) {
                            var jb = B - h / 2,
                            jb = AmCharts.fitToBounds(jb, 0, k),
                            qb = AmCharts.fitToBounds(B, 0, k),
                            kb = B + h / 2,
                            kb = AmCharts.fitToBounds(kb, 0, k);
                            hb = AmCharts.line(e, [Q, Q], [jb, qb], na, V, N, ca);
                            0 < B && B < k && (gb = AmCharts.line(e, [Ra, Sa], [B, B], na, V, N, ca));
                            ib = AmCharts.line(e, [D, D], [qb, kb], na, V, N, ca)
                        } else {
                            var lb = D - h / 2,
                            lb = AmCharts.fitToBounds(lb, 0, j),
                            rb = AmCharts.fitToBounds(D, 0, j),
                            mb = D + h / 2,
                            mb = AmCharts.fitToBounds(mb, 0, j);
                            hb = AmCharts.line(e, [lb, rb], [M, M], na, V, N, ca);
                            0 < D && D < j && (gb = AmCharts.line(e, [D, D], [Ba, Ca], na, V, N, ca));
                            ib = AmCharts.line(e, [rb, mb], [B, B], na, V, N, ca)
                        }
                        da.push(hb);
                        da.push(gb);
                        da.push(ib);
                        Y = D;
                        ba = B;
                        pa = D;
                        qa = B
                    }
                }
                if (!O && !isNaN(S)) {
                    var sb = this.hideBulletsCount;
                    if (this.end - this.start <= sb || 0 === sb) {
                        var Da = this.createBullet(A, pa, qa, L);
                        Da || (Da = 0);
                        var tb = this.labelText;
                        if (tb) {
                            var $ = this.createLabel(A, 0, 0, tb),
                            xa = 0,
                            za = 0,
                            ub = $.getBBox(),
                            Wa = ub.width,
                            Xa = ub.height;
                            switch (C) {
                            case "left":
                                xa = -(Wa / 2 + Da / 2 + 3);
                                break;
                            case "top":
                                za = -(Xa / 2 + Da / 2 + 3);
                                break;
                            case "right":
                                xa = Da / 2 + 2 + Wa / 2;
                                break;
                            case "bottom":
                                m && "column" == g ? (Y = U, 0 > S ? (xa = -6, $.attr({
                                    "text-anchor": "end"
                                })) : (xa = 6, $.attr({
                                    "text-anchor": "start"
                                }))) : (za = Da / 2 + Xa / 2, $.x = -(Wa / 2 + 2));
                                break;
                            case "middle":
                                "column" == g && (m ? (za = -(Xa / 2) + this.fontSize / 2, xa = -(D - Q) / 2 - y, 0 > Z && (xa += y), Math.abs(D - Q) < Wa && !this.showAllValueLabels && ($.remove(), $ = null)) : (za = -(B - M) / 2, 0 > Z && (za -= x), Math.abs(B - M) < Xa && !this.showAllValueLabels && ($.remove(), $ = null)))
                            }
                            if ($) {
                                if (!isNaN(ba) && !isNaN(Y)) if (Y += xa, ba += za, $.translate(Y, ba), m) {
                                    if (0 > ba || ba > k) $.remove(),
                                    $ = null
                                } else {
                                    var vb = 0;
                                    "3d" == z && (vb = y * ea);
                                    if (0 > Y || Y > j + vb) $.remove(),
                                    $ = null
                                } else $.remove(),
                                $ = null;
                                $ && this.allBullets.push($)
                            }
                        }
                        if ("column" == g && "regular" == z || "100%" == z) {
                            var wb = f.totalText;
                            if (wb) {
                                var Ea = this.createLabel(A, 0, 0, wb);
                                this.allBullets.push(Ea);
                                var xb = Ea.getBBox(),
                                yb = xb.width,
                                zb = xb.height,
                                La,
                                Ma,
                                Ab = f.totals[L];
                                Ab && Ab.remove();
                                m ? (Ma = B, La = 0 > S ? D - yb / 2 - 2 : D + yb / 2 + 3) : (La = D, Ma = 0 > S ? B + zb / 2 : B - zb / 2 - 3);
                                Ea.translate(La, Ma);
                                f.totals[L] = Ea;
                                m ? (0 > Ma || Ma > k) && Ea.remove() : (0 > La || La > j) && Ea.remove()
                            }
                        }
                    }
                }
            }
        }
        if ("line" == g || "step" == g || "smoothedLine" == g)"smoothedLine" == g ? this.drawSmoothedGraph(r, q, ha, ia) : this.drawLineGraph(r, q, ha, ia),
        O || this.launchAnimation()
    },
    animateColumns: function(a, b) {
        var d = this,
        e = d.chart.startDuration;
        0 < e && !d.animationPlayed && (d.seqAn ? (a.set.hide(), d.animationArray.push(a), e = setTimeout(function() {
            d.animate.call(d)
        },
        1E3 * e / (d.end - d.start + 1) * (b - d.start)), d.timeOuts.push(e)) : d.animate(a))
    },
    createLabel: function(a, b, d, e) {
        var f = this.chart,
        g = a.labelColor;
        void 0 == g && (g = this.color);
        void 0 == g && (g = f.color);
        var h = this.fontSize;
        void 0 === h && (this.fontSize = h = f.fontSize);
        a = f.formatString(e, a, this);
        a = AmCharts.cleanFromEmpty(a);
        f = AmCharts.text(this.container, a, g, f.fontFamily, h);
        f.translate(b, d);
        this.bulletSet.push(f);
        return f
    },
    positiveClip: function(a) {
        a.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
    },
    negativeClip: function(a) {
        a.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
    },
    drawLineGraph: function(a, b, d, e) {
        if (1 < a.length) {
            var f = this.set,
            g = this.container,
            h = g.set(),
            j = g.set();
            f.push(h);
            f.push(j);
            var k = this.lineAlpha,
            l = this.lineThickness,
            m = this.dashLength,
            f = this.fillAlphas,
            n = this.fillColors,
            s = this.negativeLineColor,
            p = this.negativeFillColors,
            r = this.negativeFillAlphas,
            q = this.baseCoord,
            u = AmCharts.line(g, a, b, this.lineColor, k, l, m, !1, !0);
            h.push(u);
            void 0 !== s && (k = AmCharts.line(g, a, b, s, k, l, m, !1, !0), j.push(k));
            if (0 < f && (k = a.join(";").split(";"), l = b.join(";").split(";"), "serial" == this.chartType && (0 < d.length ? (d.reverse(), e.reverse(), k = a.concat(d), l = b.concat(e)) : this.rotate ? (l.push(l[l.length - 1]), k.push(q), l.push(l[0]), k.push(q), l.push(l[0]), k.push(k[0])) : (k.push(k[k.length - 1]), l.push(q), k.push(k[0]), l.push(q), k.push(a[0]), l.push(l[0]))), a = AmCharts.polygon(g, k, l, n, f, 0, 0, 0, this.gradientRotation), h.push(a), p || void 0 !== s)) isNaN(r) && (r = f),
            p || (p = s),
            g = AmCharts.polygon(g, k, l, p, r, 0, 0, 0, this.gradientRotation),
            j.push(g);
            this.applyMask(j, h)
        }
    },
    applyMask: function(a, b) {
        var d = a.length();
        "serial" == this.chartType && !this.scrollbar && (this.positiveClip(b), 0 < d && this.negativeClip(a))
    },
    drawSmoothedGraph: function(a, b, d, e) {
        if (1 < a.length) {
            var f = this.set,
            g = this.container,
            h = g.set(),
            j = g.set();
            f.push(h);
            f.push(j);
            var k = this.lineAlpha,
            l = this.lineThickness,
            f = this.dashLength,
            m = this.fillAlphas,
            n = this.fillColors,
            s = this.negativeLineColor,
            p = this.negativeFillColors,
            r = this.negativeFillAlphas,
            q = this.baseCoord,
            u = new AmCharts.Bezier(g, a, b, this.lineColor, k, l, n, 0, f);
            h.push(u.path);
            void 0 !== s && (k = new AmCharts.Bezier(g, a, b, s, k, l, n, 0, f), j.push(k.path));
            if (0 < m && (l = a.join(";").split(";"), u = b.join(";").split(";"), k = "", 0 < d.length ? (d.reverse(), e.reverse(), l = a.concat(d), u = b.concat(e)) : (this.rotate ? (k += " L" + q + "," + b[b.length - 1], k += " L" + q + "," + b[0]) : (k += " L" + a[a.length - 1] + "," + q, k += " L" + a[0] + "," + q), k += " L" + a[0] + "," + b[0]), d = new AmCharts.Bezier(g, l, u, NaN, 0, 0, n, m, f, k), h.push(d.path), p || void 0 !== s)) r || (r = m),
            p || (p = s),
            a = new AmCharts.Bezier(g, a, b, NaN, 0, 0, p, r, f, k),
            j.push(a.path);
            this.applyMask(j, h)
        }
    },
    launchAnimation: function() {
        var a = this,
        b = a.chart.startDuration;
        if (0 < b && !a.animationPlayed) {
            var d = a.set,
            e = a.bulletSet;
            AmCharts.VML || (d.attr({
                opacity: a.startAlpha
            }), e.attr({
                opacity: a.startAlpha
            }));
            d.hide();
            e.hide();
            a.seqAn ? (b = setTimeout(function() {
                a.animateGraphs.call(a)
            },
            1E3 * a.index * b), a.timeOuts.push(b)) : a.animateGraphs()
        }
    },
    animateGraphs: function() {
        var a = this.chart,
        b = this.set,
        d = this.bulletSet,
        e = this.x,
        f = this.y;
        b.show();
        d.show();
        var g = a.startDuration,
        a = a.startEffect;
        b && (this.rotate ? (b.translate( - 1E3, f), d.translate( - 1E3, f)) : (b.translate(e, -1E3), d.translate(e, -1E3)), b.animate({
            opacity: 1,
            translate: e + "," + f
        },
        g, a), d.animate({
            opacity: 1,
            translate: e + "," + f
        },
        g, a))
    },
    animate: function(a) {
        var b = this.chart,
        d = this.container,
        e = this.animationArray; ! a && 0 < e.length && (a = e[0], e.shift());
        d = d[AmCharts.getEffect(b.startEffect)];
        b = b.startDuration;
        a && (this.rotate ? a.animateWidth(b, d) : a.animateHeight(b, d), a.set.show())
    },
    legendKeyColor: function() {
        var a = this.legendColor,
        b = this.lineAlpha;
        void 0 === a && (a = this.lineColor, 0 === b && (b = this.fillColors) && (a = "object" == typeof b ? b[0] : b));
        return a
    },
    legendKeyAlpha: function() {
        var a = this.legendAlpha;
        void 0 === a && (a = this.lineAlpha, 0 === a && this.fillAlphas && (a = this.fillAlphas), 0 === a && (a = this.bulletAlpha), 0 === a && (a = 1));
        return a
    },
    createBullet: function(a, b, d) {
        var e = this.container,
        f = this.bulletOffset,
        g = this.bulletSize;
        isNaN(a.bulletSize) || (g = a.bulletSize);
        if (!isNaN(this.maxValue)) {
            var h = a.values.value;
            isNaN(h) || (g = h / this.maxValue * this.maxBulletSize)
        }
        g < this.minBulletSize && (g = this.minBulletSize);
        this.rotate ? b += f: d -= f;
        var j;
        if ("none" != this.bullet || a.bullet) {
            var k = this.bulletColor;
            a.isNegative && void 0 !== this.bulletColorNegative && (k = this.bulletColorNegative);
            void 0 !== a.color && (k = a.color);
            f = this.bullet;
            a.bullet && (f = a.bullet);
            var h = this.bulletBorderThickness,
            l = this.bulletBorderColor,
            m = this.bulletBorderAlpha,
            n = k,
            s = this.bulletAlpha,
            k = a.alpha;
            isNaN(k) || (s = k);
            k = 0;
            switch (f) {
            case "round":
                j = AmCharts.circle(e, g / 2, n, s, h, l, m);
                break;
            case "square":
                j = AmCharts.polygon(e, [0, g, g, 0], [0, 0, g, g], n, s, h, l, m);
                b -= g / 2;
                d -= g / 2;
                k = -g / 2;
                break;
            case "triangleUp":
                j = AmCharts.triangle(e, g, 0, n, s, h, l, m);
                break;
            case "triangleDown":
                j = AmCharts.triangle(e, g, 180, n, s, h, l, m);
                break;
            case "triangleLeft":
                j = AmCharts.triangle(e, g, 270, n, s, h, l, m);
                break;
            case "triangleRight":
                j = AmCharts.triangle(e, g, 90, n, s, h, l, m);
                break;
            case "bubble":
                j = AmCharts.circle(e, g / 2, n, s, h, l, m, !0)
            }
        }
        h = f = 0;
        if (this.customBullet || a.customBullet) l = this.customBullet,
        a.customBullet && (l = a.customBullet),
        l && (j && j.remove(), "function" == typeof l ? (j = new l, j.chart = this.chart, a.bulletConfig && (j.availableSpace = d, j.graph = this, a.bulletConfig.minCoord = this.minCoord - d, j.bulletConfig = a.bulletConfig), j.write(e), j = j.set) : (this.chart.path && (l = this.chart.path + l), j = e.image(l, 0, 0, g, g), this.centerCustomBullets && (b -= g / 2, d -= g / 2, f -= g / 2, h -= g / 2)));
        if (j) {
            a.url && j.setAttr("cursor", "pointer");
            if ("serial" == this.chartType && (b - f < k || b - f > this.width || d < -g / 2 || d - h > this.height)) j.remove(),
            j = null;
            j && (this.bulletSet.push(j), j.translate(b, d), this.addListeners(j, a), this.allBullets.push(j))
        }
        return g
    },
    showBullets: function() {
        var a = this.allBullets,
        b;
        for (b = 0; b < a.length; b++) a[b].show()
    },
    hideBullets: function() {
        var a = this.allBullets,
        b;
        for (b = 0; b < a.length; b++) a[b].hide()
    },
    addListeners: function(a, b) {
        var d = this;
        a.mouseover(function() {
            d.handleRollOver(b)
        }).mouseout(function() {
            d.handleRollOut(b)
        }).touchend(function() {
            d.handleRollOver(b)
        }).touchstart(function() {
            d.handleRollOver(b)
        }).click(function() {
            d.handleClick(b)
        }).dblclick(function() {
            d.handleDoubleClick(b)
        }).contextmenu(function() {
            d.handleRightClick(b)
        })
    },
    handleRollOver: function(a) {
        if (a) {
            var b = this.chart,
            d = {
                type: "rollOverGraphItem",
                item: a,
                index: a.index,
                graph: this,
                target: this,
                chart: this.chart
            };
            this.fire("rollOverGraphItem", d);
            b.fire("rollOverGraphItem", d);
            clearTimeout(b.hoverInt);
            d = this.showBalloon;
            b.chartCursor && "serial" == this.chartType && (d = !1, !b.chartCursor.valueBalloonsEnabled && this.showBalloon && (d = !0));
            d && (d = b.formatString(this.balloonText, a, a.graph), d = AmCharts.cleanFromEmpty(d), a = b.getBalloonColor(this, a), b.balloon.showBullet = !1, b.balloon.pointerOrientation = "V", b.showBalloon(d, a, !0))
        }
    },
    handleRollOut: function(a) {
        this.chart.hideBalloon();
        a && (a = {
            type: "rollOutGraphItem",
            item: a,
            index: a.index,
            graph: this,
            target: this,
            chart: this.chart
        },
        this.fire("rollOutGraphItem", a), this.chart.fire("rollOutGraphItem", a))
    },
    handleClick: function(a) {
        if (a) {
            var b = {
                type: "clickGraphItem",
                item: a,
                index: a.index,
                graph: this,
                target: this,
                chart: this.chart
            };
            this.fire("clickGraphItem", b);
            this.chart.fire("clickGraphItem", b);
            AmCharts.getURL(a.url, this.urlTarget)
        }
    },
    handleRightClick: function(a) {
        a && (a = {
            type: "rightClickGraphItem",
            item: a,
            index: a.index,
            graph: this,
            target: this,
            chart: this.chart
        },
        this.fire("rightClickGraphItem", a), this.chart.fire("rightClickGraphItem", a))
    },
    handleDoubleClick: function(a) {
        a && (a = {
            type: "doubleClickGraphItem",
            item: a,
            index: a.index,
            graph: this,
            target: this,
            chart: this.chart
        },
        this.fire("doubleClickGraphItem", a), this.chart.fire("doubleClickGraphItem", a))
    },
    zoom: function(a, b) {
        this.start = a;
        this.end = b;
        this.draw()
    },
    changeOpacity: function(a) {
        var b = this.set;
        b && b.setAttr("opacity", a);
        if (b = this.ownColumns) {
            var d;
            for (d = 0; d < b.length; d++) {
                var e = b[d].set;
                e && e.setAttr("opacity", a)
            }
        } (b = this.bulletSet) && b.setAttr("opacity", a)
    },
    destroy: function() {
        AmCharts.remove(this.set);
        AmCharts.remove(this.bulletSet);
        var a = this.timeOuts;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) clearTimeout(a[b])
        }
        this.timeOuts = []
    }
});
AmCharts.ChartCursor = AmCharts.Class({
    construct: function() {
        this.createEvents("changed", "zoomed", "onHideCursor", "draw", "selected");
        this.enabled = !0;
        this.cursorAlpha = 1;
        this.selectionAlpha = 0.2;
        this.cursorColor = "#CC0000";
        this.categoryBalloonAlpha = 1;
        this.color = "#FFFFFF";
        this.type = "cursor";
        this.zoomed = !1;
        this.zoomable = !0;
        this.pan = !1;
        this.animate = !0;
        this.categoryBalloonDateFormat = "MMM DD, YYYY";
        this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
        this.rolledOver = !1;
        this.cursorPosition = "middle";
        this.bulletsEnabled = this.skipZoomDispatch = !1;
        this.bulletSize = 8;
        this.selectWithoutZooming = this.oneBalloonOnly = !1
    },
    draw: function() {
        var a = this;
        a.destroy();
        var b = a.chart,
        d = b.container;
        a.rotate = b.rotate;
        a.container = d;
        d = d.set();
        d.translate(a.x, a.y);
        a.set = d;
        b.cursorSet.push(d);
        d = new AmCharts.AmBalloon;
        d.chart = b;
        a.categoryBalloon = d;
        d.cornerRadius = 0;
        d.borderThickness = 0;
        d.borderAlpha = 0;
        d.showBullet = !1;
        var e = a.categoryBalloonColor;
        void 0 === e && (e = a.cursorColor);
        d.fillColor = e;
        d.fillAlpha = a.categoryBalloonAlpha;
        d.borderColor = e;
        d.color = a.color;
        a.rotate && (d.pointerOrientation = "H");
        if (a.valueBalloonsEnabled) for (d = 0; d < b.graphs.length; d++) e = new AmCharts.AmBalloon,
        e.chart = b,
        AmCharts.copyProperties(b.balloon, e),
        b.graphs[d].valueBalloon = e;
        "cursor" == a.type ? a.createCursor() : a.createCrosshair();
        a.interval = setInterval(function() {
            a.detectMovement.call(a)
        },
        40)
    },
    updateData: function() {
        var a = this.chart;
        this.data = a.chartData;
        this.firstTime = a.firstTime;
        this.lastTime = a.lastTime
    },
    createCursor: function() {
        var a = this.chart,
        b = this.cursorAlpha,
        d = a.categoryAxis,
        e = d.position,
        f = d.inside,
        g = d.axisThickness,
        h = this.categoryBalloon,
        j, k, l = a.dx,
        m = a.dy,
        n = this.x,
        s = this.y,
        p = this.width,
        r = this.height,
        a = a.rotate,
        q = d.tickLength;
        h.pointerWidth = q;
        a ? (j = [0, p, p + l], k = [0, 0, m]) : (j = [l, 0, 0], k = [m, 0, r]);
        this.line = b = AmCharts.line(this.container, j, k, this.cursorColor, b, 1);
        this.set.push(b);
        a ? (f && (h.pointerWidth = 0), "right" == e ? f ? h.setBounds(n, s + m, n + p + l, s + r + m) : h.setBounds(n + p + l + g, s + m, n + p + 1E3, s + r + m) : f ? h.setBounds(n, s, p + n, r + s) : h.setBounds( - 1E3, -1E3, n - q - g, s + r + 15)) : (h.maxWidth = p, d.parseDates && (q = 0, h.pointerWidth = 0), "top" == e ? f ? h.setBounds(n + l, s + m, p + l + n, r + s) : h.setBounds(n + l, -1E3, p + l + n, s + m - q - g) : f ? h.setBounds(n, s, p + n, r + s - q) : h.setBounds(n, s + r + q + g - 1, n + p, s + r + q + g));
        this.hideCursor()
    },
    createCrosshair: function() {
        var a = this.cursorAlpha,
        b = this.container,
        d = AmCharts.line(b, [0, 0], [0, this.height], this.cursorColor, a, 1),
        a = AmCharts.line(b, [0, this.width], [0, 0], this.cursorColor, a, 1);
        this.set.push(d);
        this.set.push(a);
        this.vLine = d;
        this.hLine = a;
        this.hideCursor()
    },
    detectMovement: function() {
        var a = this.chart;
        if (a.mouseIsOver) {
            var b = a.mouseX - this.x,
            d = a.mouseY - this.y;
            0 < b && b < this.width && 0 < d && d < this.height ? (this.drawing ? this.rolledOver || a.setMouseCursor("crosshair") : this.pan && (this.rolledOver || a.setMouseCursor("move")), this.rolledOver = !0, this.setPosition()) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
        } else this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
    },
    getMousePosition: function() {
        var a, b = this.width,
        d = this.height;
        a = this.chart;
        this.rotate ? (a = a.mouseY - this.y, 0 > a && (a = 0), a > d && (a = d)) : (a = a.mouseX - this.x, 0 > a && (a = 0), a > b && (a = b));
        return a
    },
    updateCrosshair: function() {
        var a = this.chart,
        b = a.mouseX - this.x,
        d = a.mouseY - this.y,
        e = this.vLine,
        f = this.hLine,
        b = AmCharts.fitToBounds(b, 0, this.width),
        d = AmCharts.fitToBounds(d, 0, this.height);
        0 < this.cursorAlpha && (e.show(), f.show(), e.translate(b, 0), f.translate(0, d));
        this.zooming && (a.hideXScrollbar && (b = NaN), a.hideYScrollbar && (d = NaN), this.updateSelectionSize(b, d)); ! a.mouseIsOver && !this.zooming && this.hideCursor()
    },
    updateSelectionSize: function(a, b) {
        AmCharts.remove(this.selection);
        var d = this.selectionPosX,
        e = this.selectionPosY,
        f = 0,
        g = 0,
        h = this.width,
        j = this.height;
        isNaN(a) || (d > a && (f = a, h = d - a), d < a && (f = d, h = a - d), d == a && (f = a, h = 0));
        isNaN(b) || (e > b && (g = b, j = e - b), e < b && (g = e, j = b - e), e == b && (g = b, j = 0));
        0 < h && 0 < j && (d = AmCharts.rect(this.container, h, j, this.cursorColor, this.selectionAlpha), d.translate(f + this.x, g + this.y), this.selection = d)
    },
    arrangeBalloons: function() {
        var a = this.valueBalloons,
        b = this.x,
        d = this.y,
        e = this.height + d;
        a.sort(this.compareY);
        var f;
        for (f = 0; f < a.length; f++) {
            var g = a[f].balloon;
            g.setBounds(b, d, b + this.width, e);
            g.draw();
            e = g.yPos - 3
        }
        this.arrangeBalloons2()
    },
    compareY: function(a, b) {
        return a.yy < b.yy ? 1 : -1
    },
    arrangeBalloons2: function() {
        var a = this.valueBalloons;
        a.reverse();
        var b, d = this.x,
        e, f;
        for (f = 0; f < a.length; f++) {
            var g = a[f].balloon;
            b = g.bottom;
            var h = g.bottom - g.yPos;
            0 < f && b - h < e + 3 && (g.setBounds(d, e + 3, d + this.width, e + h + 3), g.draw());
            g.set && g.set.show();
            e = g.bottom
        }
    },
    showBullets: function() {
        AmCharts.remove(this.allBullets);
        var a = this.container,
        b = a.set();
        this.set.push(b);
        this.set.show();
        this.allBullets = b;
        var b = this.chart.graphs,
        d;
        for (d = 0; d < b.length; d++) {
            var e = b[d];
            if (!e.hidden && e.balloonText) {
                var f = this.data[this.index].axes[e.valueAxis.id].graphs[e.id],
                g = f.y;
                if (!isNaN(g)) {
                    var h, j;
                    h = f.x;
                    this.rotate ? (j = g, g = h) : j = h;
                    e = AmCharts.circle(a, this.bulletSize / 2, this.chart.getBalloonColor(e, f), e.cursorBulletAlpha);
                    e.translate(j, g);
                    this.allBullets.push(e)
                }
            }
        }
    },
    destroy: function() {
        this.clear();
        AmCharts.remove(this.selection);
        this.selection = null;
        var a = this.categoryBalloon;
        a && a.destroy();
        this.destroyValueBalloons();
        AmCharts.remove(this.set)
    },
    clear: function() {
        clearInterval(this.interval)
    },
    destroyValueBalloons: function() {
        var a = this.valueBalloons;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) a[b].balloon.hide()
        }
    },
    zoom: function(a, b, d, e) {
        var f = this.chart;
        this.destroyValueBalloons();
        this.zooming = !1;
        var g;
        this.rotate ? this.selectionPosY = g = f.mouseY: this.selectionPosX = g = f.mouseX;
        this.start = a;
        this.end = b;
        this.startTime = d;
        this.endTime = e;
        this.zoomed = !0;
        var h = f.categoryAxis,
        f = this.rotate;
        g = this.width;
        var j = this.height;
        h.parseDates && !h.equalSpacing ? (a = e - d + h.minDuration(), a = f ? j / a: g / a) : a = f ? j / (b - a) : g / (b - a);
        this.stepWidth = a;
        this.setPosition();
        this.hideCursor()
    },
    hideObj: function(a) {
        a && a.hide()
    },
    hideCursor: function(a) {
        void 0 === a && (a = !0);
        this.hideObj(this.set);
        this.hideObj(this.categoryBalloon);
        this.hideObj(this.line);
        this.hideObj(this.vLine);
        this.hideObj(this.hLine);
        this.hideObj(this.allBullets);
        this.destroyValueBalloons();
        this.selectWithoutZooming || AmCharts.remove(this.selection);
        this.previousIndex = NaN;
        a && this.fire("onHideCursor", {
            type: "onHideCursor",
            chart: this.chart,
            target: this
        });
        this.drawing || this.chart.setMouseCursor("auto")
    },
    setPosition: function(a, b) {
        void 0 === b && (b = !0);
        if ("cursor" == this.type) {
            if (AmCharts.ifArray(this.data)) {
                isNaN(a) && (a = this.getMousePosition());
                if ((a != this.previousMousePosition || !0 === this.zoomed || this.oneBalloonOnly) && !isNaN(a)) {
                    var d = this.chart.categoryAxis.xToIndex(a);
                    if (d != this.previousIndex || this.zoomed || "mouse" == this.cursorPosition || this.oneBalloonOnly) this.updateCursor(d, b),
                    this.zoomed = !1
                }
                this.previousMousePosition = a
            }
        } else this.updateCrosshair()
    },
    updateCursor: function(a, b) {
        var d = this.chart,
        e = d.mouseX - this.x,
        f = d.mouseY - this.y;
        this.drawingNow && (AmCharts.remove(this.drawingLine), this.drawingLine = AmCharts.line(this.container, [this.x + this.drawStartX, this.x + e], [this.y + this.drawStartY, this.y + f], this.cursorColor, 1, 1));
        if (this.enabled) {
            void 0 === b && (b = !0);
            this.index = a;
            var g = d.categoryAxis,
            h = d.dx,
            j = d.dy,
            k = this.x,
            l = this.y,
            m = this.width,
            n = this.height,
            s = this.data[a];
            if (s) {
                var p = s.x[g.id],
                r = d.rotate,
                q = g.inside,
                u = this.stepWidth,
                t = this.categoryBalloon,
                v = this.firstTime,
                w = this.lastTime,
                y = this.cursorPosition,
                x = g.position,
                z = this.zooming,
                C = this.panning,
                I = d.graphs,
                G = g.axisThickness;
                if (d.mouseIsOver || z || C || this.forceShow) if (this.forceShow = !1, C) {
                    var h = this.panClickPos,
                    d = this.panClickEndTime,
                    z = this.panClickStartTime,
                    O = this.panClickEnd,
                    k = this.panClickStart,
                    e = (r ? h - f: h - e) / u;
                    if (!g.parseDates || g.equalSpacing) e = Math.round(e);
                    0 !== e && (h = {
                        type: "zoomed",
                        target: this
                    },
                    h.chart = this.chart, g.parseDates && !g.equalSpacing ? (d + e > w && (e = w - d), z + e < v && (e = v - z), h.start = z + e, h.end = d + e, this.fire(h.type, h)) : O + e >= this.data.length || 0 > k + e || (h.start = k + e, h.end = O + e, this.fire(h.type, h)))
                } else {
                    "start" == y && (p -= g.cellWidth / 2);
                    "mouse" == y && d.mouseIsOver && (p = r ? f - 2 : e - 2);
                    if (r) {
                        if (0 > p) if (z) p = 0;
                        else {
                            this.hideCursor();
                            return
                        }
                        if (p > n + 1) if (z) p = n + 1;
                        else {
                            this.hideCursor();
                            return
                        }
                    } else {
                        if (0 > p) if (z) p = 0;
                        else {
                            this.hideCursor();
                            return
                        }
                        if (p > m) if (z) p = m;
                        else {
                            this.hideCursor();
                            return
                        }
                    }
                    0 < this.cursorAlpha && (v = this.line, r ? v.translate(0, p + j) : v.translate(p, 0), v.show());
                    this.linePos = r ? p + j: p;
                    z && (r ? this.updateSelectionSize(NaN, p) : this.updateSelectionSize(p, NaN));
                    v = !0;
                    z && (v = !1);
                    this.categoryBalloonEnabled && v ? (r ? (q && ("right" == x ? t.setBounds(k, l + j, k + m + h, l + p + j) : t.setBounds(k, l + j, k + m + h, l + p)), "right" == x ? q ? t.setPosition(k + m + h, l + p + j) : t.setPosition(k + m + h + G, l + p + j) : q ? t.setPosition(k, l + p) : t.setPosition(k - G, l + p)) : "top" == x ? q ? t.setPosition(k + p + h, l + j) : t.setPosition(k + p + h, l + j - G + 1) : q ? t.setPosition(k + p, l + n) : t.setPosition(k + p, l + n + G - 1), g.parseDates ? (g = AmCharts.formatDate(s.category, this.categoryBalloonDateFormat), -1 != g.indexOf("fff") && (g = AmCharts.formatMilliseconds(g, s.category)), t.showBalloon(g)) : t.showBalloon(s.category)) : t.hide();
                    I && this.bulletsEnabled && this.showBullets();
                    this.destroyValueBalloons();
                    if (I && this.valueBalloonsEnabled && v && d.balloon.enabled) {
                        this.valueBalloons = v = [];
                        if (this.oneBalloonOnly) {
                            j = Infinity;
                            for (g = 0; g < I.length; g++) u = I[g],
                            u.showBalloon && (!u.hidden && u.balloonText) && (t = s.axes[u.valueAxis.id].graphs[u.id], w = t.y, isNaN(w) || (r ? Math.abs(e - w) < j && (j = Math.abs(e - w), O = u) : Math.abs(f - w) < j && (j = Math.abs(f - w), O = u)));
                            this.mostCloseGraph && (O = this.mostCloseGraph)
                        }
                        for (g = 0; g < I.length; g++) if (u = I[g], !(this.oneBalloonOnly && u != O) && (u.showBalloon && !u.hidden && u.balloonText) && (t = s.axes[u.valueAxis.id].graphs[u.id], w = t.y, !isNaN(w))) {
                            p = t.x;
                            q = !0;
                            if (r) {
                                if (j = w, 0 > p || p > n) q = !1
                            } else if (j = p, p = w, 0 > j || j > m + h) q = !1;
                            q && (q = u.valueBalloon, x = d.getBalloonColor(u, t), q.setBounds(k, l, k + m, l + n), q.pointerOrientation = "H", q.changeColor(x), void 0 !== u.balloonAlpha && (q.fillAlpha = u.balloonAlpha), void 0 !== u.balloonTextColor && (q.color = u.balloonTextColor), q.setPosition(j + k, p + l), u = d.formatString(u.balloonText, t, u), "" !== u && q.showBalloon(u), !r && q.set && q.set.hide(), v.push({
                                yy: w,
                                balloon: q
                            }))
                        }
                        r || this.arrangeBalloons()
                    }
                    b ? (h = {
                        type: "changed"
                    },
                    h.index = a, h.target = this, h.chart = this.chart, h.zooming = z, h.mostCloseGraph = O, h.position = r ? f: e, h.target = this, d.fire("changed", h), this.fire("changed", h), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, d.updateLegendValues(a));
                    this.previousIndex = a
                }
            }
        } else this.hideCursor()
    },
    enableDrawing: function(a) {
        this.enabled = !a;
        this.hideCursor();
        this.rolledOver = !1;
        this.drawing = a
    },
    isZooming: function(a) {
        a && a != this.zooming && this.handleMouseDown("fake"); ! a && a != this.zooming && this.handleMouseUp()
    },
    handleMouseOut: function() {
        if (this.enabled) if (this.zooming) this.setPosition();
        else {
            this.index = void 0;
            var a = {
                type: "changed",
                index: void 0,
                target: this
            };
            a.chart = this.chart;
            this.fire("changed", a);
            this.hideCursor()
        }
    },
    handleReleaseOutside: function() {
        this.handleMouseUp()
    },
    handleMouseUp: function() {
        var a = this.chart,
        b = this.data,
        d;
        if (a) {
            var e = a.mouseX - this.x,
            f = a.mouseY - this.y;
            if (this.drawingNow) {
                this.drawingNow = !1;
                AmCharts.remove(this.drawingLine);
                d = this.drawStartX;
                var g = this.drawStartY;
                if (2 < Math.abs(d - e) || 2 < Math.abs(g - f)) d = {
                    type: "draw",
                    target: this,
                    chart: a,
                    initialX: d,
                    initialY: g,
                    finalX: e,
                    finalY: f
                },
                this.fire(d.type, d)
            }
            if (this.enabled && 0 < b.length) {
                if (this.pan) this.rolledOver = !1;
                else if (this.zoomable && this.zooming) {
                    d = this.selectWithoutZooming ? {
                        type: "selected"
                    }: {
                        type: "zoomed"
                    };
                    d.target = this;
                    d.chart = a;
                    if ("cursor" == this.type) this.rotate ? this.selectionPosY = f: this.selectionPosX = f = e,
                    2 > Math.abs(f - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (d.end = this.fromIndex, d.start = this.index) : (d.end = this.index, d.start = this.fromIndex), f = a.categoryAxis, f.parseDates && !f.equalSpacing && (d.start = b[d.start].time, d.end = a.getEndTime(b[d.end].time)), this.skipZoomDispatch || this.fire(d.type, d));
                    else {
                        var h = this.initialMouseX,
                        j = this.initialMouseY;
                        3 > Math.abs(e - h) && 3 > Math.abs(f - j) || (b = Math.min(h, e), g = Math.min(j, f), e = Math.abs(h - e), f = Math.abs(j - f), a.hideXScrollbar && (b = 0, e = this.width), a.hideYScrollbar && (g = 0, f = this.height), d.selectionHeight = f, d.selectionWidth = e, d.selectionY = g, d.selectionX = b, this.skipZoomDispatch || this.fire(d.type, d))
                    }
                    this.selectWithoutZooming || AmCharts.remove(this.selection)
                }
                this.panning = this.zooming = this.skipZoomDispatch = !1
            }
        }
    },
    showCursorAt: function(a) {
        var b = this.chart.categoryAxis;
        a = b.parseDates ? b.dateToCoordinate(a) : b.categoryToCoordinate(a);
        this.previousMousePosition = NaN;
        this.forceShow = !0;
        this.setPosition(a, !1)
    },
    handleMouseDown: function(a) {
        if (this.zoomable || this.pan || this.drawing) {
            var b = this.rotate,
            d = this.chart,
            e = d.mouseX - this.x,
            f = d.mouseY - this.y;
            if (0 < e && e < this.width && 0 < f && f < this.height || "fake" == a) this.setPosition(),
            this.selectWithoutZooming && AmCharts.remove(this.selection),
            this.drawing ? (this.drawStartY = f, this.drawStartX = e, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, d.setMouseCursor("move"), this.panning = !0, this.panClickPos = b ? f: e, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, b ? (this.initialMouse = f, this.selectionPosY = this.linePos) : (this.initialMouse = e, this.selectionPosX = this.linePos)) : (this.initialMouseX = e, this.initialMouseY = f, this.selectionPosX = e, this.selectionPosY = f), this.zooming = !0)
        }
    }
});
AmCharts.SimpleChartScrollbar = AmCharts.Class({
    construct: function() {
        this.createEvents("zoomed");
        this.backgroundColor = "#D4D4D4";
        this.backgroundAlpha = 1;
        this.selectedBackgroundColor = "#EFEFEF";
        this.scrollDuration = this.selectedBackgroundAlpha = 1;
        this.resizeEnabled = !0;
        this.hideResizeGrips = !1;
        this.scrollbarHeight = 20;
        this.updateOnReleaseOnly = !1;
        9 > document.documentMode && (this.updateOnReleaseOnly = !0);
        this.dragIconWidth = 11;
        this.dragIconHeight = 18
    },
    draw: function() {
        var a = this;
        a.destroy();
        a.interval = setInterval(function() {
            a.updateScrollbar.call(a)
        },
        40);
        var b = a.chart.container,
        d = a.rotate,
        e = a.chart,
        f = b.set();
        a.set = f;
        e.scrollbarsSet.push(f);
        var g, h;
        d ? (g = a.scrollbarHeight, h = e.plotAreaHeight) : (h = a.scrollbarHeight, g = e.plotAreaWidth);
        a.width = g;
        if ((a.height = h) && g) {
            var j = AmCharts.rect(b, g, h, a.backgroundColor, a.backgroundAlpha);
            a.bg = j;
            f.push(j);
            j = AmCharts.rect(b, g, h, "#000", 0.005);
            f.push(j);
            a.invisibleBg = j;
            j.click(function() {
                a.handleBgClick()
            }).mouseover(function() {
                a.handleMouseOver()
            }).mouseout(function() {
                a.handleMouseOut()
            }).touchend(function() {
                a.handleBgClick()
            });
            j = AmCharts.rect(b, g, h, a.selectedBackgroundColor, a.selectedBackgroundAlpha);
            a.selectedBG = j;
            f.push(j);
            g = AmCharts.rect(b, g, h, "#000", 0.005);
            a.dragger = g;
            f.push(g);
            g.mousedown(function(b) {
                a.handleDragStart(b)
            }).mouseup(function() {
                a.handleDragStop()
            }).mouseover(function() {
                a.handleDraggerOver()
            }).mouseout(function() {
                a.handleMouseOut()
            }).touchstart(function(b) {
                a.handleDragStart(b)
            }).touchend(function() {
                a.handleDragStop()
            });
            g = e.pathToImages;
            d ? (j = g + "dragIconH.gif", g = a.dragIconWidth, d = a.dragIconHeight) : (j = g + "dragIcon.gif", d = a.dragIconWidth, g = a.dragIconHeight);
            h = b.image(j, 0, 0, d, g);
            var j = b.image(j, 0, 0, d, g),
            k = 10,
            l = 20;
            e.panEventsEnabled && (k = 25, l = a.scrollbarHeight);
            var m = AmCharts.rect(b, k, l, "#000", 0.005),
            n = AmCharts.rect(b, k, l, "#000", 0.005);
            n.translate( - (k - d) / 2, -(l - g) / 2);
            m.translate( - (k - d) / 2, -(l - g) / 2);
            d = b.set([h, n]);
            b = b.set([j, m]);
            a.iconLeft = d;
            f.push(a.iconLeft);
            a.iconRight = b;
            f.push(b);
            d.mousedown(function() {
                a.leftDragStart()
            }).mouseup(function() {
                a.leftDragStop()
            }).mouseover(function() {
                a.iconRollOver()
            }).mouseout(function() {
                a.iconRollOut()
            }).touchstart(function() {
                a.leftDragStart()
            }).touchend(function() {
                a.leftDragStop()
            });
            b.mousedown(function() {
                a.rightDragStart()
            }).mouseup(function() {
                a.rightDragStop()
            }).mouseover(function() {
                a.iconRollOver()
            }).mouseout(function() {
                a.iconRollOut()
            }).touchstart(function() {
                a.rightDragStart()
            }).touchend(function() {
                a.rightDragStop()
            });
            AmCharts.ifArray(e.chartData) ? f.show() : f.hide();
            a.hideDragIcons()
        }
        f.translate(a.x, a.y);
        a.clipDragger(!1)
    },
    updateScrollbarSize: function(a, b) {
        var d = this.dragger,
        e, f, g, h;
        this.rotate ? (e = 0, f = a, g = this.width + 1, h = b - a, d.setAttr("height", b - a), d.setAttr("y", f)) : (e = a, f = 0, g = b - a, h = this.height + 1, d.setAttr("width", b - a), d.setAttr("x", e));
        this.clipAndUpdate(e, f, g, h)
    },
    updateScrollbar: function() {
        var a, b = !1,
        d, e, f = this.x,
        g = this.y,
        h = this.dragger,
        j = this.getDBox();
        d = j.x + f;
        e = j.y + g;
        var k = j.width,
        j = j.height,
        l = this.rotate,
        m = this.chart,
        n = this.width,
        s = this.height,
        p = m.mouseX,
        r = m.mouseY;
        a = this.initialMouse;
        m.mouseIsOver && (this.dragging && (m = this.initialCoord, l ? (a = m + (r - a), 0 > a && (a = 0), m = s - j, a > m && (a = m), h.setAttr("y", a)) : (a = m + (p - a), 0 > a && (a = 0), m = n - k, a > m && (a = m), h.setAttr("x", a))), this.resizingRight && (l ? (a = r - e, a + e > s + g && (a = s - e + g), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = 0.1), h.setAttr("height", a))) : (a = p - d, a + d > n + f && (a = n - d + f), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = 0.1), h.setAttr("width", a)))), this.resizingLeft && (l ? (d = e, e = r, e < g && (e = g), e > s + g && (e = s + g), a = !0 === b ? d - e: j + d - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("y", d + j - g)) : (0 === a && (a = 0.1), h.setAttr("y", e - g), h.setAttr("height", a))) : (e = p, e < f && (e = f), e > n + f && (e = n + f), a = !0 === b ? d - e: k + d - e, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("x", d + k - f)) : (0 === a && (a = 0.1), h.setAttr("x", e - f), h.setAttr("width", a)))), this.clipDragger(!0))
    },
    clipDragger: function(a) {
        var b = this.getDBox(),
        d = b.x,
        e = b.y,
        f = b.width,
        b = b.height,
        g = !1;
        if (this.rotate) {
            if (d = 0, f = this.width + 1, this.clipY != e || this.clipH != b) g = !0
        } else if (e = 0, b = this.height + 1, this.clipX != d || this.clipW != f) g = !0;
        g && (this.clipAndUpdate(d, e, f, b), a && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
    },
    maskGraphs: function() {},
    clipAndUpdate: function(a, b, d, e) {
        this.clipX = a;
        this.clipY = b;
        this.clipW = d;
        this.clipH = e;
        this.selectedBG.clipRect(a, b, d, e);
        this.updateDragIconPositions();
        this.maskGraphs(a, b, d, e)
    },
    dispatchScrollbarEvent: function() {
        if (this.skipEvent) this.skipEvent = !1;
        else {
            var a = this.chart;
            a.hideBalloon();
            var b = this.getDBox(),
            d = b.x,
            e = b.y,
            f = b.width,
            b = b.height;
            this.rotate ? (d = e, f = this.height / b) : f = this.width / f;
            a = {
                type: "zoomed",
                position: d,
                chart: a,
                target: this,
                multiplier: f
            };
            this.fire(a.type, a)
        }
    },
    updateDragIconPositions: function() {
        var a = this.getDBox(),
        b = a.x,
        d = a.y,
        e = this.iconLeft,
        f = this.iconRight,
        g,
        h,
        j = this.scrollbarHeight;
        this.rotate ? (g = this.dragIconWidth, h = this.dragIconHeight, e.translate((j - h) / 2, d - g / 2), f.translate((j - h) / 2, d + a.height - g / 2)) : (g = this.dragIconHeight, h = this.dragIconWidth, e.translate(b - h / 2, (j - g) / 2), f.translate(b + -h / 2 + a.width, (j - g) / 2))
    },
    showDragIcons: function() {
        this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
    },
    hideDragIcons: function() { ! this.resizingLeft && (!this.resizingRight && !this.dragging) && (this.hideResizeGrips && (this.iconLeft.hide(), this.iconRight.hide()), this.removeCursors())
    },
    removeCursors: function() {
        this.chart.setMouseCursor("auto")
    },
    relativeZoom: function(a, b) {
        this.dragger.stop();
        this.multiplier = a;
        this.position = b;
        this.updateScrollbarSize(b, this.rotate ? b + this.height / a: b + this.width / a)
    },
    destroy: function() {
        this.clear();
        AmCharts.remove(this.set)
    },
    clear: function() {
        clearInterval(this.interval)
    },
    handleDragStart: function() {
        var a = this.chart;
        this.dragger.stop();
        this.removeCursors();
        this.dragging = !0;
        var b = this.getDBox();
        this.rotate ? (this.initialCoord = b.y, this.initialMouse = a.mouseY) : (this.initialCoord = b.x, this.initialMouse = a.mouseX)
    },
    handleDragStop: function() {
        this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent());
        this.dragging = !1;
        this.mouseIsOver && this.removeCursors();
        this.updateScrollbar()
    },
    handleDraggerOver: function() {
        this.handleMouseOver()
    },
    leftDragStart: function() {
        this.dragger.stop();
        this.resizingLeft = !0
    },
    leftDragStop: function() {
        this.resizingLeft = !1;
        this.mouseIsOver || this.removeCursors();
        this.updateOnRelease()
    },
    rightDragStart: function() {
        this.dragger.stop();
        this.resizingRight = !0
    },
    rightDragStop: function() {
        this.resizingRight = !1;
        this.mouseIsOver || this.removeCursors();
        this.updateOnRelease()
    },
    iconRollOut: function() {
        this.removeCursors()
    },
    iconRollOver: function() {
        this.rotate ? this.chart.setMouseCursor("n-resize") : this.chart.setMouseCursor("e-resize");
        this.handleMouseOver()
    },
    getDBox: function() {
        return this.dragger.getBBox()
    },
    handleBgClick: function() {
        if (!this.resizingRight && !this.resizingLeft) {
            this.zooming = !0;
            var a, b, d = this.scrollDuration,
            e = this.dragger;
            a = this.getDBox();
            var f = a.height,
            g = a.width;
            b = this.chart;
            var h = this.y,
            j = this.x,
            k = this.rotate;
            k ? (a = "y", b = b.mouseY - f / 2 - h, b = AmCharts.fitToBounds(b, 0, this.height - f)) : (a = "x", b = b.mouseX - g / 2 - j, b = AmCharts.fitToBounds(b, 0, this.width - g));
            this.updateOnReleaseOnly ? (this.skipEvent = !1, e.setAttr(a, b), this.dispatchScrollbarEvent(), this.clipDragger()) : (b = Math.round(b), k ? e.animate({
                y: b
            },
            d, ">") : e.animate({
                x: b
            },
            d, ">"))
        }
    },
    updateOnRelease: function() {
        this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent())
    },
    handleReleaseOutside: function() {
        if (this.set) {
            if (this.resizingLeft || this.resizingRight || this.dragging) this.updateOnRelease(),
            this.removeCursors();
            this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1;
            this.hideDragIcons();
            this.updateScrollbar()
        }
    },
    handleMouseOver: function() {
        this.mouseIsOver = !0;
        this.showDragIcons()
    },
    handleMouseOut: function() {
        this.mouseIsOver = !1;
        this.hideDragIcons()
    }
});
AmCharts.ChartScrollbar = AmCharts.Class({
    inherits: AmCharts.SimpleChartScrollbar,
    construct: function() {
        AmCharts.ChartScrollbar.base.construct.call(this);
        this.graphLineColor = "#BBBBBB";
        this.graphLineAlpha = 0;
        this.graphFillColor = "#BBBBBB";
        this.graphFillAlpha = 1;
        this.selectedGraphLineColor = "#888888";
        this.selectedGraphLineAlpha = 0;
        this.selectedGraphFillColor = "#888888";
        this.selectedGraphFillAlpha = 1;
        this.gridCount = 0;
        this.gridColor = "#FFFFFF";
        this.gridAlpha = 0.7;
        this.skipEvent = this.autoGridCount = !1;
        this.color = "#FFFFFF";
        this.scrollbarCreated = !1
    },
    init: function() {
        var a = this.categoryAxis,
        b = this.chart;
        a || (this.categoryAxis = a = new AmCharts.CategoryAxis);
        a.chart = b;
        a.id = "scrollbar";
        a.dateFormats = b.categoryAxis.dateFormats;
        a.boldPeriodBeginning = b.categoryAxis.boldPeriodBeginning;
        a.axisItemRenderer = AmCharts.RecItem;
        a.axisRenderer = AmCharts.RecAxis;
        a.guideFillRenderer = AmCharts.RecFill;
        a.inside = !0;
        a.fontSize = this.fontSize;
        a.tickLength = 0;
        a.axisAlpha = 0;
        this.graph && (a = this.valueAxis, a || (this.valueAxis = a = new AmCharts.ValueAxis, a.visible = !1, a.scrollbar = !0, a.axisItemRenderer = AmCharts.RecItem, a.axisRenderer = AmCharts.RecAxis, a.guideFillRenderer = AmCharts.RecFill, a.labelsEnabled = !1, a.chart = b), b = this.unselectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.unselectedGraph = b, b.negativeBase = this.graph.negativeBase), b = this.selectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.selectedGraph = b, b.negativeBase = this.graph.negativeBase));
        this.scrollbarCreated = !0
    },
    draw: function() {
        var a = this;
        AmCharts.ChartScrollbar.base.draw.call(a);
        a.scrollbarCreated || a.init();
        var b = a.chart,
        d = b.chartData,
        e = a.categoryAxis,
        f = a.rotate,
        g = a.x,
        h = a.y,
        j = a.width,
        k = a.height,
        l = b.categoryAxis,
        m = a.set;
        e.setOrientation(!f);
        e.parseDates = l.parseDates;
        e.rotate = f;
        e.equalSpacing = l.equalSpacing;
        e.minPeriod = l.minPeriod;
        e.startOnAxis = l.startOnAxis;
        e.viW = j;
        e.viH = k;
        e.width = j;
        e.height = k;
        e.gridCount = a.gridCount;
        e.gridColor = a.gridColor;
        e.gridAlpha = a.gridAlpha;
        e.color = a.color;
        e.autoGridCount = a.autoGridCount;
        e.parseDates && !e.equalSpacing && e.timeZoom(b.firstTime, b.lastTime);
        e.zoom(0, d.length - 1);
        if (l = a.graph) {
            var n = a.valueAxis,
            s = l.valueAxis;
            n.id = s.id;
            n.rotate = f;
            n.setOrientation(f);
            n.width = j;
            n.height = k;
            n.viW = j;
            n.viH = k;
            n.dataProvider = d;
            n.reversed = s.reversed;
            n.logarithmic = s.logarithmic;
            n.gridAlpha = 0;
            n.axisAlpha = 0;
            m.push(n.set);
            f ? n.y = h: n.x = g;
            var g = Infinity,
            h = -Infinity,
            p;
            for (p = 0; p < d.length; p++) {
                var r = d[p].axes[s.id].graphs[l.id].values,
                q;
                for (q in r) if (r.hasOwnProperty(q) && "percents" != q && "total" != q) {
                    var u = r[q];
                    u < g && (g = u);
                    u > h && (h = u)
                }
            }
            Infinity != g && (n.minimum = g); - Infinity != h && (n.maximum = h + 0.1 * (h - g));
            g == h && (n.minimum -= 1, n.maximum += 1);
            n.zoom(0, d.length - 1);
            q = a.unselectedGraph;
            q.id = l.id;
            q.rotate = f;
            q.chart = b;
            q.chartType = b.chartType;
            q.data = d;
            q.valueAxis = n;
            q.chart = l.chart;
            q.categoryAxis = a.categoryAxis;
            q.valueField = l.valueField;
            q.openField = l.openField;
            q.closeField = l.closeField;
            q.highField = l.highField;
            q.lowField = l.lowField;
            q.lineAlpha = a.graphLineAlpha;
            q.lineColor = a.graphLineColor;
            q.fillAlphas = a.graphFillAlpha;
            q.fillColors = a.graphFillColor;
            q.connect = l.connect;
            q.hidden = l.hidden;
            q.width = j;
            q.height = k;
            s = a.selectedGraph;
            s.id = l.id;
            s.rotate = f;
            s.chart = b;
            s.chartType = b.chartType;
            s.data = d;
            s.valueAxis = n;
            s.chart = l.chart;
            s.categoryAxis = e;
            s.valueField = l.valueField;
            s.openField = l.openField;
            s.closeField = l.closeField;
            s.highField = l.highField;
            s.lowField = l.lowField;
            s.lineAlpha = a.selectedGraphLineAlpha;
            s.lineColor = a.selectedGraphLineColor;
            s.fillAlphas = a.selectedGraphFillAlpha;
            s.fillColors = a.selectedGraphFillColor;
            s.connect = l.connect;
            s.hidden = l.hidden;
            s.width = j;
            s.height = k;
            b = a.graphType;
            b || (b = l.type);
            q.type = b;
            s.type = b;
            d = d.length - 1;
            q.zoom(0, d);
            s.zoom(0, d);
            s.set.click(function() {
                a.handleBackgroundClick()
            }).mouseover(function() {
                a.handleMouseOver()
            }).mouseout(function() {
                a.handleMouseOut()
            });
            q.set.click(function() {
                a.handleBackgroundClick()
            }).mouseover(function() {
                a.handleMouseOver()
            }).mouseout(function() {
                a.handleMouseOut()
            });
            m.push(q.set);
            m.push(s.set)
        }
        m.push(e.set);
        m.push(e.labelsSet);
        a.bg.toBack();
        a.invisibleBg.toFront();
        a.dragger.toFront();
        a.iconLeft.toFront();
        a.iconRight.toFront()
    },
    timeZoom: function(a, b) {
        this.startTime = a;
        this.endTime = b;
        this.timeDifference = b - a;
        this.skipEvent = !0;
        this.zoomScrollbar()
    },
    zoom: function(a, b) {
        this.start = a;
        this.end = b;
        this.skipEvent = !0;
        this.zoomScrollbar()
    },
    dispatchScrollbarEvent: function() {
        if (this.skipEvent) this.skipEvent = !1;
        else {
            var a = this.chart.chartData,
            b, d, e = this.dragger.getBBox();
            b = e.x;
            d = e.y;
            var f = e.width,
            g = e.height,
            e = this.chart;
            this.rotate ? (b = d, d = g) : d = f;
            f = {
                type: "zoomed",
                target: this
            };
            f.chart = e;
            var g = this.categoryAxis,
            h = this.stepWidth;
            if (g.parseDates && !g.equalSpacing) {
                if (a = e.firstTime, g.minDuration(), e = Math.round(b / h) + a, a = this.dragging ? e + this.timeDifference: Math.round((b + d) / h) + a, e > a && (e = a), e != this.startTime || a != this.endTime) this.startTime = e,
                this.endTime = a,
                f.start = e,
                f.end = a,
                f.startDate = new Date(e),
                f.endDate = new Date(a),
                this.fire(f.type, f)
            } else if (g.startOnAxis || (b += h / 2), d -= this.stepWidth / 2, e = g.xToIndex(b), b = g.xToIndex(b + d), e != this.start || this.end != b) g.startOnAxis && (this.resizingRight && e == b && b++, this.resizingLeft && e == b && (0 < e ? e--:b = 1)),
            this.start = e,
            this.end = this.dragging ? this.start + this.difference: b,
            f.start = this.start,
            f.end = this.end,
            g.parseDates && (a[this.start] && (f.startDate = new Date(a[this.start].time)), a[this.end] && (f.endDate = new Date(a[this.end].time))),
            this.fire(f.type, f)
        }
    },
    zoomScrollbar: function() {
        var a, b;
        a = this.chart;
        var d = a.chartData,
        e = this.categoryAxis;
        e.parseDates && !e.equalSpacing ? (d = e.stepWidth, e = a.firstTime, a = d * (this.startTime - e), b = d * (this.endTime - e)) : (a = d[this.start].x[e.id], b = d[this.end].x[e.id], d = e.stepWidth, e.startOnAxis || (e = d / 2, a -= e, b += e));
        this.stepWidth = d;
        this.updateScrollbarSize(a, b)
    },
    maskGraphs: function(a, b, d, e) {
        var f = this.selectedGraph;
        f && f.set.clipRect(a, b, d, e)
    },
    handleDragStart: function() {
        AmCharts.ChartScrollbar.base.handleDragStart.call(this);
        this.difference = this.end - this.start;
        this.timeDifference = this.endTime - this.startTime;
        0 > this.timeDifference && (this.timeDifference = 0)
    },
    handleBackgroundClick: function() {
        AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
        this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
    }
});
AmCharts.circle = function(a, b, d, e, f, g, h, j) {
    if (void 0 == f || 0 === f) f = 1;
    void 0 === g && (g = "#000000");
    void 0 === h && (h = 0);
    e = {
        fill: d,
        stroke: g,
        "fill-opacity": e,
        "stroke-width": f,
        "stroke-opacity": h
    };
    a = a.circle(0, 0, b).attr(e);
    j && a.gradient("radialGradient", [d, AmCharts.adjustLuminosity(d, -0.6)]);
    return a
};
AmCharts.text = function(a, b, d, e, f, g, h, j) {
    g || (g = "middle");
    "right" == g && (g = "end");
    d = {
        fill: d,
        "font-family": e,
        "font-size": f,
        opacity: j
    }; ! 0 === h && (d["font-weight"] = "bold");
    d["text-anchor"] = g;
    return a.text(b, d)
};
AmCharts.polygon = function(a, b, d, e, f, g, h, j, k) {
    isNaN(g) && (g = 0);
    isNaN(j) && (j = f);
    var l = e,
    m = !1;
    "object" == typeof l && 1 < l.length && (m = !0, l = l[0]);
    void 0 === h && (h = l);
    f = {
        fill: l,
        stroke: h,
        "fill-opacity": f,
        "stroke-width": g,
        "stroke-opacity": j
    };
    g = AmCharts.dx;
    h = AmCharts.dy;
    j = Math.round;
    var l = "M" + (j(b[0]) + g) + "," + (j(d[0]) + h),
    n;
    for (n = 1; n < b.length; n++) l += " L" + (j(b[n]) + g) + "," + (j(d[n]) + h);
    a = a.path(l + " Z").attr(f);
    m && a.gradient("linearGradient", e, k);
    return a
};
AmCharts.rect = function(a, b, d, e, f, g, h, j, k, l) {
    isNaN(g) && (g = 0);
    void 0 === k && (k = 0);
    void 0 === l && (l = 270);
    isNaN(f) && (f = 0);
    var m = e,
    n = !1;
    "object" == typeof m && (m = m[0], n = !0);
    void 0 === h && (h = m);
    void 0 === j && (j = f);
    b = Math.round(b);
    d = Math.round(d);
    var s = 0,
    p = 0;
    0 > b && (b = Math.abs(b), s = -b);
    0 > d && (d = Math.abs(d), p = -d);
    s += AmCharts.dx;
    p += AmCharts.dy;
    f = {
        fill: m,
        stroke: h,
        "fill-opacity": f,
        "stroke-opacity": j
    };
    a = a.rect(s, p, b, d, k, g).attr(f);
    n && a.gradient("linearGradient", e, l);
    return a
};
AmCharts.triangle = function(a, b, d, e, f, g, h, j) {
    if (void 0 === g || 0 === g) g = 1;
    void 0 === h && (h = "#000");
    void 0 === j && (j = 0);
    e = {
        fill: e,
        stroke: h,
        "fill-opacity": f,
        "stroke-width": g,
        "stroke-opacity": j
    };
    b /= 2;
    var k;
    0 === d && (k = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
    180 == d && (k = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
    90 == d && (k = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
    270 == d && (k = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
    return a.path(k).attr(e)
};
AmCharts.line = function(a, b, d, e, f, g, h, j, k, l) {
    g = {
        fill: "none",
        "stroke-width": g
    };
    void 0 !== h && 0 < h && (g["stroke-dasharray"] = h);
    isNaN(f) || (g["stroke-opacity"] = f);
    e && (g.stroke = e);
    e = Math.round;
    l && (e = AmCharts.doNothing);
    l = AmCharts.dx;
    f = AmCharts.dy;
    h = "M" + (e(b[0]) + l) + "," + (e(d[0]) + f);
    for (j = 1; j < b.length; j++) h += " L" + (e(b[j]) + l) + "," + (e(d[j]) + f);
    if (AmCharts.VML) return a.path(h, void 0, !0).attr(g);
    k && (h += " M0,0 L0,0");
    return a.path(h).attr(g)
};
AmCharts.doNothing = function(a) {
    return a
};
AmCharts.wedge = function(a, b, d, e, f, g, h, j, k, l, m) {
    var n = Math.round;
    g = n(g);
    h = n(h);
    j = n(j);
    var s = n(h / g * j),
    p = AmCharts.VML,
    r = -359.5 - g / 100; - 359.95 > r && (r = -359.95);
    f <= r && (f = r);
    var q = 1 / 180 * Math.PI,
    r = b + Math.cos(e * q) * j,
    u = d + Math.sin( - e * q) * s,
    t = b + Math.cos(e * q) * g,
    v = d + Math.sin( - e * q) * h,
    w = b + Math.cos((e + f) * q) * g,
    y = d + Math.sin(( - e - f) * q) * h,
    x = b + Math.cos((e + f) * q) * j,
    q = d + Math.sin(( - e - f) * q) * s,
    z = {
        fill: AmCharts.adjustLuminosity(l.fill, -0.2),
        "stroke-opacity": 0
    },
    C = 0;
    180 < Math.abs(f) && (C = 1);
    e = a.set();
    var I;
    p && (r = n(10 * r), t = n(10 * t), w = n(10 * w), x = n(10 * x), u = n(10 * u), v = n(10 * v), y = n(10 * y), q = n(10 * q), b = n(10 * b), k = n(10 * k), d = n(10 * d), g *= 10, h *= 10, j *= 10, s *= 10, 1 > Math.abs(f) && (1 >= Math.abs(w - t) && 1 >= Math.abs(y - v)) && (I = !0));
    f = "";
    if (0 < k) {
        p ? (path = " M" + r + "," + (u + k) + " L" + t + "," + (v + k), I || (path += " A" + (b - g) + "," + (k + d - h) + "," + (b + g) + "," + (k + d + h) + "," + t + "," + (v + k) + "," + w + "," + (y + k)), path += " L" + x + "," + (q + k), 0 < j && (I || (path += " B" + (b - j) + "," + (k + d - s) + "," + (b + j) + "," + (k + d + s) + "," + x + "," + (k + q) + "," + r + "," + (k + u)))) : (path = " M" + r + "," + (u + k) + " L" + t + "," + (v + k), path += " A" + g + "," + h + ",0," + C + ",1," + w + "," + (y + k) + " L" + x + "," + (q + k), 0 < j && (path += " A" + j + "," + s + ",0," + C + ",0," + r + "," + (u + k)));
        path += " Z";
        c = a.path(path, void 0, void 0, "1000,1000").attr(z);
        e.push(c);
        var G = a.path(" M" + r + "," + u + " L" + r + "," + (u + k) + " L" + t + "," + (v + k) + " L" + t + "," + v + " L" + r + "," + u + " Z", void 0, void 0, "1000,1000").attr(z);
        k = a.path(" M" + w + "," + y + " L" + w + "," + (y + k) + " L" + x + "," + (q + k) + " L" + x + "," + q + " L" + w + "," + y + " Z", void 0, void 0, "1000,1000").attr(z);
        e.push(G);
        e.push(k)
    }
    p ? (I || (f = " A" + n(b - g) + "," + n(d - h) + "," + n(b + g) + "," + n(d + h) + "," + n(t) + "," + n(v) + "," + n(w) + "," + n(y)), g = " M" + n(r) + "," + n(u) + " L" + n(t) + "," + n(v) + f + " L" + n(x) + "," + n(q)) : g = " M" + r + "," + u + " L" + t + "," + v + (" A" + g + "," + h + ",0," + C + ",1," + w + "," + y) + " L" + x + "," + q;
    0 < j && (p ? I || (g += " B" + (b - j) + "," + (d - s) + "," + (b + j) + "," + (d + s) + "," + x + "," + q + "," + r + "," + u) : g += " A" + j + "," + s + ",0," + C + ",0," + r + "," + u);
    a = a.path(g + " Z", void 0, void 0, "1000,1000").attr(l);
    if (m) {
        b = [];
        for (d = 0; d < m.length; d++) b.push(AmCharts.adjustLuminosity(l.fill, m[d]));
        0 < b.length && a.gradient("linearGradient", b)
    }
    e.push(a);
    return e
};
AmCharts.adjustLuminosity = function(a, b) {
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
    b = b || 0;
    var d = "#",
    e, f;
    for (f = 0; 3 > f; f++) e = parseInt(a.substr(2 * f, 2), 16),
    e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16),
    d += ("00" + e).substr(e.length);
    return d
};
AmCharts.AmPieChart = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function() {
        this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice");
        AmCharts.AmPieChart.base.construct.call(this);
        this.colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");
        this.pieAlpha = 1;
        this.pieBrightnessStep = 30;
        this.groupPercent = 0;
        this.groupedTitle = "Other";
        this.groupedPulled = !1;
        this.groupedAlpha = 1;
        this.marginLeft = 0;
        this.marginBottom = this.marginTop = 10;
        this.marginRight = 0;
        this.minRadius = 10;
        this.hoverAlpha = 1;
        this.depth3D = 0;
        this.startAngle = 90;
        this.angle = this.innerRadius = 0;
        this.outlineColor = "#FFFFFF";
        this.outlineAlpha = 0;
        this.outlineThickness = 1;
        this.startRadius = "500%";
        this.startDuration = this.startAlpha = 1;
        this.startEffect = "bounce";
        this.sequencedAnimation = !1;
        this.pullOutRadius = "20%";
        this.pullOutDuration = 1;
        this.pullOutEffect = "bounce";
        this.pullOnHover = this.pullOutOnlyOne = !1;
        this.labelsEnabled = !0;
        this.labelRadius = 30;
        this.labelTickColor = "#000000";
        this.labelTickAlpha = 0.2;
        this.labelText = "[[title]]: [[percents]]%";
        this.hideLabelsPercent = 0;
        this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]";
        this.urlTarget = "_self";
        this.previousScale = 1;
        this.autoMarginOffset = 10;
        this.gradientRatio = []
    },
    initChart: function() {
        AmCharts.AmPieChart.base.initChart.call(this);
        this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.legend && this.legend.setData(this.chartData));
        this.drawChart()
    },
    handleLegendEvent: function(a) {
        var b = a.type;
        if (a = a.dataItem) {
            var d = a.hidden;
            switch (b) {
            case "clickMarker":
                d || this.clickSlice(a);
                break;
            case "clickLabel":
                d || this.clickSlice(a);
                break;
            case "rollOverItem":
                d || this.rollOverSlice(a, !1);
                break;
            case "rollOutItem":
                d || this.rollOutSlice(a);
                break;
            case "hideItem":
                this.hideSlice(a);
                break;
            case "showItem":
                this.showSlice(a)
            }
        }
    },
    invalidateVisibility: function() {
        this.recalculatePercents();
        this.initChart();
        var a = this.legend;
        a && a.invalidateSize()
    },
    drawChart: function() {
        var a = this;
        AmCharts.AmPieChart.base.drawChart.call(a);
        var b = a.chartData;
        if (AmCharts.ifArray(b)) {
            if (0 < a.realWidth && 0 < a.realHeight) {
                AmCharts.VML && (a.startAlpha = 1);
                var d = a.startDuration,
                e = a.container,
                f = a.updateWidth();
                a.realWidth = f;
                var g = a.updateHeight();
                a.realHeight = g;
                var h = AmCharts.toCoordinate,
                j = h(a.marginLeft, f),
                k = h(a.marginRight, f),
                l = h(a.marginTop, g) + a.getTitleHeight(),
                m = h(a.marginBottom, g);
                a.chartDataLabels = [];
                a.ticks = [];
                var n, s, p, r = AmCharts.toNumber(a.labelRadius),
                q = a.measureMaxLabel();
                if (!a.labelText || !a.labelsEnabled) r = q = 0;
                n = void 0 === a.pieX ? (f - j - k) / 2 + j: h(a.pieX, a.realWidth);
                s = void 0 === a.pieY ? (g - l - m) / 2 + l: h(a.pieY, g);
                p = h(a.radius, f, g);
                a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, p);
                p || (f = 0 <= r ? f - j - k - 2 * q: f - j - k, g = g - l - m, p = Math.min(f, g), g < f && (p /= 1 - a.angle / 90, p > f && (p = f)), a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, p), p = 0 <= r ? p - 1.8 * (r + a.pullOutRadiusReal) : p - 1.8 * a.pullOutRadiusReal, p /= 2);
                p < a.minRadius && (p = a.minRadius);
                a.pullOutRadiusReal = h(a.pullOutRadius, p);
                h = h(a.innerRadius, p);
                h >= p && (h = p - 1);
                g = AmCharts.fitToBounds(a.startAngle, 0, 360);
                0 < a.depth3D && (g = 270 <= g ? 270 : 90);
                l = p - p * a.angle / 90;
                for (m = 0; m < b.length; m++) if (f = b[m], !0 !== f.hidden && 0 < f.percents) {
                    var k = 360 * -f.percents / 100,
                    q = Math.cos((g + k / 2) / 180 * Math.PI),
                    u = Math.sin(( - g - k / 2) / 180 * Math.PI) * (l / p),
                    j = {
                        fill: f.color,
                        stroke: a.outlineColor,
                        "stroke-width": a.outlineThickness,
                        "stroke-opacity": a.outlineAlpha
                    };
                    f.url && (j.cursor = "pointer");
                    j = AmCharts.wedge(e, n, s, g, k, p, l, h, a.depth3D, j, a.gradientRatio);
                    a.addEventListeners(j, f);
                    f.startAngle = g;
                    b[m].wedge = j;
                    if (0 < d) {
                        var t = a.startAlpha;
                        a.chartCreated && (t = f.alpha);
                        j.setAttr("opacity", t)
                    }
                    f.ix = q;
                    f.iy = u;
                    f.wedge = j;
                    f.index = m;
                    if (a.labelsEnabled && a.labelText && f.percents >= a.hideLabelsPercent) {
                        var v = g + k / 2;
                        0 >= v && (v += 360);
                        k = r;
                        isNaN(f.labelRadius) || (k = f.labelRadius);
                        var q = n + q * (p + k),
                        u = s + u * (p + k),
                        w,
                        t = 0;
                        if (0 <= k) {
                            var y;
                            90 >= v && 0 <= v ? (y = 0, w = "start", t = 8) : 360 >= v && 270 < v ? (y = 1, w = "start", t = 8) : 270 >= v && 180 < v ? (y = 2, w = "end", t = -8) : 180 >= v && 90 < v && (y = 3, w = "end", t = -8);
                            f.labelQuarter = y
                        } else w = "middle";
                        var v = a.formatString(a.labelText, f),
                        x = f.labelColor;
                        void 0 == x && (x = a.color);
                        v = AmCharts.text(e, v, x, a.fontFamily, a.fontSize, w);
                        v.translate(q + 1.5 * t, u);
                        f.tx = q + 1.5 * t;
                        f.ty = u;
                        0 <= k ? j.push(v) : a.freeLabelsSet.push(v);
                        f.label = v;
                        a.chartDataLabels[m] = v;
                        f.tx = q;
                        f.tx2 = q + t
                    }
                    a.graphsSet.push(j); (0 === f.alpha || 0 < d && !a.chartCreated) && j.hide();
                    g -= 360 * f.percents / 100;
                    0 >= g && (g += 360)
                }
                b = setTimeout(function() {
                    a.showLabels.call(a)
                },
                1E3 * d);
                a.timeOuts.push(b);
                0 < r && !a.labelRadiusField && a.arrangeLabels();
                a.pieXReal = n;
                a.pieYReal = s;
                a.radiusReal = p;
                a.innerRadiusReal = h;
                0 < r && a.drawTicks();
                a.chartCreated ? a.pullSlices(!0) : (d = setTimeout(function() {
                    a.pullSlices.call(a)
                },
                1200 * d), a.timeOuts.push(d));
                a.chartCreated || a.startSlices();
                a.setDepths()
            } (d = a.legend) && d.invalidateSize()
        } else a.cleanChart();
        a.dispDUpd();
        a.chartCreated = !0
    },
    setDepths: function() {
        var a = this.chartData,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b],
            e = d.wedge,
            d = d.startAngle;
            90 >= d && 0 <= d || 360 >= d && 270 < d ? e.toFront() : (270 >= d && 180 < d || 180 >= d && 90 < d) && e.toBack()
        }
    },
    addEventListeners: function(a, b) {
        var d = this;
        a.mouseover(function() {
            d.rollOverSlice(b, !0)
        }).mouseout(function() {
            d.rollOutSlice(b)
        }).click(function() {
            d.clickSlice(b)
        })
    },
    formatString: function(a, b) {
        a = AmCharts.formatValue(a, b, ["value"], this.numberFormatter, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        a = AmCharts.formatValue(a, b, ["percents"], this.percentFormatter);
        a = AmCharts.massReplace(a, {
            "[[title]]": b.title,
            "[[description]]": b.description,
            "<br>": "\n"
        });
        a = AmCharts.fixNewLines(a);
        return a = AmCharts.cleanFromEmpty(a)
    },
    drawTicks: function() {
        var a = this.chartData,
        b;
        for (b = 0; b < a.length; b++) if (this.chartDataLabels[b]) {
            var d = a[b],
            e = d.ty,
            f = this.radiusReal,
            e = AmCharts.line(this.container, [this.pieXReal + d.ix * f, d.tx, d.tx2], [this.pieYReal + d.iy * f, e, e], this.labelTickColor, this.labelTickAlpha);
            d.wedge.push(e);
            this.ticks[b] = e
        }
    },
    arrangeLabels: function() {
        var a = this.chartData,
        b = a.length,
        d, e;
        for (e = b - 1; 0 <= e; e--) d = a[e],
        0 === d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 0, !0, 0);
        for (e = 0; e < b; e++) d = a[e],
        1 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 1, !1, 0);
        for (e = b - 1; 0 <= e; e--) d = a[e],
        2 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 2, !0, 0);
        for (e = 0; e < b; e++) d = a[e],
        3 == d.labelQuarter && !d.hidden && this.checkOverlapping(e, d, 3, !1, 0)
    },
    checkOverlapping: function(a, b, d, e, f) {
        var g, h, j = this.chartData,
        k = j.length,
        l = b.label;
        if (l) {
            if (!0 === e) for (h = a + 1; h < k; h++)(g = this.checkOverlappingReal(b, j[h], d)) && (h = k);
            else for (h = a - 1; 0 <= h; h--)(g = this.checkOverlappingReal(b, j[h], d)) && (h = 0); ! 0 === g && 100 > f && (g = b.ty + 3 * b.iy, b.ty = g, l.translate(b.tx2, g), this.checkOverlapping(a, b, d, e, f + 1))
        }
    },
    checkOverlappingReal: function(a, b, d) {
        var e = !1,
        f = a.label,
        g = b.label;
        a.labelQuarter == d && (!a.hidden && !b.hidden && g) && (f = f.getBBox(), d = {},
        d.width = f.width, d.height = f.height, d.y = a.ty, d.x = a.tx, a = g.getBBox(), g = {},
        g.width = a.width, g.height = a.height, g.y = b.ty, g.x = b.tx, AmCharts.hitTest(d, g) && (e = !0));
        return e
    },
    startSlices: function() {
        var a;
        for (a = 0; a < this.chartData.length; a++) 0 < this.startDuration && this.sequencedAnimation ? this.setStartTO(a) : this.startSlice(this.chartData[a])
    },
    setStartTO: function(a) {
        var b = this;
        a = setTimeout(function() {
            b.startSequenced.call(b)
        },
        500 * (b.startDuration / b.chartData.length) * a);
        b.timeOuts.push(a)
    },
    pullSlices: function(a) {
        var b = this.chartData,
        d;
        for (d = 0; d < b.length; d++) {
            var e = b[d];
            e.pulled && this.pullSlice(e, 1, a)
        }
    },
    startSequenced: function() {
        var a = this.chartData,
        b;
        for (b = 0; b < a.length; b++) if (!a[b].started) {
            this.startSlice(this.chartData[b]);
            break
        }
    },
    startSlice: function(a) {
        a.started = !0;
        var b = a.wedge,
        d = this.startDuration;
        if (b && 0 < d) {
            0 < a.alpha && b.show();
            var e = AmCharts.toCoordinate(this.startRadius, this.radiusReal);
            b.translate(Math.round(a.ix * e), Math.round(a.iy * e));
            b.animate({
                opacity: a.alpha,
                translate: "0,0"
            },
            d, this.startEffect)
        }
    },
    showLabels: function() {
        var a = this.chartData,
        b;
        for (b = 0; b < a.length; b++) if (0 < a[b].alpha) {
            var d = this.chartDataLabels[b];
            d && d.show(); (d = this.ticks[b]) && d.show()
        }
    },
    showSlice: function(a) {
        isNaN(a) ? a.hidden = !1 : this.chartData[a].hidden = !1;
        this.hideBalloon();
        this.invalidateVisibility()
    },
    hideSlice: function(a) {
        isNaN(a) ? a.hidden = !0 : this.chartData[a].hidden = !0;
        this.hideBalloon();
        this.invalidateVisibility()
    },
    rollOverSlice: function(a, b) {
        isNaN(a) || (a = this.chartData[a]);
        clearTimeout(this.hoverInt);
        this.pullOnHover && this.pullSlice(a, 1);
        var d = this.innerRadiusReal + (this.radiusReal - this.innerRadiusReal) / 2;
        a.pulled && (d += this.pullOutRadiusReal);
        1 > this.hoverAlpha && a.wedge && a.wedge.attr({
            opacity: this.hoverAlpha
        });
        var e = a.ix * d + this.pieXReal,
        d = a.iy * d + this.pieYReal,
        f = this.formatString(this.balloonText, a),
        g = AmCharts.adjustLuminosity(a.color, -0.15);
        this.showBalloon(f, g, b, e, d);
        e = {
            type: "rollOverSlice",
            dataItem: a,
            chart: this
        };
        this.fire(e.type, e)
    },
    rollOutSlice: function(a) {
        isNaN(a) || (a = this.chartData[a]);
        a.wedge && a.wedge.attr({
            opacity: a.alpha
        });
        this.hideBalloon();
        a = {
            type: "rollOutSlice",
            dataItem: a,
            chart: this
        };
        this.fire(a.type, a)
    },
    clickSlice: function(a) {
        isNaN(a) || (a = this.chartData[a]);
        this.hideBalloon();
        a.pulled ? this.pullSlice(a, 0) : this.pullSlice(a, 1);
        AmCharts.getURL(a.url, this.urlTarget);
        a = {
            type: "clickSlice",
            dataItem: a,
            chart: this
        };
        this.fire(a.type, a)
    },
    pullSlice: function(a, b, d) {
        var e = a.ix,
        f = a.iy,
        g = this.pullOutDuration; ! 0 === d && (g = 0);
        d = a.wedge;
        var h = this.pullOutRadiusReal;
        d && d.animate({
            translate: b * e * h + "," + b * f * h
        },
        g, this.pullOutEffect);
        1 == b ? (a.pulled = !0, this.pullOutOnlyOne && this.pullInAll(a.index), a = {
            type: "pullOutSlice",
            dataItem: a,
            chart: this
        }) : (a.pulled = !1, a = {
            type: "pullInSlice",
            dataItem: a,
            chart: this
        });
        this.fire(a.type, a)
    },
    pullInAll: function(a) {
        var b = this.chartData,
        d;
        for (d = 0; d < this.chartData.length; d++) d != a && b[d].pulled && this.pullSlice(b[d], 0)
    },
    pullOutAll: function() {
        var a = this.chartData,
        b;
        for (b = 0; b < a.length; b++) a[b].pulled || this.pullSlice(a[b], 1)
    },
    parseData: function() {
        var a = [];
        this.chartData = a;
        var b = this.dataProvider;
        if (void 0 !== b) {
            var d = b.length,
            e = 0,
            f, g, h;
            for (f = 0; f < d; f++) {
                g = {};
                var j = b[f];
                g.dataContext = j;
                g.value = Number(j[this.valueField]); (h = j[this.titleField]) || (h = "");
                g.title = h;
                g.pulled = AmCharts.toBoolean(j[this.pulledField], !1); (h = j[this.descriptionField]) || (h = "");
                g.description = h;
                g.labelRadius = Number(j[this.labelRadiusField]);
                g.url = j[this.urlField];
                g.visibleInLegend = AmCharts.toBoolean(j[this.visibleInLegendField], !0);
                h = j[this.alphaField];
                g.alpha = void 0 !== h ? Number(h) : this.pieAlpha;
                h = j[this.colorField];
                void 0 !== h && (g.color = AmCharts.toColor(h));
                g.labelColor = AmCharts.toColor(j[this.labelColorField]);
                e += g.value;
                g.hidden = !1;
                a[f] = g
            }
            for (f = b = 0; f < d; f++) g = a[f],
            g.percents = 100 * (g.value / e),
            g.percents < this.groupPercent && b++;
            1 < b && (this.groupValue = 0, this.removeSmallSlices(), a.push({
                title: this.groupedTitle,
                value: this.groupValue,
                percents: 100 * (this.groupValue / e),
                pulled: this.groupedPulled,
                color: this.groupedColor,
                url: this.groupedUrl,
                description: this.groupedDescription,
                alpha: this.groupedAlpha
            }));
            for (f = 0; f < a.length; f++) this.pieBaseColor ? h = AmCharts.adjustLuminosity(this.pieBaseColor, f * this.pieBrightnessStep / 100) : (h = this.colors[f], void 0 === h && (h = AmCharts.randomColor())),
            void 0 === a[f].color && (a[f].color = h);
            this.recalculatePercents()
        }
    },
    recalculatePercents: function() {
        var a = this.chartData,
        b = 0,
        d, e;
        for (d = 0; d < a.length; d++) e = a[d],
        !e.hidden && 0 < e.value && (b += e.value);
        for (d = 0; d < a.length; d++) e = this.chartData[d],
        e.percents = !e.hidden && 0 < e.value ? 100 * e.value / b: 0
    },
    removeSmallSlices: function() {
        var a = this.chartData,
        b;
        for (b = a.length - 1; 0 <= b; b--) a[b].percents < this.groupPercent && (this.groupValue += a[b].value, a.splice(b, 1))
    },
    animateAgain: function() {
        var a = this;
        a.startSlices();
        var b = setTimeout(function() {
            a.pullSlices.call(a)
        },
        1200 * a.startDuration);
        a.timeOuts.push(b)
    },
    measureMaxLabel: function() {
        var a = this.chartData,
        b = 0,
        d;
        for (d = 0; d < a.length; d++) {
            var e = this.formatString(this.labelText, a[d]),
            e = AmCharts.text(this.container, e, this.color, this.fontFamily, this.fontSize),
            f = e.getBBox().width;
            f > b && (b = f);
            e.remove()
        }
        return b
    }
});
AmCharts.AmXYChart = AmCharts.Class({
    inherits: AmCharts.AmRectangularChart,
    construct: function() {
        AmCharts.AmXYChart.base.construct.call(this);
        this.createEvents("zoomed");
        this.maxZoomFactor = 20;
        this.chartType = "xy"
    },
    initChart: function() {
        AmCharts.AmXYChart.base.initChart.call(this);
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        this.updateScrollbar = !0;
        this.drawChart();
        this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins());
        var a = this.marginLeftReal,
        b = this.marginTopReal,
        d = this.plotAreaWidth,
        e = this.plotAreaHeight;
        this.graphsSet.clipRect(a, b, d, e);
        this.bulletSet.clipRect(a, b, d, e);
        this.trendLinesSet.clipRect(a, b, d, e)
    },
    createValueAxes: function() {
        var a = [],
        b = [];
        this.xAxes = a;
        this.yAxes = b;
        var d = this.valueAxes,
        e, f;
        for (f = 0; f < d.length; f++) {
            e = d[f];
            var g = e.position;
            if ("top" == g || "bottom" == g) e.rotate = !0;
            e.setOrientation(e.rotate);
            g = e.orientation;
            "V" == g && b.push(e);
            "H" == g && a.push(e)
        }
        0 === b.length && (e = new AmCharts.ValueAxis, e.rotate = !1, e.setOrientation(!1), d.push(e), b.push(e));
        0 === a.length && (e = new AmCharts.ValueAxis, e.rotate = !0, e.setOrientation(!0), d.push(e), a.push(e));
        for (f = 0; f < d.length; f++) this.processValueAxis(d[f], f);
        a = this.graphs;
        for (f = 0; f < a.length; f++) this.processGraph(a[f], f)
    },
    drawChart: function() {
        AmCharts.AmXYChart.base.drawChart.call(this);
        AmCharts.ifArray(this.chartData) ? (this.chartScrollbar && this.updateScrollbars(), this.zoomChart()) : this.cleanChart();
        if (this.hideXScrollbar) {
            var a = this.scrollbarH;
            a && (this.removeListener(a, "zoomed", this.handleHSBZoom), a.destroy());
            this.scrollbarH = null
        }
        if (this.hideYScrollbar) {
            if (a = this.scrollbarV) this.removeListener(a, "zoomed", this.handleVSBZoom),
            a.destroy();
            this.scrollbarV = null
        }
        if (!this.autoMargins || this.marginsUpdated) this.dispDUpd(),
        this.chartCreated = !0,
        this.zoomScrollbars()
    },
    cleanChart: function() {
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.scrollbarV, this.scrollbarH, this.chartCursor])
    },
    zoomChart: function() {
        this.toggleZoomOutButton();
        this.zoomObjects(this.valueAxes);
        this.zoomObjects(this.graphs);
        this.zoomTrendLines();
        this.dispatchAxisZoom()
    },
    toggleZoomOutButton: function() {
        1 == this.heightMultiplier && 1 == this.widthMultiplier ? this.showZB(!1) : this.showZB(!0)
    },
    dispatchAxisZoom: function() {
        var a = this.valueAxes,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            if (!isNaN(d.min) && !isNaN(d.max)) {
                var e, f;
                "V" == d.orientation ? (e = d.coordinateToValue( - this.verticalPosition), f = d.coordinateToValue( - this.verticalPosition + this.plotAreaHeight)) : (e = d.coordinateToValue( - this.horizontalPosition), f = d.coordinateToValue( - this.horizontalPosition + this.plotAreaWidth));
                if (!isNaN(e) && !isNaN(f)) {
                    if (e > f) {
                        var g = f;
                        f = e;
                        e = g
                    }
                    d.dispatchZoomEvent(e, f)
                }
            }
        }
    },
    zoomObjects: function(a) {
        var b = a.length,
        d;
        for (d = 0; d < b; d++) {
            var e = a[d];
            this.updateObjectSize(e);
            e.zoom(0, this.chartData.length - 1)
        }
    },
    updateData: function() {
        this.parseData();
        var a = this.chartData,
        b = a.length - 1,
        d = this.graphs,
        e = this.dataProvider,
        f = 0,
        g, h;
        for (g = 0; g < d.length; g++) if (h = d[g], h.data = a, h.zoom(0, b), h = h.valueField) {
            var j;
            for (j = 0; j < e.length; j++) {
                var k = e[j][h];
                k > f && (f = k)
            }
        }
        for (g = 0; g < d.length; g++) h = d[g],
        h.maxValue = f;
        if (a = this.chartCursor) a.updateData(),
        a.type = "crosshair",
        a.valueBalloonsEnabled = !1
    },
    zoomOut: function() {
        this.verticalPosition = this.horizontalPosition = 0;
        this.heightMultiplier = this.widthMultiplier = 1;
        this.zoomChart();
        this.zoomScrollbars()
    },
    processValueAxis: function(a) {
        a.chart = this;
        a.minMaxField = "H" == a.orientation ? "x": "y";
        a.minTemp = NaN;
        a.maxTemp = NaN;
        this.listenTo(a, "axisSelfZoomed", this.handleAxisSelfZoom)
    },
    processGraph: function(a) {
        a.xAxis || (a.xAxis = this.xAxes[0]);
        a.yAxis || (a.yAxis = this.yAxes[0])
    },
    parseData: function() {
        AmCharts.AmXYChart.base.parseData.call(this);
        this.chartData = [];
        var a = this.dataProvider,
        b = this.valueAxes,
        d = this.graphs,
        e;
        for (e = 0; e < a.length; e++) {
            var f = {
                axes: {},
                x: {},
                y: {}
            },
            g = a[e],
            h;
            for (h = 0; h < b.length; h++) {
                var j = b[h].id;
                f.axes[j] = {};
                f.axes[j].graphs = {};
                var k;
                for (k = 0; k < d.length; k++) {
                    var l = d[k],
                    m = l.id;
                    if (l.xAxis.id == j || l.yAxis.id == j) {
                        var n = {};
                        n.serialDataItem = f;
                        n.index = e;
                        var s = {},
                        p = Number(g[l.valueField]);
                        isNaN(p) || (s.value = p);
                        p = Number(g[l.xField]);
                        isNaN(p) || (s.x = p);
                        p = Number(g[l.yField]);
                        isNaN(p) || (s.y = p);
                        n.values = s;
                        this.processFields(l, n, g);
                        n.serialDataItem = f;
                        n.graph = l;
                        f.axes[j].graphs[m] = n
                    }
                }
            }
            this.chartData[e] = f
        }
    },
    formatString: function(a, b) {
        var d = b.graph.numberFormatter;
        d || (d = this.numberFormatter);
        a = AmCharts.formatValue(a, b.values, ["value", "x", "y"], d); - 1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));
        return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
    },
    addChartScrollbar: function(a) {
        AmCharts.callMethod("destroy", [this.chartScrollbar, this.scrollbarH, this.scrollbarV]);
        if (a) {
            this.chartScrollbar = a;
            this.scrollbarHeight = a.scrollbarHeight;
            var b = "backgroundColor backgroundAlpha selectedBackgroundColor selectedBackgroundAlpha scrollDuration resizeEnabled hideResizeGrips scrollbarHeight updateOnReleaseOnly".split(" ");
            if (!this.hideYScrollbar) {
                var d = new AmCharts.SimpleChartScrollbar;
                d.skipEvent = !0;
                d.chart = this;
                this.listenTo(d, "zoomed", this.handleVSBZoom);
                AmCharts.copyProperties(a, d, b);
                d.rotate = !0;
                this.scrollbarV = d
            }
            this.hideXScrollbar || (d = new AmCharts.SimpleChartScrollbar, d.skipEvent = !0, d.chart = this, this.listenTo(d, "zoomed", this.handleHSBZoom), AmCharts.copyProperties(a, d, b), d.rotate = !1, this.scrollbarH = d)
        }
    },
    updateTrendLines: function() {
        var a = this.trendLines,
        b;
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            d.chart = this;
            d.valueAxis || (d.valueAxis = this.yAxes[0]);
            d.valueAxisX || (d.valueAxisX = this.xAxes[0])
        }
    },
    updateMargins: function() {
        AmCharts.AmXYChart.base.updateMargins.call(this);
        var a = this.scrollbarV;
        a && (this.getScrollbarPosition(a, !0, this.yAxes[0].position), this.adjustMargins(a, !0));
        if (a = this.scrollbarH) this.getScrollbarPosition(a, !1, this.xAxes[0].position),
        this.adjustMargins(a, !1)
    },
    updateScrollbars: function() {
        var a = this.scrollbarV;
        a && (this.updateChartScrollbar(a, !0), a.draw());
        if (a = this.scrollbarH) this.updateChartScrollbar(a, !1),
        a.draw()
    },
    zoomScrollbars: function() {
        var a = this.scrollbarH;
        a && a.relativeZoom(this.widthMultiplier, -this.horizontalPosition / this.widthMultiplier); (a = this.scrollbarV) && a.relativeZoom(this.heightMultiplier, -this.verticalPosition / this.heightMultiplier)
    },
    fitMultiplier: function(a) {
        a > this.maxZoomFactor && (a = this.maxZoomFactor);
        return a
    },
    handleHSBZoom: function(a) {
        var b = this.fitMultiplier(a.multiplier);
        a = -a.position * b;
        var d = -(this.plotAreaWidth * b - this.plotAreaWidth);
        a < d && (a = d);
        this.widthMultiplier = b;
        this.horizontalPosition = a;
        this.zoomChart()
    },
    handleVSBZoom: function(a) {
        var b = this.fitMultiplier(a.multiplier);
        a = -a.position * b;
        var d = -(this.plotAreaHeight * b - this.plotAreaHeight);
        a < d && (a = d);
        this.heightMultiplier = b;
        this.verticalPosition = a;
        this.zoomChart()
    },
    handleAxisSelfZoom: function(a) {
        if ("H" == a.valueAxis.orientation) {
            var b = this.fitMultiplier(a.multiplier);
            a = -a.position * b;
            var d = -(this.plotAreaWidth * b - this.plotAreaWidth);
            a < d && (a = d);
            this.horizontalPosition = a;
            this.widthMultiplier = b
        } else b = this.fitMultiplier(a.multiplier),
        a = -a.position * b,
        d = -(this.plotAreaHeight * b - this.plotAreaHeight),
        a < d && (a = d),
        this.verticalPosition = a,
        this.heightMultiplier = b;
        this.zoomChart();
        this.zoomScrollbars()
    },
    handleCursorZoom: function(a) {
        var b = this.widthMultiplier * this.plotAreaWidth / a.selectionWidth,
        d = this.heightMultiplier * this.plotAreaHeight / a.selectionHeight,
        b = this.fitMultiplier(b),
        d = this.fitMultiplier(d);
        this.horizontalPosition = (this.horizontalPosition - a.selectionX) * b / this.widthMultiplier;
        this.verticalPosition = (this.verticalPosition - a.selectionY) * d / this.heightMultiplier;
        this.widthMultiplier = b;
        this.heightMultiplier = d;
        this.zoomChart();
        this.zoomScrollbars()
    },
    removeChartScrollbar: function() {
        AmCharts.callMethod("destroy", [this.scrollbarH, this.scrollbarV]);
        this.scrollbarV = this.scrollbarH = null
    },
    handleReleaseOutside: function(a) {
        AmCharts.AmXYChart.base.handleReleaseOutside.call(this, a);
        AmCharts.callMethod("handleReleaseOutside", [this.scrollbarH, this.scrollbarV])
    }
});
AmCharts.AmDraw = AmCharts.Class({
    construct: function(a, b, d) {
        AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
        AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
        AmCharts.hasSVG = !!document.createElementNS && !!document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;
        1 > b && (b = 10);
        1 > d && (d = 10);
        this.div = a;
        this.width = b;
        this.height = d;
        this.rBin = document.createElement("div");
        if (AmCharts.hasSVG) {
            AmCharts.SVG = !0;
            var e = this.createSvgElement("svg");
            e.style.position = "absolute";
            e.style.width = b + "px";
            e.style.height = d + "px";
            e.setAttribute("version", "1.1");
            a.appendChild(e);
            this.container = e;
            this.R = new AmCharts.SVGRenderer(this)
        } else AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = b), this.container = a, this.R = new AmCharts.VMLRenderer(this), this.R.disableSelection(a))
    },
    createSvgElement: function(a) {
        return document.createElementNS(AmCharts.SVG_NS, a)
    },
    circle: function(a, b, d, e) {
        var f = new AmCharts.AmDObject("circle", this);
        f.attr({
            r: d,
            cx: a,
            cy: b
        });
        this.addToContainer(f.node, e);
        return f
    },
    setSize: function(a, b) {
        0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
    },
    rect: function(a, b, d, e, f, g, h) {
        var j = new AmCharts.AmDObject("rect", this);
        AmCharts.VML && (f = 100 * f / Math.min(d, e), d += 2 * g, e += 2 * g, j.bw = g, j.node.style.marginLeft = -g, j.node.style.marginTop = -g);
        1 > d && (d = 1);
        1 > e && (e = 1);
        j.attr({
            x: a,
            y: b,
            width: d,
            height: e,
            rx: f,
            ry: f,
            "stroke-width": g
        });
        this.addToContainer(j.node, h);
        return j
    },
    image: function(a, b, d, e, f, g) {
        var h = new AmCharts.AmDObject("image", this);
        h.attr({
            x: b,
            y: d,
            width: e,
            height: f
        });
        this.R.path(h, a);
        this.addToContainer(h.node, g);
        return h
    },
    addToContainer: function(a, b) {
        b || (b = this.container);
        b.appendChild(a)
    },
    text: function(a, b, d) {
        return this.R.text(a, b, d)
    },
    path: function(a, b, d, e) {
        var f = new AmCharts.AmDObject("path", this);
        e || (e = "100,100");
        f.attr({
            cs: e
        });
        d ? f.attr({
            dd: a
        }) : f.attr({
            d: a
        });
        this.addToContainer(f.node, b);
        return f
    },
    set: function(a) {
        return this.R.set(a)
    },
    remove: function(a) {
        if (a) {
            var b = this.rBin;
            b.appendChild(a);
            b.innerHTML = ""
        }
    },
    bounce: function(a, b, d, e, f) {
        return (b /= f) < 1 / 2.75 ? e * 7.5625 * b * b + d: b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + d: b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + d: e * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + d
    },
    easeInSine: function(a, b, d, e, f) {
        return - e * Math.cos(b / f * (Math.PI / 2)) + e + d
    },
    easeOutSine: function(a, b, d, e, f) {
        return e * Math.sin(b / f * (Math.PI / 2)) + d
    },
    easeOutElastic: function(a, b, d, e, f) {
        a = 1.70158;
        var g = 0,
        h = e;
        if (0 === b) return d;
        if (1 == (b /= f)) return d + e;
        g || (g = 0.3 * f);
        h < Math.abs(e) ? (h = e, a = g / 4) : a = g / (2 * Math.PI) * Math.asin(e / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * f - a) * 2 * Math.PI / g) + e + d
    },
    renderFix: function() {
        var a = this.container,
        b = a.style,
        d;
        try {
            d = a.getScreenCTM() || a.createSVGMatrix()
        } catch(e) {
            d = a.createSVGMatrix()
        }
        a = 1 - d.e % 1;
        d = 1 - d.f % 1;
        0.5 < a && (a -= 1);
        0.5 < d && (d -= 1);
        a && (b.left = a + "px");
        d && (b.top = d + "px")
    }
});
AmCharts.AmDObject = AmCharts.Class({
    construct: function(a, b) {
        this.D = b;
        this.R = b.R;
        this.node = this.R.create(this, a);
        this.y = this.x = 0;
        this.scale = 1
    },
    attr: function(a) {
        this.R.attr(this, a);
        return this
    },
    getAttr: function(a) {
        return this.node.getAttribute(a)
    },
    setAttr: function(a, b) {
        this.R.setAttr(this, a, b);
        return this
    },
    clipRect: function(a, b, d, e) {
        this.R.clipRect(this, a, b, d, e)
    },
    translate: function(a, b, d, e) {
        e || (a = Math.round(a), b = Math.round(b));
        this.R.move(this, a, b, d);
        this.x = a;
        this.y = b;
        this.scale = d;
        this.angle && this.rotate(this.angle)
    },
    rotate: function(a) {
        this.R.rotate(this, a);
        this.angle = a
    },
    animate: function(a, b, d) {
        for (var e in a) if (a.hasOwnProperty(e)) {
            var f = e,
            g = a[e];
            d = AmCharts.getEffect(d);
            this.R.animate(this, f, g, b, d)
        }
    },
    push: function(a) {
        if (a) {
            var b = this.node;
            b.appendChild(a.node);
            var d = a.clipPath;
            d && b.appendChild(d); (a = a.grad) && b.appendChild(a)
        }
    },
    text: function(a) {
        this.R.setText(this, a)
    },
    remove: function() {
        this.R.remove(this)
    },
    clear: function() {
        var a = this.node;
        if (a.hasChildNodes()) for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
    },
    hide: function() {
        this.setAttr("visibility", "hidden")
    },
    show: function() {
        this.setAttr("visibility", "visible")
    },
    getBBox: function() {
        return this.R.getBBox(this)
    },
    toFront: function() {
        var a = this.node;
        if (a) {
            var b = a.parentNode;
            b && b.appendChild(a)
        }
    },
    toBack: function() {
        var a = this.node;
        if (a) {
            var b = a.parentNode;
            if (b) {
                var d = b.firstChild;
                d && b.insertBefore(a, d)
            }
        }
    },
    mouseover: function(a) {
        this.R.addListener(this, "mouseover", a);
        return this
    },
    mouseout: function(a) {
        this.R.addListener(this, "mouseout", a);
        return this
    },
    click: function(a) {
        this.R.addListener(this, "click", a);
        return this
    },
    dblclick: function(a) {
        this.R.addListener(this, "dblclick", a);
        return this
    },
    mousedown: function(a) {
        this.R.addListener(this, "mousedown", a);
        return this
    },
    mouseup: function(a) {
        this.R.addListener(this, "mouseup", a);
        return this
    },
    touchstart: function(a) {
        this.R.addListener(this, "touchstart", a);
        return this
    },
    touchend: function(a) {
        this.R.addListener(this, "touchend", a);
        return this
    },
    contextmenu: function(a) {
        this.node.addEventListener ? this.node.addEventListener("contextmenu", a) : this.R.addListener(this, "contextmenu", a);
        return this
    },
    stop: function() {
        var a = this.animationX;
        a && AmCharts.removeFromArray(this.R.animations, a); (a = this.animationY) && AmCharts.removeFromArray(this.R.animations, a)
    },
    length: function() {
        return this.node.childNodes.length
    },
    gradient: function(a, b, d) {
        this.R.gradient(this, a, b, d)
    }
});
AmCharts.VMLRenderer = AmCharts.Class({
    construct: function(a) {
        this.D = a;
        this.cNames = {
            circle: "oval",
            rect: "roundrect",
            path: "shape"
        };
        this.styleMap = {
            x: "left",
            y: "top",
            width: "width",
            height: "height",
            "font-family": "fontFamily",
            "font-size": "fontSize",
            visibility: "visibility"
        };
        this.animations = []
    },
    create: function(a, b) {
        var d;
        if ("group" == b) d = document.createElement("div"),
        a.type = "div";
        else if ("text" == b) d = document.createElement("div"),
        a.type = "text";
        else if ("image" == b) d = document.createElement("img"),
        a.type = "image";
        else {
            a.type = "shape";
            a.shapeType = this.cNames[b];
            d = document.createElement("amvml:" + this.cNames[b]);
            var e = document.createElement("amvml:stroke");
            d.appendChild(e);
            a.stroke = e;
            var f = document.createElement("amvml:fill");
            d.appendChild(f);
            a.fill = f;
            f.className = "amvml";
            e.className = "amvml";
            d.className = "amvml"
        }
        d.style.position = "absolute";
        d.style.top = 0;
        d.style.left = 0;
        return d
    },
    path: function(a, b) {
        a.node.setAttribute("src", b)
    },
    setAttr: function(a, b, d) {
        if (void 0 !== d) {
            var e;
            8 === document.documentMode && (e = !0);
            var f = a.node,
            g = a.type,
            h = f.style;
            "r" == b && (h.width = 2 * d, h.height = 2 * d);
            if ("roundrect" == a.shapeType && ("width" == b || "height" == b)) d -= 1;
            "cursor" == b && (h.cursor = d);
            "cx" == b && (h.left = d - AmCharts.removePx(h.width) / 2);
            "cy" == b && (h.top = d - AmCharts.removePx(h.height) / 2);
            var j = this.styleMap[b];
            void 0 !== j && (h[j] = d);
            "text" == g && ("text-anchor" == b && (a.anchor = d, j = f.clientWidth, "end" == d && (h.marginLeft = -j + "px"), "middle" == d && (h.marginLeft = -(j / 2) + "px"), "start" == d && (h.marginLeft = "0px")), "fill" == b && (h.color = d), "font-weight" == b && (h.fontWeight = d));
            if (h = a.children) for (j = 0; j < h.length; j++) h[j].setAttr(b, d);
            if ("shape" == g) {
                "cs" == b && (f.style.width = "100px", f.style.height = "100px", f.setAttribute("coordsize", d));
                "d" == b && f.setAttribute("path", this.svgPathToVml(d));
                "dd" == b && f.setAttribute("path", d);
                g = a.stroke;
                a = a.fill;
                "stroke" == b && (e ? g.color = d: g.setAttribute("color", d));
                "stroke-width" == b && (e ? g.weight = d: g.setAttribute("weight", d));
                "stroke-opacity" == b && (e ? g.opacity = d: g.setAttribute("opacity", d));
                "stroke-dasharray" == b && (h = "solid", 0 < d && 3 > d && (h = "dot"), 3 <= d && 6 >= d && (h = "dash"), 6 < d && (h = "longdash"), e ? g.dashstyle = h: g.setAttribute("dashstyle", h));
                if ("fill-opacity" == b || "opacity" == b) 0 === d ? e ? a.on = !1 : a.setAttribute("on", !1) : e ? a.opacity = d: a.setAttribute("opacity", d);
                "fill" == b && (e ? a.color = d: a.setAttribute("color", d));
                "rx" == b && (e ? f.arcSize = d + "%": f.setAttribute("arcsize", d + "%"))
            }
        }
    },
    attr: function(a, b) {
        for (var d in b) b.hasOwnProperty(d) && this.setAttr(a, d, b[d])
    },
    text: function(a, b, d) {
        var e = new AmCharts.AmDObject("text", this.D),
        f = e.node;
        f.style.whiteSpace = "pre";
        a = document.createTextNode(a);
        f.appendChild(a);
        this.D.addToContainer(f, d);
        this.attr(e, b);
        return e
    },
    getBBox: function(a) {
        return this.getBox(a.node)
    },
    getBox: function(a) {
        var b = a.offsetLeft,
        d = a.offsetTop,
        e = a.offsetWidth,
        f = a.offsetHeight,
        g;
        if (a.hasChildNodes()) {
            var h, j, k;
            for (k = 0; k < a.childNodes.length; k++) {
                g = this.getBox(a.childNodes[k]);
                var l = g.x;
                isNaN(l) || (isNaN(h) ? h = l: l < h && (h = l));
                var m = g.y;
                isNaN(m) || (isNaN(j) ? j = m: m < j && (j = m));
                l = g.width + l;
                isNaN(l) || (e = Math.max(e, l));
                g = g.height + m;
                isNaN(g) || (f = Math.max(f, g))
            }
            0 > h && (b += h);
            0 > j && (d += j)
        }
        return {
            x: b,
            y: d,
            width: e,
            height: f
        }
    },
    setText: function(a, b) {
        var d = a.node;
        d && (d.removeChild(d.firstChild), d.appendChild(document.createTextNode(b)));
        this.setAttr(a, "text-anchor", a.anchor)
    },
    addListener: function(a, b, d) {
        a.node["on" + b] = d
    },
    move: function(a, b, d) {
        var e = a.node,
        f = e.style;
        "text" == a.type && (d -= AmCharts.removePx(f.fontSize) / 2 - 1);
        "oval" == a.shapeType && (b -= AmCharts.removePx(f.width) / 2, d -= AmCharts.removePx(f.height) / 2);
        a = a.bw;
        isNaN(a) || (b -= a, d -= a); ! isNaN(b) && !isNaN(d) && (e.style.left = b + "px", e.style.top = d + "px")
    },
    svgPathToVml: function(a) {
        var b = a.split(" ");
        a = "";
        var d, e = Math.round,
        f;
        for (f = 0; f < b.length; f++) {
            var g = b[f],
            h = g.substring(0, 1),
            g = g.substring(1),
            j = g.split(","),
            k = e(j[0]) + "," + e(j[1]);
            "M" == h && (a += " m " + k);
            "L" == h && (a += " l " + k);
            "Z" == h && (a += " x e");
            if ("Q" == h) {
                var l = d.length,
                m = d[l - 1],
                n = j[0],
                s = j[1],
                k = j[2],
                p = j[3];
                d = e(d[l - 2] / 3 + 2 / 3 * n);
                m = e(m / 3 + 2 / 3 * s);
                n = e(2 / 3 * n + k / 3);
                s = e(2 / 3 * s + p / 3);
                a += " c " + d + "," + m + "," + n + "," + s + "," + k + "," + p
            }
            "A" == h && (a += " wa " + g);
            "B" == h && (a += " at " + g);
            d = j
        }
        return a
    },
    animate: function(a, b, d, e, f) {
        var g = this,
        h = a.node;
        if ("translate" == b) {
            var j = d.split(",");
            b = j[1];
            d = h.offsetTop;
            h = {
                obj: a,
                frame: 0,
                attribute: "left",
                from: h.offsetLeft,
                to: j[0],
                time: e,
                effect: f
            };
            g.animations.push(h);
            e = {
                obj: a,
                frame: 0,
                attribute: "top",
                from: d,
                to: b,
                time: e,
                effect: f
            };
            g.animations.push(e);
            a.animationX = h;
            a.animationY = e
        }
        g.interval || (g.interval = setInterval(function() {
            g.updateAnimations.call(g)
        },
        AmCharts.updateRate))
    },
    updateAnimations: function() {
        var a;
        for (a = this.animations.length - 1; 0 <= a; a--) {
            var b = this.animations[a],
            d = 1E3 * b.time / AmCharts.updateRate,
            e = b.frame + 1,
            f = b.obj,
            g = b.attribute;
            if (e <= d) {
                b.frame++;
                var h = Number(b.from),
                j = Number(b.to) - h,
                b = this.D[b.effect](0, e, h, j, d);
                0 === j ? this.animations.splice(a, 1) : f.node.style[g] = b
            } else f.node.style[g] = Number(b.to),
            this.animations.splice(a, 1)
        }
    },
    clipRect: function(a, b, d, e, f) {
        a = a.node;
        0 == b && 0 == d ? (a.style.width = e + "px", a.style.height = f + "px", a.style.overflow = "hidden") : a.style.clip = "rect(" + d + "px " + (b + e) + "px " + (d + f) + "px " + b + "px)"
    },
    rotate: function(a, b) {
        if (0 != Number(b)) {
            var d = a.node,
            e = d.style,
            f = this.getBGColor(d.parentNode);
            e.backgroundColor = f;
            e.paddingLeft = 1;
            var f = b * Math.PI / 180,
            g = Math.cos(f),
            h = Math.sin(f),
            j = AmCharts.removePx(e.left),
            k = AmCharts.removePx(e.top),
            l = d.offsetWidth,
            d = d.offsetHeight,
            m = b / Math.abs(b);
            e.left = j + l / 2 - l / 2 * Math.cos(f) - m * d / 2 * Math.sin(f) + 3;
            e.top = k - m * l / 2 * Math.sin(f) + m * d / 2 * Math.sin(f);
            e.cssText = e.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + g + "', M12='" + -h + "', M21='" + h + "', M22='" + g + "', sizingmethod='auto expand');"
        }
    },
    getBGColor: function(a) {
        var b = "#FFFFFF";
        if (a.style) {
            var d = a.style.backgroundColor;
            "" !== d ? b = d: a.parentNode && (b = this.getBGColor(a.parentNode))
        }
        return b
    },
    set: function(a) {
        var b = new AmCharts.AmDObject("group", this.D);
        this.D.container.appendChild(b.node);
        if (a) {
            var d;
            for (d = 0; d < a.length; d++) b.push(a[d])
        }
        return b
    },
    gradient: function(a, b, d, e) {
        var f = "";
        "radialGradient" == b && (b = "gradientradial", d.reverse());
        "linearGradient" == b && (b = "gradient");
        var g;
        for (g = 0; g < d.length; g++) {
            var h = Math.round(100 * g / (d.length - 1)),
            f = f + (h + "% " + d[g]);
            g < d.length - 1 && (f += ",")
        }
        a = a.fill;
        90 == e ? e = 0 : 270 == e ? e = 180 : 180 == e ? e = 90 : 0 === e && (e = 270);
        8 === document.documentMode ? (a.type = b, a.angle = e) : (a.setAttribute("type", b), a.setAttribute("angle", e));
        f && (a.colors.value = f)
    },
    remove: function(a) {
        a.clipPath && this.D.remove(a.clipPath);
        this.D.remove(a.node)
    },
    disableSelection: function(a) {
        void 0 !== typeof a.onselectstart && (a.onselectstart = function() {
            return ! 1
        });
        a.style.cursor = "default"
    }
});
AmCharts.SVGRenderer = AmCharts.Class({
    construct: function(a) {
        this.D = a;
        this.animations = []
    },
    create: function(a, b) {
        return document.createElementNS(AmCharts.SVG_NS, b)
    },
    attr: function(a, b) {
        for (var d in b) b.hasOwnProperty(d) && this.setAttr(a, d, b[d])
    },
    setAttr: function(a, b, d) {
        void 0 !== d && a.node.setAttribute(b, d)
    },
    animate: function(a, b, d, e, f) {
        var g = this,
        h = a.node;
        "translate" == b ? (h = (h = h.getAttribute("transform")) ? String(h).substring(10, h.length - 1) : "0,0", h = h.split(", ").join(" "), h = h.split(" ").join(","), 0 === h && (h = "0,0")) : h = h.getAttribute(b);
        b = {
            obj: a,
            frame: 0,
            attribute: b,
            from: h,
            to: d,
            time: e,
            effect: f
        };
        g.animations.push(b);
        a.animationX = b;
        g.interval || (g.interval = setInterval(function() {
            g.updateAnimations.call(g)
        },
        AmCharts.updateRate))
    },
    updateAnimations: function() {
        var a;
        for (a = this.animations.length - 1; 0 <= a; a--) {
            var b = this.animations[a],
            d = 1E3 * b.time / AmCharts.updateRate,
            e = b.frame + 1,
            f = b.obj,
            g = b.attribute,
            h,
            j,
            k;
            e <= d ? (b.frame++, "translate" == g ? (h = b.from.split(","), g = Number(h[0]), h = Number(h[1]), j = b.to.split(","), k = Number(j[0]), j = Number(j[1]), k = 0 === k - g ? k: Math.round(this.D[b.effect](0, e, g, k - g, d)), b = 0 === j - h ? j: Math.round(this.D[b.effect](0, e, h, j - h, d)), g = "transform", b = "translate(" + k + "," + b + ")") : (h = Number(b.from), k = Number(b.to), k -= h, b = this.D[b.effect](0, e, h, k, d), 0 === k && this.animations.splice(a, 1)), this.setAttr(f, g, b)) : ("translate" == g ? (j = b.to.split(","), k = Number(j[0]), j = Number(j[1]), f.translate(k, j)) : (k = Number(b.to), this.setAttr(f, g, k)), this.animations.splice(a, 1))
        }
    },
    getBBox: function(a) {
        if (a = a.node) try {
            return a.getBBox()
        } catch(b) {}
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    path: function(a, b) {
        a.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", b)
    },
    clipRect: function(a, b, d, e, f) {
        var g = a.node,
        h = a.clipPath;
        h && this.D.remove(h);
        var j = g.parentNode;
        j && (g = document.createElementNS(AmCharts.SVG_NS, "clipPath"), h = AmCharts.getUniqueId(), g.setAttribute("id", h), this.D.rect(b, d, e, f, 0, 0, g), j.appendChild(g), b = "#", AmCharts.baseHref && !AmCharts.isIE && (b = window.location.href + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++, a.clipPath = g)
    },
    text: function(a, b, d) {
        var e = new AmCharts.AmDObject("text", this.D);
        a = String(a).split("\n");
        var f = b["font-size"],
        g;
        for (g = 0; g < a.length; g++) {
            var h = this.create(null, "tspan");
            h.appendChild(document.createTextNode(a[g]));
            h.setAttribute("y", (f + 2) * g + f / 2 + 0);
            h.setAttribute("x", 0);
            e.node.appendChild(h)
        }
        e.node.setAttribute("y", f / 2 + 0);
        this.attr(e, b);
        this.D.addToContainer(e.node, d);
        return e
    },
    setText: function(a, b) {
        var d = a.node;
        d && (d.removeChild(d.firstChild), d.appendChild(document.createTextNode(b)))
    },
    move: function(a, b, d, e) {
        b = "translate(" + b + "," + d + ")";
        e && (b = b + " scale(" + e + ")");
        this.setAttr(a, "transform", b)
    },
    rotate: function(a, b) {
        var d = a.node.getAttribute("transform"),
        e = "rotate(" + b + ")";
        d && (e = d + " " + e);
        this.setAttr(a, "transform", e)
    },
    set: function(a) {
        var b = new AmCharts.AmDObject("g", this.D);
        this.D.container.appendChild(b.node);
        if (a) {
            var d;
            for (d = 0; d < a.length; d++) b.push(a[d])
        }
        return b
    },
    addListener: function(a, b, d) {
        a.node["on" + b] = d
    },
    gradient: function(a, b, d, e) {
        var f = a.node,
        g = a.grad;
        g && this.D.remove(g);
        b = document.createElementNS(AmCharts.SVG_NS, b);
        g = AmCharts.getUniqueId();
        b.setAttribute("id", g);
        if (!isNaN(e)) {
            var h = 0,
            j = 0,
            k = 0,
            l = 0;
            90 == e ? k = 100 : 270 == e ? l = 100 : 180 == e ? h = 100 : 0 === e && (j = 100);
            b.setAttribute("x1", h + "%");
            b.setAttribute("x2", j + "%");
            b.setAttribute("y1", k + "%");
            b.setAttribute("y2", l + "%")
        }
        for (e = 0; e < d.length; e++) h = document.createElementNS(AmCharts.SVG_NS, "stop"),
        j = 100 * e / (d.length - 1),
        0 === e && (j = 0),
        h.setAttribute("offset", j + "%"),
        h.setAttribute("stop-color", d[e]),
        b.appendChild(h);
        f.parentNode.appendChild(b);
        d = "#";
        AmCharts.baseHref && !AmCharts.isIE && (d = window.location.href + d);
        f.setAttribute("fill", "url(" + d + g + ")");
        a.grad = b
    },
    remove: function(a) {
        a.clipPath && this.D.remove(a.clipPath);
        a.grad && this.D.remove(a.grad);
        this.D.remove(a.node)
    }
});
AmCharts.AmDSet = AmCharts.Class({
    construct: function() {
        this.create("g")
    },
    attr: function(a) {
        this.R.attr(this.node, a)
    },
    move: function(a, b) {
        this.R.move(this.node, a, b)
    }
});