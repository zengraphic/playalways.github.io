/* 

Gruntfile.js

WIND UI KIT - sass version


*/

module.exports = function(grunt) {

    var id = '<%= grunt.template.today("yyyymmdd") %>-<%= pkg.name %>',
        dist = "dist/" + id;

    grunt.loadNpmTasks('grunt-collection');

    grunt.initConfig({

        banner: '/*! <%= pkg.name %>\n - <%= pkg.description %> - <%= pkg.version %>\n - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {

            options: {
                sourceMap: true,
                report: "min",
                shorthandCompacting: false,
                roundingPrecision: -1
            },

            /* base files */

            base: {
                files: {
                    "deploy/css/base-libs.min.css": [                        
                        //bootstrap plugins

                        "src/css/waves.css",
                        "src/css/bootstrap.css",
                        "src/css/checkboxes-radio-awesome-build.css",
                        "src/css/bootstrap-select.min.css",
                        "src/css/jquery.bootstrap-touchspin.css",
                        "src/css/bootstrap-datetimepicker.min.css",

                        //popup

                        "src/css/magnific-popup.css",
                        "src/css/magnific-popup-fx.css",

                        //slick 
                        "src/css/slick.css",
                    ]
                }
            }
        },

        /* convert scss -> sass */
        
        'sass-convert': {
            options: {
              // command line options here
              from:"scss",
              to:"sass",
              indent:4
            },
            files: {
              cwd: ['src/scss'],
              src: ['*.scss'],
              filePrefix: '_',
              dest: 'src/sass'
            }
        },

        sass: {
            base: {

                options:{
                    precision:2,
                    lineNumbers: true
                },
                
                files: {
                    'deploy/css/base-style.min.css' : 'src/sass/uikit.sass'
                }
            }
        },

        // js minification

        uglify: {

            options: {
                banner: '/*! <%= banner %> */\n',
                mangle: true,
                sourceMap: true,
                beautify: true,
                preserveComments: true,
                compress: {
                    drop_console: true
                }
            },

            base: {
                files: {

                    'deploy/js/base-libs.min.js': [

                        "src/js/classie.js",
                        "src/js/classList.min.js",
                        "src/js/matchMedia.js",
                        "src/js/matchMedia.addListener.js",
                        "src/js/rem.min.js",
                        "src/js/head.min.js",

                        "src/js/waves.js",
                        "src/js/jquery-1.12.3.min.js",
                        "src/js/jquery.nicescroll.min.js",
                        "src/js/jquery.magnific-popup.min.js",

                        //slider
                        "src/js/slick.min.js",

                        //bootstrap
                        "src/js/bootstrap.min.js",
                        "src/js/jquery.countdown.min.js",
                        "src/js/bootstrap-datetimepicker.js",
                        "src/js/bootstrap-select.min.js",
                        "src/js/jquery.bootstrap-touchspin.min.js"

                    ]
                }
            },
        },

        /*less: {
            dev: {
                options: {
                    compress: true,
                    paths: ['src/less']
                },
                files: {
                    'deploy/css/ootw-style.min.css': 'src/less/ootw-style.less'
                }
            }
        },
        */


        /**'closure-compiler': {
            ootw: {
                js: 'src/js/ootw-libs.js',
                jsOutputFile: 'deploy/js/ootw-libs.min.js',
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    define: [
                        '"DEBUG=false"',
                        '"UI_DELAY=500"'
                    ],
                }
            },

        }*/

    });
    
    //libs -> js/css
    grunt.registerTask('csslibs', ['cssmin:base']);
    grunt.registerTask('jslibs', ['uglify:base']);
    grunt.registerTask('libs', ['cssmin:base','uglify:base']);

    //sass -> css
    grunt.registerTask('cssbase', ['sass:base']);

    grunt.registerTask('preview', ['uglify:base']);
    grunt.registerTask('default', ['sass:base',]);
};