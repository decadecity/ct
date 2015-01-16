/*global module:false */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>*/\n'
    },

    /**
     * Lists available tasks.
     */
    availabletasks: {
      tasks: {
        options: {
          descriptions: {
            build: 'Build files ready for production.',
            dev : 'Work on files in dev with a watch task.',
            test: 'Run all automated tests.'
          },
          filter: 'include',
          tasks: ['dev', 'test', 'build']
        }
      }
    },

    /**
     * Clean out the build targets.
     */
    clean: {
      css: ['build/dist/css'],
      js: ['build/dist/js']
    },

    /**
     * CSS min is used to minify CSS files.
     */
    cssmin: {
      options: {
        preserveComments: 'some',
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'build/dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'build/dist/css/',
          ext: '.min.css'
        }]
      }
    },

    /**
     * Check JS files for obvious errors.
     */
    jshint: {
      options: {
        jshintrc: 'build/etc/jshintrc.json'
      },
      // Check this file.
      gruntfile: {
        src: ['Gruntfile.js']
      },
      // Main source code.
      source: {
        src: [
          // Our modules.
          'build/js/**/*.js'
        ]
      },
      // Check the unit tests.
      tests: {
        src: ['build/test/**/*_test.js']
      }
    },

    /**
     * QUnit with istanbul code coverage.
     */
    qunit: {
      options: {
        coverage: {
          disposeCollector: true,
          src: ['build/js/**/*.js'],
          instrumentedFiles: 'tmp/',
          htmlReport: 'report/coverage',
          linesThresholdPct: 100,
          statementsThresholdPct: 100,
          functionsThresholdPct: 100,
          branchesThresholdPct: 100
        }
      },
      files: ['build/test/**/*.html']
    },

    /**
     * Requirejs is used to compile our modules into a
     * final build for the browser.
     */
    requirejs: {
      compile: {
        options: {
          // Entry point.
          include: 'main',
          insertRequire: ['main'],
          // Compilation target.
          out: 'build/dist/js/main.js',
          // Where do we find the modules?
          baseUrl: 'build/js/',
          // Any other dependencies.
          paths: {
            jquery: '../lib/jquery/jquery',
            almond: '../lib/almond/almond',
            config: '../etc/config'
          },
          // Start the build with almond.
          name: 'almond',
          // Compilation options.
          generateSourceMaps: true,
          optimize: 'none',
          wrap: true
        }
      }
    },

    /**
     * Sass is used to compile CSS.
     */
    sass: {
      options: {
        // We want a fully expanded file for dev, will minify as part of build.
        style: 'expanded',
        cacheLocation: 'tmp/sass-cache',
        unixNewlines: true,
        update: false
      },
      main: {
        files: [{
          // Root for Sass source files.
          cwd: 'build/sass/',
          expand: true,
          // Files to build - limit to root.
          src: ['*.scss'],
          // Output target
          dest: 'build/dist/css',
          ext: '.css'
        }]
      }
    },

    /**
     * Lint Scss files.
     */
    scsslint: {
      files: [
        'build/sass/head.scss',
        'build/sass/**/*.scss',
        '!build/sass/tools/_rem.scss'
      ],
      options: {
        colorizeOutput: true,
        config: 'build/etc/sass-lint.yml'
      }
    },

    /**
     * Uglify is used to minify JS files.
     */
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        preserveComments: 'some'
      },
      dist: {
        // Files to minify.
        files: {
         'build/dist/js/main.min.js': ['build/dist/js/main.js']
        }
      }
    },

    /**
     * Watch will run tasks as files change.
     */
    watch: {
      options: {
        // Turning spawn off allows us to use events.
        spawn: false
      },
      // Make sure we don't break this file.
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:gruntfile']
      },
      // JavaScript source code.
      js: {
        files: ['build/js/**/*.js'],
        tasks: ['clean:js', 'jshint:source', 'qunit', 'requirejs']
      },
      // Unit tests.
      tests: {
        files: ['build/test/**/*_test.js'],
        tasks: ['jshint:tests', 'qunit']
      },
      // Sass source code.
      sass: {
        files: ['build/sass/**/*.scss'],
        tasks: ['clean:css', 'scsslint', 'sass:main', 'cssmin']
      },
      dist: {
        files: ['dist/**/*'],
        options: {
          livereload: true
        }
      }
    }
  });


  // For some things we want to limit the scope of the action when a file changes.
  grunt.event.on('watch', function(action, filepath) {
    var test_file, src_file;
    if (filepath.lastIndexOf('build/js', 0) === 0) {
      // If it's a source file then only hint and test that file.
      src_file = filepath;
      test_file = filepath.replace(/build\/js\/(.*)\.js$/, 'build/test/$1.js_test.html');

      grunt.config('qunit.files', test_file);
      grunt.config('jshint.source.src', src_file);
      grunt.config('qunit.options.coverage.src', src_file);
    }
    if (filepath.lastIndexOf('build/test/', 0) === 0) {
      // If it's a test then only hint that file and run its tests.
      src_file = filepath.replace(/^build\/test\/(.*)_test.js$/, 'build/js/$1');
      test_file = filepath.replace(/build\/test\/(.*)\.js$/, 'build/test/$1.html');

      grunt.config('qunit.files', test_file);
      grunt.config('jshint.tests.src', src_file);
      grunt.config('qunit.options.coverage.src', src_file);
    }
    if (filepath.lastIndexOf('build/sass', 0) === 0 && filepath.lastIndexOf('build/sass/lib', 0) !== 0) {
      // Only lint Sass files that have changed.
      grunt.config('scsslint.files', filepath);
      // Only compile files that have changed.
      grunt.config('sass.options.update', true);
    }
  });


  // Register the modules.
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-qunit-istanbul');
  grunt.loadNpmTasks('grunt-scss-lint');


  // Declare tasks
  // Group tasks for CSS and JS.
  grunt.registerTask('css', ['clean:css', 'scsslint', 'sass', 'cssmin']);
  grunt.registerTask('js', ['clean:js', 'jshint', 'qunit', 'requirejs']);
  // Group task for minification
  grunt.registerTask('compress', ['uglify', 'cssmin']);

  // Build output.
  grunt.registerTask('build', ['css', 'js', 'compress']);
  // Set up tasks to work in dev.
  grunt.registerTask('dev', ['css', 'js', 'watch']);
  // Test runner suitable for CI.
  grunt.registerTask('test', ['jshint', 'scsslint', 'qunit']);

  // Default to listing available tasks.
  grunt.registerTask('default', ['availabletasks']);

};
