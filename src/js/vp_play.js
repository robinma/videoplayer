    //play control
    $.extend(Video.prototype, {
        $_playbtn: '',
        $_playFullBtn: '',
        playRender: function() {
            var playpause = $('<div class="yvp_button yvp_play_pause">\
                    <div class="yvp_button_under"></div>\
                    <button type="button" title="播放/暂停">\
                        <span class="yvp_btn_val">\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(playpause);
            var fullPlay = $('<a href="javascript:;" class="yvp_overlay_play">\
                <span class="yvp_button_play"></a>\
            </div>');
            this.$el.append(fullPlay);
            //cache button element
            this.$_playbtn = playpause;
            this.$_playFullBtn = fullPlay;

            this._playControl()
        },
        _playControl: function() {
            var __ = this,
                video = this.$video;
            //when video is paused
            video.on('pause', function() {
                __._playChangeStatus();
            });
            video.on('play', function() {
                __._playChangeStatus();
            })

            //trigger events
            this.$_playbtn.on('click', 'button', function() {
                __._play_on_off();
            })
            this.$_playFullBtn.on('click', function() {
                __._play_on_off();
            });
            this._playChangeStatus();
        },
        _play_on_off: function() {
            var __ = this,
                video = __.$video; 
            //如果暂停时参数为true,则不显示
            if(__._hideConbar)return;  
            if (video[0].paused) {
                video[0].play();
            } else {
                video[0].pause();
            }
        },
        //播放
        play: function(showConBar) {
            if(typeof showConBar === 'boolean' && showConBar){
                this._hideConbar = false;
            }
            this.$video[0].play();
        },
        //暂停
        pause:function(hideConBar){

            if(typeof hideConBar === 'boolean' && hideConBar){
                this._hideConbar = true;
                this._controlBar_hide();
            }else{
                this._hideConbar = false;
            }
            this.$video[0].pause();
        },
        _playChangeStatus: function() {
            var video = this.$video;
            if (video[0].paused) {
                this._play_playicon();
                //如果暂停时参数为true,则不显示
                if(this._hideConbar)return; 
                this.$_playFullBtn.show();
            } else {
                this._play_puaseicon();
                this.$_playFullBtn.hide();
            }
        },
        _play_playicon: function() {
            var icon = this.$_playbtn.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-play"></em>');
        },
        _play_puaseicon: function() {
            var icon = this.$_playbtn.find('.yvp_btn_val');
            icon.html('<em class="yvphicon yvphicon-pause"></em>');
        }
    });