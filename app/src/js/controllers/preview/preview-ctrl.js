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
const APICalls_SRV = require('../../services/APICalls-srv');
const Utils_SRV = require('../../services/Utils-srv');







// ------------------------------------
// Constructor
// ------------------------------------

function Preview_Ctrl (masterConfJSON, targetDOM) {

	this.d3SVG_Ctrl = null;
	this.targetDOM = targetDOM;
	this.masterConfJSON = masterConfJSON;
    this.autoSaveTimeout = setTimeout(function() {});


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

	// console.log(DisplayGlobals_SRV.getMasterConfig().AppSplash)

	this.d3SVG_Ctrl.updateChanges();

    clearTimeout(this.autoSaveTimeout);

    this.autoSaveTimeout = setTimeout(function() {
        console.log("now you can update the server");
		APICalls_SRV.call('save', DisplayGlobals_SRV.getMasterConfig(),function(ret) {
			if (ret.status === "error") Utils_SRV.bootbox('Oops! Something went wrong while trying to save the changes. Please try again later or contact <a href="mailto:support@buzzradar.com">support.</a>');
		}.bind(this), 'Saving');
    },500);



}


Preview_Ctrl.prototype.updateBgImage = function (imgObj) {

	this.d3SVG_Ctrl.updateBGImage(imgObj);

}

Preview_Ctrl.prototype.updateLogoImage = function (imgObj) {

	this.d3SVG_Ctrl.updateLogoImage(imgObj);

}


Preview_Ctrl.prototype.resetChanges = function () {

	console.log("PREVIEW => Reset all changes....")
	this.d3SVG_Ctrl.resetChanges();

}







Preview_Ctrl.prototype.showLoader = function (label) {

	this.d3SVG_Ctrl.showLoader(label);

}

Preview_Ctrl.prototype.hideLoader = function () {

	this.d3SVG_Ctrl.hideLoader();

}















module.exports = Preview_Ctrl;