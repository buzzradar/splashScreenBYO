/*jslint node: true, unused: true, esnext: true */



const _ = require("lodash");



//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const Legend_CTRL = require('../../controllers/editor/legend-ctrl');
const Form_CTRL = require('../../controllers/editor/formBoss-ctrl');
const APICalls_SRV = require('../../services/APICalls-srv');
const Utils_SRV = require('../../services/Utils-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function Editor_Ctrl (svgCtrl) {

	this.d3SVG_Ctrl = svgCtrl;
	this.legend_Ctrl = null;
	this.form_Ctrl = null;

    // console.log ("%c -> EDITOR LAYER Constructor => ", "background:#ffff00;", this.d3SVG_Ctrl);

	_init.call(this);

}












// ------------------------------------
// Init
// ------------------------------------

function _init() {

	let buttonsArray = [
		{cx:211, cy:245, radius : 40, label : 'General', fill : '#c0c0c0', 'metroColor' : 'blue-oleo', index : 1},
		{cx:1471, cy:150,radius : 40, label : 'Logo', fill : '#c0c0c0', 'metroColor' : 'blue-oleo', index : 2},
		{cx:800, cy:450, radius : 40, label : 'Copy', fill : '#c0c0c0', 'metroColor' : 'blue-oleo', index : 3},
		{cx:1100, cy:450, radius : 40, label : 'Divider', fill : '#c0c0c0', 'metroColor' : 'blue-oleo', index : 4},
		{cx:150, cy:960, radius : 40, label : 'Buttons', fill : '#c0c0c0', 'metroColor' : 'blue-oleo', index : 5},
	];

	DisplayGlobals_SRV.setBottomLegendRef(new Legend_CTRL(this.d3SVG_Ctrl,buttonsArray))
	this.form_Ctrl = new Form_CTRL();
	
	_setupPublishButtons.call(this);


};








Editor_Ctrl.prototype.loadFormSettings = function (id) {

	this.form_Ctrl.loadForm(id);
	
}






function _setupPublishButtons() {

	//PUBLISH
	$('a.btn-publish').confirmation({
	  singleton: true,
	  placement: 'bottom',
	  title : 'Are you sure you want to publish it?',
	  onConfirm: _publish.bind(this),
	  btnOkClass : 'btn-sm green-jungle',
	  btnCancelClass : 'btn-sm default',
	});
	
	//RESET
	$('a.btn-reset-changes').confirmation({
	  singleton: true,
	  placement: 'bottom',
	  title : 'Reset the changes?',
	  onConfirm: _reset.bind(this),
	  btnOkClass : 'btn-sm green-jungle',
	  btnCancelClass : 'btn-sm default',
	});

	_disablePublishResetButtons.call(this);
	
}


function _disablePublishResetButtons() {

	$('a.btn-publish').addClass('disabled');
	$('a.btn-reset-changes').addClass('disabled');

}


function _publish() {

	this.publishChanges();

}


function _reset() {

	APICalls_SRV.call('GET','reset', {},function(ret) {
		if (ret.status === "error") {
			Utils_SRV.bootbox('Oops! Something went wrong while publishing. Please try again later or contact <a href="mailto:support@buzzradar.com">support.</a>');
		}else{
    		console.log ("%c -> RESET Succes! => ", "background:#ffff00;", ret);
    		DisplayGlobals_SRV.setMasterConfig(ret);
		   	//Update the Preview
		    DisplayGlobals_SRV.getPreviewRef().resetChanges();
		    //Update the form on the left hand side
		    this.form_Ctrl.reset();

			_disablePublishResetButtons.call(this);

		}
	}.bind(this));

}



function _isButtonsArrayEmpty() {

	let isEmpty = true;
	let btnsArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.buttons;
	$.each( btnsArray, function( key, item ) {

		if (!item.deleted) isEmpty = false;

	});

	return isEmpty;

}





Editor_Ctrl.prototype.publishChanges = function () {


	if ( !_isButtonsArrayEmpty() ) {

		APICalls_SRV.call('POST','publish', DisplayGlobals_SRV.getMasterConfig(),function(ret) {
			ret = JSON.parse(ret);
			if (ret.status === "error") {
				Utils_SRV.bootbox('Oops! Something went wrong while publishing. Please try again later or contact <a href="mailto:support@buzzradar.com">support.</a>');
			}else if(ret.status === "success"){
	    		console.log ("%c -> PUBLISH Succes! => ", "background:#eb78e1;", ret);
	    		

	    		// DEVELOPER NOTE:
	    		// In previous versions to avoid having an issue when getting a new versions
	    		// back from the server when It was published I use to reload the page that make
	    		// the trick
				// location.reload();


				DisplayGlobals_SRV.setMasterConfig(ret);
			   	//Update the Preview
			    DisplayGlobals_SRV.getPreviewRef().resetChanges();
			    //Update the form on the left hand side
			    this.form_Ctrl.reset();
				_disablePublishResetButtons.call(this);

			}
		}.bind(this), 'Publishing');


	}else{
	    console.log ("%c -> Buttons Array is Empty! ", "background:#ff0000;", "Cannot be published because the array of buttons is empty. Add a button please." );
	}

}






Editor_Ctrl.prototype.updateLogoPosition = function (x,y) {

	this.form_Ctrl.updateLogoPosition(x,y);

}


















module.exports = Editor_Ctrl;