/*jslint node: true, unused: true, esnext: true */


const DisplayGlobals_SRV = require('./js/services/A01_DisplayGlobals-srv'); 


//----------------------------
// REQUIRE SPLASH SCREEN BYO
//----------------------------


const SplashScreenBYOApp_NODE = require('./js/SplashScreenBYOAppNode-ctrl');


_initApp.call(this);    			


function _initApp() {

	DisplayGlobals_SRV.setAppNodeRef(new SplashScreenBYOApp_NODE());

}