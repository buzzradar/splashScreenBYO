/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function CopyItem_Ctrl (key, copyMO) {

    this.key = key;
    this.parentDOM = $('#splScrEditorForm').find('.list-copy-items');
    this.copyDOM = null;
    this.formError = false;
    this.copyMO = copyMO;       
    this.copyMO['id'] = key;

    _init.call(this);

}





function _init() {

    // console.log("Copy Item--->", this.copyMO);
    _renderView.call(this);

}




function _renderView() {


    this.parentDOM.append(HBTemplates.getTemplate('copy_item', this.copyMO));
    this.copyDOM = this.parentDOM.find('a[data-arrayid='+this.key+']');

    _addPickColors.call(this);
    _onFocusOut.call(this);

}


function _onFocusOut() {

    this.copyDOM.find('input').focusout(function() {
        this.validate();
    }.bind(this));

}




CopyItem_Ctrl.prototype.validate =  function() {

    _validateCopy.call(this);
    _validateDimensions.call(this);
    _validatePositions.call(this);
    _validateSize.call(this);

}


function _validateCopy() {

    let copy = $.trim(this.copyDOM.find('input[name=copy]').val());

    if ( copy.length > 0 )  {
        this.copyDOM.find('input[name=copy]').closest('.form-group').removeClass('has-error');
        this.copyMO.copy = copy;
    }else{
        this.error = true;
        this.copyDOM.find('input[name=copy]').closest('.form-group').addClass('has-error');
    }

}



function _validateDimensions() {

    //Dimensions
    let dim_w = $.trim(this.copyDOM.find('input[name=dim_w]').val());

    if ( dim_w.length > 0 && !isNaN(dim_w) )  {
        this.copyDOM.find('input[name=dim_w]').closest('.form-group').removeClass('has-error');
        this.copyMO.width = Number(dim_w);
    }else{
        this.error = true;
        this.copyDOM.find('input[name=dim_w]').closest('.form-group').addClass('has-error');
    }

}



function _validatePositions() {

    //Position
    let pos_x = $.trim(this.copyDOM.find('input[name=pos_x]').val());
    let pos_y = $.trim(this.copyDOM.find('input[name=pos_y]').val());

    if ( (pos_x.length > 0 && pos_y.length > 0) && (!isNaN(pos_x) && !isNaN(pos_y)) )  {
        this.copyDOM.find('input[name=pos_x]').closest('.form-group').removeClass('has-error');
        this.copyMO.x = Number(pos_x);
        this.copyMO.y = Number(pos_y);
    }else{
        this.error = true;
        this.copyDOM.find('input[name=pos_x]').closest('.form-group').addClass('has-error');
    }

}



function _validateSize() {

    //Size
    let size = $.trim(this.copyDOM.find('input[name=size]').val());

    if ( size.length > 0 && !isNaN(size) )  {
        this.copyDOM.find('input[name=size]').closest('.form-group').removeClass('has-error');
        this.copyMO.size = Number(size);
    }else{
        this.error = true;
        this.copyDOM.find('input[name=size]').closest('.form-group').addClass('has-error');
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
                    self.copyMO.colour = hex.substring(1,7);
                }
            },
            theme: 'bootstrap'
        });

    });


}


































module.exports = CopyItem_Ctrl;