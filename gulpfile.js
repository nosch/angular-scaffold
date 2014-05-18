var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');

// Project paths
var scaffold = {
    sourceDir: './src/',
    testDir: './test/',
    bowerDir: './bower_components/',
    buildDir: './build/',
    tmpDir: './build/.tmp/',
    assetDir: './build/.tmp/asset/',
    concatDir: './build/.tmp/concat/',
    htmlDir: './build/.tmp/html/',
    distDir: './build/dist/',
    templateDir: './src/component/templates/'
};

gulp.task('html2js', function() {
    gulp.src(scaffold.sourceDir + 'view/*.html')
        .pipe(html2js({
            base: scaffold.sourceDir,
            outputModuleName: 'application.templates',
            useStrict: true,
            quoteChar: '\'',
            indentString: '    ',
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(scaffold.templateDir));
});
