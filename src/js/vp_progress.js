    //progress control
    $.extend(Video.prototype, {
        $_progress: '',
        $_progressBtn: '',
        progressRender: function() {
            var progressObj = $('<div class="yvp_prograss_wrap">\
                    <div class="yvp_progress">\
                        <span class="yvp_time_panel yvp_time_panel_curr" node-type="curr-time"></span>\
                        <span class="yvp_time_panel yvp_time_panel_total" node-type="total-time"></span>\
                        <span class="yvp_time_total" node-node="prog-rail">\
                            <span class="yvp_time_loaded" node-type="buffer"></span>\
                            <span class="yvp_time_current" node-type="progress-bar">\
                            </span>\
                             <a href="javascript:;" class="yvp_time_handle" node-type="progpress-btn"></a>\
                        </span>\
                        <span class="yvp_contplay" node-type="contp-lay">\
                            <span class="yvp_icon checkbox"></span>\
                            <span class="yvp_icon checkflag"></span>\
                            <b>连播</b>\
                        </span>\
                    </div>\
                </div>');

            var minprogressObj = $('<span class="yvp_time_total">\
                    <span class="yvp_time_loaded" node-type="buffer"></span>\
                    <span class="yvp_time_current" node-type="progress-bar">\
                    </span>\
                </span>');
            this.$_control.append(progressObj);
            this.$_minprogress.append(minprogressObj);

            this.$_progress = progressObj;
            this.$_progressBtn = progressObj.find('a[node-type="progpress-btn"]');
            this._progressControl();
        },
        _progressControl: function() {
            var __ = this,
                video = this.$video;
            video.on('timeupdate', function() {
                __._updataCurrentTime(__._formateTime(video[0].currentTime));
                __._updataPlayProgress(video[0].currentTime);

            })

            video.on('loadedmetadata', function() {
                __._updataTotalTime(__._formateTime(video[0].duration));
            })
            //progress downloading the media
            video.on('progress', function() {
                var timeRange = video[0].buffered;
                if (timeRange.length == 1) {
                    __._updataBufferProgress(timeRange.start(0), timeRange.end(0));
                }
            })
            //progress button slide
            var mousemove = new mouseMove(this.$_progressBtn, function(lx, ly, oldLT) {
                __._progressBtnControl(lx, ly, oldLT);
            });

            this._updataCurrentTime(__._formateTime(video[0].currentTime));
            this._updataTotalTime(__._formateTime(video[0].duration));
            //this._progressBtnControl();
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
        _updataBufferProgress: function(start, end) {
            this.$_totalBuffer || (this.$_totalBuffer = this.$_progress.find('span[node-type="buffer"]'));
            this.$_mintotalBuffer || (this.$_mintotalBuffer = this.$_minprogress.find('span[node-type="buffer"]'));

            var video = this.$video;
            var persent = end / video[0].duration * 100;
            this.$_totalBuffer.width(persent + '%');
            this.$_mintotalBuffer.width(persent + '%');
        },
        //updata current play probress bar width
        _updataPlayProgress: function() {
            this.$_playProgress || (this.$_playProgress = this.$_progress.find('span[node-type="progress-bar"]'));
            this.$_progRailObj || (this.$_progRailObj = this.$_progress.find('span[node-node="prog-rail"]'));
            this.$_minPlayProgress || (this.$_minPlayProgress = this.$_minprogress.find('span[node-type="progress-bar"]'));

            var video = this.$video;
            var persent = video[0].currentTime / video[0].duration;
            this.$_playProgress.width(persent * 100 + '%');
            this.$_progressBtn.css({
                left: persent * 100 + '%'
            });
            this.$_minPlayProgress.width(persent * 100 + '%');
        },
        //control progress button
        _progressBtnControl: function(lx, ly, oldLT) {
            this.$_progRailObj || (this.$_progRailObj = this.$_progress.find('span[node-node="prog-rail"]'));
            var video = this.$video;
            var totalWidth = this.$_progRailObj.width();
            var proBtn = this.$_progressBtn;
            var newLeft = oldLT.left + lx;

            if (newLeft < 0) newLeft = 0;
            if (newLeft > totalWidth) newLeft = totalWidth;
            var currtime = newLeft / totalWidth * video[0].duration;

            //can fast
            if(this.params.canfast === false){
                if(currtime > video[0].currentTime) return false;
            }
            video[0].currentTime = currtime;

            this._updataCurrentTime(this._formateTime(currtime));
            this._updataPlayProgress();

        },
        //exports method
        timeupdate: function(fn) {
            var __ = this,
                video = __.$video;
            var currtime;
            var tdonce = todoOnce();
            video.on('timeupdate', function() {
                currtime = video[0].currentTime;
                tdonce(currtime,function(){
                    $.isFunction(fn)
                    fn((currtime | 0));
                });
            });
        },
        //set currentTime
        setCurrentTime:function(time){
            if(time < 0 || time > this.$video[0].duration) return;
            this.$video[0].currentTime = time;
        }
    });
    
    var todoOnce =function(){
        var currTime='';
        return function(number,fn){
            var ct = number | 0;
            if(ct != currTime){
                fn && fn(ct);
                currTime = ct;
            }
        };
    };