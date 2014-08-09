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