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
  	
  	packageInfo : DisplayGlobals_SRV.getArguments().apicallpackageinfo,
  	customerInfo : DisplayGlobals_SRV.getArguments().apicallcustomerinfo,

  	registInit : DisplayGlobals_SRV.getArguments().apicallregistinit,
  	registPayment : DisplayGlobals_SRV.getArguments().apicallregistpayment,
  	registCreateDash : DisplayGlobals_SRV.getArguments().apicallregistcreatedash,
  	
  	gnipVolume : DisplayGlobals_SRV.getArguments().apicallgnipvolume,
  	validateChannel : DisplayGlobals_SRV.getArguments().apicallvalidatechannel,
  	getFilters : DisplayGlobals_SRV.getArguments().apicallgetfilters,

  }

}












ApiCalls.prototype.updateCall = function (id, newURL) {

	if (newURL) {
		_ApiCalls.URLs[id] = newURL;		
	}

}









ApiCalls.prototype.call = function (urlCall, dataObj, callBack, delay, message) {

	console.log ("%c -> ", "background:#87eb9d;", "APICalls.ajaxCall() -> is Dev? " + DisplayGlobals_SRV.isDev() + " and URL ->" , urlCall, dataObj);

	// -------------------
	// IMPORTANT!!!!!!
	// CANCEL THE CALL IF GNIP AND > 10 TIMES
	// -------------------
	if (urlCall === this.URLs.gnipVolume && this.numGNIPCalls >= this.GNIPmaxCalls) {
		console.log ("%c -> ", "background:#ff0000;", "STOP!!!!!!!! APICalls Srv GNIP Calls. Max num Calls 10. No more....");
		return false;
	}



	//If delay not set, should be 0
	delay = (!delay) ? 0 : delay;
	if (message) {
    	$('.bz-cta-message').html(message);
	}

    _startSpinner();

	setTimeout(function() {
        
		if ( DisplayGlobals_SRV.isDev() ) {

			_ApiCalls.devCall(urlCall, dataObj, callBack, delay, message);

		} else{

			_ApiCalls.fatalCall(urlCall, dataObj, callBack, delay, message);

		}

    }.bind(this),delay);






  
};







ApiCalls.prototype.devCall = function (urlCall, dataObj, callBack, delay, message) {



	let objBack;

	switch(urlCall) {
		case this.URLs.gnipVolume:
			_gnipDev(urlCall, dataObj, callBack);			
		break;
		case this.URLs.packageInfo:
			_packageInfoDev(urlCall, dataObj, callBack);			
		break;
		case this.URLs.customerInfo:
			_customerInfoDev(urlCall, dataObj, callBack);			
		break;
		case this.URLs.registCreateDash:
			_registCreateDashDev(urlCall, dataObj, callBack);			
		break;
		case this.URLs.registPayment:
			_registPaymentDev(urlCall, dataObj, callBack);			
		break;
		default:
			_fatalCall(urlCall, dataObj, callBack);			
		break;
	}

}




function _gnipDev(urlCall, dataObj, callBack) {

	let objBack= {mentions:_.random(0,500) };
	_ApiCalls.gnipCheckCalls(objBack, callBack);					

}

ApiCalls.prototype.gnipCheckCalls = function (objBack, callBack) {

	this.numGNIPCalls ++;

    let numMentions = objBack.mentions;
    let maxMentions = DisplayGlobals_SRV.getMasterJSON().max_mentions; 
    let minMentions = DisplayGlobals_SRV.getMasterJSON().min_mentions; 


	objBack['mentions_accepted'] = false;
	objBack['maxReached'] = false;

    // console.clear();
    if (numMentions >= minMentions && numMentions <= maxMentions) {
        //Num mentions betweend the threshold
        // console.log("All good");
		objBack['mentions_accepted'] = true;
    }else if (numMentions <= minMentions) {
        //Num mentions below the threshold
        // console.log("Below the threshold");
        if (this.numGNIPCalls > this.GNIPminCalls) {
        	//... then move on
			objBack['mentions_accepted'] = true;
        }
    }else{
    	//WARNING!!!! Num mentions above the threshold
        // console.log("Above the threshold");
        if (this.numGNIPCalls >= this.GNIPmaxCalls) {
        	//ERROR!!!!!!! ---> Too many tries. Blocked!
			console.log("%c -> Warning: ","background:#ff0000;","ApiCalls -> Gnip (10 tries and is above threshold). Block this user as could be a boot.");
			objBack['maxReached'] = true;
        	
        }
    }


	console.log("---------------------------------------------", objBack, " numGNIpCalls _>", this.numGNIPCalls, numMentions, maxMentions, minMentions);

    _stopSpinner();
	callBack(objBack);	

}






