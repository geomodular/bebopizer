var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var through = require('through2');
var uglify = require('gulp-uglify');

function browserifyThis() {
  return through.obj(function(file, enc, next) {
    browserify(file.path).bundle(function(err, res) {
      file.contents = res;
      next(null, file);
    });
  });
}

gulp.task('bebopizer', function() {
  gulp.src(['lib/bebopizer.js'])
    .pipe(browserifyThis())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(rename('bebopizer.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bebopizer.min', function() {
  gulp.src(['lib/bebopizer.js'])
    .pipe(browserifyThis())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(uglify())
    .pipe(rename('bebopizer.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['bebopizer', 'bebopizer.min']);
});

gulp.task('default', ['bebopizer', 'bebopizer.min', 'watch'], function() {});
gulp.task('build', ['bebopizer', 'bebopizer.min'], function() {});
