/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Dividers_CTRL (svg) {

	this.svgContainer = svg;

  _createGroup.call(this);

}








function _createGroup() {

  this.allDividersGroup = this.svgContainer.append("g");

  _loadDividers.call(this);

}





function _loadDividers() {

  this.linesArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;

  $.each( this.linesArrayMO, function( key, item ) {


    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");


    if (!item.deleted) {

      // this.allDividersGroup.append("line")
      //   .attr("x1", Utils_SRV.getJsonVal(0,item.x,"NUMBER") )
      //   .attr("y1", Utils_SRV.getJsonVal(550,item.y,"NUMBER") )
      //   .attr("x2", Utils_SRV.getJsonVal(1920,Number(item.x) + Number(item.width),"NUMBER") )
      //   .attr("y2", Utils_SRV.getJsonVal(1920,Number(item.y) + Number(item.height),"NUMBER") )
      //   .attr("stroke-width", Utils_SRV.getJsonVal(5,item.height,"NUMBER") )
      //   .attr("stroke", '#'+item.colour);


      this.allDividersGroup.append("rect")
        .attr("x", Utils_SRV.getJsonVal(0,item.x,"NUMBER") )
        .attr("y", Utils_SRV.getJsonVal(550,item.y,"NUMBER") )
        .attr("width", Utils_SRV.getJsonVal(1920, Number(item.width),"NUMBER") )
        .attr("height", Utils_SRV.getJsonVal(2, Number(item.height),"NUMBER") )
        .attr("fill", '#'+item.colour);

    }

  }.bind(this));


}


Dividers_CTRL.prototype.update = function() {

  this.allDividersGroup.selectAll("*").remove();
  _loadDividers.call(this);

}

Dividers_CTRL.prototype.reset = function() {

  this.linesArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.dividers;
  this.update();

}






module.exports =  Dividers_CTRL;
