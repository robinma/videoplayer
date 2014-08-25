    //next control
    $.extend(Video.prototype, {
        $_nextobj:'',
        nextRender: function() {
            var nextObj = $('<div class="yvp_button yvp_next">\
                    <div class="yvp_button_under"></div>\
                    <button type="button" title="next">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-next"></em>\
                        </span>\
                    </button>\
                </div>');

            this.$_control.append(nextObj);
            this.$_nextobj = nextObj;
            this._nextControl();
        },
        _nextControl: function() {
            var __=this;
            this.$_nextobj.on('click touchStart',function(){
                __.emit('next');
            });
        }
    });