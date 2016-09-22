/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const D3Handler_CTRL = require('../../services/D3Handler-srv');
const JSONHandler_SRV = require('../../services/JSONHandler-srv');
const Editor_CTRL = require('../../controllers/editor/A01_editor-ctrl');







// ------------------------------------
// Constructor
// ------------------------------------

function Preview_Ctrl (masterConfig, targetDOM) {

	this.d3SVG_Ctrl = null;
	this.masterConfig = masterConfig;
	this.targetDOM = targetDOM;
	this.masterConfJSON = null;

	_init.call(this);

}












// ------------------------------------
// Init
// ------------------------------------

function _init() {

	JSONHandler_SRV.load(this.masterConfig, onMasterConfigLoadedSuccess.bind(this));

};




function onMasterConfigLoadedSuccess(masterConfJSON) {

    console.log ("%c -> Master Config Succesfully Loaded => ", "background:#00ff00;", masterConfJSON);
	this.masterConfJSON = masterConfJSON;
	this.d3SVG_Ctrl =  new D3Handler_CTRL(this.targetDOM.find('.preview'));
	this.d3SVG_Ctrl.loadBGImage(this.masterConfJSON.AppSplash.backImage.url, _onBGLoadedSuccess.bind(this));

}

function _onBGLoadedSuccess() {

	this.d3SVG_Ctrl.loadVendorLogo(this.masterConfJSON.AppSplash.vendorLogo, _onVendorLogoLoadedSuccess.bind(this));

}

function _onVendorLogoLoadedSuccess() {

	this.d3SVG_Ctrl.loadCopy(this.masterConfJSON.AppSplash.copy);
	this.d3SVG_Ctrl.loadLine(this.masterConfJSON.AppSplash.dividers);
	this.d3SVG_Ctrl.loadButtons(this.masterConfJSON.AppSplash.buttons);

	//If Editor Mode Add buttons for each element that can be edited
	if (DisplayGlobals_SRV.getArguments().editor) {
		DisplayGlobals_SRV.setEditorRef( new Editor_CTRL(this.d3SVG_Ctrl) );
	}

	_onPreviewReady.call(this);

}


function _onPreviewReady() {

    $('.splScr-16-9').css('background','#eef2f6');

	this.targetDOM.find('.preloader').remove();

}





































module.exports = Preview_Ctrl;