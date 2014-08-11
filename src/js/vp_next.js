    //next control
    $.extend(Video.prototype, {
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
        },
        _nextControl: function() {

        }
    });