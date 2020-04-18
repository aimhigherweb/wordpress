require('dotenv').config()

//Variables
var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var prettier = require('gulp-prettier')
var replace = require('gulp-replace')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

//File Paths
var sassFiles = 'src/scss/**/*.scss',
	mainSassFile = 'src/scss/style.scss',
	cssFiles = '.',
	sourceMaps = '/src/maps',
	styleSheet = `/wp-content/themes/${process.env.THEME_NAME}/style.css`
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
		port: process.env.PORT || 3000,
		proxy: process.env.WP_URL,
	})

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		'./*.php',
		'./layouts/**/*.php',
		'./partials/**/*.php',
		'./woocommerce/**/*.php',
		'./source/scss/**/*.scss',
	]).on('change', reload)
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
