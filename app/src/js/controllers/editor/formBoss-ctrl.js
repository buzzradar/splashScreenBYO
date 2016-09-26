/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const FormType1_CTRL = require('./forms/type1-ctrl');
const FormType2_CTRL = require('./forms/type2-ctrl');
const FormType3_CTRL = require('./forms/type3-ctrl');
const FormType4_CTRL = require('./forms/type4-ctrl');
const FormType5_CTRL = require('./forms/type5-ctrl');





// ------------------------------------
// Constructor
// ------------------------------------

function FormBoss_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.formArray = [
		{title : 'General Settings', objRef : null},
		{title : 'Vendor Logo Settings', objRef : null},
		{title : 'Subheader Copy', objRef : null},
		{title : 'Dividers', objRef : null},
		{title : 'Buttons', objRef : null},
	];

	_init.call(this);
	
}





function _init() {

	//Load Form Main Layout
	this.parentDOM.html(HBTemplates.getTemplate('formLayout'));

	//Construct all 5 Form Types
	$.each( this.formArray, function( key, item ) {
		item.objRef = eval('new FormType'+(key+1)+'_CTRL()');
	});

	//on Init load the General Settings Form
	this.loadForm(5);	

}



FormBoss_Ctrl.prototype.loadForm = function (id) {

	//Reset the Actions on the Top of the form
	this.parentDOM.find('.actions').html('');

	//Change title
	this.parentDOM.find('.caption-subject').html(this.formArray[id-1].title)

	//Load the form from the object reference
	this.formArray[id-1].objRef.load();

	if (id===2) {
		DisplayGlobals_SRV.getLogoVendorRef().dragable(true);
	}else{
		DisplayGlobals_SRV.getLogoVendorRef().dragable(false);
	}

}




FormBoss_Ctrl.prototype.updateLogoPosition = function (x,y) {

	this.formArray[1].objRef.updateLogoPosition(x,y);

}





































module.exports = FormBoss_Ctrl;