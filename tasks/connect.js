var gulp = require('gulp'),
    connect = require('gulp-connect');

module.exports = function (gulp) {
  gulp.task('connect', function () {
    connect.server();
  });
};
