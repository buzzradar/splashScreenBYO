/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType2_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.vendorLogo = null;
    console.log ("%c -> Form Type 2 Constructor. DONE! ", "background:#ff0000;");
    _init.call(this);

}





function _init() {

	_getMasterConfigValues.call(this);

}



FormType2_Ctrl.prototype.load = function () {

	this.dom = HBTemplates.getTemplate('formType2',this.vendorLogo);

	this.parentDOM.find('.form-body').html(this.dom);
	// $("[name='logo-switch']").bootstrapSwitch();

    _onFocusOut.call(this);

}



function _getMasterConfigValues() {

    this.vendorLogo = DisplayGlobals_SRV.getMasterConfig().AppSplash.vendorLogo;

}



function _onFocusOut() {

    this.dom.find('input').focusout(function() {
        _validate.call(this);
    }.bind(this));

}




function _validate() {

    _validateDimensions.call(this);
    _validatePositions.call(this);

}


function _validateDimensions() {

    //Dimensions
    let dim_w = $.trim(this.dom.find('input[name=dim_w]').val());
    let dim_h = $.trim(this.dom.find('input[name=dim_h]').val());

    if ( dim_w.length > 0 && !isNaN(dim_w) && (!isNaN(dim_h) && !isNaN(dim_h))  )  {
        this.dom.find('input[name=dim_w]').closest('.form-group').removeClass('has-error');
        this.vendorLogo.width = dim_w;
        this.vendorLogo.height = dim_h;
    }else{
        this.error = true;
        this.dom.find('input[name=dim_w]').closest('.form-group').addClass('has-error');
    }

}



function _validatePositions() {

    //Position
    let pos_x = $.trim(this.dom.find('input[name=pos_x]').val());
    let pos_y = $.trim(this.dom.find('input[name=pos_y]').val());

    if ( (pos_x.length > 0 && pos_y.length > 0) && (!isNaN(pos_x) && !isNaN(pos_y)) )  {
        this.dom.find('input[name=pos_x]').closest('.form-group').removeClass('has-error');
        this.vendorLogo.x = pos_x;
        this.vendorLogo.y = pos_y;
    }else{
        this.error = true;
        this.dom.find('input[name=pos_x]').closest('.form-group').addClass('has-error');
    }

}





FormType2_Ctrl.prototype.updateLogoPosition = function (x,y) {

    this.dom.find('input[name=pos_x]').val(x);
    this.dom.find('input[name=pos_y]').val(y);

	this.vendorLogo.x = x;
	this.vendorLogo.y = y;
}
























module.exports = FormType2_Ctrl;