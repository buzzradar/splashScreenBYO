/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType3_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.copyArray = [
		{id:1},
	];
    console.log ("%c -> Form Type 3 Constructor. DONE! ", "background:#ff0000;");

}







FormType3_Ctrl.prototype.load = function () {

	this.parentDOM.find('.form-body').html(HBTemplates.getTemplate('formType3'));

	_addMoreCopyButton.call(this);
	_loadCopyArray.call(this);

}



function _addMoreCopyButton() {

	let btn = $('<a href="javascript:;" class="btn blue"><i class="fa fa-plus"></i> Add New Copy </a>');
	this.parentDOM.find('.actions').html(btn);

	btn.click(_addMoreCopy.bind(this));

}


function _loadCopyArray() {

	$.each( this.copyArray, function( key, item ) {
		this.parentDOM.find('.list-copy-items').append(HBTemplates.getTemplate('copy_item'));
	}.bind(this));

	let copyFormObj = this;
	this.parentDOM.find('i.fa-close').click( function() {
		let arrayIndex = $(this).closest('a.list-group-item').data('arrayid');
		$(this).closest('a.list-group-item').remove();
		console.log(arrayIndex);
	});

}


function _addMoreCopy() {

	this.parentDOM.find('.list-copy-items').append(HBTemplates.getTemplate('copy_item'));

}	


function _deleteCopy() {

	

}
































module.exports = FormType3_Ctrl;