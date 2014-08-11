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
            var __=this;
            if (params.autoPlay) {
                this.$video[0].play();
            }
            this.$video.on('error',function(){
                __._deadlyError();
            }).on('loadedmetadata',function(){
                __.controlsInit();
            });

        }
    });