/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function ButtonItem_Ctrl (key, buttonMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm').find('.list-button-items');
    this.btnListDOM = null;
    this.formError = false;
    this.buttonMO = buttonMO;  
    this.buttonMO['index'] = key;     

    _init.call(this);

}





function _init() {

    _renderView.call(this);

}




function _renderView() {


    this.btnListDOM = HBTemplates.getTemplate('button_item', this.buttonMO);
    this.parentDOM.append(this.btnListDOM);


    if (this.buttonMO.dashboardID === false) {
        this.btnListDOM.addClass('no-dashboard');
    }else{
        this.btnListDOM.removeClass('no-dashboard');
    }


}



































module.exports = ButtonItem_Ctrl;