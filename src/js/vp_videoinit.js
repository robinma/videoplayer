    //video object
    var Video = function(playerId, params, index, parent) {
            this.index = index;
            this._parent = parent;
            this.placeholder = $('#' + playerId);
            this.src = '';
            this.isPlay;
            this.params = $.extend({
                setSource: null,
                autoPlay: false,
                continuousPlay: false,
                virtualFullScreen: true,
                muted: false,
                width: 853,
                height: 480,
                canfast:false
            }, params);
            this.init();
        }
        //init video
    $.extend(Video.prototype, pubsub, {
        init: function() {
            this.render();
            this.renderSource();
            this.events()
        },
        render: function() {
            this.$warp = $('<div id="mod_yvideo_player_${index}"></div></div>'.replace(/\${.*\}/i, this.index));
            this.$el = $('<div class="yvp_container"></div>');

            this.placeholder.html(this.$warp);
            this.$el.appendTo(this.$warp);
            this.$warp.height(this.params.height)
            this.$warp.width(this.params.width)
        },
        events: function() {
            var __ = this;
            // this.$video.on('stalled', function() {
            //     console.log('----- onstalled', __.index)
            // }).on('waiting', function() {
            //     console.log('---- waiting', __.index)
            // }).on('loadeddata', function() {
            //     console.log('----- loadeddata', __.index)
            // }).on('playing', function() {
            //     console.log('----- playing', __.index)
            // }).on('seeking', function() {
            //     //快进 寻找
            //     console.log('----  seeking', __.index)
            // }).on('suspend', function() {
            //     console.log('----  suspend', __.index)
            // }).on('seeked', function() {
            //     //寻找完成
            //     console.log('----  seeked', __.index)
            // }).on('error', function(e) {
            //     console.log('error', e, __.$video[0].readyState, __.$video[0].error)

            // }).on('loadedmetadata', function() {
            //     console.log('start loadedmetadata', __.index)
            // }).on('loadstart', function() {
            //     console.log('loadstart', __.index)
            // }).on('ended', function() {
            //     console.log('play ended')
            // })
        }
    });