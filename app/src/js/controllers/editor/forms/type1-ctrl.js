/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType1_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.backImage = null;

    console.log ("%c -> Form Type 1 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this)

}








function _init() {

	_getMasterConfigValues.call(this);

}






FormType1_Ctrl.prototype.load = function () {

	this.dom = HBTemplates.getTemplate('formType1');
	this.parentDOM.find('.form-body').html(this.dom);
	$("[name='bg-switch']").bootstrapSwitch();

}





function _getMasterConfigValues() {

    this.backImage = DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage;

}




























module.exports = FormType1_Ctrl;