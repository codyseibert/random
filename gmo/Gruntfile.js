module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

    var _ = require('lodash');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [
                    "build"
                ]
            }
        },

        copy: {
            server: {
                files: [
                {
                    expand: true,
                    flatten: false,
                    cwd: 'client',
                    src: [
                        'index.html'
                    ],
                    dest: 'build/',
                    filter: 'isFile'
                },
                ],
            },

        },

        bowerInstall: {
            target: {
                src: [
                    'build/index.html'
                ],
                // cwd: '.',
                dependencies: true,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            build: {
                src: ['client/js/**/*.js'],
                dest: 'build/js/app.js',
            },
        },

        uglify: {
          build: {
              src: 'build/js/app.js',
              dest: 'build/js/app.min.js'
          }
        },

        bower_concat: {
            build: {
                dest: 'build/js/_bower.js',
                bowerOptions: {
                  relative: false
                },
                dependencies: {
                    'angular': 'jquery',
                    'foundation': 'jquery'
                },
                callback: function(mainFiles, component) {
                    return _.map(mainFiles, function(filepath) {
                        // Use minified files if available
                        var min = filepath.replace(/\.js$/, '.min.js');
                        return grunt.file.exists(min) ? min : filepath;
                    });
                }
            }
        },

        processhtml: {
            prod: {
                files: {
                    'build/index.html' : 'build/index.html'
                }
            }
        },

        sass: {
            dist: {
                options:{
                    compass: true,
                    update: true
                },
                files: {
                    'client/css/app.css': 'client/scss/app.scss'
                }
            }
        },

        cssmin: {
            add_banner: {
                files: {
                    'build/css/app.min.css': ['client/css/app.css']
                }
            }
        },

        watch: {
            client: {
                files: [
                  'client/**/*.js',
                  'client/**/*.scss'
                ],
                tasks: ['build'],
                options: {
                  livereload: true
                }
            }
        },

        connect: {
          server: {
            options: {
              base: 'build',
              port: 8000,
              hostname: '*'
            }
          }
        }

    });

    grunt.registerTask('w', [
        'connect',
        'watch:client'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'bowerInstall',
        'concat',
        'uglify',
        'bower_concat',
        'processhtml',
        'sass',
        'cssmin'
    ]);

};
