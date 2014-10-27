    //controls bar
    $.extend(Video.prototype, {
        _mouseOnControl: false,
        $_control: '',
        $_membrane: '',
        $_minprogress: '',
        controlsInit: function() {
            //insert play control mask
            this.insertMembrane();
            //insert control warp
            this.renderControls();
            //insert progress node
            this.renderDefProgress()
            this.playRender();
            this.nextRender()
            this.fullScreenRender();
            this.mutedRender();
            this.progressRender();
            this.continueInit();

            this.controlEvents()
        },
        renderControls: function() {
            var controlswarp = $('<div class="yvp_controls"></div>');
            this.$el.append(controlswarp);
            this.$_control = controlswarp;

        },
        renderDefProgress: function() {
            var defProg = $('<div class="yvp_progress yvp_progress_status"></div>');
            this.$el.append(defProg);
            this.$_minprogress = defProg;
        },
        insertMembrane: function() {
            var membrane = $('<div class="yvp_membrane"></div>');
            this.$el.append(membrane);
            this.$_membrane = membrane;
        },
        controlEvents: function() {
            var video = this.$video;
            var __ = this;
            this.$_membrane.on('click', function() { 
                __._play_on_off();
            }).on('mousemove', function() {
                __._controlBar_moveshow();
            });

            this.$video.on('play', function() {
                __._controlBar_delayhide()
            }).on('pause', function() {
                __._controlBar_show()
            }).on('ended', function() {
                __._controlBar_show();
            });
            //set on mouse over control bar flag value
            this.$_control.on('mouseover', function() {
                __._mouseOnControl = true;
                clearTimeout(__._timer)
            }).on('mouseleave', function() {
                __._mouseOnControl = false;
                __._controlBar_delayhide();
            });
        },
        _controlBar_show: function() {
            //如果暂停时参数为true,则不显示
            if(this._hideConbar)return;
            this.$el.removeClass('yvp_container_hide');
        },
        _controlBar_hide: function() {
            this.$el.addClass('yvp_container_hide');
        },
        _timer: '',
        _moveshow: '',
        _controlBar_delayhide: function() {
            var __ = this;
            if (!this.isPlay) return;
            if (this._mouseOnControl) return;
            clearTimeout(__._timer)
            __._timer = setTimeout(function() {
                __._controlBar_hide();
            }, 3000);
        },
        _controlBar_moveshow: function() {
            var __ = this;
            if (__._moveshow > 0) {
                clearTimeout(__._moveshow);
                clearTimeout(__._timer);
                __._moveshow = setTimeout(function() {
                    __._controlBar_delayhide();
                    __._moveshow = '';
                }, 0);

                return;
            }
            this._controlBar_show();
            this._moveshow = 1;
        }
    });