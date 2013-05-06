var grunt = require('grunt'),
    ncp = require('ncp').ncp;

grunt.registerTask('images', 'Move images to the build directory', function() {
  var images = grunt.config.get('images');
  ncp(images.dist.src, images.dist.dest, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(images.dist.src + ' copied to ' + images.dist.dest);
    }
  });
});
