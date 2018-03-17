var gulp             = require('gulp')
var sass             = require('gulp-sass')
var log              = require('fancy-log')
var rename           = require('gulp-rename')
var plumber          = require('gulp-plumber')
var cssnano          = require('gulp-cssnano')
var sourcemaps       = require('gulp-sourcemaps')
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.config.js');

var copyPaths = ['*assets/**/*', './src/*.html', '!dist/**/*']

gulp.task('sass', function() {
  return gulp.src('./scss/main.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        log('[sass]', err)
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10
    }))
    .pipe(rename({
      basename: 'bundle'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass-min', ['sass'], function() {
  return gulp.src('./dist/bundle.css')
    .pipe(plumber({
      errorHandler: function(err) {
        log('[sass-min]', err)
      }
    }))
    .pipe(cssnano())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('webpack', function (callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err)
      return log.error('[webpack]', err)
    log('[webpack]', stats.toString())
    callback()
  })
})

gulp.task('webpack-dev-server', function () {
  var compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, webpackConfig.devServer).listen(8080, '127.0.0.1', function(err) {
    if(err)
      return log.error('[webpack-dev-server]', err)
    log('[webpack-dev-server]', 'http://localhost:8080/')
  })
})

gulp.task('copy-assets', function () {
  return gulp.src(copyPaths)
             .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['sass-min', 'copy-assets', 'webpack'])

gulp.task('watch', ['sass-min', 'copy-assets', 'webpack-dev-server'], function() {
  gulp.watch([
    './scss/*.scss',
    './scss/*/*.scss'
  ], [
    'sass',
    'sass-min'
  ])

  gulp.watch(copyPaths, ['copy-assets'])
})