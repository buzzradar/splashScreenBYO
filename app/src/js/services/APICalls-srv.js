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




















ApiCalls.prototype.call = function (urlCall, dataObj, callBack, label,  delay) {

	console.log ("%c -> ", "background:#87eb9d;", "APICalls.ajaxCall() URL ->" , this.URLs[urlCall], dataObj);

	urlCall = this.URLs[urlCall]

	//If delay not set, should be 0
	delay = (!delay) ? 0 : delay;

	DisplayGlobals_SRV.getPreviewRef().showLoader(label + "...");
	
	setTimeout(function() {
        

		_fatalCall(urlCall, dataObj, callBack, delay);

		

    }.bind(this),delay);






  
};











function _fatalCall(urlCall, dataObj, callBack, delay) {



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

			DisplayGlobals_SRV.getPreviewRef().hideLoader();


			switch(jqXHR.status) {
				case 200:
					//Success
					if(callBack) callBack(retJson);
				break;
				case 400:
					//Bad Request
					if(callBack) callBack({"status" : 400});
				break;
				case 500:
					//Internal Server Error
					if(callBack) callBack({"status" : 500});
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
