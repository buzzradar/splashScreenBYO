/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const Utils_SRV = require('../../../services/Utils-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function CopyItem_Ctrl (copyMO) {

    this.parentDOM = $('#splScrEditorForm').find('.list-copy-items');
    this.copyDOM = null;
    this.formError = false;
    this.copyMO = copyMO;       
    
    _init.call(this);

}





function _init() {

    // console.log("Copy Item--->", this.copyMO);
    _renderView.call(this);

}




function _renderView() {

    this.copyDOM = HBTemplates.getTemplate('copy_item', this.copyMO);
    this.parentDOM.append(this.copyDOM);

    Utils_SRV.addPickColors('colour', this.copyMO);
    _onFocusOut.call(this);

}


function _onFocusOut() {

    this.copyDOM.find('input').focusout(function() {
        this.validate();
    }.bind(this));

}




CopyItem_Ctrl.prototype.validate =  function() {

    _validateCopy.call(this);
    _validateDimensions.call(this);
    _validatePositions.call(this);
    _validateSize.call(this);

    DisplayGlobals_SRV.getPreviewRef().updateChanges();
    

}


function _validateCopy() {

    let copy = $.trim(this.copyDOM.find('input[name=copy]').val());

    if ( copy.length > 0 )  {
        this.copyDOM.find('input[name=copy]').closest('.form-group').removeClass('has-error');
        this.copyMO.copy = copy;
    }else{
        this.error = true;
        this.copyDOM.find('input[name=copy]').closest('.form-group').addClass('has-error');
    }

}



function _validateDimensions() {

    this.formError = Utils_SRV.validateWidth(this.copyDOM, this.copyMO);

}



function _validatePositions() {

    this.formError = Utils_SRV.validatePositions(this.copyDOM, this.copyMO);

}





function _validateSize() {

    //Size
    let size = $.trim(this.copyDOM.find('input[name=size]').val());

    if ( size.length > 0 && !isNaN(size) )  {
        this.copyDOM.find('input[name=size]').closest('.form-group').removeClass('has-error');
        this.copyMO.size = Number(size);
    }else{
        this.error = true;
        this.copyDOM.find('input[name=size]').closest('.form-group').addClass('has-error');
    }

}



CopyItem_Ctrl.prototype.updateCopyPosition = function (x,y) {

    this.copyDOM.find('input[name=pos_x]').val(x);
    this.copyDOM.find('input[name=pos_y]').val(y);

    this.copyMO.x = x;
    this.copyMO.y = y;

}



CopyItem_Ctrl.prototype.getIndexID = function () {

    return this.copyMO.index;

}



























module.exports = CopyItem_Ctrl;