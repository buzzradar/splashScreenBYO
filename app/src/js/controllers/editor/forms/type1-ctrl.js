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

    console.log ("%c -> Form Type 1 Constructor. DONE! ", "background:#ff0000;");

}










FormType1_Ctrl.prototype.load = function () {

	this.parentDOM.find('.form-body').html(HBTemplates.getTemplate('formType1'));
	$("[name='bg-switch']").bootstrapSwitch();

}




































module.exports = FormType1_Ctrl;