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

	_loadLegendOver.call(this);
	_loadLegendBottom.call(this);

}



function _loadLegendBottom() {

	let _this = this;

	$.each( this.buttonsArrayMO, function( key, item ) {

		let offset = (key === 0) ? 'col-xs-offset-1 ' : '';
		let btn = '<div class="'+offset+'col-xs-2 text-center"><button type="button" data-id="'+(key+1)+'" class="legend-btn btn btn-circle '+item.metroColor+'"> <strong>'+(key+1)+'</strong> </button><br>'+item.label+' </div>';
		this.domTarget.append(btn);

	}.bind(this));

	this.domTarget.append('<div class="clearfix"></div>');
	_selectLegend.call(this,1);

	$('.legend-btn').click(function() {
		let id = $(this).data('id');
		DisplayGlobals_SRV.getEditorRef().loadFormSettings(id);
		_selectLegend.call(_this,id);
	});

}


function _selectLegend(id) {

	$('.legend-btn').removeClass('blue');
	$('.legend-btn[data-id='+id+']').addClass('blue');
	this.d3SVG_Ctrl.selectLegendItem(id);

}



function _loadLegendOver() {

	this.d3SVG_Ctrl.drawLegendOnTop(this.buttonsArrayMO);

}























Legend_Ctrl.prototype.selectLegend = function (id) {

	_selectLegend.call(this,id);

}























module.exports = Legend_Ctrl;