/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const DividerItem_CTRL = require('./dividerItem-ctrl');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType4_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.dividersArray = [];
    this.dividerCtrlArray = [];
    console.log ("%c -> Form Type 4 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this);

}






function _init() {

    _getMasterConfigValues.call(this);

}



function _getMasterConfigValues() {

    this.dividersArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;

}







FormType4_Ctrl.prototype.load = function () {

	this.dom = HBTemplates.getTemplate('formType4');
    this.parentDOM.find('.form-body').html(this.dom);

	// _addPickColors.call(this);
    _addMoreDividersButton.call(this);
    _loadDividerArray.call(this);


}



function _addMoreDividersButton() {

    let btn = $('<a href="javascript:;" class="btn blue"><i class="fa fa-plus"></i> Add New Dividers </a>');
    this.parentDOM.find('.actions').html(btn);

    btn.click(_addMoreDividers.bind(this));

}





function _addMoreDividers() {

    //Default model for the copy
    let dividerMO = {
                    "id" : 0,
                    "deleted" : false,
                    "visible": 1,
                    "colour":"FFFFFF",
                    "x":66,
                    "y":450,
                    "width":1784,
                    "height":2
                }; 

    this.dividersArray.push(dividerMO);
    _loadDividerArray.call(this);

}   






function _loadDividerArray() {

    // console.clear();
    // console.table(this.dividersArray)

    DisplayGlobals_SRV.getPreviewRef().updateChanges();


    _emptyList.call(this);

    if (this.dividersArray.length > 0) {

        $.each( this.dividersArray, function( key, item ) {
            this.dividerCtrlArray.push(new DividerItem_CTRL(key, item) );
        }.bind(this));

        let self = this;
        this.dom.find('i.fa-close').click( function() {
            // let i = $(this).closest('a.list-group-item').data('arrayid');
            let i = $(this).closest('a.list-group-item').index();
            $(this).closest('a.list-group-item').remove();
            self.dividersArray.splice(i,1);
            // console.log(i);
            _loadDividerArray.call(self);
        });


    }else{
        this.dom.html('It seems there is no text, click on the button add copy.')
    }

}


function _emptyList() {

    this.dom.html('');
    this.dividerCtrlArray = [];

}




FormType4_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}











































module.exports = FormType4_Ctrl;