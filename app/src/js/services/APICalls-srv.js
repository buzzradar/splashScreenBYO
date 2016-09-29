/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");

const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------

let _ApiCalls;

function ApiCalls () {

  _ApiCalls = this;
  this.numGNIPCalls = 0;
  this.GNIPminCalls = 3;
  this.GNIPmaxCalls = 10;

}




ApiCalls.prototype.setURLFromArguments = function () {

  this.URLs = {
  	
  	save : DisplayGlobals_SRV.getArguments().save,
  	publish : DisplayGlobals_SRV.getArguments().publish,
  	reset : DisplayGlobals_SRV.getArguments().reset,

  }

}




















ApiCalls.prototype.call = function (urlCall, dataObj, callBack, delay, message) {

	console.log ("%c -> ", "background:#87eb9d;", "APICalls.ajaxCall() -> is Dev? " + DisplayGlobals_SRV.isDev() + " and URL ->" , urlCall, dataObj);

	urlCall = this.URLs[urlCall]

	//If delay not set, should be 0
	delay = (!delay) ? 0 : delay;
	if (message) {
    	$('.bz-cta-message').html(message);
	}


	setTimeout(function() {
        

		_fatalCall(urlCall, dataObj, callBack, delay, message);

		

    }.bind(this),delay);






  
};











function _fatalCall(urlCall, dataObj, callBack, delay, message) {



	$.ajax({
		type: 'GET',
		url: urlCall,
		data: dataObj,
		async: false,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		timeout : 1000*120,
		success: function(retJson, status, jqXHR) {
			console.log ("%c -> ", "background:#87eb9d;", "Return ---> ajaxCall()", jqXHR.status, retJson);


			switch(jqXHR.status) {
				case 200:
					//Success
					callBack(retJson);
				break;
				case 400:
					//Bad Request
					callBack({"status" : 400});
				break;
				case 500:
					//Internal Server Error
					callBack({"status" : 500});
				break;
			}

		},
		error: function(x,t,m) {

			if(t==="timeout") {
				console.error ("ERROR ---> ajaxCall() Timeout!!!!!" + urlCall);
				// DisplayGlobals_SRV.rollbarError("ERROR ---> ajaxCall() Timeout!!!!!" + urlCall);
	        } else {
				console.error ("ERROR ---> ajaxCall() " + urlCall);
				// DisplayGlobals_SRV.rollbarError("ERROR ---> ajaxCall()" + urlCall);
	        }

		}

	});


}











ApiCalls.prototype.getURL = function (idUrl) {

	return _ApiCalls.URLs[idUrl]

}























module.exports = new ApiCalls ();
