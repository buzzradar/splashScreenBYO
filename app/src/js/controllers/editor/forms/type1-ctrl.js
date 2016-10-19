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
	_onFocusOut.call(this);
	_setupUploadify.call(this);

};





function _getMasterConfigValues() {

    this.backImage = DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage;

}


function _getVisible() {

	let vis = (DisplayGlobals_SRV.getMasterConfig().AppSplash.enabled===1) ? 'checked' : '';
	return vis;

}




function _onFocusOut() {

    this.settingsDom.find('input').focusout(function() {
		DisplayGlobals_SRV.getMasterConfig().AppSplash.name = $('input[name=launcherName]').val();
     	DisplayGlobals_SRV.getPreviewRef().updateChanges();
    }.bind(this));

}



function _setupUploadify() {

	$('#cf_backgroundImageUpload').uploadifive( _getUploadifySettings("BG_"+Date.now(), 3000, 'UPLOAD BG IMAGE') );

}




function _addSwitchButton() {

	$("[name='bg-switch']").bootstrapSwitch();

	$('input[name="bg-switch"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  // console.log(this); // DOM element
	  // console.log(event); // jQuery event
	  // console.log(state); // true | false
	  DisplayGlobals_SRV.getMasterConfig().AppSplash.enabled = Number(state);
      DisplayGlobals_SRV.getPreviewRef().updateChanges();

	});

}




function _getUploadifySettings (imageID, fileSizeLimit, buttonText) {

	return {
		'auto'             : true,
		'multi'            : false,
		'height'           : 30,
		'width'            : 120,
		'buttonClass'  	   : 'upload-btn-class',
		'removeCompleted'  : true, // removes the upload progress view once done
		'uploadLimit'      : 0,
		'queueSizeLimit'   : 0,
		'fileSizeLimit'    : 3000,
		'buttonText'       : buttonText,
		'checkScript'      : DisplayGlobals_SRV.getArguments().phppath+'check-exists.php',
		'queueID'          : 'queue1',
		'uploadScript'     : DisplayGlobals_SRV.getArguments().phppath+'uploadifive-image-only.php',
		'formData'         : { 'imageType' : imageID },
		'onUploadComplete' : function(file, data) { 
			console.log("onUploadComplete Background Success!!!!!!! After this load the image...",data); 
    		DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage.url = DisplayGlobals_SRV.getArguments().uploadspath + data;
    		DisplayGlobals_SRV.getPreviewRef().updateBgImage();

    		DisplayGlobals_SRV.getPreviewRef().updateChanges();
		}
	};

}
    

// 'onUploadComplete' : function(file, data) { UserEditor.onNewImageFatal (BYOglobals.BYOconfigurator, file, data);}




FormType1_Ctrl.prototype.reset = function() {

    _getMasterConfigValues.call(this);

}

















module.exports = FormType1_Ctrl;