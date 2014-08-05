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
            var index=this.videos.length;
            var video = new Video(playerId, params,index,this);
            this.videos.push(video);

            return video;
        }

    });
    //video object
    var Video = function(playerId, params,index,parent) {
            this.index=index;
            this._parent=parent;
            this.playerwarp = $('#' + playerId);
            this.src='';
            this.params = $.extend({
                setSource:null,
                autoPlay:false,
                width:853,
                height:480
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
            var $el=$('<div id="mod_yvideo_player_${index}"><div class="yvp_container"></div></div>'.replace(/\${.*\}/i,this.index));
            this.playerwarp.html($el);
            this.$el=$el.find('.yvp_container');
            $el.height(this.params.height)
            $el.width(this.params.width)
        },
        events:function(){

        }
    });

    //get can play file type
    $.extend(Video.prototype, {
        videoType: ['video/mp4; codecs="avc1.42E01E"', 'video/ogg; codecs="theora"', 'video/webm; codecs="vp8, vorbis"'],
        getCanPlayType: function() {
            var myvideo = document.createElement('video');
            var playMsg,videotype;
            if (myvideo.canPlayType) {
                videotype=this.videoType[0];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }

                videotype=this.videoType[1];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }

                videotype=this.videoType[2];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    return this._slideType(videotype)
                }
            } else {
                return false;
            }
        },
        _slideType:function(str){
            return /\/(.*);/i.exec(str)[1]
        }
    });
    //render Video srource
    $.extend(Video.prototype,{
        renderSource:function(){
            var setSource = this.params.setSource;
            if(!setSource){
                this._sourceEmpty();
                return;
            }
            var canType = this.getCanPlayType();

            if(!canType){
                this._contSuppotVideo();
                return;
            }

            var src=setSource(canType);
            this._renderVideo(src);
            this._videoControl()
        },
        //when source is empty
        _sourceEmpty:function(){

        },
        //when browse not support video
        _contSuppotVideo:function(){

        },
        //render video element and set $video oubject
        _renderVideo:function(src){
            var video=$('<div class="yvp_video"><video width="100%" height="100%" _preload="none" x-webkit-airplay="true" src="${videosrc}"></video></div>'.replace(/\${.*\}/i,src));
            this.$el.append(video);
            this.$video=video.find('video');
        },
        _videoControl:function(){
           var params=this.params;
           console.log(this.$video)
           if(params.autoPlay){
                this.$video[0].play();
           }
        }
    });

    //controls bar
    $.extend(Video.prototype,{
        $_control:'',
        controlsInit:function(){

            this.renderControls();
            this.playRender();
            this.nextRender()
            this.fullScreenRender();
            this.mutedRender();
            this.progressRender();
        },
        renderControls:function(){
            var controlswarp=$('<div class="yvp_controls"></div>');
            this.$el.append(controlswarp);
            this.$_control=controlswarp;

        },
        renderDefProgress:function(){
            var defProg=$('<div class="yvp_progress yvp_progress_status"></div>');
            this.$el.append(defProg);
        }
    });

    //play control
    $.extend(Video.prototype,{
        playRender:function(){
            var  playpause = $('<div class="yvp_button yvp_play_pause">\
                    <button type="button" title="播放/暂停">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-play"></em>\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(playpause);
            var fullPlay=$('<div class="yvp_overlay_play">\
                <span class="yvp_button_play"></span>\
            </div>');
            this.$el.append(fullPlay);
        },
        playChangeStatus:function(){

        }
    });

    //next control
    $.extend(Video.prototype,{
        nextRender:function(){
            var nextObj=$('<div class="yvp_button yvp_next">\
                    <button type="button" title="next">\
                        <span class="yvp_btn_val">\
                            <em class="yvphicon yvphicon-next"></em>\
                        </span>\
                    </button>\
                </div>');
            this.$_control.append(nextObj);
        }
    });

    //fullScreen control

    $.extend(Video.prototype,{
        fullScreenRender:function(){
            var fullScreenObj=$('<div class="yvp_button yvp_fullscreen">\
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
    $.extend(Video.prototype,{
        mutedRender:function(){
            var mutedObj=$('<div class="yvp_button yvp_muted">\
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
    $.extend(Video.prototype,{
        progressRender:function(){
            var progressObj=$('<div class="yvp_prograss_wrap">\
                    <div class="yvp_progress">\
                        <span class="yvp_time_panel yvp_time_panel_curr">02:12</span>\
                        <span class="yvp_time_panel yvp_time_panel_total">05:28</span>\
                        <span class="yvp_time_total">\
                            <span class="yvp_time_loaded" style="width:85%"></span>\
                            <span class="yvp_time_current" style="width:60%">\
                                <span class="yvp_time_handle"></span>\
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

        }
    });


    var videPlayerObj = new videoPlayer();

    return function(playerId, params) {
        return videPlayerObj.add(playerId, params);
    };
});