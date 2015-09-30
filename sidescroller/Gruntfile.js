module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*','karama']});

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      //   server: {
      //     src: ['src/server/**/*.js'],
      //     dest: 'build/tmp/server.js',
      //   },
      client: {
        src: ['src/client/**/*.js'],
        dest: 'build/tmp/client.js',
      },
    },
    jshint: {
      server: ['src/server/**/*.js'],
      client: ['src/client/**/*.js'],
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      //   server: {
      //     src: 'build/tmp/server.js',
      //     dest: 'build/app/server.min.js'
      //   },
      client: {
        src: 'build/tmp/client.js',
        dest: 'build/app/client.min.js'
      }
    },
    clean: {
      build: {
        src: "build"
      }
    },
    copy: {
      server: {
        files: [
          // includes files within path
          //{expand: true, src: ['resources/*.png'], dest: 'build/app/', filter: 'isFile'},

          // includes files within path and its sub-directories
          //{expand: true, src: ['path/**'], dest: 'dest/'},

          // makes all src relative to cwd
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          {expand: true, flatten: true, src: ['src/server/**'], dest: 'build/app/', filter: 'isFile'},
        ],
      },
      client: {
        files: [
          {expand: true, flatten: true, src: ['src/client/resources/**'], dest: 'build/app/', filter: 'isFile'},
        ],
      },
      node: {
        files: [
          {expand: true, flatten: false, src: ['node_modules/**'], dest: 'build/app/', filter: 'isFile'},
        ],
      },
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'build/app/client.min.css': ['src/console/css/**/*.css']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/app/index.html': 'src/client/index.html'
        }
      },
      dev: {                                       // Another target
        files: {
          'build/app/index.html': 'src/client/index.html'
        }
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['src/client/css/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/client/css/**/*.css']
      }
    },
    jsdoc : {
        dist : {
            src: ['src/*.js', 'test/*.js'],
            options: {
                destination: 'doc'
            }
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
                jsLintXML: 'report.xml',         // create XML JSLint-like report
                checkstyleXML: 'checkstyle.xml', // create checkstyle report
                errorsOnly: false,               // show only maintainability errors
                cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                halstead: [8, 13, 20],           // or optionally a single value, like 8
                maintainability: 100,
                hideComplexFunctions: false,      // only display maintainability
                broadcast: false                 // broadcast data over event-bus
            }
        }
    },
    jslint: {
      server: {
        src: ['src/server/**/*.js'],
        exclude: ['server/config.js'],
        directives: {
          node: true,
          todo: true
        },
        options: {
          edition: 'latest',
          log: 'build/jslint/server-lint.log',
          jslintXml: 'build/jslint/server-jslint.xml',
          errorsOnly: true, // only display errors
          failOnError: true, // defaults to true
          checkstyle: 'build/jslint/server-checkstyle.xml' // write a checkstyle-XML
        }
      },
      client: {
        src: ['src/client/**/*.js'],
        directives: {
          browser: true,
          todo: true
        },
        options: {
          edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
          log: 'build/jslint/client-lint.log',
          jslintXml: 'build/jslint/client-jslint.xml',
          errorsOnly: true, // only display errors
          failOnError: true, // defaults to true
          checkstyle: 'build/jslint/client-checkstyle.xml' // write a checkstyle-XML
        }
      }
    }
  });

  // Define task(s).
  // Check
  grunt.registerTask('check:css', ['newer:csslint:strict']);
  grunt.registerTask('check:client', ['newer:jshint:client',
                                     'newer:jslint:client']);
  grunt.registerTask('check:server', ['newer:jshint:server',
                                     'newer:jslint:server']);
  grunt.registerTask('check', ['check:css',
                              'check:server',
                              'check:client']);
  // Builds
  grunt.registerTask('build:server', ['check:server',
                                     'newer:copy:server']);
  grunt.registerTask('build:client', ['check:client',
                                     'newer:concat:client',
                                     'newer:uglify:client',
                                     'newer:htmlmin:dev',
                                     'newer:cssmin',
                                     'newer:copy:client']);
  // Tasks
  grunt.registerTask('build', ['check:css',
                              'build:server',
                              'build:client',
                              'newer:copy:node']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('docs', ['jsdoc']);
  grunt.registerTask('clean', ['clean']);
  grunt.registerTask('report', ['newer:complexity:generic']);

  // Defualt Task
  grunt.registerTask('default', ['check']);
};
