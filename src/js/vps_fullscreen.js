// webkit-playsinline
    //fullscreen
    var $body = $("body"),
        $win = $(window);
    var virtualFullScreen = function(video) {
        this.$mask;
        this.video = video;
        this.playStatus = false;
        this.bodyOf = $body.css('overflow');
        // this.init();
    };
    $.extend(virtualFullScreen.prototype, {
        events: function() {
            var __ = this;
            $win.on('resize', function() {
                __._setWarpInfo()
            });
        },
        _setWarpInfo: function() {
            var width = this.$mask.width();
            var height = this.$mask.height();
            var params = this.video.params;
            var videoRatio = params.width / params.height;
            var nwidth = width * 0.9;
            if (nwidth < 320) nwidth = 320;
            var nheight = nwidth / videoRatio;

            this.$warp.width(nwidth);
            this.$warp.height(nheight)
            this.$warp.css({
                'padding-top': (height - nheight) / 2
            })

        },
        enterFullScreen: function() {
            this._insertMask();
            this.video.$el.appendTo(this.$warp)
            this._setWarpInfo()
            //当放大时，会自动暂停
           // this.video.play();
            this.events()

        },
        cancelFullScreen: function() {
            this.video.$el.appendTo(this.video.$warp);
            this._removeMask();
        },
        _insertMask: function() {
            $body.css({
                'overflow': 'hidden'
            });
            var mask = $('<div class="yvp_fullscreen_mask"></div>');
            $body.append(mask);
            this.$mask = mask;
            this._insertVideoWarp();
        },
        _insertVideoWarp: function() {
            this.$warp = $('<div class="yvp_fullscreen_vwarp"></div>');
            this.$mask.append(this.$warp);
        },
        _removeMask: function() {
            this.$warp.remove();
            this.$mask.remove();
            $body.css({
                "overflow": this.bodyOf
            });

        }
    });