var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('ejs', function(){
  return gulp.src('./src/views/pages/*.ejs')
   .pipe(ejs({}, {ext:'.html'}))
   .pipe(gulp.dest('build/'))
});

gulp.task('styles', function(){
  gulp.src(['./src/scss/layout.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['ejs', 'jshint', 'styles', 'connect'], function() {
	gulp.watch("./src/scss/*.scss", ['styles']);
	gulp.watch("./src/views/partials/*.ejs", ['ejs']);
});
