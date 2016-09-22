/*jslint node: true, unused: true, esnext: true */






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


let _version = "0.0.1";


DisplayGlobals.prototype.getVersion = function() {

  return _version;

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
// Editor Reference
//----------------------------

let _editorCtrl; 	

DisplayGlobals.prototype.setEditorRef = function (editorCtrl) {

	_editorCtrl = editorCtrl
  
};


DisplayGlobals.prototype.getEditorRef = function () {

	return _editorCtrl;
  
};























































module.exports = new DisplayGlobals ();
