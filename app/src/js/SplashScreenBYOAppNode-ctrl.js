/*jslint node: true, unused: true, esnext: true */



//----------------------------
// REQUIRE  
//----------------------------

const DisplayGlobals_SRV = require('./services/A01_DisplayGlobals-srv'); 
const APICalls_SRV = require('./services/APICalls-srv');
const Rollbar = require('./services/rollbar.umd.nojson.min');
const Preview_CTRL = require('./controllers/preview/preview-ctrl');
const JSONHandler_SRV = require('./services/JSONHandler-srv');










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


}





function _setScriptTagReference() {

    let i, src, scriptTag, scriptsArray = document.scripts;
   
    for (i = 0; i < scriptsArray.length; i++) { // we loop through all script tag references until we come across <script src="SplashScreenBYO.js"> - Immo 26/01/15
        
        if (typeof $(scriptsArray[i]).data('editor') !== undefined ) {    //I go through all the scrips and If I find one that has a data-editor tag then is the one I need. BINGO!!!!!
            scriptTag = scriptsArray[i];
        }
    
    }

    // console.log("Script tag->", scriptTag);
    DisplayGlobals_SRV.setScriptTag (scriptTag); 
    _getArguments.call(this);

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
        // 'dev' : DisplayGlobals_SRV.getScriptTag().data('dev'),
        'editor' : DisplayGlobals_SRV.getScriptTag().data('editor'),
        'arrayids' : DisplayGlobals_SRV.getScriptTag().data('arrayids'),
        'save' : DisplayGlobals_SRV.getScriptTag().data('save'),
        'publish' : DisplayGlobals_SRV.getScriptTag().data('publish'),
        'reset' : DisplayGlobals_SRV.getScriptTag().data('reset'),
        'uploadspath' : DisplayGlobals_SRV.getScriptTag().data('uploadspath'),
        'phppath' : DisplayGlobals_SRV.getScriptTag().data('phppath'),
    };

    console.log ("%c -> Arguments passed through <script> tag: ", "background:#a0b87a;", args);

    DisplayGlobals_SRV.setArguments(args);
    APICalls_SRV.setURLFromArguments();

    if (args.editor) {
        _getDashboardsIDs();
    }else{
        _startSplashScreenBYO();
    }

}



function _getDashboardsIDs() {

    APICalls_SRV.call('GET','arrayids', {},function(ret) {
        
        // console.log("The Array of IDs I get from Marius--->", ret.arrayIds)
        DisplayGlobals_SRV.setArrayIds(ret.arrayIds);
        _startSplashScreenBYO();
      
    });


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
        DisplayGlobals_SRV.onResizeWindow();
    });
    DisplayGlobals_SRV.onResizeWindow();

}




function _onResizeWindow() {

    // let width = $('div.viz-item').width();
    // let new_ratio = (width/1920);
    // DisplayGlobals_SRV.setScaleRatio(new_ratio);

    // $('div.viz-item').find('.preview').css({
    //     'transform' : 'scale('+ new_ratio +')',
    //     'z-index' : '0',
    // });

}



function _loadPreviews() {

    console.log("Load Previews......");

    $( 'div.viz-item' ).each(function( index, item ) {

        let masterConfig = $(item).data('masterconfig');
        let thumbPreview = $(item);

        JSONHandler_SRV.load(masterConfig, function(masterConfJSON) {
            
            //Develper Note, to avoid having disabled Splash Screens I always force them to be enabled
            masterConfJSON.AppSplash.enabled = 1;

            //Check If there are any buttons
            if(masterConfJSON.AppSplash.buttons === undefined) {
                masterConfJSON.AppSplash.buttons = [];
            }

            console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", masterConfJSON);

            DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfJSON, thumbPreview) );
            
        }.bind(this));

    });

}





























module.exports = SplashScreenBYOApp_NODE;



