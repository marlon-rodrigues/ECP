var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var paths = require('./paths.js');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('gulp-main-bower-files');
var concat = require('gulp-concat');
//var gnf = require('gulp-npm-files');
//var mainNpmFiles = require('gulp-main-npm-files');

const $ = gulpLoadPlugins();


//minifies javascript files and includes sourcemaps
gulp.task('build-js', function() {
    return gulp.src(paths.source_js)
        .pipe(plumber())
        //.pipe(uglify())
        .pipe(changed(paths.output, { extension: '.js' }))
        .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, { extension: '.html' }))
        .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-main-html', function() {
    return gulp.src('./index.html')
        .pipe(changed(paths.output, { extension: '.html' }))
        .pipe(gulp.dest(paths.output));
});


gulp.task('build-sass', function () {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest(paths.output + '/images'));
});

gulp.task('build-fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest(paths.output + '/fonts'));
});

gulp.task('build-bower', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(gulp.dest(paths.output + '/libs'));
});

// If we decide to use npm instead of bower we have the call ready
/*gulp.task('build-npm-libs', function() {
    return gulp.src(gnf(), {base:'./node_modules'})
    //return gulp.src(mainNpmFiles())
        .pipe(gulp.dest(paths.output + '/libs'));
});*/

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        'build-js',
        
        ['build-main-html', 'build-html', 'build-sass', 'build-images', 'build-fonts', 'build-bower'],
        callback
    );
});
