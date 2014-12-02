var gulp = require('gulp'),
    fs = require('fs-extra');

copySource = function (sources) {
  sources.forEach(function (src) {
    var destinationDir = src == 'bower_components' ? 'build/bower_components' : 'build';

    fs.copy(src, destinationDir, function (err) {
      if (err) { throw err; }

      console.log("Copied " + src + " to " + destinationDir);
    });
  });
};

module.exports = function (gulp) {
  gulp.task('build', function () {
    copySource([
      'src',
      'bower_components'
    ]);
  });
};
