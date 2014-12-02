var gulp = require("gulp"),
    s3 = require("gulp-s3"),
    fs = require("fs");
    aws = JSON.parse(fs.readFileSync('./aws.json'));

module.exports = function (gulp) {
  gulp.task('deploy', function () {
    gulp.src('./build/**').pipe(s3(aws));
  });
};
