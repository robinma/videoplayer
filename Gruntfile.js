module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            videoplayer:{
                src:[
                    'src/js/vp_header.js',
                    'src/js/vp_exports.js',
                    'src/js/vps_pubsub.js',
                    'src/js/vp_videoplayer.js',
                    'src/js/vp_videoinit.js',
                    'src/js/vp_canplaytype.js',
                    'src/js/vp_rendersource.js',
                    'src/js/vp_continue.js',
                    'src/js/vp_controlsbar.js',
                    'src/js/vp_play.js',
                    'src/js/vp_next.js',
                    'src/js/vp_fullscreen.js',
                    'src/js/vp_muted.js',
                    'src/js/vp_progress.js',
                    'src/js/vp_playerror.js',
                    'src/js/vps_mousemove.js',
                    'src/js/vps_fullscreen.js',
                    'src/js/vp_end.js'
                ],
                dest:'build/videoplayer.js'
            }
        },
        uglify: {
            videoplayer:{
                src:['build/videoplayer.js'],
                dest:'build/videoplayer.min.js',
                banner:'src/js/vp_header.js'
            }
        },
        cssmin: {
            build: {
                src  : ['src/css/videoplayer.css'],
                dest : 'build/css/videoplayer.min.css'
            }
        },
        copy: {
            build: {
                expand  : true,
                cwd     : 'src/',
                src     : ['*/*.*','!js/*.*','!scss/*.*','!css/*.*'],
                dest    : 'build/',
               // flatten : true,
               filter  : 'isFile'
            }
        },
        watch:{
            css:{
                files:['src/css/videoplayer.css'],
                tasks:['cssmin']
            },
            js:{
                files:['src/js/*.*'],
                tasks:['concat', 'uglify', 'copy']
            }
        }
    });


    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('watchfile', ['watch']);


};