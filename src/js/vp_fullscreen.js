    //fullScreen control

    $.extend(Video.prototype, {
        $_fullscreen: '',
        _isFullScreen: false,
        fullScreenRender: function() {
            var fullScreenObj = $('<div class="yvp_button yvp_fullscreen">\
                    <div class="yvp_button_under"></div>\
                    <button type="button" title="full_screen">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-fullscreen"></em>\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(fullScreenObj);
            this.$_fullscreen = fullScreenObj;
            this._fullScreenControl()
        },
        _fullScreenControl: function() {
            var __ = this;
            var params = this.params;

            var fullScreen = new virtualFullScreen(__);

            this.$_fullscreen.on('click', 'button', function() {
                if (params.virtualFullScreen) {
                    __._isFullScreen = !__._isFullScreen;
                    if (__._isFullScreen) {
                        fullScreen.enterFullScreen();
                        __._fullscreen_nfullicon();
                    } else {
                        fullScreen.cancelFullScreen()
                        __._fullscreen_fullicon();
                    }

                } else {
                    //default fullscreen
                    __._fullscreen_defaultFull();
                }
            });


        },
        _fullscreen_nfullicon: function() {
            var __ = this;
            var icon = __.$_fullscreen.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-cancelscreen"></em>');
        },
        _fullscreen_fullicon: function() {
            var __ = this;
            var icon = __.$_fullscreen.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-fullscreen"></em>');
        },
        _fullscreen_defaultFull: function() {
            var video = document.createElement("video");
            if (video.mozRequestFullScreen) {
                return function() {
                    var __ = this;
                    __.$video[0].mozRequestFullScreen();
                }
            } else if (video.webkitEnterFullScreen) {
                return function() {
                    var __ = this;
                    __.$video[0].webkitEnterFullScreen();
                }
            } else {
                return function() {
                    alert('can not enter fullscreen');
                }
            }
        }()

    });