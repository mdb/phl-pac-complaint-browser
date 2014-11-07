var gulp = require('gulp'),
    connect = require('gulp-connect'),
    fs = require('fs'),
    taskFiles = fs.readdirSync( './tasks/' );

taskFiles.forEach(function(file) {
  require('./tasks/' + file)(gulp);
});

gulp.task('default', function() {
  console.log('available tasks:');

  Object.keys(gulp.tasks).forEach(function (key) {
    console.log('\t' + key);
  });
});
