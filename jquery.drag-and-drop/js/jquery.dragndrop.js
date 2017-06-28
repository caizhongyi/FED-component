;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'dragdrop',
        defaults = {
            // which direction to drag - ["both", "x", "y"], default: "both"
            axis: "both",

            // Drag a clone of the source, and not the actual source element
            makeClone: false,

            // Class to apply to source element when dragging a clone of the source element
            sourceClass: null,

            // Specify with true that the source element should hade visibility:hidden while dragging a clone
            sourceHide: false,

            // Class to apply to the element that is dragged
            dragClass: null,

            // Class to apply to the dragged element when dropping is possible
            canDropClass: null,

            dropClass: null,

            isActive: true,

            // if set, dragging is limited to this container
            container: null,

            // Default is to allow all elements to be dragged
            canDrag: function($src, event) {
                return $src;
            },

            // Default is to allow dropping inside elements with css stylesheet "drop"
            canDrop: function($dst) {
                return $dst.hasClass("drop") || $dst.parents(".drop").length > 0;
            },

            // Default is to move the element in the DOM and insert it into the element where it is dropped
            didDrop: function($src, $dst) {
                $src.appendTo($dst);
            }
        },
        settingsKey = pluginName + '-settings';

    // Status during a drag-and-drop operation. Only one such operation can be in progress at any given time.
    var $sourceElement = null,
    // Element that user wanted to drag
        $activeElement = null,
    // Element that is shown moving around during drag operation
        $destElement = null,
    // Element currently highlighted as possible drop destination
        dragOffsetX, dragOffsetY, // Position difference from drag-point to active elements left top corner
        limits;

    // Private helper methods


    function cancelDestElement(options) {
        if ($destElement !== null) {
            if (options.dropClass) {
                $destElement.removeClass(options.dropClass);
            }
            $destElement = null;
        }
        if ($activeElement !== null) {
            if (options.canDropClass) {
                $activeElement.removeClass(options.canDropClass);
            }
        }
    }

    var init = function(options) {

        var self = this,
            $this = $(this),
            settings = $.extend({}, defaults, options);
        $this.data("options", settings);
        $this.bind("mousedown.dragdrop touchstart.dragdrop", methods.onStart);
        $this.data(settingsKey, settings);
        //methods.init($this, settings);
    };


    // Public methods
    var methods = {

        onStart: function(event) {
            var $me = $(this),
                options = $me.data("options");
            if (!options.isActive) return;

            var $element = options.canDrag($me, event);
            if ($element) {
                $sourceElement = $element;
                var offset = $sourceElement.offset(),
                    width = $sourceElement.width(),
                    height = $sourceElement.height();
                if (event.type === "touchstart") {
                    dragOffsetX = event.originalEvent.touches[0].clientX - offset.left;
                    dragOffsetY = event.originalEvent.touches[0].clientY - offset.top;
                } else {
                    dragOffsetX = event.pageX - offset.left;
                    dragOffsetY = event.pageY - offset.top;
                }

                if (options.makeClone) {
                    $activeElement = $sourceElement.clone(false);

                    // Elements that are cloned and dragged around are added to the parent in order
                    // to get any cascading styles applied.
                    $activeElement.appendTo($element.parent());
                    if (options.sourceClass) {
                        $sourceElement.addClass(options.sourceClass);
                    } else if (options.sourceHide) {
                        $sourceElement.css("visibility", "hidden");
                    }
                } else {
                    $activeElement = $sourceElement;
                }

                $activeElement.css({
                    position: "absolute",
                    left: options.axis === "x" || options.axis === "both" ? offset.left : $activeElement.offset().left,
                    top: options.axis === "y" || options.axis === "both" ? offset.top : $activeElement.offset().top,
                    width: width,
                    height: height
                });
                if (options.dragClass) {
                    $activeElement.addClass(options.dragClass);
                }

                var $c = options.container;
                if ($c) {
                    var coffset = $c.offset();
                    limits = {
                        minX: coffset.left,
                        minY: coffset.top,
                        maxX: coffset.left + $c.outerWidth() - $element.outerWidth(),
                        maxY: coffset.top + $c.outerHeight() - $element.outerHeight()
                    };
                }

                $(document).bind("mousemove.dragdrop touchmove.dragdrop", {
                    source: $me
                }, methods.onMove).bind("mouseup.dragdrop touchend.dragdrop", {
                    source: $me
                }, methods.onEnd);

                event.stopPropagation();
                return false;
            }
        },

        onMove: function(event) {
            if (!$activeElement) return;

            var $me = event.data.source,
                options = $me.data("options"),
                posX, posY;
            posX = event.type === "touchmove" ? event.originalEvent.touches[0].clientX : event.pageX;
            posY = event.type === "touchmove" ? event.originalEvent.touches[0].clientY : event.pageY;
            $activeElement.css("display", "none");
            var destElement = document.elementFromPoint(posX, posY);
            $activeElement.css("display", "");
            posX -= dragOffsetX;
            posY -= dragOffsetY;
            if (limits) {
                posX = Math.min(Math.max(posX, limits.minX), limits.maxX);
                posY = Math.min(Math.max(posY, limits.minY), limits.maxY);
            }
            $activeElement.stop().css({
                left: options.axis === "x" || options.axis === "both" ? posX : "",
                top: options.axis === "y" || options.axis === "both" ? posY : ""
            });

            if (destElement) {
                if ($destElement === null || $destElement.get(0) !== destElement) {
                    var $possibleDestElement = $(destElement);
                    if (options.canDrop($possibleDestElement)) {
                        if (options.dropClass) {
                            if ($destElement !== null) {
                                $destElement.removeClass(options.dropClass);
                            }
                            $possibleDestElement.addClass(options.dropClass);
                        }
                        if (options.canDropClass) {
                            $activeElement.addClass(options.canDropClass);
                        }
                        $destElement = $possibleDestElement;
                    } else if ($destElement !== null) {
                        cancelDestElement(options);
                    }
                }
            } else if ($destElement !== null) {
                cancelDestElement(options);
            }

            event.stopPropagation();
            return false;
        },

        onEnd: function(event) {
            if (!$activeElement) return;

            var $me = event.data.source,
                options = $me.data("options");
            if ($destElement) {
                options.didDrop($sourceElement, $destElement);
            }
            cancelDestElement(options);

            if (options.makeClone) {
                $activeElement.remove();
                if (options.sourceClass) {
                    $sourceElement.removeClass(options.sourceClass);
                } else if (options.sourceHide) {
                    $sourceElement.css("visibility", "visible");
                }
            } else {
                $activeElement.css({
                    position: "absolute",
                    width: "",
                    height: ""
                });
                if (options.dragClass) {
                    $activeElement.removeClass(options.dragClass);
                }
            }

            $(document).unbind("mousemove.dragdrop touchmove.dragdrop").unbind("mouseup.dragdrop touchend.dragdrop");
            $sourceElement = $activeElement = limits = null;
        }
    };

    var callMethod = function(method, options) {
        var methodFn = $[pluginName].addMethod[method],
            args = Array.prototype.slice.call(arguments);
        if (methodFn) {
            this.each(function() {
                var opts = args.slice(1),
                    settings = $(this).data(settingsKey);
                opts.unshift(settings);
                methodFn.apply(this, opts);
            });
        }
    };

    $[pluginName] = {
        settingsKey: settingsKey,
        addMethod: {
            on: function() {
                $(this).data("options").isActive = true;
            },
            off: function() {
                $(this).data("options").isActive = false;
            },
            destroy: function(settings, options) {
                $(this).unbind(".dragdrop");
                delete $.fn[pluginName];
                return this;
            }
        }
    };

    $.fn[pluginName] = function(options) {
        if (typeof options === 'string') {
            callMethod.apply(this, arguments);
        } else {
            init.call(this, options);
        }
        return this;
    };

}(window.jQuery || window.Zepto, window, document));



