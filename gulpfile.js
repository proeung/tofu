var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var paths = {
    styles: ['./css/scss/style.scss', './css/scss/ie.scss']
}

gulp.task('css', function ()
{
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifycss())
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulp.dest('css'))
        .pipe(notify({message: 'SCSS Compiled!'}));
});

gulp.task('js', function ()
{

    gulp.src('./js/vendor/plugins/*.js')
        .pipe(plumber())
        .pipe(concat('plugins.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./js/vendor'))
        .pipe(notify({message: 'Plugins Compiled and Minified!'}));

    gulp.src('./js/functionality.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js'))
        .pipe(notify({message: 'JS Compiled!'}));
});

gulp.task('watch', function ()
{
    gulp.watch('./css/scss/*.scss', ['css']);
    gulp.watch('./css/scss/**/*.scss', ['css']);
    gulp.watch('./js/vendor/plugins/*.js', ['js']);
    gulp.watch('./js/functionality.js', ['js']);
});

gulp.task('default', ['watch']);