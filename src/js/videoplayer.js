/*!
 *vedioPlayer.js
 *HTML5 <video> player
 *
 *chreate a javascript Object that mimics html5 Media API
 *can play MP4,Ogg,WebM
 *
 *License:MIT
 *
 */
(function(root, $, factory) {
    //set up videoplayer appropriately for the enviroment.
    if (typeof define === 'function' && (define.cmd || define.amd)) {
        define(function() {
            return factory();
        });
    } else {
        //as a browser global
        root.videoPlayer = factory();
    }
})(window, $, function() {
    // body...

    //video player manage
    var videoPlayer = function() {
        this.videos = [];
    };

    $.extend(videoPlayer.prototype, {}, {
        init: function() {

        },
        //add player push videos
        add: function(playerId, params) {
            var index = this.videos.length;
            var video = new Video(playerId, params, index, this);
            this.videos.push(video);

            return video;
        }

    });
    //video object
    var Video = function(playerId, params, index, parent) {
            this.index = index;
            this._parent = parent;
            this.playerwarp = $('#' + playerId);
            this.src = '';
            this.params = $.extend({
                setSource: null,
                autoPlay: false,
                width: 853,
                height: 480
            }, params);
            this.init();
        }
        //init video
    $.extend(Video.prototype, {}, {
        init: function() {
            this.render();
            this.renderSource();
            this.controlsInit();
        },
        render: function() {
            var $el = $('<div id="mod_yvideo_player_${index}"><div class="yvp_container"></div></div>'.replace(/\${.*\}/i, this.index));
            this.playerwarp.html($el);
            this.$el = $el.find('.yvp_container');
            $el.height(this.params.height)
            $el.width(this.params.width)
        },
        events: function() {

        }
    });

    //get can play file type
    $.extend(Video.prototype, {
        videoType: ['video/mp4; codecs="avc1.42E01E"', 'video/ogg; codecs="theora"', 'video/webm; codecs="vp8, vorbis"'],
        getCanPlayType: function() {
            var myvideo = document.createElement('video');
            var playMsg, videotype;
            if (myvideo.canPlayType) {
                videotype = this.videoType[0];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }

                videotype = this.videoType[1];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }

                videotype = this.videoType[2];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }
            } else {
                return false;
            }
        },
        _slideType: function(str) {
            return /\/(.*);/i.exec(str)[1]
        }
    });
    //render Video srource
    $.extend(Video.prototype, {
        renderSource: function() {
            var setSource = this.params.setSource;
            if (!setSource) {
                this._sourceEmpty();
                return;
            }
            var canType = this.getCanPlayType();

            if (!canType) {
                this._contSuppotVideo();
                return;
            }

            var src = setSource(canType);
            this._renderVideo(src);
            this._videoControl()
        },
        //when source is empty
        _sourceEmpty: function() {

        },
        //when browse not support video
        _contSuppotVideo: function() {

        },
        //render video element and set $video oubject
        _renderVideo: function(src) {
            var video = $('<div class="yvp_video"><video width="100%" height="100%" _preload="none" x-webkit-airplay="true" src="${videosrc}"></video></div>'.replace(/\${.*\}/i, src));
            this.$el.append(video);
            this.$video = video.find('video');
        },
        _videoControl: function() {
            var params = this.params;
            console.log(this.$video)
            if (params.autoPlay) {
                this.$video[0].play();
            }
        }
    });

    //controls bar
    $.extend(Video.prototype, {
        $_control: '',
        controlsInit: function() {

            this.renderControls();
            this.playRender();
            this.nextRender()
            this.fullScreenRender();
            this.mutedRender();
            this.progressRender();
        },
        renderControls: function() {
            var controlswarp = $('<div class="yvp_controls"></div>');
            this.$el.append(controlswarp);
            this.$_control = controlswarp;

        },
        renderDefProgress: function() {
            var defProg = $('<div class="yvp_progress yvp_progress_status"></div>');
            this.$el.append(defProg);
        }
    });

    //play control
    $.extend(Video.prototype, {
        $_playbtn: '',
        $_playFullBtn: '',
        playRender: function() {
            var playpause = $('<div class="yvp_button yvp_play_pause">\
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

            var playcontrol = function() {
                if (video[0].paused) {
                    video[0].play();
                } else {
                    video[0].pause();
                }
                __._playChangeStatus();
            };
            //trigger events
            this.$_playbtn.on('click', 'button', function() {
                playcontrol();
            })
            this.$_playFullBtn.on('click', function() {
                playcontrol()
            });
            this._playChangeStatus();
        },
        _playChangeStatus: function() {
            var video = this.$video;
            if (video[0].paused) {
                this._play_playicon();
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

    //next control
    $.extend(Video.prototype, {
        nextRender: function() {
            var nextObj = $('<div class="yvp_button yvp_next">\
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

    //fullScreen control

    $.extend(Video.prototype, {
        fullScreenRender: function() {
            var fullScreenObj = $('<div class="yvp_button yvp_fullscreen">\
                    <button type="button" title="full_screen">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-fullscreen"></em>\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(fullScreenObj);
        }
    });

    //muted control
    $.extend(Video.prototype, {
        mutedRender: function() {
            var mutedObj = $('<div class="yvp_button yvp_muted">\
                    <button type="button" title="muted">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-horn"></em>\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(mutedObj);
        }
    })

    //progress control
    $.extend(Video.prototype, {
        $_progress: '',
        progressRender: function() {
            var progressObj = $('<div class="yvp_prograss_wrap">\
                    <div class="yvp_progress">\
                        <span class="yvp_time_panel yvp_time_panel_curr" node-type="curr-time"></span>\
                        <span class="yvp_time_panel yvp_time_panel_total" node-type="total-time"></span>\
                        <span class="yvp_time_total">\
                            <span class="yvp_time_loaded" node-type="buffer"></span>\
                            <span class="yvp_time_current" node-type="progress-bar">\
                                <a href="javascript:;" class="yvp_time_handle"></a>\
                            </span>\
                        </span>\
                        <span class="yvp_contplay yvp_contplay_check">\
                            <span class="yvp_icon checkbox"></span>\
                            <span class="yvp_icon checkflag"></span>\
                            <b>连播</b>\
                        </span>\
                    </div>\
                </div>');
            this.$_control.append(progressObj);
            this.$_progress = progressObj;
            this._progressControl();
        },
        _progressControl: function() {
            var __ = this,
                video = this.$video;
            video.on('timeupdate', function() {
                __._updataCurrentTime(__._formateTime(video[0].currentTime));
                __._updataPlayProgress(video[0].currentTime);

            })

            video.on('loadedmetadata',function(){
                __._updataTotalTime(__._formateTime(video[0].duration));
            })
            //progress downloading the media
            video.on('progress',function(){
                var timeRange=video[0].buffered;
                if(timeRange.length == 1){
                    __._updataBufferProgress(timeRange.start(0),timeRange.end(0));
                }
                
            })
            //when video start play
            video.on('play',function(){
                console.log('played')
            })

            video.on('pause',function(){
                console.log('---pause')
                video[0].preload="none";
            })

            this._updataCurrentTime(__._formateTime(video[0].currentTime));
            this._updataTotalTime(__._formateTime(video[0].duration));
        },
        //formate time exampla 1:05:54
        _formateTime: function(time) {
            var second = Math.ceil(time);
            return [second / 3600 | 0, second / 60 % 60 | 0, second % 60 | 0].join(":")
                .replace(/\b(\d)\b/g, "0$1").replace(/^0{1,2}\:*/, '')
        },
        //updata current time value
        _updataCurrentTime: function(time) {
            this.$_currTimeNode || (this.$_currTimeNode = this.$_progress.find('span[node-type="curr-time"]'));
            this.$_currTimeNode.text(time);
        },
        //updata total time value
        _updataTotalTime: function(time) {
            this.$_totalTimeNode || (this.$_totalTimeNode = this.$_progress.find('span[node-type="total-time"]'));
            this.$_totalTimeNode.text(time);
        },
        //updata buffer bar width
        _updataBufferProgress:function(start,end){
            this.$_totalBuffer || (this.$_totalBuffer = this.$_progress.find('span[node-type="buffer"]'));
            var video = this.$video;
            var persent=end/video[0].duration*100;
            this.$_totalBuffer.width(persent+'%');
        },
        //updata current play probress bar width
        _updataPlayProgress:function(second){
            this.$_playProgress || (this.$_playProgress = this.$_progress.find('span[node-type="progress-bar"]'));;
            var video = this.$video;
            var persent=second/video[0].duration*100;
            this.$_playProgress.width(persent+'%');
        }


    });


    var videPlayerObj = new videoPlayer();

    return function(playerId, params) {
        return videPlayerObj.add(playerId, params);
    };
});