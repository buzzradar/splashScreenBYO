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
    gulp.start('csstojs');

});


/* --------------------------------------- */
/* CSSTOJS TASK */
/* Turns CSS into JS file                  */                            
/* --------------------------------------- */

gulp.task('csstojs', function () {
  
  console.log("======= > CSS TO JS TASK");  
  var scriptStream = gulp.src('app/dev/ssbyo_assets/js/SplashScreenBYO.js')
		.pipe(sourcemaps.init()) 		
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/dev/ssbyo_assets/js/'));                  /* Get the content of SplashScreenBYO.js */
  //var styleStream = gulp.src('app/dev/ssbyo_assets/css/SplashScreenBYO.css').pipe(cssToJs());      /* Get the content fo Styles and turn it into JS */
  //merge(scriptStream, styleStream)                                            /* Merge both files */


		

      //.pipe(concat('SplashScreenBYO_dist.js'))                                   /* Save the File as wizardembed_css.js */
      //.pipe(gulp.dest('app/dev/js'));                                           /* Save the file into app/dev folder */

});















