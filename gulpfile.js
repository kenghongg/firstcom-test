/* MODULES */
var
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	order = require('gulp-order'),
	del = require('del'),
	gm = require('gulp-gm'),
	pleeease = require('gulp-pleeease'),
	rename = require('gulp-rename'),
	size = require('gulp-size'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	preprocess = require('gulp-preprocess'),
	inlinesource = require('gulp-inline-source'),
	cdn = require('gulp-cdn'),
	htmlmin = require('gulp-html-minifier'),
	gulpSequence = require('gulp-sequence'),
	replace = require('gulp-replace'),
	removeCode = require('gulp-remove-code'),
	minify = require('gulp-minify'),
	jsonminify = require('gulp-jsonminify'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass');

/* VARIABLES */
var 
	paths = {
		source: 'prod/',
		temp: 'temp/',
		src: 'temp/assets/',
		dest: 'prod/assets/',
	},
	
	ver = '-' + '1.0.1',
  
	html = {
		in: paths.source + '**/*.html',
		out: paths.dest,
		context: {
			version: ver + '.min'
		}
	},

	img = {
		in: [
			paths.src + 'images/*/*',
			paths.src + 'images/*.png', 
			paths.src + 'images/*.jpg',
			paths.src + 'images/*.gif',
		],
		out: paths.dest + 'images/',
	},

	css = {
		in: paths.src + 'css/*.css',
		out: paths.dest + 'css/',
		pleeeaseOpts: {
			autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
			rem: ['16px'],
			pseudoElements: true,
			mqpacker: false,
			minifier: true
		}
	},

	js = {
		in: paths.src + 'js/*.js',
		out: paths.dest + 'js/',
	},
	
	js_bundle = {
		reeficMain: [
			paths.src + "js/general.js"
		],
		reeficMainfilename: 'reeficMain' + ver + '.min.js',
		out: paths.dest + 'js/'
	},
	
	inlinefile = {
		in: paths.temp + '**/*.html',
		out: paths.source
	},
	
	renamepath = {
		in: paths.source + '**/*.html',
		out: paths.source
	};

/* TASKS */
// Build HTML files.
gulp.task('html', function () {
	return gulp.src(html.in)
	.pipe(preprocess({context:html.context}))
	.pipe(gulp.dest(html.out));
});

// Clean the build folder.
gulp.task('clean', function () {
	del([dest + '*']);
});

// Compress images.
gulp.task('img', function () {
	return gulp.src(img.in)
	.pipe(gm(function (gmfile) {
		return gmfile
		.filter('Triangle')
		.define('filter:support=2')
		.unsharp(0.25, 0.25, 8, 0.065)
		.dither()
		.quality(85)
		.samplingFactor('4:2:0')
		.define('jpeg:fancy-upsampling=off')
		.define('png:compression-filter=5')
		.define('png:compression-level=9')
		.define('png:compression-strategy=1')
		.define('png:exclude-chunk=all')
		.interlace('None')
		.colorspace('RGB')
		.strip();
	}))
	.pipe(gulp.dest(img.out));
});

// Minify CSS.
gulp.task('css', function () {
	return gulp.src(css.in)
	.pipe(size({ title: 'CSS in ' }))
	.pipe(pleeease(css.pleeeaseOpts))
	.pipe(rename({
		suffix: ver + '.min'
	}))
	.pipe(size({ title: 'CSS out ' }))
	.pipe(gulp.dest(css.out));
});

// Minify JS.
gulp.task('js', function () {
	return gulp.src(js.in)
	.pipe(size({ title: 'JS in ' }))
	.pipe(stripdebug())
	.pipe(uglify())
	.pipe(rename({
		suffix: ver + '.min'
	}))
	.pipe(size({ title: 'JS out ' }))
	.pipe(gulp.dest(js.out));
});

// Compile common JS into a bundle.
gulp.task('reeficMain_bundle', function () {
	return gulp.src(js_bundle.reeficMain)
	.pipe(concat(js_bundle.reeficMainfilename))
	.pipe(minify({
		ext:{
			min: '.js'
		},
		noSource: true
	}))
	.pipe(gulp.dest(js_bundle.out));
});

gulp.task('alphaChallenge_bundle', function () {
	return gulp.src(js_bundle.alphaChallenge)
	.pipe(concat(js_bundle.alphaChallengefilename))
	.pipe(minify({
		ext:{
			min: '.js'
		},
		noSource: true
	}))
	.pipe(gulp.dest(js_bundle.out));
});

gulp.task("js_bundle", ["reeficMain_bundle"], function () {
});

// Rename Path.
gulp.task("remove_code", function(){
	return gulp.src (inlinefile.in)
	.pipe(removeCode({
		production: true
	}))
	.pipe(gulp.dest(renamepath.out));
});

// Inline CSS.
gulp.task('inline_source', function () {
	return gulp.src(renamepath.in)
	.pipe(inlinesource())
	.pipe(replace('../images/', 'assets/images/'))
	.pipe(replace('../fonts/', 'assets/fonts/'))
	.pipe(gulp.dest(renamepath.out));
});

// HTML Minify.
gulp.task('minify', function() {
	return gulp.src (renamepath.in)
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyJS: true
	}))
	.pipe(gulp.dest(renamepath.out));
});

// JSON Minify.
gulp.task('json_minify', function () {
    return gulp.src(['temp/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('prod/'));
});

// Copy Files.
gulp.task("copy_file", function () {
	gulp.src('temp/assets/js/vendors/*')
		.pipe(gulp.dest('prod/assets/js/vendors/'))
	gulp.src('temp/assets/css/vendors/*')
		.pipe(gulp.dest('prod/assets/css/vendors/'))	
	// gulp.src('temp/assets/fonts/*')
	// 	.pipe(gulp.dest('prod/assets/fonts/'))
});

// Zip Files.

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./temp"
    });

    gulp.watch("temp/assets/scss/**/*.scss", ['sass']);
    gulp.watch("temp/**").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("temp/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("temp/assets/css"))
        .pipe(browserSync.stream());
});

//Gulp publish live.
gulp.task('default', ['serve']);
gulp.task('code', gulpSequence('copy_file', 'css', 'js_bundle', 'remove_code', 'inline_source'));
gulp.task('full', gulpSequence('copy_file', 'css', 'js_bundle', 'remove_code', 'inline_source', 'img'));
