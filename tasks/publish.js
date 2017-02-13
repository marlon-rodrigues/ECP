var gulp = require('gulp');
var durandal = require('gulp-durandal');

//IGNORE THIS FOR NOW

gulp.task('durandal', function(){
    durandal({
        baseDir: 'app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
        output: 'main.js', //same as default, so not really required.
        almond: true,
        minify: true
    })
     .pipe(gulp.dest('release'));
});