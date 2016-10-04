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
        self.buttonMO.visible = state;
    });

}


function _addDashboardsIDSelect() {

    let self = this;
    APICalls_SRV.call('arrayids', {},function(ret) {
        
        let arrayDashboards = ret.arrayIds;
        let selectHtml = '<select name="dashboardIDSelect" class="form-control"><option data-idvalue="false" selected>Select a Dashboard ID</option>';

        $.each( arrayDashboards, function( key, item ) {
            let selected = (self.buttonMO.dashboardID === item) ? 'selected' : '';
            selectHtml += '<option data-idvalue="'+item+'" '+selected+'>'+item+'</option>';
        }.bind(this));
        selectHtml += '</select>'

        this.btnFormDOM.find('.dashboardID-select').html($(selectHtml));

        //onchange
        this.btnFormDOM.find('select[name=dashboardIDSelect]').on('change', function() {
            self.buttonMO.dashboardID = $(this).find(':selected').data('idvalue');
            self.validate();
        });  
        
    }.bind(this), 'Getting Ids');





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
        this.error = true;
        this.btnFormDOM.find('input[name=copy]').closest('.form-group').addClass('has-error');
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