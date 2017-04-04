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

    if ( pos_x <= 1920  &&  pos_y <= 1080 )  {
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







Utils_SRV.prototype.getJsonVal = function (defaultVal, jsonVal, convertTo) {


    let jsonValConverted, isValid = true;



    if (_.isNaN(jsonVal) || _.isNull(jsonVal) || _.isUndefined(jsonVal) || jsonVal == "undefined" || jsonVal == "null") isValid = false;



    if (isValid) {

        switch (convertTo) {

            case "BOOLEAN":

                jsonVal = jsonVal.toString ().toUpperCase ();

                if (jsonVal === "TRUE") { // if we have a true/false string in JSON

                    jsonValConverted = true;

                }else if (jsonVal === "FALSE") {

                    jsonValConverted = false;

                } else if (jsonVal) { // if we have a 0/1 number val in JSON

                    jsonVal = Number(jsonVal);
                    
                    if (jsonVal > 0) {

                        jsonValConverted = true;

                    } else {

                        jsonValConverted = false;
                        
                    }

                }

            break;

            case "NUMBER":

                let s = jsonVal.toString ();

                if (s === "EXPANDFIT") {

                    jsonValConverted = 0;

                } else {

                    s = s.replace(/'/g,"").replace(/,/g,".");
                    jsonVal = Number(s);
                    if (!_.isNaN(jsonVal)) jsonValConverted = jsonVal;

                }

                
            break;

            case "HEX":
                if (jsonVal.length > 5) jsonValConverted = jsonVal.toString ();
            break;

            case "UPPERCASE":
                jsonValConverted = jsonVal.toString ().toUpperCase();
            break;

            default:
                jsonValConverted = jsonVal.toString ();
            break;

        }

        if (jsonValConverted == "null" || jsonValConverted == "NULL") jsonValConverted = defaultVal;

        defaultVal = jsonValConverted;

    }


    return defaultVal;

};






//----------------------------
// Get Transform values from a D3 element
// Developer NOTE: It is important that the element has previously been placed in a diffeent position
// using transform. Otherwise It will not work.
//----------------------------
Utils_SRV.prototype.getTransformValues = function (d3Elem) {

  let translateString = d3Elem.attr('transform');
  translateString = translateString.replace("translate(", "");
  translateString = translateString.replace(")", "");
  let arrayCoordinates = translateString.split(",");
  arrayCoordinates[0] = Number(arrayCoordinates[0]);
  arrayCoordinates[1] = Number(arrayCoordinates[1]);

  // console.log("coordinates->", arrayCoordinates);
  return arrayCoordinates;

}











module.exports = new Utils_SRV ();
