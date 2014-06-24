/*
  gulpfile.js
  Buil script to compile and minify files

  Revision history
  Hemanth Kona, 2014.06.19: created
  Hemanth Kona, 2014.06.20: task added to compile sass and watch for any changes in the file 

*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
	gulp.src('public/stylesheets/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
	gulp.watch('public/stylesheets/style.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
