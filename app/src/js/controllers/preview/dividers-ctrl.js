/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const d3 = require("d3");



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Dividers_CTRL (svg, linesArrayMO) {

	this.svgContainer = svg;
	this.linesArrayMO = linesArrayMO;

  _createGroup.call(this);

}








function _createGroup() {

  this.allDividersGroup = this.svgContainer.append("g");

  _loadDividers.call(this);

}





function _loadDividers() {

  $.each( this.linesArrayMO, function( key, item ) {
    
    this.allDividersGroup.append("line")
      .attr("x1", item.x)
      .attr("y1", item.y)
      .attr("x2", item.x + item.width)
      .attr("y2", item.y + item.height)
      .attr("stroke-width", item.height)
      .attr("stroke", '#'+item.colour);

  }.bind(this));


}


Dividers_CTRL.prototype.update = function() {

  this.allDividersGroup.selectAll("*").remove();
  _loadDividers.call(this);

}

Dividers_CTRL.prototype.reset = function() {

  this.linesArrayMO = DisplayGlobals_SRV.getMasterConfigReset().AppSplash.dividers;
  this.update();

}






module.exports =  Dividers_CTRL;
