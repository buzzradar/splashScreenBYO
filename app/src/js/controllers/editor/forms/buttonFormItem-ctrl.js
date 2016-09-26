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

function ButtonFormItem_Ctrl (key, buttonMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm');
    this.btnFormDOM = null;
    this.formError = false;
    this.buttonMO = buttonMO;       
    this.buttonMO['id'] = key;

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
        console.log(state)
        self.buttonMO.visible = state;
    });

}


function _addDashboardsIDSelect() {

    let arrayDashboards = ['AAAAAA', 'BBBBB', 'CCCCC', 'DDDDD'];
    let selectHtml = '<select name="dashboardIDSelect" class="form-control"><option data-valid="false" selected>Select a Dashboard ID</option>';

    $.each( arrayDashboards, function( key, item ) {
        selectHtml += '<option data-valid="true">'+item+'</option>';
    }.bind(this));
    selectHtml += '</select>'

    this.btnFormDOM.find('.dashboardID-select').html(selectHtml);

    //onchange

    console.clear();
    console.log($(selectHtml))

    $(selectHtml).change(function() {
        console.log('aaaa')
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

}



function _validateDimensions() {

    this.formError = Utils_SRV.validateDimensions(this.btnFormDOM, this.buttonMO);

}



function _validatePositions() {

    this.formError = Utils_SRV.validatePositions(this.btnFormDOM, this.buttonMO);

}


function _validateTransparency() {

    let transp = Number($.trim(this.btnFormDOM.find('input[name=transp]').val()));

    if ( transp >=0 && transp <=100  )  {
        this.btnFormDOM.find('input[name=transp]').closest('.form-group').removeClass('has-error');
        this.buttonMO.x = Number(transp);
        this.btnFormDOM.find('input[name=transp]').val(transp);
    }else{
        this.error = true;
        this.btnFormDOM.find('input[name=transp]').closest('.form-group').addClass('has-error');
    }

}



function _validateVisible() {



}



function _validateDashboardIDSelect() {

    let optionSelected = this.btnFormDOM.find('select option:selected');

    if (!optionSelected.data('valid')) {
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
                    
                }
            },
            theme: 'bootstrap'
        });

    });


}


































module.exports = ButtonFormItem_Ctrl;