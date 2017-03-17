/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const DividerItem_CTRL = require('./dividerItem-ctrl');
const Utils_SRV = require('../../../services/Utils-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType4_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
    this.dividersArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;
    this.dividerCtrlArray = [];

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

    _addMoreDividersButton.call(this);
    _loadDividerArray.call(this, true);

}



function _addMoreDividersButton() {

    let btn = $('<a href="javascript:;" class="btn blue"><i class="fa fa-plus"></i> Add New Dividers </a>');
    this.parentDOM.find('.actions').html(btn);

    btn.click(_addMoreDividers.bind(this));

}





function _addMoreDividers() {

    this.dividersArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;


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






function _loadDividerArray(onInit) {

    //---------------------------------------
    // DEVELOPER NOTE (7/10/2016)
    // In the masterConfig there are elements than can be added, deleted such Copy, dividers and Buttons
    // If those elements come from the DB they will have a unique ID if not id = 0.
    // When they have a unique ID and the user deletes them I need to set delete=true.
    // If the user creates a new element and then decides to delete it we do not need to set deleted=true, we just
    // need to remove it from the Arra because Marius does not need to know about it.
    //---------------------------------------

    if(!onInit) DisplayGlobals_SRV.getPreviewRef().updateChanges();

    _emptyList.call(this);

    if ( _anyVisibleDividers.call(this) ) {

        this.dividersArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;

        $.each( this.dividersArray, function( key, item ) {
            item.id = Utils_SRV.getJsonVal(0, item.id, "STRING");
            item.deleted = Utils_SRV.getJsonVal('false', item.deleted, "BOOLEAN");
            if (item.deleted === false) {
                item['index'] = key;
                this.dividerCtrlArray.push(new DividerItem_CTRL(item) );
            }
        }.bind(this));

        let self = this;
        this.dom.find('i.fa-close').click( function() {

            let id = $(this).closest('a.list-group-item').data('id');
            let index = $(this).closest('a.list-group-item').data('index');

            $(this).closest('a.list-group-item').remove();
            if ( id === 0 ) {
                //This means the item was added by the app. So It does not have a uniqueID
                //No need to do anything
                //just remove the button from the array
                self.dividersArray.splice(index,1);
            }else{
                let dividerMO = _getDividerMO.call(self,id);
                dividerMO.deleted = true;
            }

            _loadDividerArray.call(self);




        });


    }else{
        this.dom.html('No dividers for this Launcher, please click on the button above to add more.')
    }

}


function _emptyList() {

    this.dom.html('');
    this.dividerCtrlArray = [];

}


function _getDividerMO(id) {

    let ret = false;
    $.each( this.dividersArray, function( key, item ) {
        if (item.id === String(id)) {
            ret = item;
        }
    }.bind(this));

    return ret;

}


function _anyVisibleDividers() {

    let ret = false;
    $.each( this.dividersArray, function( key, item ) {
        if (!item.deleted) {
            ret = true;
        }
    }.bind(this));

    return ret;

}




FormType4_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}











































module.exports = FormType4_Ctrl;