module.exports = function(grunt) {
  'use strict';
  /* jshint camelcase: false */

  // Reads package.json and dynamically loads all Grunt tasks
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies',
    pattern: ['grunt-*']
  });

  // Time all of the things
  require('time-grunt')(grunt);

  // Go!
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/* <%= pkg.name %> :: Latest build: <%= grunt.template.today(\'dd/mm/yyyy, h:MM:ss TT\') %> */\n'
    },
    config: {
      // File settings
      gruntfile: 'Gruntfile.js',
      // Src settings
      src: 'src',
      srcScripts: 'scripts',
      // Dist settings
      dist: 'dist',
      distScripts: 'scripts'
    },

    // Watchers
    watch: {
      html: {
        files: [
        '<%= config.src %>/**/*.html'
        ],
        tasks: [
        'build_html'
        ]
      },
      scripts: {
        files: [
        '<%= config.src %>/<%= config.srcScripts %>/**/*.js',
        ],
        tasks: [
        'build_scripts'
        ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
        '<%= config.dist %>/**/*'
        ]
      }
    },

    // Project tasks
    todo: {
      options: {
        colophon: true,
        file: 'TODO.md',
        marks: [{
          name: 'todo',
          pattern: /@(todo)/i,
          color: 'blue'
        }],
        title: '[<%= pkg.title%> TODO list:](<%= pkg.homepage %>)',
        usePackage: true
      },
      all: [
      '<%= config.src %>/**/*.{html,js,txt}',
      '<%= config.gruntfile %>'
      ]
    },

    // Local server task
    connect: {
      options: {
        port: 8008,
        livereload: 35730,
        useAvailablePort: true,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
          '<%= config.dist %>'
          ]
        }
      }
    },

    // Project housekeeping tasks
    copy: {
      all: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/',
          src: ['**/*'],
          dest: '<%= config.dist %>/'
        }
        ]
      },
      html: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/',
          src: ['**/*.html'],
          dest: '<%= config.dist %>/'
        }
        ]
      },
      scripts: {
        files: [
        {
          expand: true,
          cwd: '<%= config.src %>/<%= config.srcScripts %>/',
          src: ['**/*.js'],
          dest: '<%= config.dist %>/'
        }
        ]
      }
    },

    clean: {
      all: [
      '<%= config.dist %>'
      ],
      html: [
      '<%= config.dist %>/**/*.html'
      ],
      scripts: [
      '<%= config.dist %>/**/*.js'
      ]
    },


    // HTML tasks
    htmlmin: {
      dist: {
        options: {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        },
        expand: true,
        cwd: '<%= config.dist %>',
        src: [
        '**/*.html',
        ],
        dest: '<%= config.dist %>'
      }
    },


    // Script tasks
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
      '<%= config.src %>/<%= config.srcScripts %>/**/*.js',
      '<%= config.gruntfile %>'
      ]
    },

    concat: {
      scripts: {
        src: [
        '<%= config.src %>/<%= config.srcScripts %>/*.js',
        ],
        dest: '<%= config.dist %>/script.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        preserveComments: 'some',
        mangle: true
      },
      scripts: {
        src: '<%= config.dist %>/script.js',
        dest: '<%= config.dist %>/script.js'
      }
    }

  });


  // Task aliases
  grunt.registerTask('build_html', [
    'clean:html',
    'copy:html',
    'htmlmin'
    ]);

  grunt.registerTask('build_scripts', [
    'clean:scripts',
    'newer:jshint',
    'concat:scripts',
    'copy:scripts',
    'uglify'
    ]);

  grunt.registerTask('build_dev', [
    'build_html',
    'build_scripts'
    ]);

  // Default task
  grunt.registerTask('default', [
    'build_dev',
    'connect:livereload',
    'watch'
    ]);

  // CI Build task
  grunt.registerTask('travis', [
    'build_dev'
    ]);
};
