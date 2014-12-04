var gulp = require('gulp'),
    vulcanize = require('gulp-vulcanize');

module.exports = function (gulp) {
  var buildDir = 'build';

  gulp.task(buildDir, function () {
    return gulp.src('src/index.html')
      .pipe(vulcanize({
        dest: buildDir,
        strip: true,
        inline: true
      }))
    .pipe(gulp.dest(buildDir));
  });
};
