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
        'editor' : DisplayGlobals_SRV.getScriptTag().data('editor'),
        'arrayids' : DisplayGlobals_SRV.getScriptTag().data('arrayids'),
        'save' : DisplayGlobals_SRV.getScriptTag().data('save'),
        'publish' : DisplayGlobals_SRV.getScriptTag().data('publish'),
        'reset' : DisplayGlobals_SRV.getScriptTag().data('reset'),
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



        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");

        // let masterConfJSON = { "AppSplash": { "name" : "Name of the Splash Screen","visible" : 1, "version": 62, "vendorLogo":{ "url": "http://insights.buzzradar.com/uploads/splash_screen/57d1420c1d043.svg" , "x": 510, "y": 60, "width": 900, "height": 302 }, "backImage":{ "url": "http://insights.buzzradar.com/uploads/splash_screen/57d143035121e.jpg" }, "dividers":[ { "id" : 11111, "visible": 1, "colour":"FFFFFF", "x":66, "y":450, "width":1784, "height":2, "deleted" : false, } ], "copy":[ { "id" : 11111, "visible": 1, "colour":"FFFFFF", "x":0, "y":470, "width":1920, "size":34, "weight":400, "copy":"Select from the demo dashboards below, or enter your own dashboard ID by hitting ALT + E", "deleted" : false, } ], "buttons":[ { "id" : 11111, "visible": 1, "dashboardID":"GO5RJV", "background":"F6921E", "backgroundTransparent":0, "x":81, "y":630, "width":548, "height":90, "copy": { "text":"Expired2", "size":50, "colour":"404040", "weight":200 }, "deleted" : false, } , { "id" : 22222, "visible": 1, "dashboardID":"BLCQSE", "background":"F6921E", "backgroundTransparent":0, "x":704, "y":630, "width":530, "height":90, "copy": { "text":"iSKO", "size":50, "colour":"404040", "weight":200 }, "deleted" : false, } , { "id" : 3333, "visible": 1, "dashboardID":"BEJJN7", "background":"F6921E", "backgroundTransparent":0, "x":1309, "y":630, "width":530, "height":90, "copy": { "text":"GoPro", "size":50, "colour":"404040", "weight":200 }, "deleted" : false, } , { "id" : 4444, "visible": 1, "dashboardID":"GUULPR", "background":"F6921E", "backgroundTransparent":0, "x":81, "y":815, "width":548, "height":90, "copy": { "text":"Marks &amp; Spencer", "size":50, "colour":"404040", "weight":200 }, "deleted" : false, } , { "id" : 55555, "visible": 1, "dashboardID":"BPS0AR", "background":"F6921E", "backgroundTransparent":0, "x":1309, "y":815, "width":530, "height":90, "copy": { "text":"Premier League", "size":50, "colour":"404040", "weight":200 }, "deleted" : false, } ] }};
        // console.log ("%c -> REMOVE THIS ONCE BYO WORKS. This is just for Juan => ", "background:#FF0000;", masterConfJSON);
        // DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfJSON, thumbPreview) );






        JSONHandler_SRV.load(masterConfig, function(masterConfJSON) {
            console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", masterConfJSON);
            console.log(masterConfJSON);
            DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfJSON, thumbPreview) );
        }.bind(this));

    });

}





























module.exports = SplashScreenBYOApp_NODE;



