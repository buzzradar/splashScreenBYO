'use strict'; /*jslint node: true */

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var cssToJs = require('gulp-css-to-js');
var merge = require('gulp-merge');
var concat = require('gulp-concat');
// var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');


/* --------------------------------------- */
/* DISTRIBUTE TASK                         */

/* Diferent task that need to be run       */
/* to release a distribution version.      */
/* --------------------------------------- */

gulp.task('distribute', function () {

    console.log(">>>>>>>>>>>>>> DISTRIBUTE TASK <<<<<<<<<<<<<<<<<<<");    
    gulp.start('mini');

});


/* --------------------------------------- */
/* CSSTOJS TASK */
/* Turns CSS into JS file                  */                            
/* --------------------------------------- */

gulp.task('mini', function () {
  
  console.log("======= > MINI IS RUNNING!!!!!");  
  gulp.src('app/dev/ssbyo_assets/js/SplashScreenBYO.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/dev/ssbyo_assets/js/'));                 

});




// gulp.task('sourcemap', function () {
  
//   console.log("======= > SOURCE IS RUNNING!!!!");  
//   return gulp.src('app/dev/ssbyo_assets/js/SplashScreenBYO.js')
// 		.pipe(sourcemaps.init()) 	
// 		.pipe(plumber())	
// 		.pipe(uglify())
// 		.pipe(rename({ suffix: '.min' }))
// 		.pipe(sourcemaps.write('maps'))
// 		.pipe(gulp.dest('app/dev/ssbyo_assets/js/'));                 

// });















