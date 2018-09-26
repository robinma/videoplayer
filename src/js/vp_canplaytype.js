    //get can play file type
    $.extend(Video.prototype, {
        videoType: ['video/mp4; codecs="avc1.42E01E"', 'video/ogg; codecs="theora"', 'video/webm; codecs="vp8, vorbis"'],
        getCanPlayType: function() {
            var myvideo = document.createElement('video');
            var playMsg, videotype;
            var canplayTypes = [];
            if (myvideo.canPlayType) {
                videotype = this.videoType[0];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    // return this._slideType(videotype)
                    canplayTypes.push(this._slideType(videotype));
                }

                videotype = this.videoType[1];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    // return this._slideType(videotype)
                    canplayTypes.push(this._slideType(videotype));
                }

                videotype = this.videoType[2];
                playMsg = myvideo.canPlayType(videotype);
                if ('' != playMsg) {
                    // return this._slideType(videotype)
                    canplayTypes.push(this._slideType(videotype));
                }

                playMsg = myvideo.canPlayType('application/vnd.apple.mpegurl');
                if ('' != playMsg) {
                    // return this._slideType(videotype)
                    canplayTypes.push('m3u8');
                }

                if (canplayTypes.length > 0) {
                    return canplayTypes;
                }
                return false;


            } else {
                return false;
            }
        },
        _slideType: function(str) {
            return /\/(.*);/i.exec(str)[1]
        }
    });