function _customerInfoDev(urlCall, dataObj, callBack) {

	let objBack = {
     	"id" : "1",
        "firstname" : "John",
        "lastname" : "Smith",
        "email" : "john@gmail.com",
        "department" : "Development",
        "telephone" : "8234783247348",
        "country" : "GB",
        "country_name" : "United Kingdom",
        "company" : "My Company",
        "currency" : "pound",
	};

	_stopSpinner();
	callBack(objBack);

}



function _packageInfoDev(urlCall, dataObj, callBack) {

	let objBack = {

		package : {
			description : "A high volume package perfect for pitches and events.",
			dollar : "800.00",
			euro : "700.00",
			id : 99999,
			image : "/uploads/byoservices/559d4fe619cb6weekly.jpg",
			name : "Weekly",
			pound : "500.00",
			type : "Social Monitoring",
		},

		otherpackages : [

			{
	            id : 36,
	            name: '7 day Free Trial',
	            costunit : {
	                'gbp' : 0,
	                'usd' : 0,
	                'eur' : 0,
	            }, 
	            costunitdisc : {
	                'gbp' : 0,
	                'usd' : 0,
	                'eur' : 0,
	            }
	        },
	        {
	            id : 88,
	            name: 'Essential',
	            costunit : {
	                'gbp' : 99,
	                'usd' : 88,
	                'eur' : 77,
	            },
	            costunitdisc : {
	                'gbp' : 10,
	                'usd' : 12,
	                'eur' : 14,
	            }
	        },
	        {
	            id : 99,
	            name: 'Connect',
	            costunit : {
	                'gbp' : 299,
	                'usd' : 288,
	                'eur' : 277,
	            },
	            costunitdisc : {
	                'gbp' : 50,
	                'usd' : 60,
	                'eur' : 70,
	            }
	        },
	        {
	            id : 66,
	            name: 'Professional',
	            costunit : {
	                'gbp' : 619,
	                'usd' : 519,
	                'eur' : 419,
	            },
	            costunitdisc : {
	                'gbp' : 50,
	                'usd' : 60,
	                'eur' : 70,
	            }
	        }

		]

	}	

    _stopSpinner();
	callBack(objBack);

}



function _registCreateDashDev(urlCall, dataObj, callBack) {

	let objBack = {
		status : "",
     	error : "Something went wrong while creating the dashboard.",
	};

    _stopSpinner();
	callBack(objBack);

}



function _registPaymentDev(urlCall, dataObj, callBack) {

	let objBack = {
     	error : false,
     	// error : "Something went wrong while registering the payment.",
	};

    _stopSpinner();
	callBack(objBack);

}














function _fatalCall(urlCall, dataObj, callBack, delay, message) {


    if(DisplayGlobals_SRV.getLaddaSpinner()) DisplayGlobals_SRV.getLaddaSpinner().start();


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
			
    		_stopSpinner();

			switch(jqXHR.status) {
				case 200:
					//Success
					if (urlCall === _ApiCalls.URLs.gnipVolume) {
						_ApiCalls.gnipCheckCalls(objBack, callBack);									
					}else{
						callBack(retJson);
					}
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
				DisplayGlobals_SRV.rollbarError("ERROR ---> ajaxCall() Timeout!!!!!" + urlCall);
	        } else {
				console.error ("ERROR ---> ajaxCall() " + urlCall);
				DisplayGlobals_SRV.rollbarError("ERROR ---> ajaxCall()" + urlCall);
	        }

		}

	});


}











ApiCalls.prototype.getURL = function (idUrl) {

	return _ApiCalls.URLs[idUrl]

}





function _startSpinner() {
	if(DisplayGlobals_SRV.getLaddaSpinner()) DisplayGlobals_SRV.getLaddaSpinner().start();
}

function _stopSpinner() {
	if(DisplayGlobals_SRV.getLaddaSpinner()) DisplayGlobals_SRV.getLaddaSpinner().stop();
    $('.bz-cta-message').html('');	
}

























module.exports = new ApiCalls ();
