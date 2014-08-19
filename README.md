videoplayer
===========


#一 简介#
------
此组件，主要是实现html5 video player 视频播放功能，主要实再了视频的通常的播放控制功能。
##1.1 主要功能##
- 播放暂停功能
- 进度条控制及拖放
- 音量控制
- 全屏控制，分为虚拟全屏和原生全屏
- ...

##1.2 问题反馈##
- email: ahmzj@163.com
- QQ: 316933268

#二 how to use#
-----
the player plugin relative jquery.1.7 +
##2.1 include files##
at fire,you have to include js file and style sheet.

     <link rel="stylesheet" href="../src/css/videoplayer.css">
     <script type="text/javascript" src="../src/js/videoplayer.js"></script>
     
##2.2 init to do##

    /**
     * param {String} videoSelector,is a dom id or jquery selector
     * param {Data} params.it set videoplayer params and some events
     */
    var videoplayer = videoPlayer(videoSelector,params);
    
**demo**

    var videoplayer2=videoPlayer('mod_player2',{
            autoPlay:false,
            muted:true,
            setSource:function(canplayType){
                
                if(canplayType == 'mp4'){
                    return 'http://mediaelementjs.com/media/echo-hereweare.mp4'
                }
            },
            success:function(videoElement,node,videoObj){
                console.log('----success ',arguments)
                videoElement.addEventListener('timeupdate',function(){
				//when timeupdata event to do ...
                },false);

                videoObj.timeupdate(function(currentTime){
				//when video play to do, speed is 1s
                });
            },
            //fires when a problem is detected
            error:function(){

            }

        });
##params##

###autoplay###
*autoplay {boolean}：是否自动播放*

        var videoplayer2=videoPlayer('mod_player2',{
            //....
            autoPlay:false,
            //...
        });
        
###muted###

*muted {boolean}:默认是否静音*


    var videoplayer2=videoPlayer('mod_player2',{
            //....
            muted:true,
            //...
        });

###setSource###
*setSource {function}:设置视频源地址*

    var videoplayer2=videoPlayer('mod_player2',{
            setSource:function(canplayType){
                //canplayType : mp4 ogg webm                if(canplayType == 'mp4'){
                    return 'http://mediaelementjs.com/media/echo-hereweare.mp4'
                }
            }            
        });
###success###
*success {function}:播放成功时执行*

       var videoplayer2=videoPlayer('mod_player2',{
            success:function(videoElement,node,videoObj){
                /**
                 *params videoElement {domObj} is video dom object
                 *params videoObj {videoPlayerObject} is videoPlayer object
                 */
                videoElement.addEventListener('timeupdate',function(){
				//when timeupdata event to do ...
                },false);

                videoObj.timeupdate(function(currentTime){
				//when video play to do, speed is 1s
                });
            },
        });
        

##API##



