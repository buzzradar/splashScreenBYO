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
	this.d3SVG_Ctrl.loadBGImage();
	this.d3SVG_Ctrl.loadVendorLogo();
	this.d3SVG_Ctrl.loadCopy();
	this.d3SVG_Ctrl.loadLine();
	this.d3SVG_Ctrl.loadButtons();

	//If Editor Mode Add buttons for each element that can be edited
	if (DisplayGlobals_SRV.getArguments().editor) {
		DisplayGlobals_SRV.setEditorRef( new Editor_CTRL(this.d3SVG_Ctrl) );
	}

	_checkIfPlaylistAvailable.call(this);
	_onPreviewReady.call(this);

};




function _checkIfPlaylistAvailable() {

	if (this.masterConfJSON.hasOwnProperty('autoplay')) {
        if ( Number(this.masterConfJSON.autoplay) == 1 ) _showButtonLaunchPlaylist.call(this);
    }

}


function _showButtonLaunchPlaylist () {
	console.log("Showing the button (LAUNCH AS PLAYLIST)...");
	this.targetDOM.find('.launch-playlist').show();
}



function _onPreviewReady() {

    $('.splScr-16-9').css('background','#eef2f6');

	this.targetDOM.find('.preloader').remove();

}








Preview_Ctrl.prototype.updateChanges = function (d3AlreadyUpdated) {

	//If the D3 SVG is already updated no need to do it again
	//Like for instance the Logo or the copy when the user draggs
	//it.
	if (d3AlreadyUpdated === undefined) d3AlreadyUpdated = false;
	if(!d3AlreadyUpdated)this.d3SVG_Ctrl.updateChanges();

    clearTimeout(this.autoSaveTimeout);

    this.autoSaveTimeout = setTimeout(function() {

		APICalls_SRV.call('POST','save', DisplayGlobals_SRV.getMasterConfig(),function(ret) {
			ret = JSON.parse(ret);
			if (ret.status === "error") {
				Utils_SRV.bootbox('Oops! Something went wrong while trying to save the changes. Please try again later or contact <a href="mailto:support@buzzradar.com">support.</a>');
			}else{
	    		console.log ("%c -> SAVE Succes! => ", "background:#ffff00;", ret);
	    		// DisplayGlobals_SRV.setMasterConfig(ret);
			}

		}.bind(this), 'Saving');

		//Make publish and reset available 
    	$('a.btn-publish').removeClass('disabled');
		$('a.btn-reset-changes').removeClass('disabled');

    },500);

};


Preview_Ctrl.prototype.updateBgImage = function () {

	this.d3SVG_Ctrl.updateBGImage();

};

Preview_Ctrl.prototype.updateLogoImage = function () {

	this.d3SVG_Ctrl.updateLogoImage();

};


Preview_Ctrl.prototype.resetChanges = function () {

	this.d3SVG_Ctrl.resetChanges();

};







Preview_Ctrl.prototype.showLoader = function (label) {

	this.d3SVG_Ctrl.showLoader(label);

}

Preview_Ctrl.prototype.hideLoader = function () {

	this.d3SVG_Ctrl.hideLoader();

}





















module.exports = Preview_Ctrl;