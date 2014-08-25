    //连播功能
    //continues play
    $.extend(Video.prototype, {
        $_continuePlay: '',
        continueInit: function() {
            this.$_continuePlay = this.$_progress.find('span[node-type="contp-lay"]');
            this._continueEvents();
        },
        _continueEvents: function() {
            var __ = this;
            this.$_continuePlay.on('click', function() {
                var params = __.params;
                params.continuousPlay = !params.continuousPlay;
                __._continueControl();
                //define event
                __.emit('continue',params.continuousPlay);
            });
            __._continueControl()
        },
        _continueControl: function() {
            if (this.params.continuousPlay) {
                this._continueSelect()
            } else {
                this._continueUnSelect()
            }
        },
        _continueSelect: function() {
            this.$_continuePlay.addClass('yvp_contplay_check');
        },
        _continueUnSelect: function() {
            this.$_continuePlay.removeClass('yvp_contplay_check');
        },
        getContiune : function(){
            return this.params.continuousPlay;
        }
    });