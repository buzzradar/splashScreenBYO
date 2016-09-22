/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../services/HBTemplates-srv');
const Legend_CTRL = require('../../controllers/editor/legend-ctrl');
const Form_CTRL = require('../../controllers/editor/formBoss-ctrl');





// ------------------------------------
// Constructor
// ------------------------------------

function Editor_Ctrl (svgCtrl) {

	this.d3SVG_Ctrl = svgCtrl;
	this.legend_Ctrl = null;
	this.form_Ctrl = null;

    console.log ("%c -> EDITOR LAYER Constructor => ", "background:#ffff00;", this.d3SVG_Ctrl);

	_init.call(this);

}












// ------------------------------------
// Init
// ------------------------------------

function _init() {

	let buttonsArray = [
		{cx:211, cy:245, radius : 40, label : 'General', fill : '#397abe', 'metroColor' : 'blue-steel', index : 1},
		{cx:971, cy:150, radius : 40, label : 'Logo', fill : '#19b6af', 'metroColor' : 'green-haze', index : 2},
		{cx:922, cy:570, radius : 40, label : 'Copy', fill : '#ef3d3f', 'metroColor' : 'red-mint', index : 3},
		{cx:922, cy:410, radius : 40, label : 'Divider', fill : '#ffc711', 'metroColor' : 'yellow-lemon', index : 4},
		{cx:150, cy:960, radius : 40, label : 'Buttons', fill : '#887aa9', 'metroColor' : 'purple-soft', index : 5},
	];

	this.legend_Ctrl = new Legend_CTRL(this.d3SVG_Ctrl,buttonsArray);
	this.form_Ctrl = new Form_CTRL();

};








Editor_Ctrl.prototype.loadFormSettings = function (id) {

	this.form_Ctrl.loadForm(id);

}




































module.exports = Editor_Ctrl;