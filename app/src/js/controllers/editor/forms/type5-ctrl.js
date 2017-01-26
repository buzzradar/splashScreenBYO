/*jslint node: true, unused: true, esnext: true */



const _ = require("lodash");



//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const ButtonItem_CTRL = require('./buttonItem-ctrl');
const ButtonFormItem_CTRL = require('./buttonFormItem-ctrl');
const APICalls_SRV = require('../../../services/APICalls-srv');
const Utils_SRV = require('../../../services/Utils-srv');





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
    _loadButtonArray.call(this, true);


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
                    "dashboardRef": false,
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






function _loadButtonArray(onInit) {


    //---------------------------------------
    // DEVELOPER NOTE (7/10/2016)
    // In the masterConfig there are elements than can be added, deleted such Copy, dividers and Buttons
    // If those elements come from the DB they will have a unique ID if not id = 0.
    // When they have a unique ID and the user deletes them I need to set delete=true.
    // If the user creates a new element and then decides to delete it we do not need to set deleted=true, we just
    // need to remove it from the Array because Marius does not need to know about it.
    //---------------------------------------


    if(!onInit) DisplayGlobals_SRV.getPreviewRef().updateChanges();

    _emptyList.call(this);



    if ( _anyVisibleButtons.call(this) ) {





        $.each( this.buttonsArray, function( key, item ) {
            item.id = Utils_SRV.getJsonVal(0, item.id, "STRING");
            item['dashboardID'] = Utils_SRV.getJsonVal('false', item.dashboardID, "STRING");
            item['dashboardRef'] = Utils_SRV.getJsonVal('false', item.dashboardRef, "STRING");
            item.deleted = Utils_SRV.getJsonVal('false', item.deleted, "BOOLEAN");
            if (item.deleted === false && item.copy) {
        	    item.copy.text = _.unescape(item.copy.text);
                item['index'] = key;
                this.buttonCtrlArray.push(new ButtonItem_CTRL(item) );
            }
        }.bind(this));

        //Remove Button
        let self = this;
        this.dom.find('i.fa-close').click( function() {





            let id = $(this).closest('a.list-group-item').data('id');
            let index = $(this).closest('a.list-group-item').data('index');

            $(this).closest('a.list-group-item').remove();
            if ( id === 0 ) {
                //This means the button was added by the app. So It does not have a uniqueID
                //No need to do anything
                //just remove the button from the array
                self.buttonsArray.splice(index,1);
            }else{
                let btnMO = _getButtonMO.call(self,id);
                btnMO.deleted = true;
            }

            _loadButtonArray.call(self);


            



        });

        //Edit Button
        this.dom.find('a.list-group-item').click(function() {
            let index = $(this).data('index');
        	_editButton.call(self,index);
        });


    }else{
        this.dom.html('No buttons added to the Launcher, click on the button above to add more.');
    }



}


function _emptyList() {

    this.dom.empty();
    this.buttonCtrlArray = [];

}



function _editButton(i) {

	new ButtonFormItem_CTRL(this.buttonsArray[i], DisplayGlobals_SRV.getArrayIds() )

}



function _getButtonMO(id) {

    let ret = false;
    $.each( this.buttonsArray, function( key, item ) {
        if (item.id === String(id)) {
            ret = item;
        }
    }.bind(this));

    return ret;

}



function _anyVisibleButtons() {

    let ret = false;
    $.each( this.buttonsArray, function( key, item ) {
        if (!item.deleted) {
            ret = true;
        }
    }.bind(this));

    return ret;

}



FormType5_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}



FormType5_Ctrl.prototype.editButton = function(i) {

    _editButton.call(this,i);

}







































module.exports = FormType5_Ctrl;