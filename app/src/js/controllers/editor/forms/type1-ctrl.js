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

function FormType1_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.backImage = null;
	this.preloaderViewFlag = true;

    _init.call(this);

}








function _init() {

	_getMasterConfigValues.call(this);

}


function _getMasterConfigValues() {

    var masterConfig = DisplayGlobals_SRV.getMasterConfig().AppSplash;

    this.backImage = masterConfig.backImage;

    if(!masterConfig.hasOwnProperty('autoplaySettings')){
        masterConfig['autoplaySettings'] = {
            "loader" : {
                "scale" : 100,
                "yOffset" : 0,
                "background" : {
                    "colour" : "444444",
                    "transparent" : 60
                },
                "foreground" : {
                    "colour" : "F6921E",
                    "transparent" : 0
                }
            }
        }
    }

    if(!masterConfig.hasOwnProperty('autoplay')){
        masterConfig['autoplay'] = 0;
    }

}




function _addPlaylistSwitch() {

	_addPreloaderViewCheckbox.call(this);
    
    var masterConfig = DisplayGlobals_SRV.getMasterConfig().AppSplash;
    masterConfig.autoplay = Number(masterConfig.autoplay);

    this.settingsDom.find("input[name='playlist-enabled-switch']").prop( "checked", Boolean(masterConfig.autoplay) );
    this.settingsDom.find("input[name='playlist-enabled-switch']").bootstrapSwitch();

    if (!masterConfig.autoplay) {
 		this.parentDOM.find('.launch-playlist-settings').hide();
 	}else{
 		this.parentDOM.find('.launch-playlist-settings').show();
 	}

    let self = this;
    this.settingsDom.find("input[name='playlist-enabled-switch']").on("switchChange.bootstrapSwitch", function(event, state) {
        masterConfig.autoplay = Number(state);
     	DisplayGlobals_SRV.getPreviewRef().updateChanges();
    
    	_showLaunchAsPlaylistSettings.call(self,state)

    });

}


function _addPreloaderViewCheckbox() {

	let self = this;
	this.settingsDom.find("input.icheck").iCheck({checkboxClass:'icheckbox_minimal-grey'});	
	if( DisplayGlobals_SRV.getPreloaderFlag() ) this.settingsDom.find("input.icheck").iCheck('check');
	this.settingsDom.find("input.icheck").on('ifChecked', function(event){
        DisplayGlobals_SRV.setPreloaderFlag(true);
     	DisplayGlobals_SRV.getPreviewRef().showPreloaderPlaylist();
    }).on('ifUnchecked', function(event) {
        DisplayGlobals_SRV.setPreloaderFlag(false);
     	DisplayGlobals_SRV.getPreviewRef().hidePreloaderPlaylist();
    });

}


function _showLaunchAsPlaylistSettings(show) {

	if (!show) {
 		this.parentDOM.find('.launch-playlist-settings').hide();
     	DisplayGlobals_SRV.getPreviewRef().hidePreloaderPlaylist();
 	}else{
 		this.parentDOM.find('.launch-playlist-settings').show();
     	DisplayGlobals_SRV.getPreviewRef().showPreloaderPlaylist();
 	}

}



FormType1_Ctrl.prototype.load = function () {

	var objToTemplate = {
		name: DisplayGlobals_SRV.getMasterConfig().AppSplash.name, 
		visible : _getVisible.call(this),
		scale : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.scale,
		yoffset : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.yOffset,
		bgcolour : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.background.colour,
		bgopacity : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.background.transparent,
		fgcolour : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.foreground.colour,
		fgopacity : DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.foreground.transparent,
	};

	this.settingsDom = HBTemplates.getTemplate('formType1', objToTemplate);
	this.parentDOM.find('.form-body').html(this.settingsDom);

	// _addSwitchButton.call(this);
	_onFocusOut.call(this,objToTemplate);
	_setupUploadify.call(this);
	_addPlaylistSwitch.call(this);
	_addPickColors.call(this);

};




function _getVisible() {

	let vis = (DisplayGlobals_SRV.getMasterConfig().AppSplash.enabled===1) ? 'checked' : '';
	return vis;

}




function _onFocusOut(objToTemplate) {

	let self = this;
    this.settingsDom.find('input').focusout(function(event) {
		
    	console.log("On focus out ->", $(this).val(), $(this).attr('name') );

    	let inputName = $(this).attr('name');
    	let inputVal = $(this).val();
    	let masterConfig = DisplayGlobals_SRV.getMasterConfig();    
    	let error;

    	switch(inputName){
    		case 'launcherName':
				masterConfig.AppSplash.name = inputVal;
    		break;
    		case 'scale':
    			error = Utils_SRV.validateScale(self.settingsDom, objToTemplate, "scale");
				if (!error) masterConfig.AppSplash.autoplaySettings.loader.scale = inputVal;
    		break;
    		case 'yoffset':
				masterConfig.AppSplash.autoplaySettings.loader.yOffset = inputVal;
    		break;
    		case 'bgopacity':
    			error = Utils_SRV.validateTransparency(self.settingsDom, objToTemplate, "bgopacity");
				if (!error) masterConfig.AppSplash.autoplaySettings.loader.background.transparent = inputVal;
    		break;
            case 'fgopacity':
                error = Utils_SRV.validateTransparency(self.settingsDom, objToTemplate, "fgopacity");
                if (!error) masterConfig.AppSplash.autoplaySettings.loader.foreground.transparent = inputVal;
            break;
    	}

     	DisplayGlobals_SRV.getPreviewRef().updateChanges();

    });

}






function _addPickColors() {

    let self = this;
    let masterConfig = DisplayGlobals_SRV.getMasterConfig();    
    $('input.color-picker').each(function() {

        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function(hex, opacity) {
                if (!hex) return;
                if (opacity) hex += ', ' + opacity;
                if (typeof console === 'object') {
                    let inputName = $(this).attr('name');

                    //Background color
                    if (inputName === "bgcolor"){
						masterConfig.AppSplash.autoplaySettings.loader.background.colour = hex.substring(1,7);
                    }else{
						masterConfig.AppSplash.autoplaySettings.loader.foreground.colour = hex.substring(1,7);
                    }
                    DisplayGlobals_SRV.getPreviewRef().updateChanges();    
                }
            },
            theme: 'bootstrap'
        });

    });


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


function _setupUploadify() {

	$('#cf_backgroundImageUpload').uploadifive( _getUploadifySettings("BG_"+Date.now(), 3000, 'UPLOAD BG IMAGE') );

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