var appFiles = [
  'js/models/*.js',
  'js/collections/*.js',
  'js/views/*.js',
  'js/routers/*.js'
],

libFiles = [
  'js/lib/underscore.1.4.1.js',
  'js/lib/backbone.0.9.10.js',
  'js/lib/tabletop.1.2.1.js',
  'js/lib/leaflet.js',
  'js/lib/wax.leaf.min.js'
];

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: appFiles
    },
    uglify: {
      options: {
        mangle: false
      },
      app: {
        files: {
          'www/js/app.min.js': appFiles
        }
      },
      lib: {
        files: {
          'www/js/app.libraries.min.js': libFiles
        }
      }
    },
    images: {
      dist: {
        src: 'js/lib/images',
        dest: 'www/js/images'
      }
    },
    sass: {
      www: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/app.css': 'sass/app.scss'
        }
      }
    },
    shell: {
      build: {
        command: 'NODE_ENV=production PORT=3001 node build.js'
      }
    },
    s3: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET,
      access: 'public-read',
      upload: [
        {
          src: 'www/*',
          dest: '<%= pkg.name %>'
        },
        {
          src: 'www/js/*',
          dest: '<%= pkg.name %>/js'
        },
        {
          src: 'www/js/images/*',
          dest: '<%= pkg.name %>/js/images'
        },
        {
          src: 'www/css/*',
          dest: '<%= pkg.name %>/css'
        }
      ]
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ''); // Intentionally left blank in the interest of being explicit
  grunt.registerTask('build', ['jshint', 'uglify', 'images', 'sass', 'shell']);
  grunt.registerTask('deploy', ['s3']);
};
