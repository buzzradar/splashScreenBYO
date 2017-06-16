/*jslint node: true, unused: true, esnext: true */




const _ = require("lodash");


//--------------------------------------
// CONSTRUCTOR
//--------------------------------------


let _DisplayGlobals;

function DisplayGlobals () {

  _DisplayGlobals = this;

}
















//--------------------------------------
// version
//--------------------------------------


let _version = "0.85";

DisplayGlobals.prototype.getVersion = function() {

  return _version;

};









//----------------------------
// App Node Ref
//----------------------------

let _appNode;

DisplayGlobals.prototype.setAppNodeRef = function(appNode) {

  _appNode = appNode;

};


DisplayGlobals.prototype.getAppNodeRef = function() {

    return _appNode;

};
















//----------------------------
// Rollbar
//----------------------------

let _rollbar;

DisplayGlobals.prototype.setRollbar = function(rollbarElem) {

  _rollbar = rollbarElem;

};


DisplayGlobals.prototype.getRollbar = function() {

    return _rollbar;

};


DisplayGlobals.prototype.rollbarError = function(error) {

    let route = 'New Customer';
    if (_DisplayGlobals.getArguments().route === "E") route = "Existing Customer";
    if (_DisplayGlobals.getArguments().route === "D") route = "Distributor";

    _rollbar.error("Assistant Error => " +route+ " Vers: " + _version + " => " + error);

};










//----------------------------
// ExternalParams
//----------------------------

let _externalParms;

DisplayGlobals.prototype.setArguments = function(paramsObj) {

  _externalParms = paramsObj;

};


DisplayGlobals.prototype.getArguments = function() {

    return _externalParms;

};


DisplayGlobals.prototype.isDev = function() {

  return _externalParms.dev;

};



















//----------------------------
// Sort out DOM References
//----------------------------

let _scriptTag; 	// resolves to <script> tag
let _mainContentDIV;// resolves to <div> id="bz-mainContent"

DisplayGlobals.prototype.setScriptTag = function (scriptTag) {

  _scriptTag = $(scriptTag);
  _mainContentDIV = $('.page-content');

  // console.log ("%c -> Script Tag : ", "background:#e59400;", _scriptTag);
  // console.log ("%c -> Main Content Div : ", "background:#498ff0;", _mainContentDIV);
  
};

DisplayGlobals.prototype.getScriptTag = function () {

  return _scriptTag;

};

DisplayGlobals.prototype.getParentTag = function () {

  return _appParentTag;

};























//--------------------------------------
// Scale Ratio
//--------------------------------------


let _scaleRatio = 1;


DisplayGlobals.prototype.setScaleRatio = function(new_ratio) {

  _scaleRatio = new_ratio;

};

DisplayGlobals.prototype.getScaleRatio = function() {

  return _scaleRatio;

};


DisplayGlobals.prototype.scaleRatio = function(num) {
  return num / _scaleRatio;
}














//----------------------------
// Master Config
//----------------------------

let _masterConf, _masterConfReset;  

DisplayGlobals.prototype.setMasterConfig = function (masterConf) {

  _masterConf = masterConf
  
};


DisplayGlobals.prototype.getMasterConfig = function () {

  return _masterConf;
  
};


DisplayGlobals.prototype.getMasterConfigReset = function () {

  return _masterConfReset;
  
};
















//----------------------------
// Preview Reference
//----------------------------

let _previewCtr;;  

DisplayGlobals.prototype.setPreviewRef = function (previewCtr) {

  _previewCtr = previewCtr
  
};


DisplayGlobals.prototype.getPreviewRef = function () {

  return _previewCtr;
  
};









//----------------------------
// Editor Reference
//----------------------------

let _editorCtrl; 	

DisplayGlobals.prototype.setEditorRef = function (editorCtrl) {

	_editorCtrl = editorCtrl
  
};


DisplayGlobals.prototype.getEditorRef = function () {

	return _editorCtrl;
  
};








//----------------------------
// Logo Reference
//----------------------------

let _LogoVendorCtrl;  

DisplayGlobals.prototype.setLogoVendorRef = function (LogoVendorCtrl) {

  _LogoVendorCtrl = LogoVendorCtrl
  
};


DisplayGlobals.prototype.getLogoVendorRef = function () {

  return _LogoVendorCtrl;
  
};









//----------------------------
// Copy Reference
// we use this to make sure we only drag the text when the 
// copy section is selected.
//----------------------------

let _CopyCtrl;  

DisplayGlobals.prototype.setCopyRef = function (CopyCtrl) {

  _CopyCtrl = CopyCtrl
  
};


DisplayGlobals.prototype.getCopyRef = function () {

  return _CopyCtrl;
  
};









//----------------------------
// Buttons Reference
// we use this to make sure we only drag the buttons when 
// the buttons section is selected.
//----------------------------

let _ButtonsCtrl;  

DisplayGlobals.prototype.setButtonsRef = function (ButtonsCtrl) {

  _ButtonsCtrl = ButtonsCtrl
  
};


DisplayGlobals.prototype.getButtonsRef = function () {

  return _ButtonsCtrl;
  
};











//----------------------------
// Bottom Legend
//----------------------------

let _bottomLegendCtrl;  

DisplayGlobals.prototype.setBottomLegendRef = function (bottomLegendCtrl) {

  _bottomLegendCtrl = bottomLegendCtrl
  
};


DisplayGlobals.prototype.getBottomLegendRef = function () {

  return _bottomLegendCtrl;
  
};

















//----------------------------
// Array Dashboards IDs
//----------------------------

let _dashboardsIDsArray;  

DisplayGlobals.prototype.setArrayIds = function (dashboardsIDsArray) {

  _dashboardsIDsArray = dashboardsIDsArray
  
};


DisplayGlobals.prototype.getArrayIds = function () {

  return _dashboardsIDsArray;
  
};

















//----------------------------
//Resize Window
//----------------------------

DisplayGlobals.prototype.onResizeWindow = function () {

    let width = $('div.viz-item').width();
    let new_ratio = (width/1920);
    this.setScaleRatio(new_ratio);

    $('div.viz-item').find('.preview').css({
        'transform' : 'scale('+ new_ratio +')',
        'z-index' : '0',
    });
  
};

























module.exports = new DisplayGlobals ();
