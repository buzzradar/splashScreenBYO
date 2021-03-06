/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');
const Utils_SRV = require('../../../services/Utils-srv');
const APICalls_SRV = require('../../../services/APICalls-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function ButtonFormItem_Ctrl (buttonMO, arrayDashboardIDs) {

    this.arrayDashboardIDs = arrayDashboardIDs;
    this.parentDOM = $('#splScrEditorForm');
    this.btnFormDOM = null;
    this.formError = false;
    this.buttonMO = buttonMO;       


    _init.call(this);

}





function _init() {

    _renderView.call(this);

}



  




function _renderView() {

    this.btnFormDOM = HBTemplates.getTemplate('button_edit_item', this.buttonMO);
    this.parentDOM.find('.list-button-items').html(this.btnFormDOM);

    _addBackButton.call(this);
    _addSwitch.call(this);
    _addPlaylistSwitch.call(this);
    _addBothPickColors.call(this);
    _addDashboardsIDSelect.call(this);
    _onFocusOut.call(this);

}

function _addBackButton() {

    let btn = $('<a href="javascript:;" class="btn default"><i class="fa fa-arrow-left"></i> Back </a>');
    this.parentDOM.find('.actions').html(btn);

    btn.click(_goBack.bind(this));

}


function _goBack() {

    DisplayGlobals_SRV.getEditorRef().loadFormSettings(5);

} 



function _addSwitch() {

    this.btnFormDOM.find("input[name='btn-switch']").prop( "checked", this.buttonMO.visible );
    this.btnFormDOM.find("input[name='btn-switch']").bootstrapSwitch();

    let self = this;
    this.btnFormDOM.find("input[name='btn-switch']").on("switchChange.bootstrapSwitch", function(event, state) {
        self.buttonMO.visible = Number(state);
    });

}


function _addPlaylistSwitch() {

    this.btnFormDOM.find("input[name='btn-playlist-switch']").prop( "checked", this.buttonMO.autoplay.enabled );
    this.btnFormDOM.find("input[name='btn-playlist-switch']").bootstrapSwitch();

    if (this.buttonMO.autoplay.enabled === 0) {
        $('.playlist-properties').hide();
    }

    let self = this;
    this.btnFormDOM.find("input[name='btn-playlist-switch']").on("switchChange.bootstrapSwitch", function(event, state) {
        self.buttonMO.autoplay.enabled = Number(state);
        self.validate();

        if (state == false) {
            $('.playlist-properties').hide();
        }else{
            $('.playlist-properties').show();
        }
    });

}


function _addDashboardsIDSelect() {

    let self = this;
    let arrayDashboards = this.arrayDashboardIDs;
    let selectHtml = '<select name="dashboardIDSelect" class="form-control"><option data-idvalue="false" selected>Select A Dashboard ID</option>';

    $.each( arrayDashboards, function( key, item ) {

        // console.log(self.buttonMO.dashboardID, item.id);

        let selected = ( self.buttonMO.dashboardID === String(item.id) ) ? 'selected' : '';
        selectHtml += '<option data-idvalue="'+item.id+'" '+selected+'>'+item.ref+'</option>';
    }.bind(this));
    selectHtml += '</select>'

    this.btnFormDOM.find('.dashboardID-select').html($(selectHtml));

    //onchange
    this.btnFormDOM.find('select[name=dashboardIDSelect]').on('change', function() {

        var dashID = $(this).find(':selected').data('idvalue');
        if (dashID === false) {
            self.buttonMO.dashboardID = false;
            self.buttonMO.dashboardRef = false;
        }else{
            self.buttonMO.dashboardID = $(this).find(':selected').data('idvalue');
            self.buttonMO.dashboardRef = $(this).find(':selected').val();
        }
        self.validate();

    });  


}


function _onFocusOut() {

    this.btnFormDOM.find('input').focusout(function() {
        this.validate();
    }.bind(this));

}




ButtonFormItem_Ctrl.prototype.validate =  function() {

    _validateDimensions.call(this);
    _validatePositions.call(this);
    _validateTransparency.call(this);
    _validateDashboardIDSelect.call(this);
    _validateCopySize.call(this);
    _validateCopyWeight.call(this);
    _validateCopy.call(this);
    _validatePlaylist.call(this);

    DisplayGlobals_SRV.getPreviewRef().updateChanges();


}



function _validateDimensions() {

    this.formError = Utils_SRV.validateDimensions(this.btnFormDOM, this.buttonMO);

}



