var gulp = require('gulp');

var del = require('del'),
    sass = require('gulp-sass'),
    gulpIf = require('gulp-if'),
    cache = require('gulp-cache'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
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

 var paths = {
  src: {
    this: 'src',
    scss: 'src/public/scss/*.scss',
    sass: 'src/public/sass/*.sass',
    all_scss: 'src/public/scss/**/*.scss',
    all_sass: 'src/public/sass/**/*.sass',
    html: 'src/*.html',
    php: 'src/*.php',
    js: 'src/public/js/*.js',
    css: 'src/public/css',
    images: 'src/public/assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
    fonts: 'src/public/assets/fonts/**/*'
  },
  dist: {
    this: 'dist',
    html: 'dist/*.html',
    php: 'dist/*.php',
    js: 'dist/pubic/js/*.js',
    css: 'dist/public/css',
    images: 'dist/public/assets/images',
    fonts: 'dist/public/assets/fonts'
  }
 }

var onError = function (err) {
  console.log(err);
  this.emit('end');
};

gulp.task('sass', function() {
  return gulp.src([paths.src.scss, paths.src.sass])
    // .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    // .pipe(sass())
    .pipe(gulp.dest(paths.src.css))
    .pipe( notify({ message: 'SASS completed'}))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(paths.src.html)
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src(paths.src.js)
    .pipe(babel())
    .pipe(plumber({errorHandler: onError}))
    .pipe( notify({ message: 'JS completed'}))
    .pipe(livereload());
});

gulp.task('watch', ['sass','html','js'], function (){
  livereload.listen();

  //Watch SCSS files
  gulp.watch([paths.src.all_scss, paths.src.all_sass], ['sass']);

  //Watch Javascripts files
  gulp.watch(paths.src.js, ['js']);

  //Watch HTML file
  gulp.watch(paths.src.html, ['html']);
});


/*
 *
 * DISTIBRUTION BUILDER
 *
 */


gulp.task('another-files:src', function() {
  return gulp.src(['src/public/**/*.json','src/**/*.xml'])
  .pipe(gulp.dest(paths.dist.this))
 });

gulp.task('useref', function(cb){
  return gulp.src(paths.src.html)
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(paths.dist.this))
});

gulp.task('images', function(){
  return gulp.src(paths.src.images)
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(paths.dist.images))
});

gulp.task('fonts', function() {
  return gulp.src(paths.src.fonts)
  .pipe(gulp.dest(paths.dist.fonts))
});

gulp.task('clean:dist', function() {
  return del.sync(paths.dist.this);
});

gulp.task('build', function(callback) {
  runSequence(['clean:dist','sass'],
    ['useref','images','fonts','another-files:src'],
    callback
  )
});
