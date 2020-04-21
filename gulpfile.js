require('dotenv').config()

//Variables
const gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
prettier = require('gulp-prettier'),
replace = require('gulp-replace'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
zip = require('gulp-zip')

//File Paths
const sassFiles = 'src/scss/**/*.scss',
	mainSassFile = 'src/scss/style.scss',
	cssFiles = '.',
	sourceMaps = '/src/maps',
	styleSheet = `/wp-content/themes/${process.env.THEME_NAME}/style.css`,
	currentDate = new Date().toISOString(),
	buildFiles = {
		folders: ['functions', 'layouts', 'src/fonts', 'src/img', 'src/js'],
		files: ['footer.php', 'functions.php', 'header.php', 'index.php', 'single.php']
	}

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
		open: false
	})

	gulp.watch(sassFiles, sassy)
	gulp.watch([
		'./*.php',
		'./layouts/**/*.php',
		'./partials/**/*.php',
		'./woocommerce/**/*.php',
		'./src/scss/**/*.scss',
	]).on('change', reload)
}

function styleVersion() {
	const thisVersion = styleSheet + '?v=' + currentDate

	return gulp
		.src(['dist/header.php'])
		.pipe(replace(styleSheet, thisVersion))
		.pipe(gulp.dest('./'))
}

function build() {
	sassy();

	buildFiles.folders.forEach(file => {
		gulp.src(`${file}/*`)
	.pipe(gulp.dest(`./dist/${file}`))
	})

	buildFiles.files.forEach(file => {
		gulp.src(`./${file}`)
			.pipe(gulp.dest('./dist/'))
	})

	styleVersion();

	return gulp.src('./dist/**')
		.pipe(zip(`${process.env.THEME_NAME}.zip`))
		.pipe(gulp.dest('.'))
}

exports.sassy = sassy
exports.watch = watch
exports.styleVersion = styleVersion
exports.build = build
