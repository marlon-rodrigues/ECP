var gulp = require('gulp');
var paths = require('./paths');
var browserSync = require('browser-sync');
//Call this after build completes
gulp.task('watch', ['serve'], function() {

    // outputs changes to files to the console
    function reportChange(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    gulp.watch(paths.source_js, ['build-js', browserSync.reload]).on('change', reportChange);   
    
    gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);

    gulp.watch(paths.sass, ['build-sass', browserSync.reload]).on('change', reportChange);

    gulp.watch('app/images/**/*', ['build-images', browserSync.reload]).on('change', reportChange);

    gulp.watch('app/fonts/**/*', ['build-fonts', browserSync.reload]).on('change', reportChange);

    gulp.watch('./package.json', ['build-npm-libs', browserSync.reload]).on('change', reportChange);

    gulp.watch('./index.html', ['build-main-html', browserSync.reload]).on('change', reportChange);

});