/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType2_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
    console.log ("%c -> Form Type 2 Constructor. DONE! ", "background:#ff0000;");

}





FormType2_Ctrl.prototype.load = function () {

	this.parentDOM.find('.form-body').html(HBTemplates.getTemplate('formType2'));
	$("[name='logo-switch']").bootstrapSwitch();

}









































module.exports = FormType2_Ctrl;