var appRoot = 'app/';
var contentRoot = 'app/styles/'
var outputRoot = 'dist/';


module.exports = {
    root: appRoot,
    output:outputRoot,
    source_js: appRoot + '**/*.js',
    
    html: appRoot + '**/*.html',
    sass: contentRoot + '**/*.scss'
}