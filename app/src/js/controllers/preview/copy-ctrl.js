/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Copy_CTRL (svg, copyArrayMO) {

    this.svgContainer = svg;
    this.copyArrayMO = copyArrayMO;
    this.fontFamily = "Helvetica, Arial, sans-serif";


  _createGroup.call(this);

}








function _createGroup() {

  this.allCopyGroup = this.svgContainer.append("g");

  _loadCopy.call(this);

}





function _loadCopy() {

  $.each( this.copyArrayMO, function( key, item ) {

    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");

    if (!item.deleted) {

      this.allCopyGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("x", 1920/2)
        .attr("y", Number(item.y) + Number(item.size) ) 
        .text( item.copy)
        .attr("font-family", this.fontFamily )
        .attr("font-size", Number(item.size) )
        .attr("fill", '#'+item.colour);

    }

  }.bind(this));

}


Copy_CTRL.prototype.update = function() {

  this.allCopyGroup.selectAll("*").remove();
  _loadCopy.call(this);

}


Copy_CTRL.prototype.reset = function() {

  this.copyArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;
  this.update();

}





module.exports =  Copy_CTRL;
