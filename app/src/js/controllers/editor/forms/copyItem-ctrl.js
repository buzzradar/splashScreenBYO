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

function CopyItem_Ctrl (key, copyMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm').find('.list-copy-items');
    this.copyDOM = null;
    this.formError = false;
    this.copyMO = copyMO;       
    this.copyMO['id'] = key;

    _init.call(this);

}





function _init() {

    // console.log("Copy Item--->", this.copyMO);
    _renderView.call(this);

}




function _renderView() {


    this.parentDOM.append(HBTemplates.getTemplate('copy_item', this.copyMO));
    this.copyDOM = this.parentDOM.find('a[data-arrayid='+this.key+']');

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



































module.exports = CopyItem_Ctrl;