/*jslint node: true, unused: true, esnext: true */




const _ = require("lodash");
const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 


//--------------------------------------
// CONSTRUCTOR
//--------------------------------------


let _Utils;

function Utils_SRV () {

  _Utils = this;

}










//----------------------------
// Validate Dimensions
//----------------------------


Utils_SRV.prototype.validateDimensions = function (formDOM, objMO) {

    let error = false;

    //Dimensions
    let dim_w = Number($.trim(formDOM.find('input[name=dim_w]').val()));
    let dim_h = Number($.trim(formDOM.find('input[name=dim_h]').val()));

    if ( (dim_w >=0 && dim_w <= 1920 ) &&  (dim_h >=0 && dim_h <= 1080) )  {
        formDOM.find('input[name=dim_w]').closest('.form-group').removeClass('has-error');
        objMO.width = Number(dim_w);
        objMO.height = Number(dim_h);
        formDOM.find('input[name=dim_w]').val(objMO.width);
        formDOM.find('input[name=dim_h]').val(objMO.height);
    }else{
        error = true;
        formDOM.find('input[name=dim_w]').closest('.form-group').addClass('has-error');
    }
  
    return error;

};






//----------------------------
// Validate Position
//----------------------------

Utils_SRV.prototype.validatePositions = function (formDOM, objMO) {

    let error = false;

    //Dimensions
    let pos_x = Number($.trim(formDOM.find('input[name=pos_x]').val()));
    let pos_y = Number($.trim(formDOM.find('input[name=pos_y]').val()));


    if ( (pos_x >=0 && pos_x <= 1920 ) &&  (pos_y >=0 && pos_y <= 1080) )  {
        formDOM.find('input[name=pos_x]').closest('.form-group').removeClass('has-error');

        objMO.x = pos_x;
        objMO.y = pos_y;
        formDOM.find('input[name=pos_x]').val(objMO.x);
        formDOM.find('input[name=pos_y]').val(objMO.y);
    }else{
        error = true;
        formDOM.find('input[name=pos_x]').closest('.form-group').addClass('has-error');
    }
  
    return error;

};



//----------------------------
// Validate Width
//----------------------------


Utils_SRV.prototype.validateWidth = function (formDOM, objMO) {

    let error = false;

    //Dimensions
    let dim_w = Number($.trim(formDOM.find('input[name=dim_w]').val()));

    if ( dim_w >=0 && dim_w <= 1920  )  {
        formDOM.find('input[name=dim_w]').closest('.form-group').removeClass('has-error');
        objMO.width = Number(dim_w);
        formDOM.find('input[name=dim_w]').val(objMO.width);
    }else{
        error = true;
        formDOM.find('input[name=dim_w]').closest('.form-group').addClass('has-error');
    }
  
    return error;

};





//----------------------------
// Add pick colors
//----------------------------


Utils_SRV.prototype.addPickColors = function (property, objMO) {


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
                    objMO[property] = hex.substring(1,7);
                    DisplayGlobals_SRV.getPreviewRef().updateChanges();
                }
            },
            theme: 'bootstrap'
        });

    });

};





//----------------------------
// Validate Transparency
//----------------------------


Utils_SRV.prototype.validateTransparency = function (formDOM, objMO, propertyName) {

    let error = false;
    let transp = Number($.trim(formDOM.find('input[name='+propertyName+']').val()));

    if ( transp >=0 && transp <= 100  )  {
        formDOM.find('input[name='+propertyName+']').closest('.form-group').removeClass('has-error');
        objMO[propertyName] = Number(transp);
        formDOM.find('input[name='+propertyName+']').val(objMO.backgroundTransparent);
    }else{
        error = true;
        formDOM.find('input[name='+propertyName+']').closest('.form-group').addClass('has-error');
    }
  
    return error;

};





//----------------------------
// Validate Single Number
//----------------------------


Utils_SRV.prototype.validateCopySize = function (formDOM, objMO, propertyName) {

    let error = false;
    let transp = Number($.trim(formDOM.find('input[name='+propertyName+']').val()));

    if ( transp >=0 && transp <= 100  )  {
        formDOM.find('input[name='+propertyName+']').closest('.form-group').removeClass('has-error');
        objMO[propertyName] = Number(transp);
        formDOM.find('input[name='+propertyName+']').val(objMO.backgroundTransparent);
    }else{
        error = true;
        formDOM.find('input[name='+propertyName+']').closest('.form-group').addClass('has-error');
    }
  
    return error;

};









//----------------------------
// Display bootbox
//----------------------------


Utils_SRV.prototype.bootbox = function (message) {

    bootbox.dialog({
        message: message,
        buttons: {
            cancel: {
                label: "Close",
                className: "default",
                callback: function () {
                    console.log("callback done!");
                }
            },
        }
    });

};




























module.exports = new Utils_SRV ();
