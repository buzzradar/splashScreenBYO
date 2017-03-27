/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const CopyItem_CTRL = require('./copyItem-ctrl');
const Utils_SRV = require('../../../services/Utils-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType3_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.copyArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;
    this.copyCtrlArray = [];   

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




function _addMoreCopy() {

    this.copyArray = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;


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





function _loadCopyArray(onInit) {

    //---------------------------------------
    // DEVELOPER NOTE (7/10/2016)
    // In the masterConfig there are elements than can be added, deleted such Copy, dividers and Buttons
    // If those elements come from the DB they will have a unique ID if not id = 0.
    // When they have a unique ID and the user deletes them I need to set delete=true.
    // If the user creates a new element and then decides to delete it we do not need to set deleted=true, we just
    // need to remove it from the Arra because Marius does not need to know about it.
    //---------------------------------------

    if (!onInit) DisplayGlobals_SRV.getPreviewRef().updateChanges();

    _emptyList.call(this);

	if ( _anyVisibleCopy.call(this) ) {

        $.each( this.copyArray, function( key, item ) {
            item.id = Utils_SRV.getJsonVal(0, item.id, "STRING");
            item.deleted = Utils_SRV.getJsonVal('false', item.deleted, "BOOLEAN");
            if (item.deleted === false) {
                item['index'] = key;
                this.copyCtrlArray.push(new CopyItem_CTRL(item) );
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
                self.copyArray.splice(index,1);
            }else{
                let copyMO = _getCopyMO.call(self,id);
                copyMO.deleted = true;
            }

            _loadCopyArray.call(self);

        });


	}else{

		this.dom.html('It seems there is no text, click on the button above to Add New Copy.')
	}

    DisplayGlobals_SRV.onResizeWindow();
    
}





function _emptyList() {

    this.dom.html('');
    this.copyCtrlArray = []

}





function _getCopyMO(id) {

    let ret = false;
    $.each( this.copyArray, function( key, item ) {
        if (item.id === String(id)) {
            ret = item;
        }
    }.bind(this));

    return ret;

}


function _anyVisibleCopy() {

    let ret = false;
    $.each( this.copyArray, function( key, item ) {
        if (!item.deleted) {
            ret = true;
        }
    }.bind(this));

    return ret;

}





FormType3_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}

































module.exports = FormType3_Ctrl;