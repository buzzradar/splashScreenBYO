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

function DividerItem_Ctrl (key, dividerMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm').find('.list-divider-items');
    this.dividerDOM = null;
    this.formError = false;
    this.dividerMO = dividerMO;       
    this.dividerMO['id'] = key;

    _init.call(this);

}





function _init() {

    _renderView.call(this);

}




function _renderView() {


    this.parentDOM.append(HBTemplates.getTemplate('divider_item', this.dividerMO));
    this.dividerDOM = this.parentDOM.find('a[data-arrayid='+this.key+']');

    _addSwitch.call(this);
    Utils_SRV.addPickColors('colour', this.dividerMO);
    _onFocusOut.call(this);

}



function _addSwitch() {

    this.dividerDOM.find("input[name='divider-switch']").prop( "checked", this.dividerMO.visible );
    this.dividerDOM.find("input[name='divider-switch']").bootstrapSwitch();

    let self = this;
    this.dividerDOM.find("input[name='divider-switch']").on("switchChange.bootstrapSwitch", function(event, state) {
        self.dividerMO.visible = state;
    });

}


function _onFocusOut() {

    this.dividerDOM.find('input').focusout(function() {
        this.validate();
    }.bind(this));

}




DividerItem_Ctrl.prototype.validate =  function() {

    _validateDimensions.call(this);
    _validatePositions.call(this);
    
    DisplayGlobals_SRV.getPreviewRef().updateChanges();


}



function _validateDimensions() {

    this.formError = Utils_SRV.validateDimensions(this.dividerDOM, this.dividerMO);

}



function _validatePositions() {

    this.formError = Utils_SRV.validatePositions(this.dividerDOM, this.dividerMO);

}



function _validateVisible() {



}




function _addPickColors() {

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
                    // console.log(hex.substring(1,7));
                    self.dividerMO.colour = hex.substring(1,7);
                    DisplayGlobals_SRV.getPreviewRef().updateChanges();

                }
            },
            theme: 'bootstrap'
        });

    });


}


































module.exports = DividerItem_Ctrl;