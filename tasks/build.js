var gulp = require('gulp'),
    rename = require('gulp-rename'),
    vulcanize = require('gulp-vulcanize');

module.exports = function (gulp) {
  var buildDir = 'build';

  gulp.task(buildDir, function () {
    return gulp.src('demo.html')
      .pipe(rename('index.html'))
      .pipe(vulcanize({
        dest: buildDir,
        strip: true,
        inline: true
      }))
    .pipe(gulp.dest(buildDir));
  });
};
