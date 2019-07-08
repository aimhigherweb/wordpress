//Variables
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var prettier = require('gulp-prettier')
var replace = require('gulp-replace')
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

//File Paths
var sassFiles = 'source/scss/**/*.scss',
	mainSassFile = 'source/scss/style.scss',
	cssFiles = '.',
	sourceMaps = '/source/maps',
	styleSheet = '/wp-content/themes/wordpress/style.css'
currentDate = new Date().toISOString()

//Compile main sass into css
function sassy() {
	return gulp
		.src(mainSassFile)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) //Using gulp-sass
		.pipe(sourcemaps.write(sourceMaps))
		.pipe(gulp.dest(cssFiles))
}

//Watch for changes in sass files and running sass compile
function watch() {
	browserSync.init({
		proxy: 'http://wordpress.local'
	  });

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		"./*.php",
		"./layouts/**/*.php",
		"./parts/**/*.php",
		"./woocommerce/**/*.php",
		"./source/scss/**/*.scss"
	]).on("change", reload)
}

function styleVersion() {
	var thisVersion = styleSheet + '?v=' + currentDate

	return gulp
		.src(['header.php'])
		.pipe(replace(styleSheet, thisVersion))
		.pipe(gulp.dest('./'))
}

exports.sassy = sassy
exports.watch = watch
exports.styleVersion = styleVersion
