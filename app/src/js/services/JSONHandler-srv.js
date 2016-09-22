/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 




//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _JSONHandler;

function JSONHandler () {

  _JSONHandler = this;

}




JSONHandler.prototype.load = function (jsonURL,onSuccess) {

  console.log("JSONHandler -> loadJSON : " + jsonURL);

    $.ajax({
            dataType: "json",
            url: jsonURL,
            // data: data,
            success: function(jsonObj) {
                console.log("JSON SUCCESS -->", jsonObj);
                onSuccess(jsonObj);
            }
    });

}























module.exports = new JSONHandler ();
