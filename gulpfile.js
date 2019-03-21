//Variables
var gulp = require('gulp');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var replace = require('gulp-replace');

//File Paths
var sassFiles = 'source/scss/**/*.scss',
    mainSassFile = 'source/scss/style.scss',
    cssFiles = '',
    sourceMaps = '/source/maps',
    styleSheet = '/wp-content/themes/wordpress/style.css';
    currentDate = new Date().toISOString();

//Compile main sass into css
gulp.task('sassy', function(){
  gulp.src(mainSassFile)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)) //Using gulp-sass

    .pipe(sourcemaps.write('/source/maps'))
      .pipe(gulp.dest(cssFiles))
});


//Watch for changes in sass files and running sass compile
gulp.task('watch', function() {
  gulp.watch(sassFiles, ['sassy']);
});

gulp.task('styleVersion', function() {
  var thisVersion = styleSheet + '?v=' + currentDate;

  gulp.src(['header.php'])
    .pipe(replace(styleSheet, thisVersion))
    .pipe(gulp.dest('./'))
});