function _validatePositions() {

    this.formError = Utils_SRV.validatePositions(this.btnFormDOM, this.buttonMO);

}


function _validateTransparency() {

    this.formError = Utils_SRV.validateTransparency(this.btnFormDOM, this.buttonMO, "backgroundTransparent");

}


function _validateCopySize() {

    let copySize = Number($.trim(this.btnFormDOM.find('input[name=copy-size]').val()));

    if ( copySize >=0 && copySize <= 300  )  {
        this.btnFormDOM.find('input[name=copy-size]').closest('.form-group').removeClass('has-error');
        this.buttonMO.copy.size = Number(copySize);
        this.btnFormDOM.find('input[name=copy-size]').val(this.buttonMO.copy.size);
    }else{
        this.error = true;
        this.btnFormDOM.find('input[name=copy-size]').closest('.form-group').addClass('has-error');
    }

}


function _validateCopyWeight() {

    let copyWeight = Number($.trim(this.btnFormDOM.find('input[name=copy-weight]').val()));

    if ( copyWeight >=0 && copyWeight <= 900  )  {
        this.btnFormDOM.find('input[name=copy-weight]').closest('.form-group').removeClass('has-error');
        this.buttonMO.copy.weight = Number(copyWeight);
        this.btnFormDOM.find('input[name=copy-weight]').val(this.buttonMO.copy.weight);
    }else{
        this.error = true;
        this.btnFormDOM.find('input[name=copy-weight]').closest('.form-group').addClass('has-error');
    }

}



function _validateCopy() {

    let copy = $.trim(this.btnFormDOM.find('input[name=copy]').val());

    if ( copy.length > 0  )  {
        this.btnFormDOM.find('input[name=copy]').closest('.form-group').removeClass('has-error');
        this.buttonMO.copy.text = copy;
        this.btnFormDOM.find('input[name=copy]').val(this.buttonMO.copy.text);
    }else{
        // this.error = true;
        // this.btnFormDOM.find('input[name=copy]').closest('.form-group').addClass('has-error');
        this.btnFormDOM.find('input[name=copy]').closest('.form-group').removeClass('has-error');
        this.buttonMO.copy.text = copy;
        this.btnFormDOM.find('input[name=copy]').val(this.buttonMO.copy.text);
    }

}



function _validatePlaylist() {

    if (this.buttonMO.autoplay.enabled) {

        //Position
        let playlistPos = Number($.trim(this.btnFormDOM.find('input[name=playlist-pos]').val()));
        if ( playlistPos >=0 && playlistPos <= 200  )  {
            this.btnFormDOM.find('input[name=playlist-pos]').closest('.form-group').removeClass('has-error');
            this.buttonMO.autoplay.playpos = Number(playlistPos);
            this.btnFormDOM.find('input[name=playlist-pos]').val(this.buttonMO.autoplay.playpos);
        }else{
            this.error = true;
            this.btnFormDOM.find('input[name=playlist-pos]').closest('.form-group').addClass('has-error');
        }

        //Seconds
        let playlistSeconds = Number($.trim(this.btnFormDOM.find('input[name=playlist-mins]').val()));
        if ( playlistSeconds >=0 && playlistSeconds <= 1200  )  {
            this.btnFormDOM.find('input[name=playlist-mins]').closest('.form-group').removeClass('has-error');
            this.buttonMO.autoplay.seconds = Number(playlistSeconds);
            this.btnFormDOM.find('input[name=playlist-mins]').val(this.buttonMO.autoplay.seconds);
        }else{
            this.error = true;
            this.btnFormDOM.find('input[name=playlist-mins]').closest('.form-group').addClass('has-error');
        }

    }

}



function _validateVisible() {

    


}



function _validateDashboardIDSelect() {

    let optionSelected = this.btnFormDOM.find('select option:selected');

    if (!optionSelected.data('idvalue')) {
        this.btnFormDOM.find('select option:selected').closest('.form-group').addClass('has-error');   
    }else{
        this.btnFormDOM.find('select option:selected').closest('.form-group').removeClass('has-error');   
    }

}



function _addBothPickColors() {

    let self = this;
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
                    if (inputName === 'background') {
                        self.buttonMO.background = hex.substring(1,7);
                    }else{  //Copy color
                        self.buttonMO.copy.colour = hex.substring(1,7);
                    }

                    DisplayGlobals_SRV.getPreviewRef().updateChanges();

                    
                }
            },
            theme: 'bootstrap'
        });

    });


}































module.exports = ButtonFormItem_Ctrl;