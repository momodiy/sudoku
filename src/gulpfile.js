/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

const gulp = require('gulp')

gulp.task('webpack', () => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')
  gulp.src('./js/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('../www/js'))


})

gulp.task('less', () => {
  const less = require('gulp-less')
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css'))
})

gulp.task('default', ['webpack', 'less'])


gulp.task('watch', ['webpack','less'], () => {
  gulp.watch('less/**/*.less', ['less'])
  gulp.watch('js/**/*.js', ['webpack'])
})