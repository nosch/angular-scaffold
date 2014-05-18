var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');

gulp.task('html2js', function() {
    gulp.src('./src/view/*.html')
        .pipe(html2js({
            base: './src/',
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
        .pipe(gulp.dest('./src/component/templates/'));
});
