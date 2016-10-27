'use strict'; /*jslint node: true */

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var cssToJs = require('gulp-css-to-js');
var merge = require('gulp-merge');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


/* --------------------------------------- */
/* DISTRIBUTE TASK                         */

/* Diferent task that need to be run       */
/* to release a distribution version.      */
/* --------------------------------------- */

gulp.task('distribute', function () {

    console.log(">>>>>>>>>>>>>> DISTRIBUTE TASK <<<<<<<<<<<<<<<<<<<");    
    gulp.start('publishprod');

});


/* --------------------------------------- */
/* CSSTOJS TASK */
/* Turns CSS into JS file                  */                            
/* --------------------------------------- */

gulp.task('publishprod', function () {
  
  console.log("======= > CSS TO JS TASK");  
  var scriptStream = gulp.src('app/dev/ssbyo_assets/js/SplashScreenBYO.js')
		.pipe(sourcemaps.init()) 		
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/dev/ssbyo_assets/js/'));                 

});















