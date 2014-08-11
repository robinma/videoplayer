    //mousemove class
    var $dcmen = $(document);
    var mouseMove = function(targetObj, callback) {
        this.target = targetObj;
        this.random = (Math.random() * 10000 * 8 | 0).toString(16);
        this.whenmousedown = null;
        this.wnenmouseup = null;
        this.oldPos;
        this.oldmouse;
        this.oldLT;
        this.groupStatus = false;
        this.callback = callback;
        this.init();
    };
    $.extend(mouseMove.prototype, {
        init: function() {
            var __ = this;
            this.target.css({
                'cursor': 'pointer'
            });
            this.target.on('mousedown.' + this.random, function(e) {
                __._mousedown(e);
                __.oldLT = {
                    left: parseInt(__.target.css('left')),
                    top: parseInt(__.target.css('top')),
                    bottom: parseInt(__.target.css('bottom')),
                    right: parseInt(__.target.css('right')),
                }
                if (typeof __.whenmousedown === 'function') {
                    __.whenmousedown()
                }
                __.groupStatus = true;
                $dcmen.on('mousemove.' + __.random, function(e) {
                    //清除选择
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    if (!__.groupStatus) return;
                    __._mousemove(e);
                }).on('mouseup.' + __.random, function(e) {
                    __._mouseup();
                });
            });

        },
        _mousedown: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.groupStatus = true;
            this.oldmouse = {
                x: e.clientX,
                y: e.clientY
            }
        },
        _mousemove: function(e) {
            var currs = {
                x: e.clientX,
                y: e.clientY
            }
            var nx = currs.x - this.oldmouse.x;
            var ny = currs.y - this.oldmouse.y;

            if (typeof this.callback === 'function') {
                this.callback(nx, ny, this.oldLT);
            }
        },
        _mouseup: function() {
            var __ = this;
            __.groupStatus = false;
            $dcmen.unbind('mousemove.' + __.random);
            $dcmen.unbind('mouseup.' + __.random);
            if (typeof __.wnenmouseup === 'function') {
                __.wnenmouseup()
            }
        },
        mousedown: function(fn) {
            if (typeof fn === 'function') {
                this.whenmousedown = fn;
                return;
            }
        },
        mouseup: function(fn) {
            if (typeof fn === 'function') {
                this.wnenmouseup = fn;
                return;
            }
        }


    });