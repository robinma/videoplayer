    //error
    $.extend(Video.prototype, {
        $deadly: '',
        _deadlyError: function() {

            var deadly = '<div class="yvp_deadly_error">\
                <div class="yvp_deadly_errtxt">\
                    <span class="yvphicon yvphicon-unhappy"></span>\
                    <span class="yvp_deadly_tip">${errorTxt}</span>\
                </div>\
            </div>';
            var errortxt = this._deadlyMsg();

            this.$el.append(deadly.replace('${errorTxt}', errortxt));
        },
        _deadlyErrorControl: function() {

        },
        _deadlyMsg: function() {
            var __ = this;
            var video = __.$video,
                errorTxt = '';
            switch (video[0].error.code) {
                case 1:
                    errorTxt = '用户终止错误';
                    break;
                case 2:
                    errorTxt = '网络发生未知错误';
                    break;
                case 3:
                    errorTxt = '视频解码错误';
                    break;
                case 4:
                    errorTxt = '视频地址错误';
                    break;
                default:
                    errorTxt = '未知错误';
                    break;
            }
            return errorTxt + '(' + video[0].error.code + ')';
        }
    });