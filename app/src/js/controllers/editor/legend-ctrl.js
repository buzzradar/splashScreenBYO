/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function Legend_Ctrl (svg, buttonsArrayMO) {

	this.d3SVG_Ctrl = svg;
	this.domTarget = $('.spl-scr-legend');
	this.buttonsArrayMO = buttonsArrayMO;


	_loadLegendBottom.call(this);
	// _loadLegendOver.call(this);

}



function _loadLegendBottom() {

	$.each( this.buttonsArrayMO, function( key, item ) {

		let offset = (key === 0) ? 'col-xs-offset-1 ' : '';
		let btn = '<div class="'+offset+'col-xs-2"><button type="button" data-id="'+(key+1)+'" class="legend-btn btn btn-circle '+item.metroColor+'"> <strong>'+(key+1)+'</strong> </button> '+item.label+' </div>';
		this.domTarget.append(btn);

	}.bind(this));

	this.domTarget.append('<div class="clearfix"></div>');

	_addBehaviour.call(this);

}



function _loadLegendOver() {

	this.d3SVG_Ctrl.drawLegendOnTop(this.buttonsArrayMO);

}



function _addBehaviour() {

	$('.legend-btn').click(function() {
		let id = $(this).data('id');
		DisplayGlobals_SRV.getEditorRef().loadFormSettings(id);
	});

}














































module.exports = Legend_Ctrl;