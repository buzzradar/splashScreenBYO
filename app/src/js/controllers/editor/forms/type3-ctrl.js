/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const CopyItem_CTRL = require('./copyItem-ctrl');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType3_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.copyArray = [];
    this.copyCtrlArray = [];   
    console.log ("%c -> Form Type 3 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this);

    

}





function _init() {

    _getMasterConfigValues.call(this);

}











function _getMasterConfigValues() {

    this.copyArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;

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


function _emptyList() {

    this.parentDOM.find('.list-copy-items').html('');
    this.copyCtrlArray = []

}



function _loadCopyArray() {

    _emptyList.call(this);

	if (this.copyArray.length > 0) {

        $.each( this.copyArray, function( key, item ) {
            this.copyCtrlArray.push(new CopyItem_CTRL(key, item) );
        }.bind(this));

        let self = this;
        this.parentDOM.find('i.fa-close').click( function() {
            let i = $(this).closest('a.list-group-item').data('arrayid');
            $(this).closest('a.list-group-item').remove();
            self.copyArray.splice(i,1);
            console.log(i)
            _loadCopyArray.call(self);
        });


	}else{
		this.parentDOM.find('.list-copy-items').html('It seems there is no text, click on the button add copy.')
	}

}







function _addMoreCopy() {

    //Default model for the copy
	let copyMO = {
                    "visible": 1,
                    "colour":"FFFFFF",
                    "x":0,
                    "y":470,
                    "width":1920,
                    "size":34,
                    "weight":400,
                    "copy":"Select from the demo dashboards below, or enter your own dashboard ID by hitting ALT + E"
                };

	this.copyArray.push(copyMO);

    console.table(this.copyArray);

	_loadCopyArray.call(this);

}	








































module.exports = FormType3_Ctrl;