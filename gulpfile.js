var gulp = require('gulp');

var del = require('del'),
    sass = require('gulp-sass'),
    gulpIf = require('gulp-if'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    plumber = require('gulp-plumber'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload');

/*
 *
 * DEVELOPMENT BUILDER
 *
 */

var onError = function (err) {
  console.log(err);
  this.emit('end');
};

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(livereload());
});

gulp.task('watch', ['sass','html','js'], function (){
  livereload.listen();

  //Watch SCSS files
  gulp.watch('src/scss/**/*.scss', ['sass']);

  //Watch Javascripts files
  gulp.watch('src/js/*.js', ['js']);

  //Watch HTML file
  gulp.watch('src/*.html', ['html']);
});


/*
 *
 * DISTIBRUTION BUILDER
 *
 */


gulp.task('another-files:src', function() {
  return gulp.src(['src/**/*.json','src/**/*.xml'])
  .pipe(gulp.dest('dist'))
 });

gulp.task('useref', function(cb){
  return gulp.src('src/*.html')
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function(callback) {
  runSequence(['clean:dist','sass'],
    ['useref','images','fonts','another-files:src'],
    callback
  )
});
