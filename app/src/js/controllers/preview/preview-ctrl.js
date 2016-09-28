/*jslint node: true, unused: true, esnext: true */




const _ = require("lodash");

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

function Preview_Ctrl (masterConfJSON, targetDOM) {

	this.d3SVG_Ctrl = null;
	this.targetDOM = targetDOM;
	this.masterConfJSON = masterConfJSON;

	_init.call(this);

}












// ------------------------------------
// Init
// ------------------------------------

function _init() {

	DisplayGlobals_SRV.setMasterConfig(this.masterConfJSON);
	
	this.d3SVG_Ctrl =  new D3Handler_CTRL(this.targetDOM.find('.preview'));
	this.d3SVG_Ctrl.loadBGImage(this.masterConfJSON.AppSplash.backImage.url, _onBGLoadedSuccess.bind(this));

};




function onMasterConfigLoadedSuccess(masterConfJSON) {

	this.masterConfJSON = masterConfJSON;
	DisplayGlobals_SRV.setMasterConfig(masterConfJSON);

	this.d3SVG_Ctrl =  new D3Handler_CTRL(this.targetDOM.find('.preview'));
	this.d3SVG_Ctrl.loadBGImage(this.masterConfJSON.AppSplash.backImage.url, _onBGLoadedSuccess.bind(this));


}

function _onBGLoadedSuccess() {

	this.d3SVG_Ctrl.loadVendorLogo(this.masterConfJSON.AppSplash.vendorLogo);
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








Preview_Ctrl.prototype.updateChanges = function () {

	this.d3SVG_Ctrl.updateChanges();

}


Preview_Ctrl.prototype.updateBgImage = function (imgObj) {

	this.d3SVG_Ctrl.updateBGImage(imgObj);

}

Preview_Ctrl.prototype.updateLogoImage = function (imgObj) {

	this.d3SVG_Ctrl.updateLogoImage(imgObj);

}


Preview_Ctrl.prototype.resetChanges = function () {

	this.d3SVG_Ctrl.resetChanges();

}























module.exports = Preview_Ctrl;