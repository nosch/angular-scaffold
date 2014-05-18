var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js')
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var ngmin = require('gulp-ngmin');
var rev = require('gulp-rev');
var connect = require('gulp-connect');
var open = require('gulp-open');

// scaffold paths
var scaffold = {
    sourceDir: './src/',
    testDir: './test/',
    distDir: './dist/',
    templateDir: './src/component/templates/'
};


// ---- concat + minify ----

gulp.task('html2js', function() {
    return gulp.src(scaffold.sourceDir + 'view/*.html')
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

/**
 * @todo replace usemin plugin!
 */
gulp.task('concat', ['html2js'], function () {
    return gulp.src(scaffold.sourceDir + 'index.html')
        .pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
        .pipe(gulp.dest(scaffold.distDir));
});

gulp.task('annotate', ['concat'], function () {
    return gulp.src(scaffold.distDir + 'js/app.min.js')
        .pipe(ngmin())
        .pipe(gulp.dest(scaffold.distDir + 'js/'));
});

gulp.task('minify-js', ['annotate'], function () {
    return gulp.src(scaffold.distDir + 'js/*.js')
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(scaffold.distDir + 'js/'));
});

gulp.task('minify-css', ['minify-js'], function () {
    return gulp.src(scaffold.distDir + 'css/*.css')
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(scaffold.distDir + 'css/'));
});

/**
 * @todo minify-html does not work
 */
gulp.task('minify-html', ['minify-css'], function () {
    return gulp.src(scaffold.distDir + 'index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest(scaffold.distDir));
});


// ---- server ----

gulp.task('connect', function() {
    connect.server({
        root: scaffold.sourceDir,
        host: 'localhost',
        port: 8080,
        livereload: true
    });

    var options = {
        url: "http://localhost:8080"
    };

    gulp.src(scaffold.sourceDir + 'index.html')
        .pipe(open('', options));
});

gulp.task('reload', function () {
    return gulp.src(scaffold.sourceDir + 'index.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([scaffold.sourceDir + '**/*.*'], ['html2js', 'reload']);
});

gulp.task('server', ['html2js', 'connect', 'watch']);
