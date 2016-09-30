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

function FormType2_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.vendorLogo = null;
    // console.log ("%c -> Form Type 2 Constructor. DONE! ", "background:#ff0000;");
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
    _onFileUploadEvent.call(this);

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

    DisplayGlobals_SRV.getPreviewRef().updateChanges();

}


function _validateDimensions() {

    this.formError = Utils_SRV.validateDimensions(this.dom, this.vendorLogo);

}



function _validatePositions() {

    this.formError = Utils_SRV.validatePositions(this.dom, this.vendorLogo);

}





FormType2_Ctrl.prototype.updateLogoPosition = function (x,y) {

    this.dom.find('input[name=pos_x]').val(x);
    this.dom.find('input[name=pos_y]').val(y);

	this.vendorLogo.x = x;
	this.vendorLogo.y = y;
}



function _onFileUploadEvent() {

    $('#logoVendor_file').change(function(){

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                // DisplayGlobals_SRV.getPreviewRef().updateLogoImage(e.target.result);

            };
            reader.readAsDataURL(this.files[0]);    //do not delete
        }

    });


}


FormType2_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}

















module.exports = FormType2_Ctrl;