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
        
        console.log("The Array of IDs I get from Marius--->", ret.arrayIds)
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

    let width = $('div.viz-item').width();
    let new_ratio = (width/1920);
    DisplayGlobals_SRV.setScaleRatio(new_ratio);

    $('div.viz-item').find('.preview').css({
        'transform' : 'scale('+ new_ratio +')',
        'z-index' : '0',
    });

}



function _loadPreviews() {

    console.log("Load Previews......");

    $( 'div.viz-item' ).each(function( index, item ) {

        let masterConfig = $(item).data('masterconfig');
        let thumbPreview = $(item);



        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");
        // console.log ("%c -> ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!", "background:#FF0000;");

        // // let masterConfJSON = { "AppSplash": { "version": 127, "vendorLogo":{ "url": "http://insights.buzzradar.com/uploads/splash_screen/http://insights.buzzradar.com/uploads/splash_screen/57cee103ba280.png" , "x": 675, "y": 45, "width": 700, "height": 300 }, "backImage":{ "url": "http://insights.buzzradar.com/uploads/splash_screen/http://insights.buzzradar.com/uploads/splash_screen/57ceecb31dc42.png" }, "dividers":[ { "visible": 1, "colour":"707070", "x":66, "y":530, "width":1784, "height":2 } , { "visible": 1, "colour":"707070", "x":66, "y":450, "width":1784, "height":2 } ], "copy":[ { "visible": 1, "colour":"5c5c5c", "x":0, "y":440, "width":1920, "size":70, "weight":400, "copy":"This is some copy I have created through BYO. Great!" } ], "buttons":[ { "visible": 1, "dashboardID":"WUDTZM", "background":"ff00ff", "backgroundTransparent":0, "x":704, "y":815, "width":548, "height":90, "copy": { "text":"1Button Label", "size":50, "colour":"404040", "weight":200 } } , { "visible": 1, "dashboardID":"CZFC4C", "background":"e8277b", "backgroundTransparent":0, "x":1309, "y":815, "width":548, "height":90, "copy": { "text":"Button pink", "size":50, "colour":"ffffff", "weight":200 } } , { "visible": 1, "dashboardID":"C5WV3J", "background":"7bc5e3", "backgroundTransparent":0, "x":81, "y":630, "width":548, "height":90, "copy": { "text":"Button Label", "size":50, "colour":"404040", "weight":200 } } , { "visible": 1, "dashboardID":"CJEMVU", "background":"e61717", "backgroundTransparent":0, "x":81, "y":815, "width":530, "height":90, "copy": { "text":"Button Label Test", "size":40, "colour":"FFFFFF", "weight":50 } } ] }};
        // let masterConfJSON = { "AppSplash": { "name": "Template", "enabled": 0, "vendorLogo":{ "url": "http://09f26c200eee8531f488-b2e97c13c853317d75996e012d775126.r90.cf3.rackcdn.com/splash-screen/LOGO_1481194326893-1481194334.png" , "x": 617, "y": 27, "width": 700, "height": 300 }, "backImage":{ "url": "http://09f26c200eee8531f488-b2e97c13c853317d75996e012d775126.r90.cf3.rackcdn.com/splash-screen/BG_1481194344322-1481194353.png" }, "dividers":[ { "id":26, "visible": 1, "colour":"ffffff", "x":66, "y":530, "width":1784, "height":2, "deleted":false } ], "copy":[ { "id":22, "visible": 1, "colour":"ffffff", "x":0, "y":470, "width":1920, "size":40, "weight":400, "copy":"Select from the demo dashboards below, or enter your own dashboard ID by hitting ALT + E", "deleted":false } ], "buttons":[ ] } };
        // console.log ("%c -> REMOVE THIS ONCE BYO WORKS. This is just for Juan => ", "background:#FF0000;", masterConfJSON);
        // DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfJSON, thumbPreview) );


        



        JSONHandler_SRV.load(masterConfig, function(masterConfJSON) {
            
            //Develper Note, to avoid having disabled Splash Screens I always force them to be enalbed
            masterConfJSON.AppSplash.enabled = 1;

            //Check If there are any buttons
            if(masterConfJSON.AppSplash.buttons === undefined) {
                masterConfJSON.AppSplash.buttons = [];
            }

            
            console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", masterConfJSON);
            console.log(masterConfJSON);
            DisplayGlobals_SRV.setPreviewRef( new Preview_CTRL(masterConfJSON, thumbPreview) );
        }.bind(this));

    });

}





























module.exports = SplashScreenBYOApp_NODE;



