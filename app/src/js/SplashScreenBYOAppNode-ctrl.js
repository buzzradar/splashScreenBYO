/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('./services/A01_DisplayGlobals-srv'); 
const APICalls_SRV = require('./services/APICalls-srv');
const Rollbar = require('./services/rollbar.umd.nojson.min');
const Preview_CTRL = require('./controllers/preview/preview-ctrl');











//----------------------------
//  Constructor
//----------------------------

function SplashScreenBYOApp_NODE () {

    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> VERSION : ", "background:#eee;", DisplayGlobals_SRV.getVersion() );
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');
    console.log ("%c -> -------------------------------------- ", "background:#eee;", '');



    _setRollbarAccount.call(this);
    _setScriptTagReference.call(this);
    _getArguments.call(this);


}





function _setScriptTagReference() {

    let i, src, scriptTag, scriptsArray = document.scripts;
    
    for (i = 0; i < scriptsArray.length; i++) { // we loop through all script tag references until we come across <script src="SplashScreenBYO.js"> - Immo 26/01/15
        
        src = scriptsArray[i].src;
        if (src.indexOf("SplashScreenBYO") > -1) { // !IMPORTANT <script src="SplashScreenBYO.js"> needs to be called "SplashScreenBYO" 

            scriptTag = scriptsArray[i];
        
        }
    
    }

    console.log("Script tag->", scriptTag);
    DisplayGlobals_SRV.setScriptTag (scriptTag); 

}





function _setRollbarAccount() {

    // let rollbarConfig = {
    //   accessToken: '04bc2808dd1b47c3a63c4e91be9cce1b',
    //   captureUncaught: true,
    //   payload: {
    //     environment: 'production',
    //   }
    // };

    // let rollbar = Rollbar.init(rollbarConfig);
    // DisplayGlobals_SRV.setRollbar(rollbar);

}



function _getArguments() {

    let args = {
        'editor' : DisplayGlobals_SRV.getScriptTag().data('editor'),
    };

    console.log ("%c -> Arguments passed through <script> tag: ", "background:#a0b87a;", args);

    DisplayGlobals_SRV.setArguments(args);

    _startSplashScreenBYO();

}



function _startSplashScreenBYO() {

    //I setup the window events for resize and scroll
    //before I start loading the previews. Then the new size
    //will get set and then I can draw the SVG without any 
    //flickering.
    _setupWindowEvents();
    _loadPreviews();

}



function _setupWindowEvents() {

    $(window).resize(function() {
        _onResizeWindow();
    });
    _onResizeWindow();

}




function _onResizeWindow() {

    let width = $('div.splScr-16-9').width();
    let new_ratio = (width/1920);
    DisplayGlobals_SRV.setScaleRatio(new_ratio);

    $('div.splScr-16-9').find('.preview').css({
        'transform' : 'scale('+ new_ratio +')',
        'z-index' : '0',
    });

}



function _loadPreviews() {

    $( 'div.splScr-16-9' ).each(function( index, item ) {

        let masterConfig = $(item).data('masterconfig');
        let thumbPreview = $(item);

        
        DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfig, thumbPreview) );

    });

}





































module.exports = SplashScreenBYOApp_NODE;



