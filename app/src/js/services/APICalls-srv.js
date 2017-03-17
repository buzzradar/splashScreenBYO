/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _ApiCalls;

function ApiCalls () {

  _ApiCalls = this;


}




ApiCalls.prototype.setURLFromArguments = function () {

  this.URLs = {
  	
  	arrayids : DisplayGlobals_SRV.getArguments().arrayids,
  	save : DisplayGlobals_SRV.getArguments().save,
  	publish : DisplayGlobals_SRV.getArguments().publish,
  	reset : DisplayGlobals_SRV.getArguments().reset,

  }

}




















ApiCalls.prototype.call = function (type, labelCall, dataObj, callBack, label,  delay) {

	var urlCall = this.URLs[labelCall];

	//If delay not set, should be 0
	delay = (!delay) ? 0 : delay;
	if(label) DisplayGlobals_SRV.getPreviewRef().showLoader(label + "...");
	
	setTimeout(function() {
        
		_fatalCall(type, urlCall,labelCall, dataObj, callBack, label, delay);

    }.bind(this),delay);














};











function _fatalCall(type, urlCall,labelCall, dataObj, callBack, label, delay) {


	if (type === 'GET') {

		//-------------
		//GET
		//-------------


		console.log ("%c -> ", "background:#87eb9d;", "APICalls-> GET ("+labelCall+") : URL =>" , urlCall, dataObj);


		$.ajax({
			type: 'GET',
			url: urlCall,
			async: false,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				if(callBack) callBack(json);
			},
			error: function(e) {
				console.log ("%c -> ", "background:#ff0000;", "GET APICalls.ajaxCall() ---> Error" + e.responseText);
			}
		});

	}else{

		//-------------
		//POST
		//-------------

		console.log ("%c -> ", "background:#c5f442;", "APICalls-> POST ("+labelCall+") : URL =>" , urlCall, dataObj);


		$.post(urlCall, dataObj)
			.done(function( data ) {
					// console.log ("%c -> ", "background:#87eb9d;", "APICalls.ajaxCall() ---> ", data);
					if (label) DisplayGlobals_SRV.getPreviewRef().hideLoader();
					if(callBack) callBack(data);
			})
			.fail(function() {
				console.log ("%c -> ", "background:#ff0000;", "POST APICalls.ajaxCall() ---> Error");
			})
			.always(function() {
				if (label) DisplayGlobals_SRV.getPreviewRef().hideLoader();
			});

	}




}











ApiCalls.prototype.getURL = function (idUrl) {

	return _ApiCalls.URLs[idUrl]

}























module.exports = new ApiCalls ();
