/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

const gulp = require('gulp')

gulp.task('webpack', () => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')
  return gulp.src('./js/**/*.ts')
    .pipe(webpack(config, require('webpack')))
    .pipe(gulp.dest('../www/js'))


})

gulp.task('less', () => {
  const less = require('gulp-less')
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css'))
})

gulp.task('default', ['webpack', 'less'])


gulp.task('watch', ['webpack', 'less'], () => {
  gulp.watch('less/**/*.less', ['less'])
  gulp.watch('js/**/*.js', ['webpack'])
})