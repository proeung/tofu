var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sassdoc = require('sassdoc');

var paths = {
    styles: [
        './src/scss/style.scss', 
        './src/scss/ie.scss'
    ]
}

gulp.task('css', function () {
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS({}))
        .pipe(rename(function (path) {
             path.basename += ".min";
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'SCSS Compiled!' }));
});

gulp.task('js', function () {

    gulp.src('./src/js/vendor/plugins/*.js')
        .pipe(plumber())
        .pipe(concat('plugins.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js/vendor'))
        .pipe(notify({message: 'Plugins Compiled and Minified!'}));

    gulp.src('./src/js/functionality.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'Compiled <%= file.relative %>!'}));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['css']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/js/vendor/plugins/*.js', ['js']);
    gulp.watch('./src/js/functionality.js', ['js']);
});

gulp.task('default', ['watch']);

gulp.task('compile', ['css', 'js']);
