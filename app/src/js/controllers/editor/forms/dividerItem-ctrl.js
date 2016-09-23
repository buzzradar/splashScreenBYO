/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function DividerItem_Ctrl (key, dividerMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm').find('.list-copy-items');
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
    _addPickColors.call(this);
    // _onFocusOut.call(this);

}



function _addSwitch() {

    this.dividerDOM.find("input[name='divider-switch']").bootstrapSwitch();

}


function _onFocusOut() {

    this.dividerDOM.find('input').focusout(function() {
        this.validate();
    }.bind(this));

}




DividerItem_Ctrl.prototype.validate =  function() {

    _validateCopy.call(this);
    _validateDimensions.call(this);
    _validatePositions.call(this);
    _validateSize.call(this);

}


function _validateCopy() {

    let copy = $.trim(this.dividerDOM.find('input[name=copy]').val());

    if ( copy.length > 0 )  {
        this.dividerDOM.find('input[name=copy]').closest('.form-group').removeClass('has-error');
        this.dividerMO.copy = copy;
    }else{
        this.error = true;
        this.dividerDOM.find('input[name=copy]').closest('.form-group').addClass('has-error');
    }

}



function _validateDimensions() {

    //Dimensions
    let dim_w = $.trim(this.dividerDOM.find('input[name=dim_w]').val());

    if ( dim_w.length > 0 && !isNaN(dim_w) )  {
        this.dividerDOM.find('input[name=dim_w]').closest('.form-group').removeClass('has-error');
        this.dividerMO.width = dim_w;
    }else{
        this.error = true;
        this.dividerDOM.find('input[name=dim_w]').closest('.form-group').addClass('has-error');
    }

}



function _validatePositions() {

    //Position
    let pos_x = $.trim(this.dividerDOM.find('input[name=pos_x]').val());
    let pos_y = $.trim(this.dividerDOM.find('input[name=pos_y]').val());

    if ( (pos_x.length > 0 && pos_y.length > 0) && (!isNaN(pos_x) && !isNaN(pos_y)) )  {
        this.dividerDOM.find('input[name=pos_x]').closest('.form-group').removeClass('has-error');
        this.dividerMO.x = pos_x;
        this.dividerMO.y = pos_y;
    }else{
        this.error = true;
        this.dividerDOM.find('input[name=pos_x]').closest('.form-group').addClass('has-error');
    }

}



function _validateSize() {

    //Size
    let size = $.trim(this.dividerDOM.find('input[name=size]').val());

    if ( size.length > 0 && !isNaN(size) )  {
        this.dividerDOM.find('input[name=size]').closest('.form-group').removeClass('has-error');
        this.dividerMO.size = size;
    }else{
        this.error = true;
        this.dividerDOM.find('input[name=size]').closest('.form-group').addClass('has-error');
    }

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
                    // console.log(hex.substring(1,6));
                    self.dividerMO.colour = hex.substring(1,7);
                }
            },
            theme: 'bootstrap'
        });

    });


}


































module.exports = DividerItem_Ctrl;