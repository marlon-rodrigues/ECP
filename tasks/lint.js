var gulp = require('gulp');
var paths = require('./paths');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');



    gulp.task('jshint', function() {
        return gulp.src(paths.source_js)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    });