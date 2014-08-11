    //muted control
    $.extend(Video.prototype, {
        $_muted: '',
        $_muted_bar: '',
        $_muted_flag: '',
        mutedRender: function() {
            var __ = this;
            var mutedObj = $('<div class="yvp_button yvp_muted">\
                    <div class="yvp_button_under"></div>\
                    <div class="yvp_muted_warp">\
                            <div class="muted_barwarp">\
                                <div class="muted_arrow_b">\
                                    <span class="yvp_muted_tbg"></span>\
                                </div>\
                                <div class="muted_arrow_b muted_arrow_u" node-type="volum_flag">\
                                    <span class="yvp_muted_tbg"></span>\
                                </div>\
                                <a href="javascript:;" class="muted_ribtn" node-type="volum_cbar"></a>\
                            </div>\
                        </div>\
                    <button type="button" title="muted">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-muted"></em>\
                        </span>\
                    </button>\
                </div>');
            __.$_control.append(mutedObj);
            __.$_muted = mutedObj;
            __.$_muted_bar = mutedObj.find('a[node-type="volum_cbar"]');
            __.$_muted_flag = mutedObj.find('div[node-type="volum_flag"]')
            __.$volumHeight = mutedObj.find('.muted_barwarp').height();
            __._mutedControl()
        },
        _mutedControl: function() {
            var __ = this,
                video = __.$video;
            var params = __.params;

            this.$_muted.on('mousemove', function() {
                __.$_muted.addClass('yvp_muted_over');
            }).on('mouseout', function() {
                __.$_muted.removeClass('yvp_muted_over');
            });

            video.on('volumechange', function() {
                if (video[0].muted) {
                    __._mutedunSet();
                } else {
                    __._mutedSet();
                    __._muted_setVolum()
                }
            });

            this.$_muted.find('.yvp_btn_val').on('click', function() {
                if (video[0].muted == true) {
                    video[0].muted = false
                } else {
                    video[0].muted = true
                }
                __._mutedSet();
            })

            //control volume
            var mutedBar = new mouseMove(__.$_muted_bar, function(nx, ny, oldLT) {
                __._mutedVolume(nx, ny, oldLT);
            });

            //set define
            video[0].muted = params.muted;
            __._muted_setVolum();
        },
        //set muted value for muted or not muted
        _mutedSet: function() {
            var __ = this;
            var icon = __.$_muted.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-muted"></em>');
        },
        _mutedunSet: function() {
            var __ = this;
            var icon = __.$_muted.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-nomuted"></em>');
        },
        _muted_setVolum: function() {
            var __ = this;
            var hei = __.$volumHeight;
            var volum = __.$video[0].volume;
            var percent = 1 - volum;
            var Postop = hei * volum;

            this.$_muted_bar.css({
                'bottom': Postop
            });
            this.$_muted_flag.css({
                "height": percent * 100 + '%'
            });
        },
        //set volume value
        _mutedVolume: function(nx, ny, oldLT) {
            var __ = this;
            var hei = __.$volumHeight;
            var newTop = oldLT.bottom - ny;

            if (newTop > hei) newTop = hei;
            if (newTop < 0) newTop = 0;
            this.$video[0].volume = newTop / hei;


        }
    });