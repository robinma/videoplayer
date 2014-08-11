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
            this.continueInit();
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