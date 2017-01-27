var gulp = require('gulp');

var del = require('del');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('dev/scss/*.scss') // Gets all files ending with .scss in dev/scss
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

gulp.task('useref', function(cb){
  return gulp.src('dev/*.html')
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('dev/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('dev/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch', ['sass','browserSync'], function (){
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch(['dev/*.html','dev/js/*.js'], browserSync.reload);
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function(callback) {
  runSequence(['clean:dist','sass'],
    ['useref','images','fonts'],
    callback
  )
});
