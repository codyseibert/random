module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});

    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        mkdir: {
            bower_components: {
                options: {
                    create: ['src/public/bower_components']
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            client: {
                src: ['src/public/js/**/*.js'],
                dest: 'build/tmp/app.js',
            },
        },

        jshint: {
            server: [
                'src/*.js',
                'src/controllers/*.js',
                'src/dao/*.js',
                'src/middleware/*.js'
            ],
            client: [
            'src/public/js/**/*.js'
            ],
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            client: {
                src: 'build/tmp/app.js',
                dest: 'build/app/public/js/app.min.js'
            }
        },

        'bower-install-simple': {
            options: {
                cwd: 'src/public'
            },
            dev: {

            }
        },

        bowerInstall: {
            target: {
                src: [
                'src/public/index.html'
                ],
                cwd: 'src/public',
                dependencies: true,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        },

        clean: {
            build: {
                src: [
                "coverage"
                ]
            }
        },

        coverage: {
            options: {
                thresholds:{
                    'statements': 90,
                    'branches': 90,
                    'lines': 90,
                    'functions': 90
                },
                dir: 'coverage/reports',
                root: './'
            },
        },
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '/coverage/instrument/src/',
                TESTING: true
            },
            dev: {
                NODE_ENV: 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV: 'PRODUCTION'
            }
        },
        preprocess:{
            prod: {
                src: './src/public/index.html',
                dest: './build/app/index.html'
            }
        },
        instrument: {
            files: [
                'src/*.js',
                'src/controllers/*.js',
                'src/dao/*.js',
                'src/middleware/*.js'
            ],
            options: {
                lazy: true,
                basePath: 'coverage/instrument/'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/**/*.js']
            }
        },
        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },
        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'coverage/reports',
                print: 'detail'
            }
        },


        processhtml: {
            prod: {
                files: {
                    'build/app/public/index.html' : 'build/app/public/index.html'
                }
            }
        },


        copy: {
            server: {
                files: [
                {
                    expand: true,
                    flatten: false,
                    cwd: 'src',
                    src: [
                        '*.js',
                        'controllers/*.js',
                        'dao/*.js',
                        'middleware/*.js'
                    ],
                    dest: 'build/app/',
                    filter: 'isFile'
                },
                ],
            },

            client: {
                files: [
                {
                    expand: true,
                    flatten: false,
                    cwd: 'src',
                    src: [
                        'public/font/**',
                        'public/images/**',
                        'public/templates/**',
                        'public/css/fontello.css',
                        'public/bower_components/**'
                    ],
                    dest: 'build/app',
                    filter: 'isFile'
                },
                ],
            },

            node: {
                files: [
                {
                    expand: true,
                    flatten: false,
                    src: [
                        'node_modules/**'
                    ],
                    dest: 'build/app/',
                    filter: 'isFile'
                },
                ],
            },
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'build/app/public/css/app.min.css': ['src/public/css/app.css']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/app/public/index.html': 'src/public/index.html'
                }
            },
            dev: {
                files: {
                    'build/app/public/index.html': 'src/public/index.html'
                }
            }
        },

        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/public/css/app.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['src/public/css/app.css']
            }
        },

        jsdoc: {
            dist: {
                src: ['src/*.js', 'test/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        replace: {
            index: {
                src: 'build/app/public/index.html',
                dest: 'build/app/public/index.html',
                replacements: [{
                    from: 'js/app.js',
                    to: 'js/app.min.js'
                }]
            },
            port: {
                src: 'build/app/Server.js',
                dest: 'build/app/Server.js',
                replacements: [{
                    from: '5000',
                    to: '80'
                }]
            },
            css: {
                src: 'build/app/public/index.html',
                dest: 'build/app/public/index.html',
                replacements: [{
                    from: 'css/app.css',
                    to: 'css/app.min.css'
                }]
            }
        },

        jsonlint: {
            dev: {
                src: [ 'src/**/*.json' ]
            }
        },

        complexity: {
            generic: {
                src: ['src/**/*.js'],
                exclude: ['test*.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml',
                    checkstyleXML: 'checkstyle.xml',
                    errorsOnly: false,
                    cyclomatic: [3, 7, 12],
                    halstead: [8, 13, 20],
                    maintainability: 100,
                    hideComplexFunctions: false,
                    broadcast: false
                }
            }
        },

        jslint: {
            server: {
                src: [
                    'src/*.js',
                    'src/controllers/*.js',
                    'src/dao/*.js',
                    'src/middleware/*.js'
                ],
                directives: {
                    node: true,
                    todo: true
                },
                options: {
                    edition: 'latest',
                    log: 'build/jslint/server-lint.log',
                    jslintXml: 'build/jslint/server-jslint.xml',
                    errorsOnly: true,
                    failOnError: true,
                    checkstyle: 'build/jslint/server-checkstyle.xml'
                }
            },
            client: {
                src: [
                    'src/public/js/**/*.js'
                ],
                directives: {
                    browser: true,
                    todo: true
                },
                options: {
                    edition: 'latest',
                    log: 'build/jslint/client-lint.log',
                    jslintXml: 'build/jslint/client-jslint.xml',
                    errorsOnly: true,
                    failOnError: true,
                    checkstyle: 'build/jslint/client-checkstyle.xml'
                }
            }
        }
    });

    grunt.registerTask('check:css', [
        'newer:csslint:strict'
    ]);
    grunt.registerTask('check:client', [
        'newer:jshint:client',
        'newer:jslint:client'
    ]);
    grunt.registerTask('check:server', [
        'newer:jshint:server',
        'newer:jslint:server'
    ]);
    grunt.registerTask('check', [
        'check:css',
        'check:server',
        'check:client'
    ]);

    grunt.registerTask('test', [
        'env:coverage',
        'instrument',
        'mochaTest',
        'storeCoverage',
        'makeReport',
        //'coverage'
    ]);

    // Builds
    grunt.registerTask('build:server', [
        'check:server',
        'newer:copy:server'
    ]);
    grunt.registerTask('build:client', [
        'check:client',
        'newer:concat:client',
        'newer:uglify:client',
        'newer:htmlmin:dev',
        'newer:cssmin',
        'newer:copy:client'
    ]);

    // Tasks
    grunt.registerTask('build', [
        'clean',
        'mkdir:bower_components',
        'check',
        'test',
        'bowerInstall',
        'build:server',
        'build:client',
        'bower-install-simple:dev',
        'newer:copy:node',
        'replace:index',
        'replace:port',
        'replace:css',
        'processhtml:prod'
    ]);

};
