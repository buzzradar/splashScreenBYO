/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType1_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.backImage = null;

    // console.log ("%c -> Form Type 1 Constructor. DONE! ", "background:#ff0000;");

    _init.call(this)

}








function _init() {

	_getMasterConfigValues.call(this);

}






FormType1_Ctrl.prototype.load = function () {

	this.settingsDom = HBTemplates.getTemplate('formType1', {name: DisplayGlobals_SRV.getMasterConfig().AppSplash.name, visible : _getVisible.call(this) });
	this.parentDOM.find('.form-body').html(this.settingsDom);

	_addSwitchButton.call(this);
	_onFileUploadEvent.call(this);
	_onFocusOut.call(this);

}





function _getMasterConfigValues() {

    this.backImage = DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage;

}


function _getVisible() {

	let vis = (DisplayGlobals_SRV.getMasterConfig().AppSplash.visible===1) ? 'checked' : '';
	return vis;

}




function _onFocusOut() {

    this.settingsDom.find('input').focusout(function() {
		DisplayGlobals_SRV.getMasterConfig().AppSplash.name = $('input[name=launcherName]').val();
     	DisplayGlobals_SRV.getPreviewRef().updateChanges();
    }.bind(this));

}




function _onFileUploadEvent() {

	$('#bg_file').change(function(){

		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {

				DisplayGlobals_SRV.getPreviewRef().updateBgImage(e.target.result);

			};
			reader.readAsDataURL(this.files[0]);	//do not delete
		}

	});


}



function _addSwitchButton() {

	$("[name='bg-switch']").bootstrapSwitch();

	$('input[name="bg-switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  // console.log(this); // DOM element
	  // console.log(event); // jQuery event
	  // console.log(state); // true | false
	  DisplayGlobals_SRV.getMasterConfig().AppSplash.visible = Number(state);
      DisplayGlobals_SRV.getPreviewRef().updateChanges();

	});

}





FormType1_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}

















module.exports = FormType1_Ctrl;