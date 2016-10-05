/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const ButtonItem_CTRL = require('./buttonItem-ctrl');
const ButtonFormItem_CTRL = require('./buttonFormItem-ctrl');
const APICalls_SRV = require('../../../services/APICalls-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType5_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.buttonsArray = [];
    this.buttonCtrlArray = [];
    this.dashboardsIDsArray = [];
    // console.log ("%c -> Form Type 5 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this);

}






function _init() {

    _getMasterConfigValues.call(this);

}



function _getMasterConfigValues() {

    this.buttonsArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.buttons;

}





FormType5_Ctrl.prototype.load = function () {

	this.dom = HBTemplates.getTemplate('formType5');
    this.parentDOM.find('.form-body').html(this.dom);

	// _addPickColors.call(this);
    _addMoreButtonsButton.call(this);
    _loadButtonArray.call(this);


}



function _addMoreButtonsButton() {

    let btn = $('<a href="javascript:;" class="btn blue"><i class="fa fa-plus"></i> Add New Buttons </a>');
    this.parentDOM.find('.actions').html(btn);

    btn.click(_addMoreButtons.bind(this));

}





function _addMoreButtons() {

    //Default model for the copy
    let buttonMO = {
                    "id" : 0,
                    "deleted" : false,
					"visible": 1,
                    "dashboardID": false,
                    "background":"ff00ff",
                    "backgroundTransparent":0,
                    "x":100,
                    "y":100,
                    "width":548,
                    "height":90,
                    "copy": {
                        "text":"Button Label",
                        "size":50,
                        "colour":"404040",
                        "weight":200
                    }
                }; 

    this.buttonsArray.push(buttonMO);
    _loadButtonArray.call(this);


}   






function _loadButtonArray() {

    DisplayGlobals_SRV.getPreviewRef().updateChanges();

    _emptyList.call(this);


    if (this.buttonsArray.length > 0) {

        $.each( this.buttonsArray, function( key, item ) {
        	item.copy.text = _.unescape(item.copy.text);
            this.buttonCtrlArray.push(new ButtonItem_CTRL(key, item) );
        }.bind(this));

        //Remove Button
        let self = this;
        this.dom.find('i.fa-close').click( function() {
            // let i = $(this).closest('a.list-group-item').data('arrayid');
            let i = $(this).closest('a.list-group-item').index();
            $(this).closest('a.list-group-item').remove();
            self.buttonsArray.splice(i,1);
            // console.log(i);
            _loadButtonArray.call(self);
        });

        //Edit Button
        this.dom.find('a.list-group-item').click(function() {
            // let i = $(this).data('arrayid');
            let i = $(this).index();
        	_editButton.call(self,i);
        });


    }else{
        this.dom.html('No buttons added yet!');
    }



}


function _emptyList() {

    this.dom.html('');
    this.buttonCtrlArray = [];

}



function _editButton(i) {

	new ButtonFormItem_CTRL(i, this.buttonsArray[i], DisplayGlobals_SRV.getArrayIds() )

}





FormType5_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}



FormType5_Ctrl.prototype.editButton = function(i) {

    _editButton.call(this,i);

}







































module.exports = FormType5_Ctrl;