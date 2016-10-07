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
    // console.log ("%c -> Form Type 3 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this);

    

}





function _init() {

    _getMasterConfigValues.call(this);

}











function _getMasterConfigValues() {

    this.copyArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;

}







FormType3_Ctrl.prototype.load = function () {

    this.dom = HBTemplates.getTemplate('formType3');
	this.parentDOM.find('.form-body').html(this.dom);

	_addMoreCopyButton.call(this);
	_loadCopyArray.call(this, true);

}



function _addMoreCopyButton() {

	let btn = $('<a href="javascript:;" class="btn blue"><i class="fa fa-plus"></i> Add New Copy </a>');
	this.parentDOM.find('.actions').html(btn);

	btn.click(_addMoreCopy.bind(this));

}


function _emptyList() {

    this.dom.html('');
    this.copyCtrlArray = []

}



function _loadCopyArray(onInit) {

    if (!onInit) DisplayGlobals_SRV.getPreviewRef().updateChanges();

    _emptyList.call(this);

	if (this.copyArray.length > 0) {

        $.each( this.copyArray, function( key, item ) {
            this.copyCtrlArray.push(new CopyItem_CTRL(key, item) );
        }.bind(this));

        let self = this;
        this.dom.find('i.fa-close').click( function() {
            // let i = $(this).closest('a.list-group-item').data('arrayid');
            let i = $(this).closest('a.list-group-item').index();
            $(this).closest('a.list-group-item').remove();
            self.copyArray.splice(i,1);
            console.log(i)
            _loadCopyArray.call(self);
        });


	}else{

		this.dom.html('It seems there is no text, click on the button above to Add New Copy.')
	}

}







function _addMoreCopy() {

    //Default model for the copy
	let copyMO = {
                    "id" : 0,
                    "deleted" : false,
                    "visible": 1,
                    "colour":"00ff00",
                    "x":0,
                    "y":470,
                    "width":1920,
                    "size":34,
                    "weight":400,
                    "copy":"Select from the demo dashboards below, or enter your own dashboard ID by hitting ALT + E"
                };

	this.copyArray.push(copyMO);

	_loadCopyArray.call(this);

}	






FormType3_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}

































module.exports = FormType3_Ctrl;